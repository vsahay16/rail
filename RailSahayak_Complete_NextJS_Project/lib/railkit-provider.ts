import { normalizeSeatDay, parseJourneyDate, railkitDate } from "./seat-availability";
/** Server-side RailKit transport. No keys or SDK code belong in client components. */
import * as sdk from "railkit";
import { record, rows, scalar, type RailRecord } from "./rail-data";

export const supportedActions = ["pnr", "live", "schedule", "between", "availability", "fare", "station"];
export function railkitRequest(endpoint: string, action: string) {
  const url = new URL(endpoint, "https://internal.invalid");
  const parts = url.pathname.split("/").filter(Boolean);
  const q = url.searchParams;
  const date = (value: string) => value ? railkitDate(value) : "";
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const train = parts[1];
  let path: string; let args: string[];
  switch (action) {
    case "pnr": args = [parts[1]]; path = `/api/v1/pnr/${args[0]}`; break;
    case "schedule": args = [train]; path = `/api/v1/trains/${train}/info`; break;
    case "live": args = [train, date(q.get("date") || today)]; path = `/api/v1/trains/${train}/live/${args[1]}`; break;
    case "between": args = [parts[2], parts[3], date(q.get("date") || "")]; path = `/api/v1/trains/between/${args[0]}/${args[1]}${args[2] ? `?date=${args[2]}` : ""}`; break;
    case "availability": case "fare":
      args = [train, q.get("source") || "", q.get("destination") || "", date(q.get("journeyDate") || ""), q.get("classCode") || "", q.get("quotaCode") || ""];
      path = action === "fare" ? `/api/v1/fare/${train}/${args[3]}/${args[1]}/${args[2]}/${args[4]}/${args[5]}` : `/api/v1/seats/${args.join("/")}`; break;
    case "station": args = [parts[1], q.get("hours") || "4"]; path = `/api/v1/stations/${args[0]}/live?hrs=${args[1]}`; break;
    default: throw new Error("Unsupported RailKit action");
  }
  return { path, args };
}
export async function callRailkit(endpoint: string, action: string, key: string): Promise<{status: number; payload: RailRecord; retryAfter?: number}> {
  const { path, args: a } = railkitRequest(endpoint, action);
  if (action === "availability" || process.env.RAILKIT_TRANSPORT === "rest") {
    // Availability uses the verified REST contract; other tools retain their configured transport.
    const response = await fetch(`https://api.railkit.in${path}`, { headers: { "x-api-key": key, accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(15000) });
    const retry = response.headers.get("retry-after");
    const retryAfter = retry && /^\d+$/.test(retry) ? Number(retry) : retry && Number.isFinite(Date.parse(retry)) ? Math.max(1, Math.ceil((Date.parse(retry) - Date.now()) / 1000)) : undefined;
    return { status: response.status, payload: record(await response.json().catch(() => null)), retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined };
  }
  sdk.configure(key);
  let result: unknown;
  switch (action) {
    case "pnr": result = await sdk.checkPNRStatus(a[0]); break;
    case "schedule": result = await sdk.getTrainInfo(a[0]); break;
    case "live": result = await sdk.trackTrain(a[0], a[1]); break;
    case "between": result = await sdk.searchTrainBetweenStations(a[0], a[1], a[2] || undefined); break;
    case "availability": result = await sdk.getAvailability(a[0], a[1], a[2], a[3], a[4], a[5]); break;
    case "fare": result = await sdk.fareLookup(a[0], a[1], a[2], a[3], a[4], a[5]); break;
    case "station": result = await sdk.liveAtStation(a[0], Number(a[1]) as 2 | 4 | 8); break;
    default: throw new Error("Unsupported RailKit action");
  }
  const payload = record(result);
  return { status: Number(payload.statusCode) || (payload.success === true ? 200 : 502), payload };
}
const station = (code: unknown, name?: unknown) => ({ code: scalar(code), name: scalar(name, code) });
function minutes(value: unknown) { const m = scalar(value).match(/^(\d+):(\d+)/); return m ? Number(m[1]) * 60 + Number(m[2]) : undefined; }
function runDays(value: unknown) { return scalar(value) === "1111111" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : []; }
/** Convert documented RailKit fields into the shared RailQ view model. */
export function normalizeRailkit(action: string, input: unknown, endpoint: string): RailRecord {
  const root = record(input), d = record(root.data), { args } = railkitRequest(endpoint, action);
  let data: RailRecord;
  if (action === "pnr") {
    const t = record(d.train), j = record(d.journey);
    if (!scalar(t.number) || !rows(d.passengers).length) throw new Error("Incomplete PNR response");
    data = { train: { ...t, boardingPoint: j.boardingPoint ?? j.source, source: j.source, destination: j.destination, reservationUpto: j.destination, journeyDate: j.dateOfJourney, journeyClass: j.class }, journey: { ...j, date: j.dateOfJourney }, charting: record(d.chart), passengers: rows(d.passengers).map((p, i) => {
      const b = record(p.booking), c = record(p.current);
      return { serialNumber: i + 1, booking: { ...b, formatted: scalar(b.details, b.status) }, current: { ...c, formatted: scalar(c.details, c.status) } };
    }) };
  } else if (action === "schedule") {
    const t = record(d.trainInfo);
    if (!scalar(t.train_no) || !rows(d.route).length) throw new Error("Incomplete timetable");
    data = { train: { number: t.train_no, name: t.train_name, source: station(t.from_stn_code, t.from_stn_name), destination: station(t.to_stn_code, t.to_stn_name), type: t.type, distance: t.total_distance, duration: minutes(t.travel_time), runDays: runDays(t.running_days), classes: Array.isArray(t.classes) ? t.classes : [] }, route: rows(d.route).map(r => ({ station: station(r.stnCode, r.stnName), arrival: r.arrival, departure: r.departure, distance: r.distance, arrivalDay: r.day, departureDay: r.day, isHalt: true })) };
  } else if (action === "between") {
    if (!Array.isArray(root.data)) throw new Error("Invalid trains list");
    const trains = rows(root.data).map(t => ({ train: { number: t.train_no, name: t.train_name, runDays: runDays(t.running_days) }, from: { ...station(t.from_stn_code, t.from_stn_name), departure: t.from_time }, to: { ...station(t.to_stn_code, t.to_stn_name), arrival: t.to_time }, duration: minutes(t.travel_time), distance: t.distance }));
    data = { from: station(args[0]), to: station(args[1]), count: trains.length, trains };
  } else if (action === "availability") {
    const t = record(d.train);
    if (!Array.isArray(d.availability)) throw new Error("Missing availability response");
    for (const [value, expected] of [[t.trainNo, args[0]], [t.from, args[1]], [t.to, args[2]], [t.travelClass, args[4]], [t.quota, args[5]]]) {
      if (value !== undefined && scalar(value).toUpperCase() !== expected) throw new Error("Mismatched search context");
    }
    data = { trainNumber: scalar(t.trainNo, args[0]), trainName: scalar(t.trainName), from: station(t.from ?? args[1], t.fromStationName), to: station(t.to ?? args[2], t.toStationName), classCode: args[4], quotaCode: args[5], requestedDate: parseJourneyDate(args[3]), calendar: rows(d.availability).map(normalizeSeatDay) };
  } else if (action === "fare") {
    if (d.totalFare === undefined || d.totalFare === null) throw new Error("Missing fare");
    const breakdown: RailRecord = {};
    for (const k of ["baseFare", "reservation", "superfast", "fuelAmount", "concession", "tatkalFare", "gst", "otherCharge", "catering", "dynamicFare", "totalFare"]) if (d[k] !== undefined) breakdown[k] = d[k];
    data = { trainNumber: d.trainNo, trainName: d.trainName, from: d.from, to: d.to, classCode: d.class, quotaCode: args[5], breakdown };
  } else if (action === "station") {
    if (!Array.isArray(d.trains)) throw new Error("Invalid station board");
    data = { station: station(args[0]), trains: rows(d.trains).map(t => ({ train: { number: t.trainNo, name: t.trainName, source: station(t.source, t.sourceName), destination: station(t.dest, t.destName) }, stop: { arrival: record(t.arrival).scheduled, departure: record(t.departure).scheduled, platform: t.platform }, live: { expectedArrivalTime: record(t.arrival).actual, expectedDepartureTime: record(t.departure).actual, platform: t.platform, type: t.cancelled === true ? "cancelled" : "" } })) };
  } else if (action === "live") {
    if (!scalar(d.trainNo) || !Array.isArray(d.timeline)) throw new Error("Invalid live status");
    const route = rows(d.timeline).map(r => ({ stationCode: r.stationCode, stationName: r.stationName, isHalt: r.type === "stoppage", status: r.status, platform: r.platform, scheduledArrival: record(r.arrival).scheduled, expectedArrival: record(r.arrival).actual, scheduledDeparture: record(r.departure).scheduled, expectedDeparture: record(r.departure).actual }));
    const currentIndex = route.findIndex(r => r.stationCode === d.currentStationCode);
    const previous = currentIndex >= 0 ? route.slice(0, currentIndex).filter(r => r.isHalt).at(-1) : undefined;
    const next = currentIndex >= 0 ? route.slice(currentIndex + 1).find(r => r.isHalt) : undefined;
    data = { train: { number: d.trainNo, name: d.trainName }, status: d.statusNote, currentLocation: station(d.currentStationCode), previousHalt: previous, nextHalt: next, route, delayMinutes: null };
  } else throw new Error("Unsupported response");
  return { success: true, data };
}

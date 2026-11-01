/** Provider-independent presentation for public train and station lookups. */
import { record, rows, scalar, type RailRecord } from "./rail-data";
import { parseJourneyDate, todayInIndia } from "./seat-availability";
export const extraActions = ["live-v2", "history", "timetable", "amenities", "cancelled", "train-search"];
export function extraInputProblem(action: string, p: URLSearchParams, now = new Date()): string | null {
  const date = p.get("date") || "", today = todayInIndia(now);
  if (["live", "live-v2", "coach", "platform"].includes(action)) {
    const parsed = parseJourneyDate(date);
    if (!parsed) return "Choose the date this train left its origin station.";
    const age = (Date.parse(today) - Date.parse(parsed)) / 86400000;
    if (age < 0 || age > 5) return "Live tracking supports today and the previous five origin-departure dates (Indian time).";
  }
  if (action === "history" && (!parseJourneyDate(date) || date > today)) return "Choose today or a past origin-departure date. History is available only for completed journeys.";
  if (action === "timetable" && date && (!parseJourneyDate(date) || Math.abs(Date.parse(date) - Date.parse(today)) > 86400000)) return "Station timetable dates support yesterday, today or tomorrow. Leave the date empty for all scheduled trains.";
  if (action === "train-search") {
    const query = (p.get("query") || "").trim(); p.set("query", query);
    if (query.length < 2 || query.length > 60 || !/^[\p{L}\p{N} .'-]+$/u.test(query) || (/^\d+$/.test(query) && !/^\d{2,5}$/.test(query))) return "Enter at least two letters of the train name, or two to five digits of its number.";
  }
  return null;
}
export function coachRows(value: unknown): RailRecord[] {
  if (typeof value === "string") return value.split(",").map(s => s.trim()).filter(Boolean).map(code => ({code}));
  return rows(value).map(c => ({ code: scalar(c.number, c.type), position: scalar(c.position), classType: scalar(c.coachClass, c.type), stockNumber: scalar(c.coachNo), variant: scalar(c.variant) })).filter(c => c.code);
}
export function platformValue(value: unknown): string {
  const v = scalar(value).trim();
  return /^(?:\d{1,2}[A-Z]?|[A-Z]\d{1,2})$/i.test(v) && v !== "0" ? v : "";
}
export function coachOrPlatform(payload: RailRecord, action: string, stationCode: string): RailRecord {
  const data = record(payload.data), train = record(data.train), route = rows(data.route);
  const stop = route.find(r => r.stationCode === stationCode && r.isHalt === true);
  return { ...payload, data: { trainNumber: train.number, trainName: train.name, journeyDate: data.journeyDate, rake: action === "platform" ? [] : data.coaches,
    station: { code: stationCode, name: scalar(stop?.stationName), platform: platformValue(stop?.platform) }, stationFound: Boolean(stop),
    providerUpdated: data.providerUpdated, lastUpdatedAt: data.lastUpdatedAt, compositionChanges: data.compositionChanges } };
}
export function normalizeExtra(action: string, input: unknown, args: string[]): RailRecord {
  const root = record(input), d = record(root.data);
  if (action === "live-v2") {
    const train = rows(d.trainInfo)[0] ?? record(d.trainInfo);
    if (scalar(train.number) !== args[0] || !Array.isArray(d.route)) throw new Error("Incomplete live tracking");
    const station = (v: unknown) => { const r=record(v); return {code:scalar(r.stnCode,r.code),name:scalar(r.stnName,r.name)}; };
    return {train, journeyDate:args[1], status:scalar(d.statusText,d.status), currentLocation:station(d.currentLocation),previousHalt:station(d.previousHalt),nextHalt:station(d.nextHalt),delayMinutes:typeof d.delayMinutes === "number" && Number.isFinite(d.delayMinutes) ? d.delayMinutes : null,
      providerUpdated:scalar(d.lastUpdatedAt), coaches:coachRows(train.coachPosition), route:rows(d.route).map(r=>({...r,stationCode:r.stnCode,stationName:r.stnName,platform:platformValue(r.platform)}))};
  }
  if (action === "history") {
    if (scalar(d.trainNo) !== args[0] || !Array.isArray(d.stations)) throw new Error("Missing journey history");
    return {trainNumber:d.trainNo,trainName:d.trainName,journeyDate:d.journeyDate,providerUpdated:scalar(d.lastUpdate),stations:rows(d.stations).map(r=>({code:r.stationCode,name:r.stationName,platform:platformValue(r.platform),arrival:scalar(record(r.arrival).actual,record(r.arrival).scheduled),departure:scalar(record(r.departure).actual,record(r.departure).scheduled),delay:scalar(record(r.arrival).delay,record(r.departure).delay)}))};
  }
  if (action === "timetable") {
    if (!Array.isArray(d.trains)) throw new Error("Missing station timetable");
    return {station:args[0],date:scalar(d.date),trains:rows(d.trains).map(t=>({number:t.trainNo,name:t.trainName,source:scalar(t.sourceName,t.source),destination:scalar(t.destinationName,t.destination),arrival:t.arrival,departure:t.departure,classes:t.classes}))};
  }
  if (action === "amenities") {
    if (!Object.keys(d).length) throw new Error("Missing station facilities");
    const fields=["platforms","stationCategory","wheelchairAvailable","liftCount","escalatorCount","toiletCount","retiringRoomCount","waitingRoomSeatCount","footOverBridgeCount","foodPlazaAvailable","parkingAvailable","waterFacilityCount","enquiryOfficeCount","electronicTrainDisplayAvailable"];
    const facilities=Object.fromEntries(fields.filter(k=>typeof d[k]==="boolean" || (typeof d[k]==="number"&&Number.isFinite(d[k])) || (typeof d[k]==="string"&&String(d[k]).trim())).map(k=>[k,d[k]]));
    return {station:args[0],facilities};
  }
  if (action === "cancelled") {
    if (!Array.isArray(d.fullyCancelledTrains) || !Array.isArray(d.partiallyCancelledTrains)) throw new Error("Missing cancellation list");
    const list=(v:unknown,kind:string)=>rows(v).map(t=>({number:t.trainNo,name:t.trainName,date:t.journeyDate,kind,source:record(record(t.route).source),destination:record(record(t.route).destination),segment:record(t.cancelledSegment)}));
    return {trains:[...list(d.fullyCancelledTrains,"full"),...list(d.partiallyCancelledTrains,"partial")]};
  }
  if (action === "train-search") {
    if (!Array.isArray(d.trains)) throw new Error("Missing train search");
    return {query:args[0],trains:rows(d.trains).map(t=>({number:t.trainNo,name:t.trainName}))};
  }
  throw new Error("Unsupported tool");
}

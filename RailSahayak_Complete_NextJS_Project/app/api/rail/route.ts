import { NextRequest, NextResponse } from "next/server";
import { fetchRailway, limitVisitor, RailServiceError } from "@/lib/rail-server";

export const runtime = "nodejs";
export const maxDuration = 30;
const trainValid = (value: string) => /^\d{5}$/.test(value);
const stationValid = (value: string) => /^[A-Z0-9]{2,6}$/.test(value);
function dateValid(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
function invalid(message: string): never { throw new RailServiceError("INVALID_INPUT", message, 400, 0); }
function endpointFor(params: URLSearchParams, privatePost: boolean) {
  const action = params.get("action") ?? "";
  const train = params.get("train") ?? "";
  const date = params.get("date") ?? "";
  for (const field of ["from", "to", "station", "class", "quota"]) if (params.has(field)) params.set(field, params.get(field)!.trim().toUpperCase());
  if (action === "pnr") {
    if (!privatePost) throw new RailServiceError("POST_REQUIRED", "Use a private POST request for PNR lookup.", 405, 0);
    const pnr = params.get("pnr") ?? "";
    if (!/^\d{10}$/.test(pnr)) invalid("A valid 10-digit PNR is required.");
    return { action, endpoint: `/pnr/${pnr}` };
  }
  if (privatePost) invalid("POST only supports PNR lookup.");
  if (!["live", "schedule", "between", "availability", "fare", "station", "coach", "platform"].includes(action)) invalid("Unsupported railway lookup.");
  if (["live", "schedule", "availability", "fare", "coach", "platform"].includes(action) && !trainValid(train)) invalid("A valid 5-digit train number is required.");
  if ((date && !dateValid(date)) || (["availability", "fare"].includes(action) && !date)) invalid("A valid journey date is required.");
  if (["between", "availability", "fare"].includes(action)) {
    if (!stationValid(params.get("from") ?? "") || !stationValid(params.get("to") ?? "") || params.get("from") === params.get("to")) invalid("Two different valid station codes are required.");
  }
  if (["station", "platform"].includes(action) && !stationValid(params.get("station") ?? "")) invalid("A valid station code is required.");
  if (["availability", "fare"].includes(action)) {
    if (!["1A", "2A", "3A", "3E", "CC", "EC", "SL", "2S", "FC"].includes(params.get("class") ?? "")) invalid("Choose a valid travel class.");
    if (!["GN", "TQ", "PT", "LD", "SS", "HP", "DF", "DP", "FT", "YU"].includes(params.get("quota") ?? "")) invalid("Choose a valid quota.");
  }
  if (action === "station") {
    const hours = Number(params.get("hours") || 4);
    if (!Number.isInteger(hours) || hours < 1 || hours > 12) invalid("Station window must be 1–12 hours.");
    params.set("hours", String(hours));
  }
  const paths: Record<string, string> = {
    live: `/trains/${train}/live${date ? `?date=${encodeURIComponent(date)}` : ""}`,
    schedule: `/trains/${train}`,
    between: `/trains/between/${params.get("from")}/${params.get("to")}${date ? `?date=${encodeURIComponent(date)}` : ""}`,
    availability: process.env.RAIL_API_AVAILABILITY_PATH ?? "/trains/{train}/seats?source={from}&destination={to}&journeyDate={date}&classCode={class}&quotaCode={quota}",
    fare: process.env.RAIL_API_FARE_PATH ?? "/trains/{train}/fare?source={from}&destination={to}&journeyDate={date}&classCode={class}&quotaCode={quota}",
    station: process.env.RAIL_API_STATION_BOARD_PATH ?? "/stations/{station}/live?hours={hours}",
    coach: process.env.RAIL_API_COACH_POSITION_PATH ?? "/trains/{train}/coaches",
    platform: process.env.RAIL_API_PLATFORM_PATH ?? "/trains/{train}/coaches/{station}",
  };
  const endpoint = ["train", "from", "to", "date", "class", "quota", "station", "hours"].reduce((path, name) => path.replaceAll(`{${name}}`, encodeURIComponent(params.get(name) ?? "")), paths[action]);
  return { action, endpoint };
}
async function handle(request: NextRequest, privatePost: boolean) {
  try {
    let params: URLSearchParams;
    if (privatePost) {
      const raw = await request.text();
      if (raw.length > 1024) invalid("Request body is too large.");
      const body = JSON.parse(raw) as Record<string, unknown>;
      if (!body || typeof body !== "object" || Array.isArray(body) || typeof body.pnr !== "string" || body.action !== "pnr") invalid("A PNR lookup is required.");
      params = new URLSearchParams({ action: "pnr", pnr: body.pnr.trim() });
    } else params = new URLSearchParams(request.nextUrl.searchParams);
    const { action, endpoint } = endpointFor(params, privatePost);
    await limitVisitor(request, action);
    return NextResponse.json(await fetchRailway(endpoint, action), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const problem = error instanceof RailServiceError ? error : error instanceof SyntaxError ? new RailServiceError("INVALID_INPUT", "Invalid JSON body.", 400, 0) : new RailServiceError("SERVICE_UNAVAILABLE", "The live service is temporarily unavailable.");
    return NextResponse.json({ success: false, code: problem.code, message: problem.message, error: { code: problem.code, message: problem.message } }, { status: problem.status, headers: { "Cache-Control": "no-store", ...(problem.retryAfter ? { "Retry-After": String(problem.retryAfter) } : {}), ...(problem.status === 405 ? { Allow: "POST" } : {}) } });
  }
}
export async function GET(request: NextRequest) { return handle(request, false); }
export async function POST(request: NextRequest) { return handle(request, true); }

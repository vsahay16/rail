import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
const API_BASE = process.env.RAILRADAR_API_BASE_URL ?? "https://api.railradar.in/v1";

const optionalPaths: Record<string, string | undefined> = {
  availability: process.env.RAIL_API_AVAILABILITY_PATH ?? "/trains/{train}/seats?source={from}&destination={to}&journeyDate={date}&classCode={class}&quotaCode={quota}",
  fare: process.env.RAIL_API_FARE_PATH ?? "/trains/{train}/fare?source={from}&destination={to}&journeyDate={date}&classCode={class}&quotaCode={quota}",
  station: process.env.RAIL_API_STATION_BOARD_PATH ?? "/stations/{station}/live?hours={hours}",
  coach: process.env.RAIL_API_COACH_POSITION_PATH ?? "/trains/{train}/coaches",
  platform: process.env.RAIL_API_PLATFORM_PATH ?? "/trains/{train}/coaches/{station}",
};

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function badRequest(message: string) { return NextResponse.json({ success: false, message }, { status: 400 }); }

function validTrain(value: string) { return /^\d{5}$/.test(value); }
function validStation(value: string) { return /^[A-Z0-9]{2,6}$/.test(value); }
function validDate(value: string) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T12:00:00+05:30`).valueOf()); }

async function requestFingerprint(request: NextRequest) {
  const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(bytes).slice(0, 8), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function checkRateLimit(request: NextRequest) {
  const now = Date.now(); const fingerprint = await requestFingerprint(request);
  const current = rateBuckets.get(fingerprint);
  const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + RATE_WINDOW_MS } : current;
  bucket.count += 1; rateBuckets.set(fingerprint, bucket);
  if (rateBuckets.size > 2_000) for (const [key, value] of rateBuckets) if (value.resetAt <= now) rateBuckets.delete(key);
  return { allowed: bucket.count <= RATE_LIMIT, remaining: Math.max(0, RATE_LIMIT - bucket.count), resetAt: bucket.resetAt };
}
function optionalEndpoint(action: string, params: URLSearchParams) {
  const template = optionalPaths[action];
  if (!template) return null;
  const allowed = ["train", "from", "to", "date", "class", "quota", "station", "hours"];
  return allowed.reduce((path, name) => path.replaceAll(`{${name}}`, encodeURIComponent(params.get(name) ?? "")), template);
}

export async function GET(request: NextRequest) {
  const rate = await checkRateLimit(request);
  if (!rate.allowed) {
    const retryAfter = Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000));
    return NextResponse.json({ success: false, code: "RATE_LIMITED", message: "Too many railway lookups. Please wait a minute and try again." }, { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } });
  }
  const key = process.env.RAILRADAR_API_KEY;
  if (!key) return NextResponse.json({ success: false, code: "PROVIDER_NOT_CONFIGURED", message: "The live railway provider is ready but has not been connected yet." }, { status: 503 });

  const params = request.nextUrl.searchParams;
  const action = params.get("action");
  let endpoint: string;
  if (action === "pnr") {
    const pnr = params.get("pnr") ?? "";
    if (!/^\d{10}$/.test(pnr)) return badRequest("A valid 10-digit PNR is required.");
    endpoint = `/pnr/${pnr}`;
  } else if (action === "live") {
    const train = params.get("train") ?? "";
    const date = params.get("date");
    if (!validTrain(train)) return badRequest("A valid 5-digit train number is required.");
    endpoint = `/trains/${train}/live${date ? `?date=${encodeURIComponent(date)}` : ""}`;
  } else if (action === "schedule") {
    const train = params.get("train") ?? "";
    if (!validTrain(train)) return badRequest("A valid 5-digit train number is required.");
    endpoint = `/trains/${train}`;
  } else if (action === "between") {
    const from = (params.get("from") ?? "").toUpperCase();
    const to = (params.get("to") ?? "").toUpperCase();
    if (!validStation(from) || !validStation(to)) return badRequest("Valid origin and destination station codes are required.");
    const date = params.get("date") ?? "";
    if (date && !validDate(date)) return badRequest("A valid journey date is required.");
    endpoint = `/trains/between/${from}/${to}${date ? `?date=${encodeURIComponent(date)}` : ""}`;
  } else if (["availability", "fare", "station", "coach", "platform"].includes(action ?? "")) {
    const train = params.get("train") ?? "";
    const from = (params.get("from") ?? "").toUpperCase();
    const to = (params.get("to") ?? "").toUpperCase();
    const station = (params.get("station") ?? "").toUpperCase();
    if (["availability", "fare", "coach", "platform"].includes(action ?? "") && !validTrain(train)) return badRequest("A valid 5-digit train number is required.");
    if (["availability", "fare"].includes(action ?? "") && (!validStation(from) || !validStation(to))) return badRequest("Valid origin and destination station codes are required.");
    if (["availability", "fare"].includes(action ?? "") && !validDate(params.get("date") ?? "")) return badRequest("A valid journey date is required.");
    if (["station", "platform"].includes(action ?? "") && !validStation(station)) return badRequest("A valid station code is required.");
    if (action === "station" && !params.get("hours")) params.set("hours", "4");
    endpoint = optionalEndpoint(action ?? "", params) ?? "";
    if (!endpoint) return NextResponse.json({ success: false, code: "PROVIDER_FEATURE_NOT_CONFIGURED", message: "This live-data feature needs an approved provider endpoint. Add its path template in the server environment; no sample data is shown as live." }, { status: 501 });
  } else return badRequest("Unsupported railway data request.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const providerResponse = await fetch(`${API_BASE}${endpoint}`, {
      headers: { authorization: `Bearer ${key}`, accept: "application/json" }, cache: "no-store", signal: controller.signal,
    });
    const payload = await providerResponse.json().catch(() => ({ success: false, message: "Invalid provider response." }));
    const response = NextResponse.json(payload, { status: providerResponse.status });
    response.headers.set("Cache-Control", action === "between" || action === "schedule" ? "public, s-maxage=900, stale-while-revalidate=3600" : "no-store");
    response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT));
    response.headers.set("X-RateLimit-Remaining", String(rate.remaining));
    return response;
  } catch (error) {
    const timeoutError = error instanceof Error && error.name === "AbortError";
    return NextResponse.json({ success: false, message: timeoutError ? "The live railway provider timed out." : "The live railway provider is currently unavailable." }, { status: 502 });
  } finally { clearTimeout(timeout); }
}

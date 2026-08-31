import { createHash, createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import { record, type RailRecord } from "@/lib/rail-data";

export class RailServiceError extends Error {
  constructor(public code: string, message: string, public status = 503, public retryAfter = 60) { super(message); }
}
function configuration() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new RailServiceError("PROTECTION_UNAVAILABLE", "Live lookups are temporarily unavailable.");
  return { url, key };
}
async function database(path: string, body?: RailRecord, method?: string) {
  const config = configuration();
  try {
    const response = await fetch(`${config.url}/rest/v1/${path}`, {
      method: method ?? (body ? "POST" : "GET"),
      headers: { apikey: config.key, authorization: `Bearer ${config.key}`, "content-type": "application/json", ...(path.startsWith("rail_api_cache") && body ? { prefer: "resolution=merge-duplicates,return=minimal" } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}), cache: "no-store", signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Storage unavailable");
    return response.status === 204 || (body && path.startsWith("rail_api_cache")) ? null : await response.json();
  } catch { throw new RailServiceError("PROTECTION_UNAVAILABLE", "Live lookups are temporarily unavailable."); }
}
function integerSetting(name: string, fallback: number, max: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > max) throw new RailServiceError("PROTECTION_UNAVAILABLE", "Live lookup limits need configuration.");
  return value;
}
export async function limitVisitor(request: NextRequest, action: string) {
  const config = configuration();
  // Vercel overwrites this header at its trusted ingress; local development shares a bucket.
  const ip = (process.env.VERCEL ? (request.headers.get("x-vercel-forwarded-for") ?? "unknown") : "local").split(",")[0].trim();
  const fingerprint = createHmac("sha256", config.key).update(ip || "unknown").digest("hex");
  const group = action === "pnr" ? "pnr" : ["fare", "availability"].includes(action) ? "reservation" : "general";
  const limit = group === "pnr" ? 5 : group === "reservation" ? 10 : 30;
  const rate = record(await database("rpc/rail_api_take", { p_key: `${group}:${fingerprint}`, p_limit: limit, p_window: 600 }));
  if (rate.allowed !== true) throw new RailServiceError("RATE_LIMITED", "Too many lookups. Please wait before trying again.", 429, Number(rate.retry_after) || 600);
}
export async function fetchRailway(endpoint: string, action: string) {
  const key = process.env.RAILRADAR_API_KEY;
  if (!key) throw new RailServiceError("PROVIDER_NOT_CONFIGURED", "The live railway service has not been connected yet.");
  const base = (process.env.RAILRADAR_API_BASE_URL ?? "https://api.railradar.in/v1").replace(/\/$/, "");
  const ttl: Record<string, number> = { live: 45, schedule: 3600, between: 900, station: 45, coach: 3600, platform: 60 };
  const seconds = ttl[action] ?? 0;
  // PNR, availability and fare are never persisted. Cache keys contain no personal data.
  const cacheKey = seconds ? createHash("sha256").update(`${base}${endpoint}`).digest("hex") : "";
  if (seconds) {
    const cached = await database(`rail_api_cache?cache_key=eq.${cacheKey}&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&select=payload,fetched_at&limit=1`);
    if (Array.isArray(cached) && cached.length) {
      const row = record(cached[0]);
      return { ...record(row.payload), railq: { cached: true, fetchedAt: row.fetched_at, cacheSeconds: seconds } };
    }
  }
  const quota = integerSetting("RAILRADAR_MONTHLY_QUOTA", 1000, 10000000);
  const budget = record(await database("rpc/rail_api_reserve", {
    p_limit: Math.max(1, Math.floor(quota * 0.8)), p_burst: integerSetting("RAILRADAR_BURST_LIMIT", 10, 10000), p_reset_day: integerSetting("RAILRADAR_QUOTA_RESET_DAY", 1, 28),
  }));
  if (budget.allowed !== true) throw new RailServiceError(String(budget.reason || "API_BUDGET_REACHED"), "Live requests are temporarily limited.", 429, Number(budget.retry_after) || 60);
  // Every upstream attempt is reserved, including timeouts/errors. No hidden retries.
  let response: Response;
  try { response = await fetch(`${base}${endpoint}`, { headers: { authorization: `Bearer ${key}`, accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(9000) }); }
  catch { throw new RailServiceError("PROVIDER_UNAVAILABLE", "The railway data provider is unavailable. Please try again later.", 502); }
  const payload = record(await response.json().catch(() => null));
  if (!response.ok || payload.success === false || !payload.data) {
    const providerCode = String(record(payload.error).code ?? payload.code ?? "");
    if (response.status === 404 || providerCode === "NOT_FOUND") throw new RailServiceError("NOT_FOUND", "No result was found. The record may be expired or unavailable.", 404);
    if (response.status === 429) throw new RailServiceError("API_BURST_LIMIT", "The provider request allowance is temporarily unavailable.", 429);
    // Do not expose provider diagnostics, keys, endpoint URLs or passenger inputs.
    throw new RailServiceError("PROVIDER_UNAVAILABLE", "The railway data provider did not return a usable result.", 502);
  }
  const fetchedAt = new Date().toISOString();
  if (seconds) {
    try { await database("rail_api_cache?on_conflict=cache_key", { cache_key: cacheKey, payload, fetched_at: fetchedAt, expires_at: new Date(Date.now() + seconds * 1000).toISOString() }); }
    catch { /* An already counted successful lookup can be displayed if cache storage fails. */ }
  }
  return { ...payload, railq: { cached: false, fetchedAt, cacheSeconds: seconds } };
}

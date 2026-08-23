import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
const blockedKeys = new Set(["pnr", "phone", "email", "name", "passenger", "passengerName"]);

function sanitizeProperties(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(Object.entries(input as Record<string, unknown>).filter(([key]) => !blockedKeys.has(key)).slice(0, 20).map(([key, value]) => [key.slice(0, 50), typeof value === "string" ? value.slice(0, 160) : value]));
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const eventName = typeof payload?.eventName === "string" ? payload.eventName : "";
  if (!/^[a-z0-9_]{2,60}$/.test(eventName)) return NextResponse.json({ accepted: false }, { status: 400 });
  const event = {
    event_name: eventName,
    path: typeof payload?.path === "string" ? payload.path.slice(0, 200) : "/",
    session_id: typeof payload?.sessionId === "string" ? payload.sessionId.slice(0, 80) : null,
    properties: sanitizeProperties(payload?.properties), occurred_at: new Date().toISOString(),
  };
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return NextResponse.json({ accepted: true, stored: false }, { status: 202 });
  const result = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/analytics_events`, {
    method: "POST", headers: { apikey: supabaseKey, authorization: `Bearer ${supabaseKey}`, "content-type": "application/json", prefer: "return=minimal" }, body: JSON.stringify(event),
  });
  if (!result.ok) return NextResponse.json({ accepted: true, stored: false }, { status: 202 });
  return NextResponse.json({ accepted: true, stored: true });
}

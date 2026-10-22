import { analyticsEvents,safeAnalyticsProperties,safeAnalyticsPath } from "@/lib/analytics-safety";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const eventName = typeof payload?.eventName === "string" ? payload.eventName : "";
  if (!analyticsEvents.has(eventName)) return NextResponse.json({ accepted: false }, { status: 400 });
  const event = {
    event_name: eventName,
    path: safeAnalyticsPath(payload?.path),
    session_id: typeof payload?.sessionId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.sessionId) ? payload.sessionId : null,
    properties: safeAnalyticsProperties(payload?.properties), occurred_at: new Date().toISOString(),
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

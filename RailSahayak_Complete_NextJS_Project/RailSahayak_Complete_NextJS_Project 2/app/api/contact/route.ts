import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const url = process.env.SUPABASE_URL; const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ success: false, code: "CONTACT_NOT_CONFIGURED", message: "The contact inbox needs Supabase server configuration." }, { status: 503 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : ""; const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 180) : ""; const topic = typeof body?.topic === "string" ? body.topic : "feedback"; const message = typeof body?.message === "string" ? body.message.trim().slice(0, 3000) : "";
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10 || !["feedback", "correction", "accessibility", "advertising"].includes(topic)) return NextResponse.json({ success: false, message: "Please complete every field with valid information." }, { status: 400 });
  const response = await fetch(`${url}/rest/v1/contact_messages`, { method: "POST", headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}`, "content-type": "application/json", prefer: "return=minimal" }, body: JSON.stringify({ name, email, topic, message }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ success: false, message: "The message could not be stored." }, { status: 502 });
  return NextResponse.json({ success: true }, { status: 201 });
}

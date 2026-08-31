import { NextResponse } from "next/server";
const message = "PNR email alerts are coming soon. No reminder request has been saved.";
export async function GET() { return NextResponse.json({ enabled: false, status: "coming_soon", message }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST() { return NextResponse.json({ success: false, code: "REMINDERS_PAUSED", message }, { status: 503, headers: { "Cache-Control": "no-store" } }); }

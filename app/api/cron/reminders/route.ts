import { NextRequest, NextResponse } from "next/server";
// Existing encrypted records are retained. No PNR polling or emails in this release.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ success: false }, { status: 401 });
  return NextResponse.json({ success: true, paused: true, checked: 0, notified: 0 }, { headers: { "Cache-Control": "no-store" } });
}

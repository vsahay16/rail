import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ provider: "RailKit", prediction: false, enabled: process.env.RAILKIT_ENABLED === "true", tools: ["pnr", "live", "schedule", "between", "availability", "fare", "station"], unavailable: ["prediction", "journey", "coach", "platform"] }, { headers: { "Cache-Control": "no-store" } });
}

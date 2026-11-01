import { supportedActions } from "@/lib/railkit-provider";
import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ provider: "RailKit", prediction: false, enabled: process.env.RAILKIT_ENABLED === "true", tools: supportedActions, unavailable: ["prediction", "journey"] }, { headers: { "Cache-Control": "no-store" } });
}

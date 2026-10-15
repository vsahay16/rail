import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({prediction:process.env.RAILRADAR_PREDICTION_ENABLED === "true"},{headers:{"Cache-Control":"no-store"}}); }

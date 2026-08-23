import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicRailPage } from "@/components/dynamic-rail-page";

export async function generateMetadata({ params }: { params: Promise<{ stationCode: string }> }): Promise<Metadata> {
  const { stationCode } = await params; const code = stationCode.toUpperCase();
  return { title: `${code} Station: Arrivals & Departures | RailSahayak`, description: `See arrivals, departures and available platform information for station ${code}.` };
}

export default async function StationPage({ params }: { params: Promise<{ stationCode: string }> }) {
  const { stationCode } = await params; const code = stationCode.toUpperCase();
  if (!/^[A-Z0-9]{2,6}$/.test(code)) notFound();
  return <DynamicRailPage mode="station" station={code} />;
}

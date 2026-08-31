import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicRailPage } from "@/components/dynamic-rail-page";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata({ params }: { params: Promise<{ stationCode: string }> }): Promise<Metadata> {
  const { stationCode } = await params; const code = stationCode.toUpperCase();
  return pageMetadata({ path: `/station/${code}`, title: `${code} Station: Arrivals & Departures`, titleHi: `${code} स्टेशन: आगमन और प्रस्थान`, description: `See arrivals, departures and available platform information for station ${code}.`, descriptionHi: `${code} स्टेशन पर ट्रेन आगमन, प्रस्थान और उपलब्ध प्लेटफॉर्म जानकारी देखें।` });
}

export default async function StationPage({ params }: { params: Promise<{ stationCode: string }> }) {
  const { stationCode } = await params; const code = stationCode.toUpperCase();
  if (!/^[A-Z0-9]{2,6}$/.test(code)) notFound();
  return <DynamicRailPage mode="station" station={code} />;
}

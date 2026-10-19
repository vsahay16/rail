import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicRailPage } from "@/components/dynamic-rail-page";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; trainNumber: string }> }): Promise<Metadata> {
  const { locale, trainNumber } = await params;
  return pageMetadata({ locale,  path: `/train/${trainNumber}`, title: `Train ${trainNumber}: Schedule & Live Status`, titleHi: `ट्रेन ${trainNumber}: समय-सारणी और लाइव स्थिति`, description: `Check timetable and live running information for train ${trainNumber}.`, descriptionHi: `ट्रेन ${trainNumber} की समय-सारणी और लाइव रनिंग जानकारी देखें।` });
}

export default async function TrainPage({ params }: { params: Promise<{ locale: string; trainNumber: string }> }) {
  const { trainNumber } = await params;
  if (!/^\d{5}$/.test(trainNumber)) notFound();
  return <DynamicRailPage mode="train" train={trainNumber} />;
}

export const dynamic = "force-dynamic";

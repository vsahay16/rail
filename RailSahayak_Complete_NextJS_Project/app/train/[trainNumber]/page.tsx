import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicRailPage } from "@/components/dynamic-rail-page";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ trainNumber: string }> }): Promise<Metadata> {
  const { trainNumber } = await params;
  return { title: `Train ${trainNumber}: Schedule & Live Status | RailSahayak`, description: `Check timetable and live running information for Indian Railways train ${trainNumber}.`, alternates: localizedAlternates(`/train/${trainNumber}`) };
}

export default async function TrainPage({ params }: { params: Promise<{ trainNumber: string }> }) {
  const { trainNumber } = await params;
  if (!/^\d{5}$/.test(trainNumber)) notFound();
  return <DynamicRailPage mode="train" train={trainNumber} />;
}

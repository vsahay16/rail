import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicRailPage } from "@/components/dynamic-rail-page";
import { pageMetadata } from "@/lib/request-seo";

function readRoute(value: string) { const match = /^([a-z0-9]{2,6})-to-([a-z0-9]{2,6})$/i.exec(value); return match ? { from: match[1].toUpperCase(), to: match[2].toUpperCase() } : null; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; route: string }> }): Promise<Metadata> {
  const { locale, route } = await params; const parsed = readRoute(route);
  return parsed ? pageMetadata({ locale,  path: `/trains/${parsed.from}-to-${parsed.to}`, title: `${parsed.from} to ${parsed.to} Trains`, titleHi: `${parsed.from} से ${parsed.to} की ट्रेनें`, description: `Find trains running between ${parsed.from} and ${parsed.to}.`, descriptionHi: `${parsed.from} और ${parsed.to} के बीच चलने वाली ट्रेनें खोजें।` }) : {};
}

export default async function RoutePage({ params }: { params: Promise<{ locale: string; route: string }> }) {
  const { route } = await params; const parsed = readRoute(route); if (!parsed) notFound();
  return <DynamicRailPage mode="route" from={parsed.from} to={parsed.to} />;
}

export const dynamic = "force-dynamic";

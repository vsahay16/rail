import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicRailPage } from "@/components/dynamic-rail-page";

function readRoute(value: string) { const match = /^([a-z0-9]{2,6})-to-([a-z0-9]{2,6})$/i.exec(value); return match ? { from: match[1].toUpperCase(), to: match[2].toUpperCase() } : null; }

export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route } = await params; const parsed = readRoute(route);
  return parsed ? { title: `${parsed.from} to ${parsed.to} Trains | RailSahayak`, description: `Find trains running between ${parsed.from} and ${parsed.to}.` } : {};
}

export default async function RoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params; const parsed = readRoute(route); if (!parsed) notFound();
  return <DynamicRailPage mode="route" from={parsed.from} to={parsed.to} />;
}

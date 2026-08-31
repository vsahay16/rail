import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideDetail } from "@/components/guide-detail";
import { getGuide, guides } from "@/lib/guide-registry";
import { pageMetadata } from "@/lib/request-seo";

export function generateStaticParams() { return guides.map((guide) => ({ topic: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> { const { topic } = await params; const guide = getGuide(topic); return guide ? pageMetadata({ path: `/guides/${guide.slug}`, title: `${guide.title} Guide`, titleHi: `${guide.titleHi} गाइड`, description: guide.description, descriptionHi: guide.descriptionHi }) : {}; }
export default async function GuidePage({ params }: { params: Promise<{ topic: string }> }) { const { topic } = await params; const guide = getGuide(topic); if (!guide) notFound(); return <GuideDetail guide={guide} />; }

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideDetail } from "@/components/guide-detail";
import { getGuide, guides } from "@/lib/guide-registry";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/seo";
import { contentRevision } from "@/lib/content-updates";
import { pageMetadata, requestLanguage } from "@/lib/request-seo";

export function generateStaticParams() { return guides.map((guide) => ({ topic: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> { const { topic } = await params; const guide = getGuide(topic); return guide ? pageMetadata({ path: `/guides/${guide.slug}`, title: `${guide.title} Guide`, titleHi: `${guide.titleHi} गाइड`, description: guide.description, descriptionHi: guide.descriptionHi }) : {}; }
export default async function GuidePage({ params }: { params: Promise<{ topic: string }> }) { const { topic } = await params; const guide = getGuide(topic); if (!guide) notFound(); const hi = await requestLanguage() === "hi";
  const path = `${hi ? "/hi" : ""}/guides/${guide.slug}`;
  const title = hi ? guide.titleHi : guide.title;
  return <><StructuredData data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", name: title, description: hi ? guide.descriptionHi : guide.description, url: absoluteUrl(path), inLanguage: hi ? "hi-IN" : "en-IN", dateModified: contentRevision },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "RailQ", item: absoluteUrl(hi ? "/hi" : "/") },
      { "@type": "ListItem", position: 2, name: hi ? "गाइड" : "Guides", item: absoluteUrl(`${hi ? "/hi" : ""}/guides`) },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(path) },
    ] },
  ] }} /><GuideDetail guide={guide} /></>; }

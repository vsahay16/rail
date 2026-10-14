import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideDetail } from "@/components/guide-detail";
import { TravelArticlePage } from "@/components/travel-article";
import { getTravelArticle } from "@/lib/travel-articles";
import { getGuide, guides } from "@/lib/guide-registry";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/seo";
import { contentRevision } from "@/lib/content-updates";
import { pageMetadata, requestLanguage } from "@/lib/request-seo";

export function generateStaticParams() { return guides.map((guide) => ({ topic: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const guide = getGuide(topic);
  if (!guide) return {};
  const meta = await pageMetadata({ path: `/guides/${guide.slug}`, title: guide.title, titleHi: guide.titleHi, description: guide.description, descriptionHi: guide.descriptionHi });
  const article = getTravelArticle(topic);
  if (!article) return meta;
  const hi = await requestLanguage() === "hi";
  const image = { url: absoluteUrl(`/images/travel-guides/${article.visual}-og.png`), width:1200, height:630, alt: hi ? guide.titleHi : guide.title };
  return { ...meta, openGraph: { ...meta.openGraph, type:"article", publishedTime:article.published, modifiedTime:article.updated, images:[image] }, twitter:{...meta.twitter, card:"summary_large_image", images:[image.url]} };
}
export default async function GuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params; const guide = getGuide(topic); if (!guide) notFound();
  const hi = await requestLanguage() === "hi"; const article = getTravelArticle(topic);
  const path = `${hi ? "/hi" : ""}/guides/${guide.slug}`;
  const title = hi ? guide.titleHi : guide.title;
  return <><StructuredData data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id":absoluteUrl(path)+"#webpage", name: title, description: hi ? guide.descriptionHi : guide.description, url: absoluteUrl(path), inLanguage: hi ? "hi-IN" : "en-IN", dateModified: guide.updated ?? contentRevision },
    ...(article ? [{"@type":"Article", "@id":absoluteUrl(path)+"#article", headline:title, description:hi?guide.descriptionHi:guide.description, mainEntityOfPage:{"@id":absoluteUrl(path)+"#webpage"}, inLanguage:hi?"hi-IN":"en-IN", datePublished:article.published, dateModified:article.updated, image:[absoluteUrl(`/images/travel-guides/${article.visual}-og.png`)], author:{"@type":"Organization",name:"RailQ",url:absoluteUrl("/about")}, publisher:{"@type":"Organization",name:"RailQ",url:absoluteUrl("/")}}] : []),
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "RailQ", item: absoluteUrl(hi ? "/hi" : "/") },
      { "@type": "ListItem", position: 2, name: hi ? "गाइड" : "Guides", item: absoluteUrl(`${hi ? "/hi" : ""}/guides`) },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(path) },
    ] },
  ] }} />{article ? <TravelArticlePage article={article} /> : <GuideDetail guide={guide} />}</>;
}

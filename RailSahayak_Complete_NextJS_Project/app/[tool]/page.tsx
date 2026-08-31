import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageClient } from "@/components/tool-page-client";
import { ContentPageClient } from "@/components/content-page-client";
import { StructuredData } from "@/components/structured-data";
import { contentPages, getContentPage } from "@/lib/content-registry";
import { getToolConfig, toolConfigs } from "@/lib/tool-registry";
import { absoluteUrl } from "@/lib/seo";
import { pageMetadata, requestLanguage } from "@/lib/request-seo";

export function generateStaticParams() { return [...toolConfigs.map((tool) => ({ tool: tool.slug })), ...contentPages.map((page) => ({ tool: page.slug }))]; }

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) return {};
  return pageMetadata({ path: `/${slug}`, title: config?.title ?? page!.eyebrow, titleHi: config?.titleHi ?? page!.eyebrowHi, description: config?.description ?? page!.description, descriptionHi: config?.descriptionHi ?? page!.descriptionHi });
}

export default async function GenericToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) notFound();
  const hi = await requestLanguage() === "hi";
  const path = `${hi ? "/hi" : ""}/${slug}`;
  const title = hi ? config?.titleHi ?? page!.eyebrowHi : config?.title ?? page!.eyebrow;
  const description = hi ? config?.descriptionHi ?? page!.descriptionHi : config?.description ?? page!.description;
  return <>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@graph": [
        { "@type": config ? "WebApplication" : "WebPage", name: title, description, url: absoluteUrl(path), inLanguage: hi ? "hi-IN" : "en-IN", ...(config ? { applicationCategory: "TravelApplication", operatingSystem: "Any" } : {}) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "RailQ", item: absoluteUrl(hi ? "/hi" : "/") },
          { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(path) },
        ] },
      ],
    }} />
    {config ? <ToolPageClient config={config} /> : <ContentPageClient page={page!} />}
  </>;
}

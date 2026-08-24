import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageClient } from "@/components/tool-page-client";
import { ContentPageClient } from "@/components/content-page-client";
import { StructuredData } from "@/components/structured-data";
import { contentPages, getContentPage } from "@/lib/content-registry";
import { getToolConfig, toolConfigs } from "@/lib/tool-registry";
import { absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() { return [...toolConfigs.map((tool) => ({ tool: tool.slug })), ...contentPages.map((page) => ({ tool: page.slug }))]; }

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) return {};
  if (page) return { title: `${page.eyebrow} | RailSahayak`, description: page.description, alternates: localizedAlternates(`/${page.slug}`) };
  if (!config) return {};
  return {
    title: `${config.title} | Indian Railway Tool | RailSahayak`,
    description: config.description,
    alternates: localizedAlternates(`/${config.slug}`),
    openGraph: { type: "website", url: `/${config.slug}`, title: `${config.title} | RailSahayak`, description: config.description },
  };
}

export default async function GenericToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) notFound();
  const path = `/${slug}`;
  const title = config?.title ?? page!.eyebrow;
  const description = config?.description ?? page!.description;
  return <>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@graph": [
        { "@type": config ? "WebApplication" : "WebPage", name: title, description, url: absoluteUrl(path), inLanguage: ["en-IN", "hi-IN"], ...(config ? { applicationCategory: "TravelApplication", operatingSystem: "Any" } : {}) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "RailSahayak", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(path) },
        ] },
      ],
    }} />
    {config ? <ToolPageClient config={config} /> : <ContentPageClient page={page!} />}
  </>;
}

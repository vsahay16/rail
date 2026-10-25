import { getSeoRollout } from "@/lib/seo-rollout";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageClient } from "@/components/tool-page-client";
import { ContentPageClient } from "@/components/content-page-client";
import { StructuredData } from "@/components/structured-data";
import { contentPages, getContentPage } from "@/lib/content-registry";
import { getToolConfig, toolConfigs } from "@/lib/tool-registry";
import { absoluteUrl } from "@/lib/seo";
import { pageMetadata } from "@/lib/request-seo";

export function generateStaticParams() { return [...toolConfigs.filter((tool) => tool.slug !== "pnr-status").map((tool) => ({ tool: tool.slug })), ...contentPages.map((page) => ({ tool: page.slug }))]; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; tool: string }> }): Promise<Metadata> {
  const { locale, tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) return {};
  return pageMetadata({ locale,  path: `/${slug}`, title: config?.title ?? page!.title, titleHi: config?.titleHi ?? page!.titleHi, description: config?.description ?? page!.description, descriptionHi: config?.descriptionHi ?? page!.descriptionHi });
}

export default async function GenericToolPage({ params }: { params: Promise<{ locale: string; tool: string }> }) {
  const { locale, tool: slug } = await params;
  const originalConfig = getToolConfig(slug);
  const originalPage = getContentPage(slug);
  const rollout = getSeoRollout(`/${slug}`, locale);
  const fields = rollout ? (locale === "hi" ? { ...(rollout.h1 ? { titleHi: rollout.h1 } : {}), descriptionHi: rollout.description } : { ...(rollout.h1 ? { title: rollout.h1 } : {}), description: rollout.description }) : {};
  const config = originalConfig ? { ...originalConfig, ...fields } : undefined;
  const page = originalPage ? { ...originalPage, ...fields } : undefined;
  if (!config && !page) notFound();
  const hi = locale === "hi";
  const path = `${hi ? "/hi" : ""}/${slug}`;
  const title = hi ? config?.titleHi ?? page!.titleHi : config?.title ?? page!.title;
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

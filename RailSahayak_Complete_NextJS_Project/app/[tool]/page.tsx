import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageClient } from "@/components/tool-page-client";
import { ContentPageClient } from "@/components/content-page-client";
import { contentPages, getContentPage } from "@/lib/content-registry";
import { getToolConfig, toolConfigs } from "@/lib/tool-registry";

export function generateStaticParams() { return [...toolConfigs.map((tool) => ({ tool: tool.slug })), ...contentPages.map((page) => ({ tool: page.slug }))]; }

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) return {};
  if (page) return { title: `${page.eyebrow} | RailSahayak`, description: page.description, alternates: { canonical: `/${page.slug}` } };
  if (!config) return {};
  return {
    title: `${config.title} | Indian Railway Tool | RailSahayak`,
    description: config.description,
    alternates: { canonical: `/${config.slug}` },
    openGraph: { type: "website", url: `/${config.slug}`, title: `${config.title} | RailSahayak`, description: config.description },
  };
}

export default async function GenericToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const config = getToolConfig(slug);
  const page = getContentPage(slug);
  if (!config && !page) notFound();
  return config ? <ToolPageClient config={config} /> : <ContentPageClient page={page!} />;
}

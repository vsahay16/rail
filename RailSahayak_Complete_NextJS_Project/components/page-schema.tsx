import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { siteUrl } from "@/lib/seo";

/** Describes the actual page, without ratings, authorship or rich-result promises. */
export function PageSchema({ metadata, locale, type = "WebPage" }: { metadata: Metadata; locale: string; type?: "WebPage" | "CollectionPage" | "WebApplication" }) {
  const url = String(metadata.alternates?.canonical ?? siteUrl);
  const name = typeof metadata.title === "string" ? metadata.title : "RailQ";
  return <StructuredData data={{ "@context": "https://schema.org", "@type": type, "@id": `${url}#webpage`, url, name, description: metadata.description, inLanguage: locale === "hi" ? "hi-IN" : "en-IN", isPartOf: { "@id": `${siteUrl}/#website` }, ...(type === "WebApplication" ? { applicationCategory: "TravelApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript" } : {}) }} />;
}

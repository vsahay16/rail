import { guides } from "@/lib/guide-registry";
import { toolConfigs } from "@/lib/tool-registry";
import { pageMetadata } from "@/lib/request-seo";
import { RailSearch, type SearchEntry } from "./rail-search";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const metadata = await pageMetadata({
    locale, path: "/search",
    title: "Search Railway Tools & Guides", titleHi: "रेलवे टूल्स और गाइड खोजें",
    description: "Find RailQ tools and travel guidance by topic or train number.",
    descriptionHi: "विषय या ट्रेन नंबर से RailQ टूल्स और यात्रा की जानकारी खोजें।",
  });
  return { ...metadata, robots: { index: false, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const hi = (await params).locale === "hi";
  const entries: SearchEntry[] = [
    ...toolConfigs.filter(tool => tool.slug !== "pnr-alerts").map(tool => ({
      href: `/${tool.slug}`, title: hi ? tool.titleHi : tool.title,
      description: hi ? tool.descriptionHi : tool.description, kind: "tool" as const,
    })),
    ...guides.map(guide => ({
      href: `/guides/${guide.slug}`, title: hi ? guide.titleHi : guide.title,
      description: hi ? guide.descriptionHi : guide.description, kind: "guide" as const,
    })),
  ];
  return <RailSearch entries={entries} hi={hi} />;
}

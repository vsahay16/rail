import type { Metadata } from "next";
import { metadataCopy } from "@/lib/metadata-copy";
import { headers } from "next/headers";
import { localizedAlternates } from "@/lib/seo";

export async function requestLanguage(): Promise<"en" | "hi"> {
  return (await headers()).get("x-railsahayak-language") === "hi" ? "hi" : "en";
}
export async function pageMetadata(input: { path: string; title: string; titleHi: string; description: string; descriptionHi: string }): Promise<Metadata> {
  const hi = await requestLanguage() === "hi";
  const copy = { ...input, ...metadataCopy[input.path] };
  const title = `${hi ? copy.titleHi : copy.title} | RailQ`;
  const description = hi ? copy.descriptionHi : copy.description;
  const alternates = localizedAlternates(input.path, hi ? "hi" : "en");
  return {
    title, description, alternates,
    openGraph: { type: "website", url: String(alternates.canonical), title, description, siteName: "RailQ", locale: hi ? "hi_IN" : "en_IN", alternateLocale: [hi ? "en_IN" : "hi_IN"], images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "RailQ — Indian Railway Tools by RailSahayak" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}

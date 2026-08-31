import type { MetadataRoute } from "next";
import { contentPages } from "@/lib/content-registry";
import { guides } from "@/lib/guide-registry";
import { toolConfigs } from "@/lib/tool-registry";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const paths = ["", "/tools", "/dashboard", "/guides", "/pnr-status", ...toolConfigs.filter((tool) => tool.slug !== "pnr-status").map((tool) => `/${tool.slug}`), ...guides.map((guide) => `/guides/${guide.slug}`), ...contentPages.map((page) => `/${page.slug}`)];
  return [...new Set(paths)].flatMap((path) => [
    { url: `${base}${path}`, changeFrequency: path === "" || path === "/railway-updates" ? "daily" as const : "weekly" as const, priority: path === "" ? 1 : path === "/tools" || path === "/pnr-status" ? .9 : .7 },
    { url: `${base}/hi${path}`, changeFrequency: path === "" || path === "/railway-updates" ? "daily" as const : "weekly" as const, priority: path === "" ? .9 : .6 },
  ]);
}

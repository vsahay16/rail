import type { MetadataRoute } from "next";
import { contentPages } from "@/lib/content-registry";
import { guides } from "@/lib/guide-registry";
import { toolConfigs } from "@/lib/tool-registry";
import { siteUrl, localizedAlternates } from "@/lib/seo";
import { contentRevision, updatedPaths } from "@/lib/content-updates";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/connecting-trains", "/tools", "/dashboard", "/guides", "/pnr-status", ...toolConfigs.map(tool => `/${tool.slug}`), ...guides.map(guide => `/guides/${guide.slug}`), ...contentPages.map(page => `/${page.slug}`)];
  return [...new Set(paths)].flatMap(path => {
    const languages = localizedAlternates(path || "/").languages as Record<string, string>;
    const calculatorUpdated = ["/coach-layout", "/seat-berth-finder", "/refund-calculator", "/cancellation-deadline-calculator", "/chart-preparation-calculator"].includes(path);
    const guideDate = guides.find(guide => path === `/guides/${guide.slug}`)?.updated;
    const shared = { alternates: { languages }, ...((calculatorUpdated || updatedPaths.has(path) || !!guideDate) ? { lastModified: calculatorUpdated ? "2026-10-13" : path === "/guides" ? "2026-10-15" : guideDate ?? contentRevision } : {}) };
    return [{ url: `${siteUrl}${path || "/"}`, ...shared }, { url: `${siteUrl}/hi${path}`, ...shared }];
  });
}


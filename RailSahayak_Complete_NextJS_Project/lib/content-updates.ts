import { pageGuidance } from "@/lib/page-guidance";
import { guides } from "@/lib/guide-registry";
export const contentRevision = "2026-10-04";
export const updatedPaths = new Set([
  "", "/terms", "/disclaimer", "/privacy", "/contact", "/advertise", "/about", "/methodology", "/corrections", "/official-services", "/alerts", "/blog", "/railway-updates", "/tools", ...Object.keys(pageGuidance).map(slug => `/${slug}`),
  ...guides.map(guide => `/guides/${guide.slug}`),
]);

import { pageGuidance } from "@/lib/page-guidance";
import { guides } from "@/lib/guide-registry";
export const contentRevision = "2026-10-03";
export const updatedPaths = new Set([
  "/tools", ...Object.keys(pageGuidance).map(slug => `/${slug}`),
  ...guides.map(guide => `/guides/${guide.slug}`),
]);

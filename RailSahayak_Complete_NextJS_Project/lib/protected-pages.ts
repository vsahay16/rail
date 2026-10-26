/** URL-level exclusions from the supplied Search Console export. */
export const protectedSeoPaths = new Set<string>([
  "/pnr-status",
  "/coach-layout",
  "/chart-preparation-calculator",
  "/guides/vikalp-and-alternate-routes",
  "/seat-berth-finder",
  "/guides/new-delhi-station-ajmeri-gate-paharganj",
  "/guides/partially-confirmed-family-ticket",
  "/",
  "/hi/pnr-status",
  "/guides/gnwl-rlwl-pqwl-tqwl-difference"
]);

export function mobileRefreshEnabled(path: string, language: string) {
  const base = path.replace(/^\/hi(?=\/|$)/, "").replace(/\/+$/, "") || "/";
  const key = language === "hi" ? `/hi${base === "/" ? "" : base}` : base;
  return !protectedSeoPaths.has(key);
}

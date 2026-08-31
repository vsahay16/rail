import type { Metadata } from "next";

function configuredOrigin() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://railq.in");
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return "https://railq.in";
    return url.origin;
  } catch { return "https://railq.in"; }
}
export const siteUrl = configuredOrigin();

export function localizedAlternates(path = "/", language: "en" | "hi" = path === "/hi" || path.startsWith("/hi/") ? "hi" : "en"): NonNullable<Metadata["alternates"]> {
  const clean = path.replace(/^\/hi(?=\/|$)/, "").replace(/^\/+|\/+$/g, "");
  const normalized = clean ? `/${clean}` : "";
  const en = absoluteUrl(normalized || "/");
  const hi = absoluteUrl(`/hi${normalized}`);
  return {
    canonical: language === "hi" ? hi : en,
    languages: {
      "en-IN": en,
      "hi-IN": hi,
      "x-default": en,
    },
  };
}

export function absoluteUrl(path = "/") { return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`; }

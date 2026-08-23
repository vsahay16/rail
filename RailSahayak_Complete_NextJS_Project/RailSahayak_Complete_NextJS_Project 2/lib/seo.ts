import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rail-inky.vercel.app").replace(/\/$/, "");

export function localizedAlternates(path = "/"): NonNullable<Metadata["alternates"]> {
  const normalized = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return {
    canonical: normalized || "/",
    languages: {
      "en-IN": normalized || "/",
      "hi-IN": `/hi${normalized || "/"}`,
      "x-default": normalized || "/",
    },
  };
}

export function absoluteUrl(path = "/") { return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`; }

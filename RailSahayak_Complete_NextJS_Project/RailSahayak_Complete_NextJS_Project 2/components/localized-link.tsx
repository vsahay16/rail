"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/components/language-provider";

export function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { language } = useLanguage();
  const localized = typeof href === "string" && href.startsWith("/") && !href.startsWith("/hi") && language === "hi" ? `/hi${href}` : href;
  return <NextLink href={localized} {...props} />;
}

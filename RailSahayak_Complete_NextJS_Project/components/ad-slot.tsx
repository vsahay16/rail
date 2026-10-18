"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/components/language-provider";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const slots = {
  top: process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT,
  square: process.env.NEXT_PUBLIC_ADSENSE_SQUARE_SLOT,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT,
};

export function AdSlot({ placement, format, className = "" }: { placement: keyof typeof slots; format: string; className?: string }) {
  const slotId = slots[placement];
  const { language } = useLanguage(); const hi = language === "hi";

  useEffect(() => {
    if (!adsenseClient || !slotId) return;
    trackEvent("ad_slot_view", { placement, format, configured: true });
    try { (window.adsbygoogle ||= []).push({}); } catch { /* The script retries after consent or load. */ }
  }, [format, placement, slotId]);

  if (adsenseClient && slotId) {
    return <aside className={`ad-slot live-ad ${className}`} aria-label={hi ? "विज्ञापन" : "Advertisement"}><span>{hi ? "विज्ञापन" : "Advertisement"}</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={adsenseClient} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
  }
  return null;
}

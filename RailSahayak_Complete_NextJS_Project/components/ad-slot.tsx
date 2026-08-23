"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const slots = {
  top: process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT,
  square: process.env.NEXT_PUBLIC_ADSENSE_SQUARE_SLOT,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT,
};

export function AdSlot({ placement, format, className = "" }: { placement: keyof typeof slots; format: string; className?: string }) {
  const slotId = slots[placement];

  useEffect(() => {
    trackEvent("ad_slot_view", { placement, format, configured: Boolean(adsenseClient && slotId) });
    if (!adsenseClient || !slotId) return;
    try { (window.adsbygoogle ||= []).push({}); } catch { /* The script retries after consent or load. */ }
  }, [format, placement, slotId]);

  if (adsenseClient && slotId) {
    return <aside className={`ad-slot live-ad ${className}`} aria-label="Advertisement"><span>Advertisement</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={adsenseClient} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
  }
  return <aside className={`ad-slot ${className}`} aria-label="Advertisement"><span>Advertisement</span><div><b>Ad space</b><small>{format} · responsive</small></div></aside>;
}

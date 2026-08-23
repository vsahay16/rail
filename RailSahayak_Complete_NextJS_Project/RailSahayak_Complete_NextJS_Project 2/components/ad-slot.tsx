"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { Icon } from "@/components/icon";
import { LocalizedLink as Link } from "@/components/localized-link";
import { useLanguage } from "@/components/language-provider";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const slots = {
  top: process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT,
  square: process.env.NEXT_PUBLIC_ADSENSE_SQUARE_SLOT,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT,
};

const housePromos = {
  top: { icon: "chart", title: "Plan the whole journey", titleHi: "पूरी यात्रा की योजना बनाएँ", text: "Status, timings, chart and official links on one screen.", textHi: "स्थिति, समय, चार्ट और आधिकारिक लिंक एक स्क्रीन पर।", href: "/dashboard", cta: "Open My Journey", ctaHi: "मेरी यात्रा खोलें" },
  square: { icon: "megaphone", title: "Partner with RailSahayak", titleHi: "RailSahayak के साथ साझेदारी", text: "Founding sponsorships for useful, traveller-safe brands.", textHi: "उपयोगी और यात्री-सुरक्षित ब्रांड के लिए शुरुआती साझेदारी।", href: "/advertise", cta: "See partner options", ctaHi: "साझेदारी विकल्प देखें" },
  bottom: { icon: "route", title: "Explore every railway tool", titleHi: "सभी रेलवे टूल देखें", text: "Find the right answer before booking, boarding or cancelling.", textHi: "बुकिंग, बोर्डिंग या रद्दीकरण से पहले सही जवाब पाएँ।", href: "/tools", cta: "View all tools", ctaHi: "सभी टूल देखें" },
} as const;

export function AdSlot({ placement, format, className = "" }: { placement: keyof typeof slots; format: string; className?: string }) {
  const slotId = slots[placement];
  const { language } = useLanguage(); const hi = language === "hi"; const promo = housePromos[placement];

  useEffect(() => {
    trackEvent("ad_slot_view", { placement, format, configured: Boolean(adsenseClient && slotId) });
    if (!adsenseClient || !slotId) return;
    try { (window.adsbygoogle ||= []).push({}); } catch { /* The script retries after consent or load. */ }
  }, [format, placement, slotId]);

  if (adsenseClient && slotId) {
    return <aside className={`ad-slot live-ad ${className}`} aria-label="Advertisement"><span>Advertisement</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={adsenseClient} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
  }
  return <aside className={`ad-slot house-promo house-${placement} ${className}`} aria-label={hi ? "आरक्षित साझेदारी स्थान" : "Reserved partnership space"}>
    <span>{hi ? "आरक्षित साझेदारी स्थान · अभी कोई विज्ञापन नहीं" : "Reserved partner space · no paid ad running"}</span>
    <div className="house-promo-inner"><i><Icon name={promo.icon} size={18} /></i><div><b>{hi ? promo.titleHi : promo.title}</b><small>{hi ? promo.textHi : promo.text}</small></div><Link href={promo.href}>{hi ? promo.ctaHi : promo.cta}<Icon name="arrow" size={14} /></Link></div>
    <small className="house-format">{format}</small>
  </aside>;
}

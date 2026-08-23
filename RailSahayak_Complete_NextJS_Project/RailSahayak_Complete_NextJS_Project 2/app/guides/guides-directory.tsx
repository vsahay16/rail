"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { guides } from "@/lib/guide-registry";

export function GuidesDirectory() {
  const { language } = useLanguage(); const hi = language === "hi";
  return <main className="guides-page"><section className="content-hero"><span className="kicker">{hi ? "रेलवे यात्रा लाइब्रेरी" : "Railway travel library"}</span><h1>{hi ? "सही जानकारी के साथ" : "Travel with"}<br /><em>{hi ? "बेहतर यात्रा करें।" : "better context."}</em></h1><p>{hi ? "बुकिंग से बोर्डिंग तक व्यावहारिक गाइड—सरल हिंदी और English में, आधिकारिक सत्यापन के साथ।" : "Practical guidance from booking to boarding, in simple English and हिंदी, with clear official verification."}</p></section><AdSlot placement="top" format="970 × 90 / 320 × 100" /><section className="guide-directory-grid">{guides.map((guide, index) => <Link href={`/guides/${guide.slug}`} key={guide.slug}><span className="guide-number">{String(index + 1).padStart(2, "0")}</span><span className="guide-icon"><Icon name={guide.icon} /></span><h2>{hi ? guide.titleHi : guide.title}</h2><p>{hi ? guide.descriptionHi : guide.description}</p><span className="guide-read">{hi ? "गाइड पढ़ें" : "Read guide"}<Icon name="arrow" size={15} /></span></Link>)}</section></main>;
}

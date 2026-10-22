"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
import { getTravelArticle } from "@/lib/travel-articles";
import { guides } from "@/lib/guide-registry";

export function GuidesDirectory() {
  const { language } = useLanguage(); const hi = language === "hi";
  return <main className="guides-page"><section className="content-hero"><span className="kicker">{hi ? "विषय के अनुसार जानकारी" : "Browse by topic"}</span><h1>{hi ? "रेल यात्रा गाइड" : "Railway travel guides"}</h1><p>{hi ? "टिकट की स्थिति, बुकिंग, कोच और स्टेशन की यात्रा समझने के लिए विषय चुनें। हर गाइड में उपयोगी अगले कदम और जहाँ लागू हो आधिकारिक स्रोत के लिंक मिलेंगे।" : "Choose a topic to understand ticket status, booking, coaches or station travel. Each guide explains practical next steps and links to official sources where relevant."}</p><nav className="hub-tool-links" aria-label={hi ? "यात्रा की जानकारी जाँचें" : "Check your journey"}><Link href="/trains-between-stations">{hi ? "स्टेशनों के बीच ट्रेनें खोजें" : "Find trains between stations"}</Link><Link href="/train-schedule">{hi ? "निर्धारित ठहराव और समय देखें" : "Check scheduled stops and times"}</Link><Link href="/live-train-status">{hi ? "लाइव ट्रेन स्थिति देखें" : "Check live train status"}</Link></nav></section><AdSlot placement="top" format="970 × 90 / 320 × 100" /><section className="guide-directory-grid">{guides.map((guide, index) => <Link href={`/guides/${guide.slug}`} key={guide.slug}>{getTravelArticle(guide.slug) && <Image src={`/images/travel-guides/${getTravelArticle(guide.slug)!.visual}-${hi ? "hi" : "en"}.svg`} width={1200} height={630} unoptimized alt="" sizes="(max-width: 700px) 100vw, 33vw" style={{width:"100%",height:"auto",borderRadius:12,marginBottom:16}} />}<span className="guide-number">{String(index + 1).padStart(2, "0")}</span><span className="guide-icon"><Icon name={guide.icon} /></span><h2>{hi ? guide.titleHi : guide.title}</h2><p>{hi ? guide.descriptionHi : guide.description}</p><span className="guide-read">{hi ? "गाइड पढ़ें" : "Read guide"}<Icon name="arrow" size={15} /></span></Link>)}</section></main>;
}

"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { ToolEngine } from "@/components/tool-engine";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import type { ToolConfig } from "@/lib/tool-registry";

export function ToolPageClient({ config }: { config: ToolConfig }) {
  const { language } = useLanguage();
  const hi = language === "hi";
  const title = hi ? config.titleHi : config.title;
  const description = hi ? config.descriptionHi : config.description;

  useEffect(() => { trackEvent("tool_page_view", { tool: config.slug, language }); }, [config.slug, language]);

  return <main className="generic-tool-page">
    <section className="generic-tool-hero"><nav className="breadcrumbs"><Link href="/">{hi ? "होम" : "Home"}</Link><span>/</span><Link href="/tools">{hi ? "टूल्स" : "Tools"}</Link><span>/</span><span>{title}</span></nav><div className="generic-tool-intro"><span className="kicker"><Icon name={config.icon} size={17} />{config.live ? (hi ? "लाइव डेटा टूल" : "Live-data tool") : (hi ? "स्मार्ट यात्रा कैलकुलेटर" : "Smart journey calculator")}</span><h1>{title}</h1><p>{description}</p><div><span><Icon name="shield" size={16} />{hi ? "गोपनीयता पहले" : "Privacy first"}</span><span><Icon name="globe" size={16} />{hi ? "हिंदी और English" : "English and हिंदी"}</span></div></div><ToolEngine tool={config} /></section>

    <AdSlot placement="top" format="970 × 90 / 320 × 100" className="tool-page-ad" />

    <section className="generic-explainer"><div><span className="kicker">{hi ? "साफ़ और जिम्मेदार" : "Clear and responsible"}</span><h2>{hi ? "सही उत्तर के साथ सही संदर्भ।" : "The answer, with the context that matters."}</h2></div><div className="generic-explainer-grid"><article><span>01</span><h3>{hi ? "जानकारी पहले" : "Answer first"}</h3><p>{hi ? "मुख्य परिणाम विज्ञापन या लंबे विवरण से पहले दिखाई देता है।" : "The primary result appears before advertising or long explanations."}</p></article><article><span>02</span><h3>{hi ? "विश्वसनीयता दिखाई देती है" : "Confidence is visible"}</h3><p>{hi ? "अनुमान, प्रदाता डेटा और आधिकारिक सत्यापन को अलग-अलग दिखाया जाता है।" : "Estimates, provider data and official verification are clearly distinguished."}</p></article><article><span>03</span><h3>{hi ? "संवेदनशील डेटा सुरक्षित" : "Sensitive data protected"}</h3><p>{hi ? "PNR और यात्री जानकारी एनालिटिक्स में नहीं भेजी जाती।" : "PNR and passenger information are excluded from analytics."}</p></article></div></section>

    <section className="generic-official-note"><span><Icon name="shield" size={24} /></span><div><h2>{hi ? "महत्वपूर्ण जानकारी आधिकारिक माध्यम से सत्यापित करें" : "Verify important information through official channels"}</h2><p>{hi ? "RailSahayak एक स्वतंत्र यात्रा सुविधा है। लाइव परिणाम प्रदाता की उपलब्धता पर निर्भर करते हैं और रेलवे का आधिकारिक रिकॉर्ड अंतिम मान्य स्रोत है।" : "RailSahayak is an independent travel utility. Live results depend on provider availability, and the official railway record remains the final authority."}</p></div><a href="https://www.indianrail.gov.in/" target="_blank" rel="noreferrer">{hi ? "आधिकारिक पूछताछ" : "Official enquiry"}<Icon name="external" size={15} /></a></section>

    <section className="generic-related"><div><span className="kicker light">{hi ? "और उपयोगी टूल्स" : "More useful tools"}</span><h2>{hi ? "अपनी यात्रा आगे बढ़ाएँ" : "Continue planning your journey"}</h2></div><div><Link href="/pnr-status"><Icon name="ticket" size={18} />{hi ? "PNR स्थिति" : "PNR status"}<Icon name="arrow" size={15} /></Link><Link href="/live-train-status"><Icon name="pulse" size={18} />{hi ? "लाइव ट्रेन" : "Live train"}<Icon name="arrow" size={15} /></Link><Link href="/dashboard"><Icon name="chart" size={18} />{hi ? "यात्रा डैशबोर्ड" : "Journey dashboard"}<Icon name="arrow" size={15} /></Link></div></section>
  </main>;
}

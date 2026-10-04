"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { PageGuidance } from "@/components/page-guidance";
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
    <section className="generic-tool-hero"><nav className="breadcrumbs"><Link href="/">{hi ? "होम" : "Home"}</Link><span>/</span><Link href="/tools">{hi ? "टूल्स" : "Tools"}</Link><span>/</span><span>{title}</span></nav><div className="generic-tool-intro"><span className="kicker"><Icon name={config.icon} size={17} />{config.slug === "pnr-alerts" ? (hi ? "जल्द आ रहा है" : "Coming soon") : config.live ? (hi ? "लाइव डेटा टूल" : "Live-data tool") : (hi ? "स्मार्ट यात्रा कैलकुलेटर" : "Smart journey calculator")}</span><h1>{title}</h1><p>{description}</p><div><span><Icon name="shield" size={16} />{hi ? "गोपनीयता पहले" : "Privacy first"}</span><span><Icon name="globe" size={16} />{hi ? "हिंदी और English" : "English and हिंदी"}</span></div></div><ToolEngine tool={config} /></section>

    <AdSlot placement="top" format="970 × 90 / 320 × 100" className="tool-page-ad" />

    <PageGuidance slug={config.slug} />

    <section className="generic-official-note"><span><Icon name="shield" size={24} /></span><div><h2>{hi ? "आधिकारिक रिकॉर्ड पर पुष्टि करें" : "Confirm with the official railway record"}</h2><p>{hi ? "RailQ एक स्वतंत्र यात्रा सुविधा है। लाइव परिणाम प्रदाता की उपलब्धता पर निर्भर करते हैं और रेलवे का आधिकारिक रिकॉर्ड अंतिम मान्य स्रोत है।" : "RailQ is an independent travel utility. Live results depend on provider availability, and the official railway record remains the final authority."}</p></div><a href="https://www.indianrail.gov.in/" target="_blank" rel="noreferrer">{hi ? "आधिकारिक पूछताछ" : "Official enquiry"}<Icon name="external" size={15} /></a></section>

    <section className="generic-related"><div><span className="kicker light">{hi ? "और उपयोगी टूल्स" : "More useful tools"}</span><h2>{hi ? "अगला कदम चुनें" : "Choose your next step"}</h2></div><div><Link href="/pnr-status"><Icon name="ticket" size={18} />{hi ? "PNR स्थिति" : "PNR status"}<Icon name="arrow" size={15} /></Link><Link href="/live-train-status"><Icon name="pulse" size={18} />{hi ? "लाइव ट्रेन" : "Live train"}<Icon name="arrow" size={15} /></Link><Link href="/dashboard"><Icon name="chart" size={18} />{hi ? "यात्रा डैशबोर्ड" : "Journey dashboard"}<Icon name="arrow" size={15} /></Link></div></section>
  </main>;
}

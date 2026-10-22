"use client";
import styles from "./tool-support.module.css";
import { CoachToolChooser } from "./coach-tool-chooser";
import { PageFeedback } from "./page-feedback";
import { TopicPath } from "@/components/topic-path";
import { TrainComparison } from "@/components/train-comparison";

import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { PageGuidance } from "@/components/page-guidance";
import { BerthTools } from "@/components/berth-tools";
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
    <section className={`generic-tool-hero${config.slug === "trains-between-stations" ? " route-search-hero" : ""}`}><nav className="breadcrumbs"><Link href="/">{hi ? "होम" : "Home"}</Link><span>/</span><Link href="/tools">{hi ? "टूल्स" : "Tools"}</Link><span>/</span><span>{title}</span></nav><div className="generic-tool-intro"><span className="kicker"><Icon name={config.icon} size={17} />{config.slug === "pnr-alerts" ? (hi ? "जल्द आ रहा है" : "Coming soon") : config.live ? (hi ? "लाइव डेटा टूल" : "Live-data tool") : (hi ? "स्मार्ट यात्रा कैलकुलेटर" : "Smart journey calculator")}</span><h1>{title}</h1><p>{description}</p><div><span><Icon name="shield" size={16} />{hi ? "गोपनीयता पहले" : "Privacy first"}</span><span><Icon name="globe" size={16} />{hi ? "हिंदी और English" : "English and हिंदी"}</span></div><CoachToolChooser slug={config.slug} hi={hi} /></div>{config.slug === "coach-layout" || config.slug === "seat-berth-finder" ? <BerthTools hi={hi} finder={config.slug === "seat-berth-finder"} /> : <ToolEngine key={config.slug} tool={config} />}</section>

    <AdSlot placement="top" format="970 × 90 / 320 × 100" className="tool-page-ad" />

    {["seat-availability", "trains-between-stations"].includes(config.slug) && <details className={styles.optional}>
      <summary>{hi ? "ट्रेनें चुन ली हैं? सीट और किराए की तुलना करें" : "Shortlisted your trains? Compare seats and fares"}</summary>
      <TrainComparison hi={hi} />
    </details>}
    <PageGuidance slug={config.slug} />
    <TopicPath slug={config.slug} expandable />
    <p className={styles.verification}>{config.live
      ? (hi ? "RailQ स्वतंत्र है। प्रदाता की जानकारी बदल सकती है।" : "RailQ is independent. Provider information can change.")
      : (hi ? "यह योजना बनाने की सहायता है। लागू नियम और अंतिम जानकारी सत्यापित करें।" : "This is a planning aid. Verify applicable rules and final journey details.")}{" "}<a href="https://www.indianrail.gov.in/" target="_blank" rel="noopener noreferrer">{hi ? "आधिकारिक रेलवे पूछताछ" : "Official railway enquiry"}</a>{" · "}<Link href="/official-services">{hi ? "अन्य आधिकारिक सेवाएँ" : "More official services"}</Link></p>
    <PageFeedback page={`/${config.slug}`} hi={hi} />

  </main>;
}



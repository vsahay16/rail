"use client";
import { PageFeedback } from "@/components/page-feedback";
import { TopicPath } from "@/components/topic-path";
import { useLanguage } from "@/components/language-provider";
import { LocalizedLink as Link } from "@/components/localized-link";
import styles from "./planner.module.css";

export function JourneyPlanner({ heading, intro }: { heading?: string; intro?: string }) {
  const { language } = useLanguage();
  const hi = language === "hi";
  const t = (en: string, hindi: string) => hi ? hindi : en;
  return <main data-mobile-refresh className={`${styles.page} mobile-planner`}>
    <nav className={styles.links}><Link href="/tools">{t("Railway tools", "रेलवे टूल्स")}</Link><span>/</span><span>{t("Connecting trains", "कनेक्टिंग ट्रेनें")}</span></nav>
    <header className={styles.hero}><span className={styles.kicker}>{t("More ways to reach your destination", "मंज़िल तक पहुँचने के और रास्ते")}</span><h1>{heading ?? t("Find your next connection.", "अगली ट्रेन का कनेक्शन खोजें।")}</h1><p>{intro ?? t("Search direct trains and check transfer time before booking a journey that requires a change.", "सीधी ट्रेनें खोजें और ट्रेन बदलने वाली यात्रा बुक करने से पहले ट्रांसफर का समय जाँचें।")}</p></header>
    <section className={styles.panel} aria-labelledby="journey-search">
      <h2 id="journey-search">{t("Search for direct trains", "सीधी ट्रेनें खोजें")}</h2>
      <p>{t("Automatic connecting-route search is currently unavailable. Search between two stations to find a direct train, or check each leg separately if you plan to change trains.", "कनेक्टिंग मार्ग की स्वचालित खोज अभी उपलब्ध नहीं है। सीधी ट्रेन के लिए दो स्टेशनों के बीच खोजें। ट्रेन बदलनी हो तो यात्रा का हर हिस्सा अलग से जाँचें।")}</p>
      <Link className="primary-next-step" href="/trains-between-stations">{t("Find direct trains", "सीधी ट्रेनें खोजें")}</Link>
    </section>
    <PageFeedback page="/connecting-trains" hi={hi} />
    <TopicPath slug="connecting-trains" />
    <section className={styles.panel}><h2>{t("Before you book two trains", "दो ट्रेनें बुक करने से पहले")}</h2><ul><li>{t("Read the arrival date as well as the clock time, especially after midnight.", "आधी रात के बाद खासकर घड़ी के साथ आगमन तारीख भी पढ़ें।")}</li><li>{t("A city can have several railway stations. Match the codes, not just the city name.", "एक शहर में कई स्टेशन हो सकते हैं। शहर के नाम के साथ स्टेशन कोड मिलाएँ।")}</li><li>{t("Compare the scheduled gap with current running information and allow extra time for transfers.", "निर्धारित समय अंतर की तुलना लाइव स्थिति से करें और ट्रेन बदलने के लिए अतिरिक्त समय रखें।")}</li><li>{t("If the first train is late, check both services again and seek official assistance before changing bookings.", "पहली ट्रेन लेट हो तो दोनों ट्रेनों की जानकारी फिर जाँचें और बुकिंग बदलने से पहले आधिकारिक सहायता लें।")}</li></ul><nav className={styles.links}><Link href="/guides/vikalp-and-alternate-routes">{t("Compare alternatives and connections", "विकल्प और कनेक्शन समझें")}</Link><Link href="/connection-buffer-calculator">{t("Plan your transfer buffer", "ट्रांसफर समय की योजना बनाएँ")}</Link><Link href="/guides/pnr-confirmation-probability">{t("Understand confirmation estimates", "कन्फर्मेशन अनुमान समझें")}</Link></nav></section>
  </main>;
}



"use client";
import { JourneyVideo } from "@/components/journey-video";
import { TopicPath } from "@/components/topic-path";
import { FormEvent, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { LocalizedLink as Link } from "@/components/localized-link";
import { StationInput } from "@/components/station-input";
import { railError } from "@/lib/rail-data";
import { trackEvent } from "@/lib/analytics";
import type { JourneyOption } from "@/lib/connecting-journeys";
import styles from "./planner.module.css";

export function JourneyPlanner() {
  const { language } = useLanguage(); const hi = language === "hi";
  const t = (en: string, hindi: string) => hi ? hindi : en;
  const [from, setFrom] = useState(""), [to, setTo] = useState(""), [date, setDate] = useState(""), [minimum, setMinimum] = useState(120);
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [result, setResult] = useState<{ options: JourneyOption[]; omitted: number; cached: boolean; fetched: string; label: string } | null>(null);
  const lock = useRef(false);
  const duration = (minutes: number) => `${Math.floor(minutes / 60)} ${t("h", "घं")} ${minutes % 60} ${t("min", "मि")}`;
  async function submit(event: FormEvent) {
    event.preventDefault(); if (lock.current) return;
    setError(""); setResult(null);
    const start = from.trim().toUpperCase(), end = to.trim().toUpperCase();
    if (!/^[A-Z0-9]{2,6}$/.test(start) || !/^[A-Z0-9]{2,6}$/.test(end) || start === end || !date) { setError(t("Choose two different station codes and a departure date.", "दो अलग स्टेशन कोड और प्रस्थान तारीख चुनें।")); return; }
    lock.current = true; setBusy(true); trackEvent("journey_plan_requested", { language });
    try {
      const response = await fetch("/api/journey-plan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ from: start, to: end, date, minimum }), cache: "no-store", signal: AbortSignal.timeout(25000) });
      const payload = await response.json();
      if (!response.ok || !payload.success) { setError(railError(payload, hi).message); trackEvent("journey_plan_result", { language, outcome: "unavailable" }); return; }
      setResult({ options: payload.options, omitted: payload.omitted, cached: payload.railq?.cached === true, fetched: payload.railq?.fetchedAt ?? "", label: `${start} → ${end} · ${date} · ${duration(minimum)}` });
      trackEvent("journey_plan_result", { language, outcome: payload.options.length ? "success" : "empty" });
    } catch { setError(t("The search could not finish. Your inputs are still here. Please try later.", "खोज पूरी नहीं हुई। आपकी जानकारी फॉर्म में है। कुछ देर बाद कोशिश करें।")); }
    finally { lock.current = false; setBusy(false); }
  }
  return <main className={styles.page}>
    <nav className={styles.links}><Link href="/tools">{t("Railway tools", "रेलवे टूल्स")}</Link><span>/</span><span>{t("Connecting trains", "कनेक्टिंग ट्रेनें")}</span></nav>
    <header className={styles.hero}><span className={styles.kicker}>{t("More ways to reach your destination", "मंज़िल तक पहुँचने के और रास्ते")}</span><h1>{t("Find your next connection.", "अगली ट्रेन का कनेक्शन खोजें।")}</h1><p>{t("Compare direct trains and journeys with one change. See every train, travel date and transfer gap before deciding what to book.", "सीधी ट्रेन और एक बार ट्रेन बदलने वाले मार्ग देखें। बुकिंग तय करने से पहले हर ट्रेन, यात्रा तारीख और बीच का समय जाँचें।")}</p></header>
    <section className={styles.panel} aria-labelledby="journey-search"><h2 id="journey-search">{t("Where are you travelling?", "आप कहाँ जा रहे हैं?")}</h2><form onSubmit={submit}><fieldset disabled={busy} className={styles.fields}>
      <label>{t("From station", "कहाँ से")}<StationInput value={from} onChange={setFrom} hi={hi} name="from" /></label>
      <label>{t("To station", "कहाँ तक")}<StationInput value={to} onChange={setTo} hi={hi} name="to" /></label>
      <label>{t("Departure date at your station", "आपके स्टेशन से प्रस्थान तारीख")}<input type="date" required value={date} onChange={e => setDate(e.target.value)} /></label>
      <label>{t("Minimum time between trains", "ट्रेनों के बीच न्यूनतम समय")}<select value={minimum} onChange={e => setMinimum(Number(e.target.value))}>{[120,180,240].map(m => <option key={m} value={m}>{duration(m)}</option>)}</select></label>
      <button className={styles.button} type="submit">{busy ? t("Finding routes…", "मार्ग खोज रहे हैं…") : t("Find direct & connecting trains", "सीधी और कनेक्टिंग ट्रेनें खोजें")}</button>
    </fieldset></form><p className={styles.note}>{t("Times are in IST. The transfer margin is a planning preference, not an official minimum or a guarantee. Allow more time for luggage, children, mobility needs or a station change.", "समय भारतीय मानक समय में हैं। चुना अंतर आपकी योजना की पसंद है, आधिकारिक न्यूनतम समय या गारंटी नहीं। सामान, बच्चों, चलने-फिरने की जरूरत या स्टेशन बदलने के लिए अधिक समय रखें।")}</p></section>
    <div aria-live="polite" aria-busy={busy}>{busy && <p>{t("Checking timetable routes. Seats and fares are checked separately.", "समय-सारणी के मार्ग देख रहे हैं। सीट और किराया अलग जाँचे जाते हैं।")}</p>}{error && <p role="alert" className={styles.warning}>{error}</p>}
    {result && <section className={styles.results}><h2>{t("Your route options", "आपके मार्ग विकल्प")}</h2><p>{result.label}</p><small>{result.cached ? t("Recent timetable result", "हाल का समय-सारणी परिणाम") : t("Timetable result from RailRadar", "RailRadar से समय-सारणी परिणाम")}{result.fetched && ` · ${new Date(result.fetched).toLocaleString(hi ? "hi-IN" : "en-IN", { timeZone: "Asia/Kolkata" })} IST`}</small>
      <p className={styles.warning}>{t("A route is not a reservation. Check seats and fares for every leg before payment. RailQ does not book, link PNRs or guarantee missed-connection refunds.", "मार्ग मिलना आरक्षण नहीं है। भुगतान से पहले हर ट्रेन की सीट और किराया जाँचें। RailQ बुकिंग, PNR लिंक या कनेक्शन छूटने पर रिफंड की गारंटी नहीं देता।")}</p>
      {!result.options.length && <div className={styles.panel}><h3>{t("No complete routes to show", "दिखाने के लिए पूरा मार्ग नहीं मिला")}</h3><p>{t("This does not mean all trains are sold out. The provider may have no matching route or may have returned incomplete timings. Try another date or search direct trains separately.", "इसका मतलब सभी सीटें खत्म होना नहीं है। प्रदाता को मार्ग नहीं मिला हो सकता है या समय अधूरा हो सकता है। दूसरी तारीख या सीधी ट्रेनों की अलग खोज करें।")}</p><Link href="/trains-between-stations">{t("Search direct trains", "सीधी ट्रेनें खोजें")}</Link></div>}
      {result.options.map((option, index) => <article className={styles.card} key={index}><div className={styles.cardHead}><h3>{option.legs.length === 1 ? t("Direct train", "सीधी ट्रेन") : t("One train change", "एक बार ट्रेन बदलें")}</h3><strong>{duration(option.duration)}</strong></div>
        <ol className={styles.legs}>{option.legs.map((leg, i) => <li key={i}>
          {i > 0 && <div className={styles.transfer}><strong>{t("Transfer gap", "ट्रेन बदलने का समय")}: {duration(option.gaps[i-1])}</strong><p>{option.stationChanges[i-1] ? t(`Station change: ${option.legs[i-1].to} → ${leg.from}. Arrange ground transport and check its travel time.`, `स्टेशन बदलना है: ${option.legs[i-1].to} → ${leg.from}। सड़क परिवहन और उसमें लगने वाला समय जाँचें।`) : t(`Change trains at ${leg.from}. Confirm platforms at the station.`, `${leg.from} पर ट्रेन बदलें। स्टेशन पर प्लेटफॉर्म की पुष्टि करें।`)}</p></div>}
          <h4>{leg.train} · {leg.name || t("Train", "ट्रेन")}</h4><div className={styles.route}><div><b>{leg.departure}</b><span>{leg.departureDate}</span><strong>{leg.fromName || leg.from} ({leg.from})</strong></div><span aria-hidden="true">→</span><div><b>{leg.arrival}</b><span>{leg.arrivalDate}</span><strong>{leg.toName || leg.to} ({leg.to})</strong></div></div>
          <nav className={styles.links}><Link href={`/train-schedule?train=${leg.train}`}>{t("Timetable", "समय-सारणी")}</Link><Link href={`/live-train-status?train=${leg.train}`}>{t("Check live running", "लाइव स्थिति देखें")}</Link><Link href={`/seat-availability?train=${leg.train}&from=${leg.from}&to=${leg.to}&date=${leg.departureDate}`}>{t("Check seats for this leg", "इस ट्रेन की सीट जाँचें")}</Link></nav>
        </li>)}</ol></article>)}
      {result.omitted > 0 && <p className={styles.note}>{t("Some options were omitted because dates, timings or transfer margins could not be verified. This is not an exhaustive list of every possible route.", "कुछ विकल्पों की तारीख, समय या ट्रांसफर अंतर सत्यापित नहीं हुआ, इसलिए वे नहीं दिखाए गए। यह हर संभव मार्ग की पूरी सूची नहीं है।")}</p>}
    </section>}</div>
    <JourneyVideo topic="connecting-trains" />
    <TopicPath slug="connecting-trains" />
    <section className={styles.panel}><h2>{t("Before you book two trains", "दो ट्रेनें बुक करने से पहले")}</h2><ul><li>{t("Read the arrival date as well as the clock time, especially after midnight.", "आधी रात के बाद खासकर घड़ी के साथ आगमन तारीख भी पढ़ें।")}</li><li>{t("A city can have several railway stations. Match the codes, not just the city name.", "एक शहर में कई स्टेशन हो सकते हैं। शहर के नाम के साथ स्टेशन कोड मिलाएँ।")}</li><li>{t("The displayed gap is scheduled time, not a live delay-adjusted guarantee.", "दिखाया अंतर समय-सारणी के अनुसार है, लाइव देरी के आधार पर गारंटी नहीं।")}</li><li>{t("If the first train is late, check both services again and seek official assistance before changing bookings.", "पहली ट्रेन लेट हो तो दोनों ट्रेनों की जानकारी फिर जाँचें और बुकिंग बदलने से पहले आधिकारिक सहायता लें।")}</li></ul><nav className={styles.links}><Link href="/guides/vikalp-and-alternate-routes">{t("Compare alternatives and connections", "विकल्प और कनेक्शन समझें")}</Link><Link href="/connection-buffer-calculator">{t("Plan your transfer buffer", "ट्रांसफर समय की योजना बनाएँ")}</Link><Link href="/guides/pnr-confirmation-probability">{t("Understand confirmation estimates", "कन्फर्मेशन अनुमान समझें")}</Link></nav></section>
  </main>;
}



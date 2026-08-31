"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { LocalizedLink as Link } from "@/components/localized-link";
import { Language, useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import { pnrSummary, liveSummary, railData, rows, railRequest, railError } from "@/lib/rail-data";

type SearchTab = "pnr" | "live" | "between" | "booking";
type SearchResult = {
  tone: "success" | "warning" | "error";
  eyebrow: string;
  title: string;
  description: string;
  details?: Array<{ label: string; value: string }>;
};

const copy = {
  en: {
    badge: "Independent railway travel utility", titleA: "Every railway answer.", titleB: "One simple journey.",
    intro: "Check the details that matter before you book, while you wait, and until you arrive—without jumping between five different websites.",
    pnr: "PNR status", live: "Live train", between: "Between stations", booking: "Booking date",
    pnrPlaceholder: "Enter 10-digit PNR", trainPlaceholder: "Train number, e.g. 12951",
    fromPlaceholder: "From station code, e.g. NDLS", toPlaceholder: "To station code, e.g. MMCT", journeyDate: "Journey date",
    checkPnr: "Check PNR", trackTrain: "Track train", findTrains: "Find trains", calculate: "Calculate date",
    privacy: "Your PNR is never saved in analytics", updated: "Live provider-ready", noLogin: "No login for quick tools",
    train: "Train", from: "From", to: "To", liveConnection: "Live data connection",
    officialNote: "Independent service · Always verify critical information with official railway channels",
    toolsKicker: "Everything in one place", toolsTitle: "Rail tools for every moment of your journey", toolsDescription: "Fast answers first. Clear explanations when you need them.", openTool: "Open tool",
    journeyKicker: "Coming together as one flow", journeyTitle: "Your entire train journey on one calm screen.", journeyDescription: "Save a journey once and RailQ can bring together live status, chart timing, coach information and useful alerts.", journeyCta: "Start with your PNR",
    pulseTitle: "Live journey pulse", pulseText: "Delay, next halt and arrival changes.", alertTitle: "Only useful alerts", alertText: "Booking window, chart and station reminders.", privacyTitle: "Privacy by design", privacyText: "No raw PNR in analytics or public links.",
    myJourney: "My journey", tracking: "Tracking", onTime: "On time", depart: "Depart", next: "Next", arrive: "Arrive", confirmed: "Confirmed", chartTime: "Chart time", finalTomorrow: "Final · tomorrow", demoNote: "Representative dashboard preview. Live values appear after API connection.",
    rulesKicker: "Trust before traffic", rulesTitle: "Railway rules, with dates and sources.", readGuidance: "Read verified guidance",
    indiaKicker: "Designed around Indian travellers", indiaTitleA: "Fast on every phone.", indiaTitleB: "Clear in every language.", indiaText: "English and Hindi come first, with Bengali, Marathi, Tamil and Telugu planned next. The important answer always appears before the explanation or advertisement.",
    answerFirst: "Answer first", answerFirstText: "The tool result is always the clearest element on the page.", sourceVisible: "Source visible", sourceVisibleText: "Important rules show the official source and review date.", adsRestraint: "Ads with restraint", adsRestraintText: "Clearly labelled placements that never interrupt a critical action.",
    ctaKicker: "Next journey", ctaTitle: "Know before you go.", ctaText: "Start with a PNR, train number or travel date.", ctaButton: "Check your journey",
    invalidPnr: "Invalid PNR", invalidPnrTitle: "Enter the 10-digit number printed on your ticket.", invalidPnrText: "Spaces and letters are not accepted. We do not save this number in analytics.", invalidTrain: "Check the train number", invalidTrainTitle: "Enter a valid 5-digit train number.", invalidTrainText: "For example, enter 12951 for Mumbai Rajdhani.", stationsNeeded: "Both stations are needed", stationsNeededTitle: "Enter your origin and destination station codes.", stationsNeededText: "Station name autocomplete will be added with the live directory connection.",
  },
  hi: {
    badge: "स्वतंत्र रेलवे यात्रा सुविधा", titleA: "रेलवे का हर जवाब।", titleB: "एक आसान यात्रा में।",
    intro: "बुकिंग से पहले, वेटिंग के दौरान और मंज़िल तक—ज़रूरी जानकारी एक ही जगह पाएँ।",
    pnr: "PNR स्थिति", live: "लाइव ट्रेन", between: "स्टेशन के बीच", booking: "बुकिंग तारीख",
    pnrPlaceholder: "10 अंकों का PNR डालें", trainPlaceholder: "ट्रेन नंबर, जैसे 12951",
    fromPlaceholder: "स्टेशन कोड, जैसे NDLS", toPlaceholder: "स्टेशन कोड, जैसे MMCT", journeyDate: "यात्रा की तारीख",
    checkPnr: "PNR देखें", trackTrain: "ट्रेन ट्रैक करें", findTrains: "ट्रेन खोजें", calculate: "तारीख निकालें",
    privacy: "आपका PNR एनालिटिक्स में सेव नहीं होता", updated: "लाइव डेटा के लिए तैयार", noLogin: "क्विक टूल्स के लिए लॉगिन नहीं",
    train: "ट्रेन", from: "कहाँ से", to: "कहाँ तक", liveConnection: "लाइव डेटा कनेक्शन",
    officialNote: "स्वतंत्र सेवा · जरूरी जानकारी हमेशा आधिकारिक रेलवे माध्यम से सत्यापित करें",
    toolsKicker: "हर सुविधा एक जगह", toolsTitle: "आपकी यात्रा के हर पड़ाव के लिए रेल टूल्स", toolsDescription: "पहले तेज़ उत्तर। जरूरत पर साफ़ और पूरी जानकारी।", openTool: "टूल खोलें",
    journeyKicker: "एक आसान यात्रा अनुभव", journeyTitle: "आपकी पूरी रेल यात्रा, एक शांत और सरल स्क्रीन पर।", journeyDescription: "यात्रा एक बार सेव करें और RailQ लाइव स्थिति, चार्ट समय, कोच जानकारी और जरूरी अलर्ट एक साथ दिखा सकता है।", journeyCta: "अपने PNR से शुरू करें",
    pulseTitle: "लाइव यात्रा स्थिति", pulseText: "देरी, अगला स्टेशन और आगमन बदलाव।", alertTitle: "केवल जरूरी अलर्ट", alertText: "बुकिंग विंडो, चार्ट और स्टेशन रिमाइंडर।", privacyTitle: "गोपनीयता पहले", privacyText: "एनालिटिक्स या सार्वजनिक लिंक में PNR सेव नहीं होता।",
    myJourney: "मेरी यात्रा", tracking: "लाइव ट्रैकिंग", onTime: "समय पर", depart: "प्रस्थान", next: "अगला", arrive: "आगमन", confirmed: "कन्फर्म", chartTime: "चार्ट समय", finalTomorrow: "अंतिम · कल", demoNote: "यह डैशबोर्ड का उदाहरण है। API जुड़ने के बाद लाइव जानकारी दिखाई जाएगी।",
    rulesKicker: "ट्रैफिक से पहले भरोसा", rulesTitle: "तारीख और स्रोत के साथ रेलवे नियम।", readGuidance: "सत्यापित जानकारी पढ़ें",
    indiaKicker: "भारतीय यात्रियों के लिए बनाया गया", indiaTitleA: "हर फोन पर तेज़।", indiaTitleB: "हर भाषा में स्पष्ट।", indiaText: "पहले अंग्रेज़ी और हिंदी, फिर बंगाली, मराठी, तमिल और तेलुगु। जरूरी उत्तर हमेशा विवरण या विज्ञापन से पहले दिखाई देगा।",
    answerFirst: "उत्तर पहले", answerFirstText: "टूल का उत्तर हमेशा पेज का सबसे स्पष्ट हिस्सा रहेगा।", sourceVisible: "स्रोत साफ़", sourceVisibleText: "महत्वपूर्ण नियमों के साथ आधिकारिक स्रोत और समीक्षा तारीख दिखाई जाएगी।", adsRestraint: "संतुलित विज्ञापन", adsRestraintText: "साफ़ लेबल वाले विज्ञापन जो जरूरी काम में बाधा नहीं डालते।",
    ctaKicker: "अगली यात्रा", ctaTitle: "जाने से पहले जानें।", ctaText: "PNR, ट्रेन नंबर या यात्रा तारीख से शुरू करें।", ctaButton: "अपनी यात्रा देखें",
    invalidPnr: "PNR सही नहीं है", invalidPnrTitle: "टिकट पर दिया गया 10 अंकों का PNR डालें।", invalidPnrText: "अक्षर या खाली जगह मान्य नहीं हैं। यह नंबर एनालिटिक्स में सेव नहीं होता।", invalidTrain: "ट्रेन नंबर जाँचें", invalidTrainTitle: "सही 5 अंकों का ट्रेन नंबर डालें।", invalidTrainText: "उदाहरण के लिए मुंबई राजधानी के लिए 12951 डालें।", stationsNeeded: "दोनों स्टेशन जरूरी हैं", stationsNeededTitle: "शुरुआती और मंज़िल स्टेशन का कोड डालें।", stationsNeededText: "लाइव स्टेशन डायरेक्टरी जुड़ने पर नाम से खोज भी उपलब्ध होगी।",
  },
};

const tools = [
  { icon: "ticket", title: "PNR Status", titleHi: "PNR स्थिति", description: "Current status, coach, berth and chart details.", descriptionHi: "वर्तमान स्थिति, कोच, बर्थ और चार्ट की जानकारी।", accent: "orange", tab: "pnr" as SearchTab },
  { icon: "pulse", title: "Live Train Status", titleHi: "लाइव ट्रेन स्थिति", description: "Running position, delay and next halt.", descriptionHi: "ट्रेन की स्थिति, देरी और अगला स्टेशन।", accent: "teal", tab: "live" as SearchTab },
  { icon: "route", title: "Trains Between Stations", titleHi: "स्टेशनों के बीच ट्रेनें", description: "Direct options between any two stations.", descriptionHi: "दो स्टेशनों के बीच सीधी ट्रेनों के विकल्प।", accent: "blue", tab: "between" as SearchTab },
  { icon: "calendar", title: "Booking Date", titleHi: "बुकिंग तारीख", description: "Know exactly when your 60-day window opens.", descriptionHi: "जानें आपकी 60-दिन की बुकिंग विंडो कब खुलेगी।", accent: "violet", tab: "booking" as SearchTab },
  { icon: "clock", title: "Tatkal Time", titleHi: "तत्काल समय", description: "AC and non-AC opening time with reminders.", descriptionHi: "AC और नॉन-AC बुकिंग समय और रिमाइंडर।", accent: "rose" },
  { icon: "refund", title: "Refund Calculator", titleHi: "रिफंड कैलकुलेटर", description: "Estimate deductions before cancellation.", descriptionHi: "टिकट रद्द करने से पहले संभावित कटौती जानें।", accent: "green" },
  { icon: "seat", title: "Berth Finder", titleHi: "बर्थ पहचानें", description: "Lower, middle, upper or side—know your seat.", descriptionHi: "लोअर, मिडिल, अपर या साइड—अपनी सीट पहचानें।", accent: "amber" },
  { icon: "chart", title: "Chart Preparation", titleHi: "चार्ट तैयारी", description: "See first and final chart windows clearly.", descriptionHi: "पहले और अंतिम चार्ट का समय साफ़ देखें।", accent: "slate" },
];

const updates = [
  { date: "Verified Aug 2026", dateHi: "अगस्त 2026 में सत्यापित", title: "Advance booking window", titleHi: "अग्रिम बुकिंग विंडो", value: "60 days", valueHi: "60 दिन", note: "Excluding the journey date; exceptions may apply.", noteHi: "यात्रा की तारीख शामिल नहीं; कुछ अपवाद लागू हो सकते हैं।" },
  { date: "Live rule card", dateHi: "लाइव नियम कार्ड", title: "Tatkal opens", titleHi: "तत्काल बुकिंग खुलती है", value: "10 AM / 11 AM", valueHi: "सुबह 10 / 11 बजे", note: "AC at 10 AM and non-AC at 11 AM, one day earlier.", noteHi: "AC सुबह 10 बजे और नॉन-AC सुबह 11 बजे, एक दिन पहले।" },
  { date: "Source-first guidance", dateHi: "स्रोत आधारित जानकारी", title: "Final authority", titleHi: "अंतिम आधिकारिक स्रोत", value: "IRCTC / NTES", valueHi: "IRCTC / NTES", note: "Every critical result will include an official verification link.", noteHi: "हर महत्वपूर्ण परिणाम के साथ आधिकारिक सत्यापन लिंक होगा।" },
];

function getGeneralBookingDate(journeyDate: string, language: Language): SearchResult {
  const selected = new Date(`${journeyDate}T12:00:00`);
  if (Number.isNaN(selected.valueOf())) return { tone: "error", eyebrow: "Check the date", title: "Please select a valid journey date.", description: "The date is needed to calculate the general advance reservation window." };
  const opening = new Date(selected); opening.setDate(opening.getDate() - 60);
  const locale = language === "hi" ? "hi-IN" : "en-IN";
  const formatted = opening.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return {
    tone: "success", eyebrow: language === "hi" ? "आपकी बुकिंग विंडो" : "Your booking window",
    title: language === "hi" ? `${formatted}, सुबह 8:00 बजे` : `${formatted} at 8:00 AM IST`,
    description: language === "hi" ? "यह सामान्य 60-दिन के ARP नियम पर आधारित है। विशेष ट्रेनों में अलग नियम हो सकते हैं।" : "Based on the general 60-day ARP rule. Selected daytime and special trains may have different windows.",
    details: [
      { label: language === "hi" ? "यात्रा तारीख" : "Journey date", value: selected.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" }) },
      { label: language === "hi" ? "गणना" : "Calculation", value: language === "hi" ? "60 दिन पहले" : "60 days earlier" },
    ],
  };
}


function mapProviderResult(tab: SearchTab, payload: Record<string, unknown>, language: Language): SearchResult {
  const hi = language === "hi";
  if (tab === "pnr") {
    const data = pnrSummary(payload);
    return { tone: data.passengers.length ? "success" : "warning", eyebrow: hi ? "नवीनतम PNR उत्तर" : "Latest PNR response", title: data.trainName || (hi ? "PNR जानकारी" : "PNR information"), description: hi ? "हर यात्री की स्थिति अलग से जाँचें।" : "Review the current status for each passenger.", details: [{ label: hi ? "ट्रेन" : "Train", value: data.trainNumber || "—" }, { label: hi ? "वर्तमान स्थिति" : "Current status", value: data.status || (hi ? "स्थिति उपलब्ध नहीं" : "Status unavailable") }, { label: hi ? "चार्ट" : "Chart", value: data.chartStatus || "—" }, { label: hi ? "यात्रा" : "Journey", value: [data.from, data.to].filter(Boolean).join(" → ") || "—" }] };
  }
  if (tab === "live") {
    const data = liveSummary(payload);
    return { tone: "success", eyebrow: hi ? "लाइव रनिंग अपडेट" : "Live running update", title: data.trainName || data.trainNumber || (hi ? "ट्रेन की स्थिति" : "Train status"), description: data.delayMinutes === null ? (hi ? "देरी की जानकारी उपलब्ध नहीं" : "Delay information unavailable") : data.delayMinutes <= 0 ? (hi ? "समय पर" : "On time") : `${data.delayMinutes} ${hi ? "मिनट देरी" : "min late"}`, details: [{ label: hi ? "नवीनतम स्थिति स्थान" : "Latest reported location", value: data.current || data.previous || "—" }, { label: hi ? "अगला ठहराव" : "Next halt", value: data.next || "—" }, { label: hi ? "प्रदाता अपडेट" : "Provider updated", value: data.updated || "—" }] };
  }
  const trains = rows(railData(payload).trains);
  return { tone: trains.length ? "success" : "warning", eyebrow: hi ? "रूट की ट्रेनें" : "Route trains", title: `${trains.length} ${hi ? "ट्रेनें मिलीं" : "trains found"}`, description: hi ? "पूरी समय-सारणी और ट्रेन विकल्प स्टेशनों के बीच ट्रेनें टूल पर देखें।" : "Open Trains Between Stations for the full timetable and train options." };
}

export default function Home() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<SearchTab>("pnr");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [form, setForm] = useState({ pnr: "", train: "", date: "", from: "", to: "" });
  const t = copy[language];
  const buttonLabel = useMemo(() => ({ pnr: t.checkPnr, live: t.trackTrain, between: t.findTrains, booking: t.calculate }[activeTab]), [activeTab, t]);

  useEffect(() => { trackEvent("homepage_view", { language }); }, [language]);

  function switchTab(tab: SearchTab) {
    setActiveTab(tab); setResult(null); trackEvent("search_tab_selected", { tab });
    window.setTimeout(() => document.getElementById("rail-search")?.scrollIntoView({ behavior: "smooth", block: "center" }), 20);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setResult(null);
    if (activeTab === "booking") {
      const calculated = getGeneralBookingDate(form.date, language); setResult(calculated);
      trackEvent("tool_completed", { tool: "booking_date", outcome: calculated.tone }); return;
    }
    if (activeTab === "pnr" && !/^\d{10}$/.test(form.pnr)) {
      setResult({ tone: "error", eyebrow: t.invalidPnr, title: t.invalidPnrTitle, description: t.invalidPnrText }); return;
    }
    if (activeTab === "live" && !/^\d{5}$/.test(form.train)) {
      setResult({ tone: "error", eyebrow: t.invalidTrain, title: t.invalidTrainTitle, description: t.invalidTrainText }); return;
    }
    if (activeTab === "between" && (!form.from.trim() || !form.to.trim())) {
      setResult({ tone: "error", eyebrow: t.stationsNeeded, title: t.stationsNeededTitle, description: t.stationsNeededText }); return;
    }
    const params = new URLSearchParams({ action: activeTab });
    if (activeTab === "pnr") params.set("pnr", form.pnr);
    if (activeTab === "live") { params.set("train", form.train); if (form.date) params.set("date", form.date); }
    if (activeTab === "between") { params.set("from", form.from.toUpperCase()); params.set("to", form.to.toUpperCase()); }
    setLoading(true); trackEvent("live_tool_submitted", { tool: activeTab });
    try {
      const { payload, ok } = await railRequest(params);
      if (!ok) {
        const problem = railError(payload, language === "hi");
        const notConfigured = problem.code === "PROVIDER_NOT_CONFIGURED";
        setResult({
          tone: notConfigured ? "warning" : "error",
          eyebrow: notConfigured ? (language === "hi" ? "लाइव कनेक्शन तैयार है" : "Live connection ready") : (language === "hi" ? "लाइव डेटा नहीं मिल सका" : "Could not fetch live data"),
          title: notConfigured ? (language === "hi" ? "खोज सक्रिय करने के लिए अपनी रेलवे API कुंजी जोड़ें।" : "Add your free railway API key to activate this search.") : (language === "hi" ? "कुछ देर बाद फिर प्रयास करें।" : "Please try again in a moment."),
          description: problem.message,
        });
        trackEvent("live_tool_result", { tool: activeTab, outcome: notConfigured ? "not_configured" : "error" }); return;
      }
      setResult(mapProviderResult(activeTab, payload, language)); trackEvent("live_tool_result", { tool: activeTab, outcome: "success" });
    } catch {
      setResult({ tone: "error", eyebrow: language === "hi" ? "कनेक्शन रुक गया" : "Connection interrupted", title: language === "hi" ? "लाइव रेलवे सेवा अपेक्षा से अधिक समय ले रही है।" : "The live railway service is taking longer than expected.", description: language === "hi" ? "फिर प्रयास करें। महत्वपूर्ण यात्रा जानकारी IRCTC या NTES पर सत्यापित करें।" : "Please try again. Critical journey information should always be verified on IRCTC or NTES." });
      trackEvent("live_tool_result", { tool: activeTab, outcome: "network_error" });
    } finally { setLoading(false); }
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-copy"><div className="eyebrow"><span className="live-dot" /> {t.badge}</div><h1>{t.titleA}<br /><em>{t.titleB}</em></h1><p>{t.intro}</p><div className="trust-inline"><span><Icon name="shield" size={17} /> {t.privacy}</span><span><Icon name="pulse" size={17} /> {t.updated}</span></div></div>
        <div className="hero-visual" aria-label={language === "hi" ? "आधुनिक भारतीय यात्री ट्रेन यात्रा" : "Modern Indian passenger train journey"}>
          <Image src="/rail-hero.webp" alt={language === "hi" ? "सूर्योदय के समय आधुनिक भारतीय यात्री ट्रेन" : "Modern Indian passenger train at sunrise"} fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          <div className="route-card"><div><span>NDLS</span><b>New Delhi</b></div><span className="route-line"><i /><i /><i /></span><div><span>MMCT</span><b>Mumbai Central</b></div></div>
          <div className="status-pill"><span className="live-dot" /> {t.liveConnection}</div>
        </div>
        <section className="search-shell" id="rail-search" aria-label="Railway search tools">
          <div className="search-tabs" role="tablist" aria-label="Choose a railway tool">
            {([["pnr", t.pnr, "ticket"], ["live", t.live, "pulse"], ["between", t.between, "route"], ["booking", t.booking, "calendar"]] as Array<[SearchTab, string, string]>).map(([tab, label, icon]) => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => switchTab(tab)} role="tab" aria-selected={activeTab === tab}><Icon name={icon} size={18} /> {label}</button>)}
          </div>
          <form className="search-form" onSubmit={handleSubmit}>
            {activeTab === "pnr" && <label className="single-field"><span>PNR</span><input inputMode="numeric" autoComplete="off" maxLength={10} value={form.pnr} onChange={(e) => setForm({ ...form, pnr: e.target.value.replace(/\D/g, "") })} placeholder={t.pnrPlaceholder} aria-label={t.pnrPlaceholder} /></label>}
            {activeTab === "live" && <><label><span>{t.train}</span><input inputMode="numeric" maxLength={5} value={form.train} onChange={(e) => setForm({ ...form, train: e.target.value.replace(/\D/g, "") })} placeholder={t.trainPlaceholder} aria-label={t.trainPlaceholder} /></label><label><span>{t.journeyDate}</span><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label={t.journeyDate} /></label></>}
            {activeTab === "between" && <><label><span>{t.from}</span><input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} placeholder={t.fromPlaceholder} aria-label={t.fromPlaceholder} /></label><span className="swap-icon"><Icon name="swap" size={19} /></span><label><span>{t.to}</span><input value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} placeholder={t.toPlaceholder} aria-label={t.toPlaceholder} /></label></>}
            {activeTab === "booking" && <label className="single-field"><span>{t.journeyDate}</span><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label={t.journeyDate} /></label>}
            <button className="primary-button" type="submit" disabled={loading}>{loading ? <span className="spinner" /> : buttonLabel} <Icon name="arrow" size={18} /></button>
          </form>
          {result && <div className={`search-result ${result.tone}`} aria-live="polite"><div><span>{result.eyebrow}</span><h3>{result.title}</h3><p>{result.description}</p></div>{result.details && <dl>{result.details.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}</div>}
          <div className="search-footnote"><span><Icon name="shield" size={15} /> {t.noLogin}</span><span>{t.officialNote}</span></div>
        </section>
      </section>

      <AdSlot placement="top" format="970 × 90 / 320 × 100" className="top-ad" />

      <section className="section tools-section" id="tools">
        <div className="section-heading"><div><span className="kicker">{t.toolsKicker}</span><h2>{t.toolsTitle}</h2></div><p>{t.toolsDescription}</p></div>
        <div className="tool-grid">{tools.map((tool, index) => <button className="tool-card" key={tool.title} onClick={() => { trackEvent("tool_card_clicked", { tool: tool.title }); if (tool.tab) switchTab(tool.tab); }}><span className={`tool-icon ${tool.accent}`}><Icon name={tool.icon} /></span><span className="tool-number">0{index + 1}</span><h3>{language === "hi" ? tool.titleHi : tool.title}</h3><p>{language === "hi" ? tool.descriptionHi : tool.description}</p><span className="tool-link">{t.openTool} <Icon name="arrow" size={16} /></span></button>)}</div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-copy"><span className="kicker light">{t.journeyKicker}</span><h2>{t.journeyTitle}</h2><p>{t.journeyDescription}</p><ul><li><span><Icon name="pulse" size={18} /></span><div><b>{t.pulseTitle}</b><small>{t.pulseText}</small></div></li><li><span><Icon name="bell" size={18} /></span><div><b>{t.alertTitle}</b><small>{t.alertText}</small></div></li><li><span><Icon name="shield" size={18} /></span><div><b>{t.privacyTitle}</b><small>{t.privacyText}</small></div></li></ul><button className="secondary-button" onClick={() => { switchTab("pnr"); trackEvent("journey_cta_clicked"); }}>{t.journeyCta} <Icon name="arrow" size={18} /></button></div>
        <div className="journey-dashboard"><div className="dash-top"><span>{t.myJourney}</span><b><span className="live-dot" /> {t.tracking}</b></div><div className="train-title"><span>12952</span><div><h3>Mumbai Rajdhani</h3><p>New Delhi → Mumbai Central</p></div><strong>{t.onTime}</strong></div><div className="rail-progress"><i /><i /><i /><i /><span /></div><div className="station-row"><div><small>{t.depart}</small><b>NDLS</b><span>16:55</span></div><div><small>{t.next}</small><b>KOTA</b><span>21:40</span></div><div><small>{t.arrive}</small><b>MMCT</b><span>08:35</span></div></div><div className="dash-cards"><div><small>{t.pnr}</small><b>{t.confirmed}</b><span>B4 · 31 LB</span></div><div><small>{t.chartTime}</small><b>08:55 AM</b><span>{t.finalTomorrow}</span></div></div><p className="demo-note">{t.demoNote}</p></div>
      </section>

      <div className="content-with-ad"><section className="section updates-section" id="updates"><div className="section-heading compact"><div><span className="kicker">{t.rulesKicker}</span><h2>{t.rulesTitle}</h2></div></div><div className="update-grid">{updates.map((update) => <article key={update.title}><span>{language === "hi" ? update.dateHi : update.date}</span><h3>{language === "hi" ? update.titleHi : update.title}</h3><b>{language === "hi" ? update.valueHi : update.value}</b><p>{language === "hi" ? update.noteHi : update.note}</p><Link href="/guides">{t.readGuidance} <Icon name="arrow" size={15} /></Link></article>)}</div></section><AdSlot placement="square" format="300 × 250" className="square-ad" /></div>

      <section className="india-section" id="guides"><div className="india-copy"><span className="kicker">{t.indiaKicker}</span><h2>{t.indiaTitleA}<br />{t.indiaTitleB}</h2><p>{t.indiaText}</p><div className="language-pills"><span>English</span><span>हिंदी</span><span>বাংলা</span><span>मराठी</span><span>தமிழ்</span><span>తెలుగు</span></div></div><div className="principles-card"><span className="principle-number">01</span><div><b>{t.answerFirst}</b><p>{t.answerFirstText}</p></div><span className="principle-number">02</span><div><b>{t.sourceVisible}</b><p>{t.sourceVisibleText}</p></div><span className="principle-number">03</span><div><b>{t.adsRestraint}</b><p>{t.adsRestraintText}</p></div></div></section>

      <AdSlot placement="bottom" format="728 × 90 / responsive" className="bottom-ad" />
      <section className="cta-band"><div><span className="kicker light">{t.ctaKicker}</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><button onClick={() => switchTab("pnr")} className="cta-button">{t.ctaButton} <Icon name="arrow" size={18} /></button></section>
    </main>
  );
}

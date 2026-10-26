"use client";
import { mobileRefreshEnabled } from "@/lib/protected-pages";
import { PnrJourneyCard } from "@/components/pnr-journey-card";
import { rememberTrain } from "@/lib/local-journeys";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { StationInput } from "@/components/station-input";
import { SavedPlaces } from "@/components/saved-places";
import { ResultHelp } from "@/components/result-help";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { LocalizedLink as Link } from "@/components/localized-link";
import { Language, useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import { pnrSummary, liveSummary, railData, rows, railRequest, railError } from "@/lib/rail-data";

type SearchTab = "pnr" | "live" | "between" | "booking";
type SearchResult = {
  journey?: ReturnType<typeof pnrSummary>;
  lookupPnr?: string;
  code?: string;
  fetchedAt?: string;
  tone: "success" | "warning" | "error";
  eyebrow: string;
  title: string;
  description: string;
  details?: Array<{ label: string; value: string }>;
};

const copy = {
  en: {
    badge: "Independent railway travel utility", titleA: "PNR status and train tools.", titleB: "Plan your next step.",
    intro: "Check each passenger’s ticket status, track your train or compare routes. Use the tools and clear explanations in English or Hindi to plan what to do next.",
    pnr: "PNR status", live: "Live train", between: "Between stations", booking: "Booking date",
    pnrPlaceholder: "Enter 10-digit PNR", trainPlaceholder: "Train number, e.g. 12951",
    fromPlaceholder: "From station code, e.g. NDLS", toPlaceholder: "To station code, e.g. MMCT", journeyDate: "Journey date",
    checkPnr: "Check PNR", trackTrain: "Track train", findTrains: "Find trains", calculate: "Calculate date",
    privacy: "Your PNR is never saved in analytics", updated: "English and Hindi tools", noLogin: "No login for quick tools",
    train: "Train", from: "From", to: "To", liveConnection: "Illustrative journey",
    officialNote: "Independent service · Always verify critical information with official railway channels",
    toolsKicker: "Everything in one place", toolsTitle: "Rail tools for every moment of your journey", toolsDescription: "Fast answers first. Clear explanations when you need them.", openTool: "Open tool",
    journeyKicker: "Coming together as one flow", journeyTitle: "Plan your journey, one clear step at a time.", journeyDescription: "Check live status, estimate chart timing and create calendar reminders. PNR email alerts are coming soon.", journeyCta: "Start with your PNR",
    pulseTitle: "Live journey pulse", pulseText: "Delay, next halt and arrival changes.", alertTitle: "Only useful alerts", alertText: "Booking and Tatkal calendar reminders. Email alerts are not active.", privacyTitle: "Privacy by design", privacyText: "No raw PNR in analytics or public links.",
    myJourney: "Example journey", tracking: "Demo", onTime: "On time", depart: "Depart", next: "Next", arrive: "Arrive", confirmed: "Confirmed", chartTime: "Chart time", finalTomorrow: "Final · tomorrow", demoNote: "Illustrative example only. Check your PNR or open My journey for your own results.",
    rulesKicker: "Trust before traffic", rulesTitle: "Railway rules, with dates and sources.", readGuidance: "Read verified guidance",
    indiaKicker: "Designed around Indian travellers", indiaTitleA: "Made for everyday journeys.", indiaTitleB: "In English and Hindi.", indiaText: "Check your journey details, understand unfamiliar status codes and choose a useful next step. Switch between English and Hindi without changing your task.",
    answerFirst: "Answer first", answerFirstText: "The tool result is always the clearest element on the page.", sourceVisible: "Source visible", sourceVisibleText: "Important rules show the official source and review date.", adsRestraint: "Ads with restraint", adsRestraintText: "Clearly labelled placements that never interrupt a critical action.",
    ctaKicker: "Next journey", ctaTitle: "Know before you go.", ctaText: "Start with a PNR, train number or travel date.", ctaButton: "Check your journey",
    invalidPnr: "Invalid PNR", invalidPnrTitle: "Enter the 10-digit number printed on your ticket.", invalidPnrText: "Spaces and letters are not accepted. We do not save this number in analytics.", invalidTrain: "Check the train number", invalidTrainTitle: "Enter a valid 5-digit train number.", invalidTrainText: "For example, enter 12951 for Mumbai Rajdhani.", stationsNeeded: "Both stations are needed", stationsNeededTitle: "Enter your origin and destination station codes.", stationsNeededText: "Choose station suggestions or enter the exact codes on your ticket.",
  },
  hi: {
    badge: "स्वतंत्र रेलवे यात्रा सुविधा", titleA: "PNR स्टेटस और रेल टूल्स।", titleB: "यात्रा का अगला कदम तय करें।",
    intro: "हर यात्री का टिकट स्टेटस देखें, ट्रेन की स्थिति जाँचें या मार्ग की तुलना करें। हिंदी और अंग्रेज़ी के टूल्स और सरल जानकारी से यात्रा का अगला कदम तय करें।",
    pnr: "PNR स्थिति", live: "लाइव ट्रेन", between: "स्टेशन के बीच", booking: "बुकिंग तारीख",
    pnrPlaceholder: "10 अंकों का PNR डालें", trainPlaceholder: "ट्रेन नंबर, जैसे 12951",
    fromPlaceholder: "स्टेशन कोड, जैसे NDLS", toPlaceholder: "स्टेशन कोड, जैसे MMCT", journeyDate: "यात्रा की तारीख",
    checkPnr: "PNR देखें", trackTrain: "ट्रेन ट्रैक करें", findTrains: "ट्रेन खोजें", calculate: "तारीख निकालें",
    privacy: "आपका PNR एनालिटिक्स में सेव नहीं होता", updated: "हिंदी और अंग्रेज़ी में टूल", noLogin: "क्विक टूल्स के लिए लॉगिन नहीं",
    train: "ट्रेन", from: "कहाँ से", to: "कहाँ तक", liveConnection: "उदाहरणात्मक यात्रा",
    officialNote: "स्वतंत्र सेवा · जरूरी जानकारी हमेशा आधिकारिक रेलवे माध्यम से सत्यापित करें",
    toolsKicker: "हर सुविधा एक जगह", toolsTitle: "आपकी यात्रा के हर पड़ाव के लिए रेल टूल्स", toolsDescription: "पहले तेज़ उत्तर। जरूरत पर साफ़ और पूरी जानकारी।", openTool: "टूल खोलें",
    journeyKicker: "एक आसान यात्रा अनुभव", journeyTitle: "आपकी पूरी रेल यात्रा, एक शांत और सरल स्क्रीन पर।", journeyDescription: "लाइव स्थिति, अनुमानित चार्ट समय और कैलेंडर रिमाइंडर देखें। PNR ईमेल अलर्ट अभी शुरू नहीं हैं।", journeyCta: "अपने PNR से शुरू करें",
    pulseTitle: "लाइव यात्रा स्थिति", pulseText: "देरी, अगला स्टेशन और आगमन बदलाव।", alertTitle: "केवल जरूरी अलर्ट", alertText: "बुकिंग और तत्काल के कैलेंडर रिमाइंडर। ईमेल अलर्ट अभी शुरू नहीं हैं।", privacyTitle: "गोपनीयता पहले", privacyText: "एनालिटिक्स या सार्वजनिक लिंक में PNR सेव नहीं होता।",
    myJourney: "उदाहरण यात्रा", tracking: "डेमो", onTime: "समय पर", depart: "प्रस्थान", next: "अगला", arrive: "आगमन", confirmed: "कन्फर्म", chartTime: "चार्ट समय", finalTomorrow: "अंतिम · कल", demoNote: "यह केवल एक उदाहरण है। अपनी जानकारी के लिए PNR जाँचें या मेरी यात्रा खोलें।",
    rulesKicker: "ट्रैफिक से पहले भरोसा", rulesTitle: "तारीख और स्रोत के साथ रेलवे नियम।", readGuidance: "सत्यापित जानकारी पढ़ें",
    indiaKicker: "भारतीय यात्रियों के लिए बनाया गया", indiaTitleA: "रोज़मर्रा की यात्रा के लिए।", indiaTitleB: "हिंदी और अंग्रेज़ी में।", indiaText: "यात्रा का विवरण जाँचें, अनजान स्टेटस कोड समझें और अगला उपयोगी कदम चुनें। अपना काम बदले बिना हिंदी और अंग्रेज़ी में जानकारी पढ़ें।",
    answerFirst: "उत्तर पहले", answerFirstText: "टूल का उत्तर हमेशा पेज का सबसे स्पष्ट हिस्सा रहेगा।", sourceVisible: "स्रोत साफ़", sourceVisibleText: "महत्वपूर्ण नियमों के साथ आधिकारिक स्रोत और समीक्षा तारीख दिखाई जाएगी।", adsRestraint: "संतुलित विज्ञापन", adsRestraintText: "साफ़ लेबल वाले विज्ञापन जो जरूरी काम में बाधा नहीं डालते।",
    ctaKicker: "अगली यात्रा", ctaTitle: "जाने से पहले जानें।", ctaText: "PNR, ट्रेन नंबर या यात्रा तारीख से शुरू करें।", ctaButton: "अपनी यात्रा देखें",
    invalidPnr: "PNR सही नहीं है", invalidPnrTitle: "टिकट पर दिया गया 10 अंकों का PNR डालें।", invalidPnrText: "अक्षर या खाली जगह मान्य नहीं हैं। यह नंबर एनालिटिक्स में सेव नहीं होता।", invalidTrain: "ट्रेन नंबर जाँचें", invalidTrainTitle: "सही 5 अंकों का ट्रेन नंबर डालें।", invalidTrainText: "उदाहरण के लिए मुंबई राजधानी के लिए 12951 डालें।", stationsNeeded: "दोनों स्टेशन जरूरी हैं", stationsNeededTitle: "शुरुआती और मंज़िल स्टेशन का कोड डालें।", stationsNeededText: "सुझाव से स्टेशन चुनें या टिकट पर दिया सही स्टेशन कोड डालें।",
  },
};

const tools = [
  { icon: "ticket", title: "PNR Status", titleHi: "PNR स्थिति", description: "Current status, coach, berth and chart details.", descriptionHi: "वर्तमान स्थिति, कोच, बर्थ और चार्ट की जानकारी।", accent: "orange", href: "/pnr-status" },
  { icon: "pulse", title: "Live Train Status", titleHi: "लाइव ट्रेन स्थिति", description: "Running position, delay and next halt.", descriptionHi: "ट्रेन की स्थिति, देरी और अगला स्टेशन।", accent: "teal", href: "/live-train-status" },
  { icon: "route", title: "Trains Between Stations", titleHi: "स्टेशनों के बीच ट्रेनें", description: "Direct options between any two stations.", descriptionHi: "दो स्टेशनों के बीच सीधी ट्रेनों के विकल्प।", accent: "blue", href: "/trains-between-stations" },
  { icon: "calendar", title: "Booking Date", titleHi: "बुकिंग तारीख", description: "Know exactly when your 60-day window opens.", descriptionHi: "जानें आपकी 60-दिन की बुकिंग विंडो कब खुलेगी।", accent: "violet", href: "/booking-date-calculator" },
  { icon: "clock", title: "Tatkal Time", titleHi: "तत्काल समय", description: "AC and non-AC opening time with reminders.", descriptionHi: "AC और नॉन-AC बुकिंग समय और रिमाइंडर।", accent: "rose", href: "/tatkal-time-calculator" },
  { icon: "refund", title: "Refund Calculator", titleHi: "रिफंड कैलकुलेटर", description: "Estimate deductions before cancellation.", descriptionHi: "टिकट रद्द करने से पहले संभावित कटौती जानें।", accent: "green", href: "/refund-calculator" },
  { icon: "seat", title: "Berth Finder", titleHi: "बर्थ पहचानें", description: "Lower, middle, upper or side—know your seat.", descriptionHi: "लोअर, मिडिल, अपर या साइड—अपनी सीट पहचानें।", accent: "amber", href: "/seat-berth-finder" },
  { icon: "chart", title: "Chart Preparation", titleHi: "चार्ट तैयारी", description: "See first and final chart windows clearly.", descriptionHi: "पहले और अंतिम चार्ट का समय साफ़ देखें।", accent: "slate", href: "/chart-preparation-calculator" },
];

const updates = [
  { date: "Verified Aug 2026", dateHi: "अगस्त 2026 में सत्यापित", title: "Advance booking window", titleHi: "अग्रिम बुकिंग विंडो", value: "60 days", valueHi: "60 दिन", note: "Excluding the journey date; exceptions may apply.", noteHi: "यात्रा की तारीख शामिल नहीं; कुछ अपवाद लागू हो सकते हैं।", href: "/guides/booking-and-advance-reservation" },
  { date: "Live rule card", dateHi: "लाइव नियम कार्ड", title: "Tatkal opens", titleHi: "तत्काल बुकिंग खुलती है", value: "10 AM / 11 AM", valueHi: "सुबह 10 / 11 बजे", note: "AC at 10 AM and non-AC at 11 AM, one day earlier.", noteHi: "AC सुबह 10 बजे और नॉन-AC सुबह 11 बजे, एक दिन पहले।", href: "/guides/tatkal" },
  { date: "Source-first guidance", dateHi: "स्रोत आधारित जानकारी", title: "Final authority", titleHi: "अंतिम आधिकारिक स्रोत", value: "IRCTC / NTES", valueHi: "IRCTC / NTES", note: "Every critical result will include an official verification link.", noteHi: "हर महत्वपूर्ण परिणाम के साथ आधिकारिक सत्यापन लिंक होगा।", href: "/official-services" },
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
    return { journey: data, tone: data.passengers.length ? "success" : "warning", eyebrow: hi ? "नवीनतम PNR उत्तर" : "Latest PNR response", title: data.trainName || (hi ? "PNR जानकारी" : "PNR information"), description: hi ? "हर यात्री की स्थिति अलग से जाँचें।" : "Review the current status for each passenger.", details: [{ label: hi ? "ट्रेन" : "Train", value: data.trainNumber || "—" }, { label: hi ? "वर्तमान स्थिति" : "Current status", value: data.status || (hi ? "स्थिति उपलब्ध नहीं" : "Status unavailable") }, { label: hi ? "चार्ट" : "Chart", value: data.chartStatus || "—" }, { label: hi ? "यात्रा" : "Journey", value: [data.from, data.to].filter(Boolean).join(" → ") || "—" }] };
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
    if (activeTab === "between" && (!/^[A-Z0-9]{2,6}$/i.test(form.from.trim()) || !/^[A-Z0-9]{2,6}$/i.test(form.to.trim()) || form.from.trim().toUpperCase() === form.to.trim().toUpperCase())) {
      setResult({ tone: "error", eyebrow: t.stationsNeeded, title: t.stationsNeededTitle, description: t.stationsNeededText }); return;
    }
    const params = new URLSearchParams({ action: activeTab });
    if (activeTab === "pnr") params.set("pnr", form.pnr);
    if (activeTab === "live") { params.set("train", form.train); if (form.date) params.set("date", form.date); }
    if (activeTab === "between") { params.set("from", form.from.trim().toUpperCase()); params.set("to", form.to.trim().toUpperCase()); }
    setLoading(true); trackEvent("live_tool_submitted", { tool: activeTab });
    try {
      const { payload, ok } = await railRequest(params);
      if (!ok) {
        const problem = railError(payload, language === "hi");
        const notConfigured = problem.code === "PROVIDER_NOT_CONFIGURED";
        setResult({
          tone: notConfigured ? "warning" : "error",
          eyebrow: notConfigured ? (language === "hi" ? "लाइव कनेक्शन तैयार है" : "Live connection ready") : (language === "hi" ? "लाइव डेटा नहीं मिल सका" : "Could not fetch live data"),
          title: problem.title, code: problem.code,
          description: problem.message,
        });
        trackEvent("live_tool_result", { tool: activeTab, outcome: notConfigured ? "not_configured" : "error" }); return;
      }
      if (activeTab === "live") rememberTrain(form.train);
      setResult({ ...mapProviderResult(activeTab, payload, language), lookupPnr: activeTab === "pnr" ? form.pnr : undefined, fetchedAt: String((payload.railq as Record<string, unknown> | undefined)?.fetchedAt || new Date().toISOString()) }); trackEvent("live_tool_result", { tool: activeTab, outcome: "success" });
    } catch {
      setResult({ tone: "error", eyebrow: language === "hi" ? "कनेक्शन रुक गया" : "Connection interrupted", title: language === "hi" ? "लाइव रेलवे सेवा अपेक्षा से अधिक समय ले रही है।" : "The live railway service is taking longer than expected.", description: language === "hi" ? "फिर प्रयास करें। महत्वपूर्ण यात्रा जानकारी IRCTC या NTES पर सत्यापित करें।" : "Please try again. Critical journey information should always be verified on IRCTC or NTES." });
      trackEvent("live_tool_result", { tool: activeTab, outcome: "network_error" });
    } finally { setLoading(false); }
  }

  return (
    <main data-mobile-refresh={mobileRefreshEnabled("/", language) || undefined} className={language === "hi" ? "mobile-home" : undefined}>
      <section className="hero" id="top">
        <div className="hero-copy"><div className="eyebrow"><span className="live-dot" /> {t.badge}</div><h1>{t.titleA}<br /><em>{t.titleB}</em></h1><p>{t.intro}</p><div className="trust-inline"><span><Icon name="shield" size={17} /> {t.privacy}</span><span><Icon name="pulse" size={17} /> {t.updated}</span></div></div>
        <div className="hero-visual" aria-label={language === "hi" ? "आधुनिक भारतीय यात्री ट्रेन यात्रा" : "Modern Indian passenger train journey"}>
          <Image src="/rail-hero.webp" alt={language === "hi" ? "सूर्योदय के समय आधुनिक भारतीय यात्री ट्रेन" : "Modern Indian passenger train at sunrise"} width={1672} height={941} priority={language !== "hi"} loading={language === "hi" ? "lazy" : undefined} sizes="(max-width: 760px) 100vw, (max-width: 1440px) 55vw, 792px" />
          <div className="route-card"><div><span>NDLS</span><b>New Delhi</b></div><span className="route-line"><i /><i /><i /></span><div><span>MMCT</span><b>Mumbai Central</b></div></div>
          <Link className="status-pill" href="/trains-between-stations?from=NDLS&to=MMCT">{language === "hi" ? "इस मार्ग पर ट्रेनें खोजें →" : "Search trains on this route →"}</Link>
        </div>
        <section className="search-shell" id="rail-search" aria-label="Railway search tools">
          <div className="search-tabs" role="tablist" aria-label={language === "hi" ? "रेलवे टूल चुनें" : "Choose a railway tool"}>
            {([["pnr", t.pnr, "ticket"], ["live", t.live, "pulse"], ["between", t.between, "route"], ["booking", t.booking, "calendar"]] as Array<[SearchTab, string, string]>).map(([tab, label, icon]) => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => switchTab(tab)} role="tab" id={`search-tab-${tab}`} aria-controls="search-tool-panel" tabIndex={activeTab === tab ? 0 : -1} aria-selected={activeTab === tab} onKeyDown={event => {
              const tabs: SearchTab[] = ["pnr", "live", "between", "booking"];
              const index = tabs.indexOf(tab);
              const next = event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : -1;
              if (next >= 0) { event.preventDefault(); switchTab(tabs[next]); document.getElementById(`search-tab-${tabs[next]}`)?.focus(); }
            }}><Icon name={icon} size={18} /> {label}</button>)}
          </div>
          {activeTab === "pnr" && <p className="home-pnr-hint">{language === "hi" ? "टिकट का 10 अंकों का PNR डालें। समर्थित बुकिंग पर परिणाम के बाद वैकल्पिक कन्फर्मेशन अनुमान माँग सकते हैं।" : "Enter the 10-digit PNR from your ticket. An optional confirmation estimate can be requested after supported results."}</p>}
          <form id="search-tool-panel" role="tabpanel" aria-labelledby={`search-tab-${activeTab}`} className="search-form" onSubmit={handleSubmit}>
            {activeTab === "pnr" && <label className="single-field"><span>PNR</span><input inputMode="numeric" autoComplete="off" maxLength={10} value={form.pnr} onChange={(e) => setForm({ ...form, pnr: e.target.value.replace(/\D/g, "") })} placeholder={t.pnrPlaceholder} aria-label={t.pnrPlaceholder} /></label>}
            {activeTab === "live" && <><label><span>{t.train}</span><input inputMode="numeric" maxLength={5} value={form.train} onChange={(e) => setForm({ ...form, train: e.target.value.replace(/\D/g, "") })} placeholder={t.trainPlaceholder} aria-label={t.trainPlaceholder} /></label><label><span>{t.journeyDate}</span><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label={t.journeyDate} /></label></>}
            {activeTab === "between" && <><label><span>{t.from}</span><StationInput name="from" hi={language === "hi"} value={form.from} onChange={(value) => setForm({ ...form, from: value })} /></label><span className="swap-icon"><Icon name="swap" size={19} /></span><label><span>{t.to}</span><StationInput name="to" hi={language === "hi"} value={form.to} onChange={(value) => setForm({ ...form, to: value })} /></label></>}
            {activeTab === "booking" && <label className="single-field"><span>{t.journeyDate}</span><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label={t.journeyDate} /></label>}
            <button className="primary-button" type="submit" disabled={loading}>{loading ? <span className="spinner" /> : buttonLabel} <Icon name="arrow" size={18} /></button>
          </form>
          {result?.journey && <PnrJourneyCard summary={result.journey} pnr={result.lookupPnr} hi={language === "hi"} />}
          {result && !result.journey && <div className={`search-result ${result.tone}`} aria-live="polite"><div><span>{result.eyebrow}</span><h3>{result.title}</h3><p>{result.description}</p></div>{result.details && <dl>{result.details.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}</div>}
          {result && activeTab !== "booking" && <ResultHelp hi={language === "hi"} pnr={activeTab === "pnr"} tool={activeTab === "pnr" ? "pnr-status" : activeTab === "live" ? "live-train-status" : "trains-between-stations"} code={result.code} fetchedAt={result.fetchedAt} />}
          <div className="search-footnote"><span><Icon name="shield" size={15} /> {t.noLogin}</span><span>{t.officialNote}</span></div>
        </section>
      </section>

      <AdSlot placement="top" format="970 × 90 / 320 × 100" className="top-ad" />

      <SavedPlaces hi={language === "hi"} />
      <section className="section tools-section" id="tools">
        <div className="section-heading"><div><span className="kicker">{t.toolsKicker}</span><h2>{t.toolsTitle}</h2></div><p>{t.toolsDescription}</p></div>
        <div className="tool-grid">{tools.map((tool, index) => <Link className="tool-card" key={tool.title} href={tool.href} onClick={() => trackEvent("tool_card_clicked", { tool: tool.title })}><span className={`tool-icon ${tool.accent}`}><Icon name={tool.icon} /></span><span className="tool-number">0{index + 1}</span><h3>{language === "hi" ? tool.titleHi : tool.title}</h3><p>{language === "hi" ? tool.descriptionHi : tool.description}</p><span className="tool-link">{t.openTool} <Icon name="arrow" size={16} /></span></Link>)}</div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-copy"><span className="kicker light">{t.journeyKicker}</span><h2>{t.journeyTitle}</h2><p>{t.journeyDescription}</p><ul><li><span><Icon name="pulse" size={18} /></span><div><b>{t.pulseTitle}</b><small>{t.pulseText}</small></div></li><li><span><Icon name="bell" size={18} /></span><div><b>{t.alertTitle}</b><small>{t.alertText}</small></div></li><li><span><Icon name="shield" size={18} /></span><div><b>{t.privacyTitle}</b><small>{t.privacyText}</small></div></li></ul><button className="secondary-button" onClick={() => { switchTab("pnr"); trackEvent("journey_cta_clicked"); }}>{t.journeyCta} <Icon name="arrow" size={18} /></button></div>
        <div className="journey-dashboard"><div className="dash-top"><span>{t.myJourney}</span><b><span className="live-dot" /> {t.tracking}</b></div><div className="train-title"><span>12952</span><div><h3>Mumbai Rajdhani</h3><p>New Delhi → Mumbai Central</p></div><strong>{t.onTime}</strong></div><div className="rail-progress"><i /><i /><i /><i /><span /></div><div className="station-row"><div><small>{t.depart}</small><b>NDLS</b><span>16:55</span></div><div><small>{t.next}</small><b>KOTA</b><span>21:40</span></div><div><small>{t.arrive}</small><b>MMCT</b><span>08:35</span></div></div><div className="dash-cards"><div><small>{t.pnr}</small><b>{t.confirmed}</b><span>B4 · 31 LB</span></div><div><small>{t.chartTime}</small><b>08:55 AM</b><span>{t.finalTomorrow}</span></div></div><p className="demo-note">{t.demoNote}</p><Link className="demo-action" href="/live-train-status?train=12952">{language === "hi" ? "12952 की वास्तविक स्थिति जाँचें →" : "Check the actual status of 12952 →"}</Link></div>
      </section>

      <div className="content-with-ad"><section className="section updates-section" id="updates"><div className="section-heading compact"><div><span className="kicker">{t.rulesKicker}</span><h2>{t.rulesTitle}</h2></div></div><div className="update-grid">{updates.map((update) => <article key={update.title}><span>{language === "hi" ? update.dateHi : update.date}</span><h3>{language === "hi" ? update.titleHi : update.title}</h3><b>{language === "hi" ? update.valueHi : update.value}</b><p>{language === "hi" ? update.noteHi : update.note}</p><Link href={update.href}>{t.readGuidance} <Icon name="arrow" size={15} /></Link></article>)}</div></section><AdSlot placement="square" format="300 × 250" className="square-ad" /></div>

      <section className="india-section" id="guides"><div className="india-copy"><span className="kicker">{t.indiaKicker}</span><h2>{t.indiaTitleA}<br />{t.indiaTitleB}</h2><p>{t.indiaText}</p><div className="language-pills"><span>English</span><span lang="hi">हिंदी</span></div></div><div className="principles-card"><span className="principle-number">01</span><div><b>{t.answerFirst}</b><p>{t.answerFirstText}</p></div><span className="principle-number">02</span><div><b>{t.sourceVisible}</b><p>{t.sourceVisibleText}</p></div><span className="principle-number">03</span><div><b>{t.adsRestraint}</b><p>{t.adsRestraintText}</p></div></div></section>

      <AdSlot placement="bottom" format="728 × 90 / responsive" className="bottom-ad" />
      <section className="cta-band"><div><span className="kicker light">{t.ctaKicker}</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><button onClick={() => switchTab("pnr")} className="cta-button">{t.ctaButton} <Icon name="arrow" size={18} /></button></section>
    </main>
  );
}



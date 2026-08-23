"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";

type Tone = "success" | "warning" | "error";
type Passenger = { number: string; booking: string; current: string; coach: string; berth: string };
type PnrResult = {
  tone: Tone;
  eyebrow: string;
  title: string;
  description: string;
  trainNumber?: string;
  trainName?: string;
  journeyDate?: string;
  from?: string;
  to?: string;
  travelClass?: string;
  chartStatus?: string;
  passengers?: Passenger[];
};

const content = {
  en: {
    breadcrumbHome: "Home", breadcrumbPage: "PNR status",
    kicker: "Live railway journey tool", titleA: "Check your PNR.", titleB: "Understand every status.",
    intro: "Enter the 10-digit number from your train ticket to see the latest available passenger, coach, berth and chart information.",
    private: "Your PNR is used only to fetch this result", noLogin: "No login needed", label: "10-digit PNR number", placeholder: "Example: 1234567890", button: "Check PNR status", checking: "Checking latest status", clear: "Check another PNR",
    invalid: "Enter a valid 10-digit PNR", invalidText: "Use numbers only. You can find the PNR near the top of your ticket or booking message.",
    ready: "Live connection ready", readyTitle: "Add the railway API key to activate live results.", readyText: "The secure server integration is complete. The key must be added through your hosting environment and is never shown to visitors.",
    unavailable: "Could not fetch this PNR", unavailableTitle: "The railway data service did not return a result.", unavailableText: "Check the number and try again after a moment. You can also verify it through the official Indian Railways enquiry.",
    connection: "Connection interrupted", connectionTitle: "The live service is taking longer than expected.", connectionText: "Please try again. For urgent travel decisions, use the official railway enquiry.",
    latest: "Latest available PNR response", received: "PNR status received", receivedText: "Review every passenger separately because booking and current status can be different.",
    train: "Train", journeyDate: "Journey date", route: "Journey", travelClass: "Class", chart: "Chart", passenger: "Passenger", bookingStatus: "Booking status", currentStatus: "Current status", coachBerth: "Coach / berth", notAvailable: "Not available",
    verify: "Verify on official Indian Railways", sourceNote: "RailSahayak is independent. The official railway record remains the final authority.",
    privacyTitle: "Private by design", privacyText: "The PNR is sent only to the secure railway-data route. It is not included in GA4 or Supabase analytics events.",
    guideKicker: "Read the result calmly", guideTitle: "What common PNR codes mean", guideText: "A booking code can change until chart preparation. Read the current status for each passenger, not only the original booking status.",
    howKicker: "Three simple steps", howTitle: "How this PNR checker works", step1Title: "Enter the ticket number", step1Text: "Use the 10-digit PNR printed on the ticket or booking confirmation.", step2Title: "We request the latest record", step2Text: "The request goes through a protected server route so the provider key is not exposed.", step3Title: "Review each passenger", step3Text: "Check current status, coach, berth and whether the chart has been prepared.",
    findTitle: "Where can I find my PNR?", findText: "On an e-ticket, it normally appears near the top of the booking confirmation. It may also be present in the SMS or email received after booking.",
    faqKicker: "Questions travellers ask", faqTitle: "PNR status FAQs",
    relatedKicker: "Continue your journey", relatedTitle: "Useful tools after checking PNR",
  },
  hi: {
    breadcrumbHome: "होम", breadcrumbPage: "PNR स्थिति",
    kicker: "लाइव रेलवे यात्रा टूल", titleA: "अपना PNR देखें।", titleB: "हर स्थिति को समझें।",
    intro: "यात्री की नवीनतम स्थिति, कोच, बर्थ और चार्ट जानकारी देखने के लिए टिकट का 10 अंकों वाला नंबर डालें।",
    private: "आपका PNR केवल यह परिणाम लाने के लिए उपयोग होता है", noLogin: "लॉगिन की जरूरत नहीं", label: "10 अंकों का PNR नंबर", placeholder: "उदाहरण: 1234567890", button: "PNR स्थिति देखें", checking: "नवीनतम स्थिति देखी जा रही है", clear: "दूसरा PNR देखें",
    invalid: "सही 10 अंकों का PNR डालें", invalidText: "केवल अंक डालें। PNR टिकट या बुकिंग संदेश के ऊपर मिलता है।",
    ready: "लाइव कनेक्शन तैयार है", readyTitle: "लाइव परिणाम शुरू करने के लिए रेलवे API कुंजी जोड़ें।", readyText: "सुरक्षित सर्वर इंटीग्रेशन तैयार है। कुंजी होस्टिंग सेटिंग में जोड़नी होगी और यात्रियों को दिखाई नहीं देगी।",
    unavailable: "इस PNR की जानकारी नहीं मिली", unavailableTitle: "रेलवे डेटा सेवा ने परिणाम नहीं दिया।", unavailableText: "नंबर जाँचकर कुछ देर बाद फिर प्रयास करें। आधिकारिक भारतीय रेल पूछताछ पर भी सत्यापित कर सकते हैं।",
    connection: "कनेक्शन रुक गया", connectionTitle: "लाइव सेवा अपेक्षा से अधिक समय ले रही है।", connectionText: "फिर प्रयास करें। जरूरी यात्रा निर्णय के लिए आधिकारिक रेलवे पूछताछ का उपयोग करें।",
    latest: "नवीनतम उपलब्ध PNR उत्तर", received: "PNR स्थिति मिल गई", receivedText: "हर यात्री की जानकारी अलग देखें क्योंकि बुकिंग और वर्तमान स्थिति अलग हो सकती है।",
    train: "ट्रेन", journeyDate: "यात्रा तारीख", route: "यात्रा", travelClass: "श्रेणी", chart: "चार्ट", passenger: "यात्री", bookingStatus: "बुकिंग स्थिति", currentStatus: "वर्तमान स्थिति", coachBerth: "कोच / बर्थ", notAvailable: "उपलब्ध नहीं",
    verify: "आधिकारिक भारतीय रेल पर सत्यापित करें", sourceNote: "RailSahayak एक स्वतंत्र सेवा है। आधिकारिक रेलवे रिकॉर्ड ही अंतिम मान्य स्रोत है।",
    privacyTitle: "गोपनीयता पहले", privacyText: "PNR केवल सुरक्षित रेलवे डेटा रूट को भेजा जाता है। इसे GA4 या Supabase एनालिटिक्स में शामिल नहीं किया जाता।",
    guideKicker: "स्थिति को आसानी से समझें", guideTitle: "सामान्य PNR कोड का अर्थ", guideText: "चार्ट बनने तक बुकिंग कोड बदल सकता है। केवल शुरुआती बुकिंग स्थिति नहीं, हर यात्री की वर्तमान स्थिति देखें।",
    howKicker: "तीन आसान चरण", howTitle: "यह PNR चेकर कैसे काम करता है", step1Title: "टिकट नंबर डालें", step1Text: "टिकट या बुकिंग पुष्टिकरण पर दिया गया 10 अंकों का PNR इस्तेमाल करें।", step2Title: "नवीनतम रिकॉर्ड माँगा जाता है", step2Text: "अनुरोध सुरक्षित सर्वर रूट से जाता है, इसलिए प्रदाता की कुंजी दिखाई नहीं देती।", step3Title: "हर यात्री की स्थिति देखें", step3Text: "वर्तमान स्थिति, कोच, बर्थ और चार्ट तैयार हुआ है या नहीं—सब जाँचें।",
    findTitle: "PNR कहाँ मिलेगा?", findText: "ई-टिकट में यह आम तौर पर बुकिंग पुष्टिकरण के ऊपर दिखाई देता है। बुकिंग के बाद आए SMS या ईमेल में भी मिल सकता है।",
    faqKicker: "यात्रियों के सामान्य सवाल", faqTitle: "PNR स्थिति से जुड़े सवाल",
    relatedKicker: "यात्रा आगे बढ़ाएँ", relatedTitle: "PNR देखने के बाद उपयोगी टूल्स",
  },
};

const statusCodes = [
  ["CNF", "Confirmed", "कन्फर्म", "A confirmed accommodation. Coach and berth may appear after allocation.", "सीट कन्फर्म है। कोच और बर्थ आवंटन के बाद दिख सकते हैं।"],
  ["RAC", "Reservation Against Cancellation", "रद्दीकरण के विरुद्ध आरक्षण", "Travel is generally permitted with shared accommodation until a full berth becomes available.", "आम तौर पर यात्रा की अनुमति होती है; पूरी बर्थ मिलने तक साझा सीट हो सकती है।"],
  ["WL", "Waiting List", "प्रतीक्षा सूची", "Not confirmed yet. The final position can change until chart preparation.", "अभी कन्फर्म नहीं है। चार्ट बनने तक स्थिति बदल सकती है।"],
  ["GNWL", "General Waiting List", "सामान्य प्रतीक्षा सूची", "A common waitlist category linked to the journey and booking quota.", "यात्रा और बुकिंग कोटा से जुड़ी सामान्य प्रतीक्षा सूची।"],
  ["RLWL", "Remote Location Waiting List", "रिमोट लोकेशन प्रतीक्षा सूची", "Waitlist for certain intermediate or remote-location station quotas.", "कुछ बीच के या रिमोट स्टेशन कोटा की प्रतीक्षा सूची।"],
  ["PQWL", "Pooled Quota Waiting List", "पूल्ड कोटा प्रतीक्षा सूची", "A waitlist under a pooled quota shared by selected stations.", "चुनिंदा स्टेशनों के साझा पूल्ड कोटा की प्रतीक्षा सूची।"],
  ["TQWL", "Tatkal Waiting List", "तत्काल प्रतीक्षा सूची", "Waiting status for a Tatkal quota booking.", "तत्काल कोटा बुकिंग की प्रतीक्षा स्थिति।"],
  ["CAN", "Cancelled", "रद्द", "The passenger or ticket entry has been cancelled.", "यात्री या टिकट प्रविष्टि रद्द हो चुकी है।"],
] as const;

const faqs = [
  ["What is a railway PNR number?", "रेलवे PNR नंबर क्या है?", "PNR means Passenger Name Record. Indian railway reservations use a 10-digit number to identify the booking record.", "PNR का अर्थ Passenger Name Record है। भारतीय रेलवे आरक्षण में बुकिंग रिकॉर्ड पहचानने के लिए 10 अंकों का नंबर होता है।"],
  ["Can PNR status change after booking?", "क्या बुकिंग के बाद PNR स्थिति बदल सकती है?", "Yes. Waiting-list and RAC positions can change as passengers cancel or railway allocation changes, including around chart preparation.", "हाँ। यात्रियों के टिकट रद्द करने या रेलवे आवंटन बदलने से WL और RAC स्थिति, चार्ट बनने तक, बदल सकती है।"],
  ["What does chart prepared mean?", "चार्ट तैयार होने का क्या अर्थ है?", "It means the reservation chart for the train has been prepared. Check the current passenger status and official record for the final travel position.", "इसका अर्थ है कि ट्रेन का आरक्षण चार्ट तैयार हो गया है। अंतिम यात्रा स्थिति के लिए वर्तमान यात्री स्थिति और आधिकारिक रिकॉर्ड देखें।"],
  ["Can I travel on a waitlisted ticket?", "क्या वेटलिस्ट टिकट पर यात्रा कर सकते हैं?", "Eligibility depends on the ticket type, final chart status and current railway rules. Do not rely on a generic answer—verify the final status through the official railway enquiry before boarding.", "यात्रा की अनुमति टिकट प्रकार, अंतिम चार्ट स्थिति और मौजूदा रेलवे नियमों पर निर्भर करती है। चढ़ने से पहले आधिकारिक रेलवे पूछताछ से अंतिम स्थिति सत्यापित करें।"],
  ["Does RailSahayak save my PNR?", "क्या RailSahayak मेरा PNR सेव करता है?", "The implementation does not send the PNR to GA4 or Supabase analytics. The number is used only in the live lookup request.", "यह व्यवस्था PNR को GA4 या Supabase एनालिटिक्स में नहीं भेजती। नंबर केवल लाइव जानकारी माँगने के लिए उपयोग होता है।"],
] as const;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function textValue(record: Record<string, unknown>, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  }
  return fallback;
}

function mapPassengers(source: Record<string, unknown>, fallback: string): Passenger[] {
  const raw = [source.passengers, source.passengerList, source.passengerStatus].find(Array.isArray) as unknown[] | undefined;
  if (!raw) return [];
  return raw.map((item, index) => {
    const passenger = asRecord(item) ?? {};
    const coach = textValue(passenger, ["coach", "coachNumber", "currentCoach"], fallback);
    const berth = textValue(passenger, ["berth", "berthNumber", "currentBerth", "berthType"], fallback);
    return {
      number: textValue(passenger, ["number", "passengerNumber", "no"], String(index + 1)),
      booking: textValue(passenger, ["bookingStatus", "booking_status", "bookStatus"], fallback),
      current: textValue(passenger, ["currentStatus", "current_status", "status"], fallback),
      coach,
      berth: coach === fallback && berth === fallback ? fallback : [coach, berth].filter((value) => value !== fallback).join(" · "),
    };
  });
}

function mapPnrPayload(payload: Record<string, unknown>, hi: boolean, fallback: string): PnrResult {
  const source = asRecord(payload.data) ?? asRecord(payload.result) ?? payload;
  const trainNumber = textValue(source, ["trainNumber", "trainNo", "train_number"]);
  const trainName = textValue(source, ["trainName", "train_name"]);
  const status = textValue(source, ["status", "currentStatus"]);
  return {
    tone: "success",
    eyebrow: hi ? "नवीनतम उपलब्ध PNR उत्तर" : "Latest available PNR response",
    title: trainName || status || (hi ? "PNR स्थिति मिल गई" : "PNR status received"),
    description: hi ? "हर यात्री की वर्तमान स्थिति, कोच और बर्थ अलग से जाँचें।" : "Check every passenger’s current status, coach and berth separately.",
    trainNumber,
    trainName,
    journeyDate: textValue(source, ["dateOfJourney", "journeyDate", "doj", "travelDate"]),
    from: textValue(source, ["boardingPoint", "from", "sourceStation", "source"]),
    to: textValue(source, ["reservationUpto", "to", "destinationStation", "destination"]),
    travelClass: textValue(source, ["class", "journeyClass", "travelClass"]),
    chartStatus: textValue(source, ["chartStatus", "chartPrepared", "chart_status"]),
    passengers: mapPassengers(source, fallback),
  };
}

export function PnrStatusClient() {
  const { language } = useLanguage();
  const t = content[language];
  const hi = language === "hi";
  const [pnr, setPnr] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PnrResult | null>(null);
  const officialPnrUrl = "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en";

  useEffect(() => { trackEvent("pnr_page_view", { language }); }, [language]);
  const trainLabel = useMemo(() => [result?.trainNumber, result?.trainName].filter(Boolean).join(" · "), [result]);

  async function checkPnr(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{10}$/.test(pnr)) {
      setResult({ tone: "error", eyebrow: t.invalid, title: t.invalid, description: t.invalidText });
      trackEvent("pnr_validation_error", { reason: "invalid_length" });
      return;
    }
    setLoading(true); setResult(null); trackEvent("pnr_lookup_submitted");
    try {
      const response = await fetch(`/api/rail?action=pnr&pnr=${encodeURIComponent(pnr)}`, { cache: "no-store" });
      const payload = (await response.json()) as Record<string, unknown>;
      if (!response.ok) {
        const notConfigured = payload.code === "PROVIDER_NOT_CONFIGURED";
        setResult({ tone: notConfigured ? "warning" : "error", eyebrow: notConfigured ? t.ready : t.unavailable, title: notConfigured ? t.readyTitle : t.unavailableTitle, description: notConfigured ? t.readyText : t.unavailableText });
        trackEvent("pnr_lookup_result", { outcome: notConfigured ? "provider_not_configured" : "provider_error" });
        return;
      }
      setResult(mapPnrPayload(payload, hi, t.notAvailable));
      trackEvent("pnr_lookup_result", { outcome: "success" });
    } catch {
      setResult({ tone: "error", eyebrow: t.connection, title: t.connectionTitle, description: t.connectionText });
      trackEvent("pnr_lookup_result", { outcome: "network_error" });
    } finally { setLoading(false); }
  }

  function reset() { setPnr(""); setResult(null); document.getElementById("pnr-number")?.focus(); }

  return <main className="tool-page pnr-page">
    <section className="pnr-hero">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">{t.breadcrumbHome}</Link><span>/</span><span>{t.breadcrumbPage}</span></nav>
      <div className="pnr-hero-copy"><span className="kicker"><span className="live-dot" />{t.kicker}</span><h1>{t.titleA}<br /><em>{t.titleB}</em></h1><p>{t.intro}</p><div className="pnr-trust"><span><Icon name="shield" size={17} />{t.private}</span><span><Icon name="ticket" size={17} />{t.noLogin}</span></div></div>

      <div className="pnr-tool-card">
        <div className="tool-card-heading"><span><Icon name="ticket" size={22} /></span><div><b>{t.breadcrumbPage}</b><small>{hi ? "10 अंकों का नंबर" : "10-digit ticket number"}</small></div></div>
        <form onSubmit={checkPnr} className="pnr-form" noValidate>
          <label htmlFor="pnr-number">{t.label}</label>
          <div className="pnr-input-row"><input id="pnr-number" name="pnr" inputMode="numeric" autoComplete="off" maxLength={10} value={pnr} onChange={(event) => { setPnr(event.target.value.replace(/\D/g, "")); if (result?.tone === "error") setResult(null); }} placeholder={t.placeholder} aria-describedby="pnr-privacy-note" /><button type="submit" disabled={loading}>{loading ? <><span className="spinner" />{t.checking}</> : <>{t.button}<Icon name="arrow" size={18} /></>}</button></div>
          <p id="pnr-privacy-note"><Icon name="shield" size={14} />{t.private}</p>
        </form>
      </div>

      {result && <section className={`pnr-result ${result.tone}`} aria-live="polite">
        <div className="pnr-result-head"><div><span>{result.eyebrow}</span><h2>{trainLabel || result.title}</h2><p>{result.description}</p></div><button onClick={reset}>{t.clear}</button></div>
        {result.tone === "success" && <>
          <dl className="pnr-summary">
            <div><dt>{t.train}</dt><dd>{trainLabel || t.notAvailable}</dd></div>
            <div><dt>{t.journeyDate}</dt><dd>{result.journeyDate || t.notAvailable}</dd></div>
            <div><dt>{t.route}</dt><dd>{result.from || result.to ? `${result.from || "—"} → ${result.to || "—"}` : t.notAvailable}</dd></div>
            <div><dt>{t.travelClass}</dt><dd>{result.travelClass || t.notAvailable}</dd></div>
            <div><dt>{t.chart}</dt><dd>{result.chartStatus || t.notAvailable}</dd></div>
          </dl>
          {result.passengers && result.passengers.length > 0 && <div className="passenger-table-wrap"><table className="passenger-table"><thead><tr><th>{t.passenger}</th><th>{t.bookingStatus}</th><th>{t.currentStatus}</th><th>{t.coachBerth}</th></tr></thead><tbody>{result.passengers.map((passenger) => <tr key={passenger.number}><td data-label={t.passenger}>{passenger.number}</td><td data-label={t.bookingStatus}>{passenger.booking}</td><td data-label={t.currentStatus}><strong>{passenger.current}</strong></td><td data-label={t.coachBerth}>{passenger.berth}</td></tr>)}</tbody></table></div>}
        </>}
        <div className="result-actions"><a href={officialPnrUrl} target="_blank" rel="noreferrer">{t.verify}<Icon name="external" size={15} /></a><span>{t.sourceNote}</span></div>
      </section>}
    </section>

    <AdSlot placement="top" format="970 × 90 / 320 × 100" className="tool-page-ad" />

    <section className="pnr-guide-section">
      <div className="pnr-section-heading"><span className="kicker">{t.guideKicker}</span><h2>{t.guideTitle}</h2><p>{t.guideText}</p></div>
      <div className="status-code-grid">{statusCodes.map(([code, enTitle, hiTitle, enText, hiText]) => <article key={code}><span>{code}</span><div><h3>{hi ? hiTitle : enTitle}</h3><p>{hi ? hiText : enText}</p></div></article>)}</div>
    </section>

    <div className="pnr-content-ad-layout"><section className="pnr-how-section"><div className="pnr-section-heading"><span className="kicker">{t.howKicker}</span><h2>{t.howTitle}</h2></div><div className="how-steps"><article><span>01</span><div><h3>{t.step1Title}</h3><p>{t.step1Text}</p></div></article><article><span>02</span><div><h3>{t.step2Title}</h3><p>{t.step2Text}</p></div></article><article><span>03</span><div><h3>{t.step3Title}</h3><p>{t.step3Text}</p></div></article></div><aside className="find-pnr-card"><Icon name="ticket" size={24} /><div><h3>{t.findTitle}</h3><p>{t.findText}</p></div></aside></section><AdSlot placement="square" format="300 × 250" className="pnr-square-ad" /></div>

    <section className="privacy-panel"><span><Icon name="shield" size={25} /></span><div><h2>{t.privacyTitle}</h2><p>{t.privacyText}</p></div></section>

    <section className="pnr-faq-section"><div className="pnr-section-heading"><span className="kicker">{t.faqKicker}</span><h2>{t.faqTitle}</h2></div><div className="faq-list">{faqs.map(([enQuestion, hiQuestion, enAnswer, hiAnswer], index) => <details key={enQuestion}><summary><span>0{index + 1}</span>{hi ? hiQuestion : enQuestion}<Icon name="chevron" size={18} /></summary><p>{hi ? hiAnswer : enAnswer}</p></details>)}</div></section>

    <section className="related-tools"><div><span className="kicker light">{t.relatedKicker}</span><h2>{t.relatedTitle}</h2></div><div><Link href="/live-train-status"><Icon name="pulse" size={19} />{hi ? "लाइव ट्रेन स्थिति" : "Live train status"}<Icon name="arrow" size={16} /></Link><Link href="/chart-preparation-calculator"><Icon name="chart" size={19} />{hi ? "चार्ट तैयारी" : "Chart preparation"}<Icon name="arrow" size={16} /></Link><Link href="/seat-berth-finder"><Icon name="seat" size={19} />{hi ? "बर्थ पहचानें" : "Berth finder"}<Icon name="arrow" size={16} /></Link></div></section>
  </main>;
}

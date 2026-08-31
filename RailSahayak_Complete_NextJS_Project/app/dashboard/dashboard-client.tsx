"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { FormEvent, useState } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import { railRequest, railError, pnrSummary, liveSummary, railData, rows, scalar, stationCode } from "@/lib/rail-data";

type JourneyData = { pnr?: Record<string, unknown>; schedule?: Record<string, unknown>; live?: Record<string, unknown>; between?: Record<string, unknown>; train?: string; source?: string; destination?: string; date?: string; errors: string[] };
type Card = { number: string; title: string; value: string; note: string; confidence: "provider" | "estimate" | "official" | "pending"; icon: string; href?: string };

async function rail(params: URLSearchParams, hi: boolean) {
  try { const { ok, payload } = await railRequest(params); return { ok, payload, error: ok ? undefined : railError(payload, hi).message }; }
  catch { return { ok: false, payload: {}, error: hi ? "लाइव कनेक्शन नहीं हुआ" : "Live connection failed" }; }
}

export function DashboardClient() {
  const { language } = useLanguage(); const hi = language === "hi";
  const [mode, setMode] = useState<"pnr" | "manual">("pnr");
  const [form, setForm] = useState({ pnr: "", train: "", source: "", destination: "", date: "" });
  const [loading, setLoading] = useState(false); const [journey, setJourney] = useState<JourneyData | null>(null); const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setMessage(""); setJourney(null);
    if (mode === "pnr" && !/^\d{10}$/.test(form.pnr)) { setMessage(hi ? "सही 10 अंकों का PNR डालें।" : "Enter a valid 10-digit PNR."); return; }
    if (mode === "manual" && (!/^\d{5}$/.test(form.train) || !/^[a-z0-9]{2,6}$/i.test(form.source) || !/^[a-z0-9]{2,6}$/i.test(form.destination) || !form.date)) { setMessage(hi ? "ट्रेन, स्टेशन कोड और तारीख जाँचें।" : "Check the train number, station codes and date."); return; }
    setLoading(true); const next: JourneyData = mode === "manual" ? { errors: [], train: form.train, source: form.source.toUpperCase(), destination: form.destination.toUpperCase(), date: form.date } : { errors: [] };
    try {
      if (mode === "pnr") {
        const result = await rail(new URLSearchParams({ action: "pnr", pnr: form.pnr }), hi);
        if (result.ok) { const pnr = pnrSummary(result.payload); next.pnr = result.payload; next.train = pnr.trainNumber; next.source = pnr.fromCode; next.destination = pnr.toCode; next.date = pnr.journeyDate; } else next.errors.push(result.error ?? "PNR unavailable");
      }
      if (next.train && /^\d{5}$/.test(next.train)) {
        const schedule = await rail(new URLSearchParams({ action: "schedule", train: next.train }), hi);
        if (schedule.ok) next.schedule = schedule.payload; else next.errors.push(schedule.error ?? "Schedule unavailable");
        const stop = rows(railData(next.schedule).route).find((row) => stationCode(row.station ?? row) === next.source);
        const day = Number(stop?.departureDay ?? stop?.arrivalDay ?? stop?.day);
        const liveParams = new URLSearchParams({ action: "live", train: next.train });
        // PNR date is the boarding date; the live endpoint expects the train's origin date.
        if (next.date && /^\d{4}-\d{2}-\d{2}$/.test(next.date) && Number.isInteger(day) && day >= 1) {
          const start = new Date(`${next.date}T12:00:00Z`); start.setUTCDate(start.getUTCDate() - (day - 1));
          if (!Number.isNaN(start.valueOf())) liveParams.set("date", start.toISOString().slice(0, 10));
        }
        if (liveParams.has("date")) {
          const live = await rail(liveParams, hi);
          if (live.ok) next.live = live.payload; else next.errors.push(live.error ?? "Live status unavailable");
        } else next.errors.push(hi ? "ट्रेन की मूल प्रस्थान तारीख सत्यापित नहीं हुई; इस यात्रा की लाइव स्थिति नहीं दिखाई गई।" : "The train's origin date could not be verified, so live status for this journey is unavailable.");
      }
      setJourney({ ...next }); trackEvent("journey_dashboard_loaded", { mode, live_sources: [next.pnr, next.schedule, next.live, next.between].filter(Boolean).length });
    } catch { setMessage(hi ? "डैशबोर्ड अभी नहीं बन सका। फिर प्रयास करें।" : "The dashboard could not be assembled. Please try again."); }
    finally { setLoading(false); }
  }

  const cards = journey ? makeCards(journey, form.pnr, hi) : [];
  return <main className="dashboard-page"><section className="dashboard-hero"><nav className="breadcrumbs"><Link href="/">{hi ? "होम" : "Home"}</Link><span>/</span><span>{hi ? "मेरी यात्रा" : "My journey"}</span></nav><div className="dashboard-copy"><span className="kicker"><Icon name="chart" size={17} />{hi ? "एक यात्रा, एक स्क्रीन" : "One journey, one screen"}</span><h1>{hi ? "आपकी यात्रा।" : "Your journey."}<br /><em>{hi ? "साफ़ और तैयार।" : "Clear and ready."}</em></h1><p>{hi ? "PNR या ट्रेन और रूट डालें। स्थिति, समय, चार्ट, रिफंड, कोच और जरूरी लिंक एक जगह देखें।" : "Enter a PNR or train and route. Combine status, timing, chart, refund, coach and useful links in one place."}</p></div><form className="dashboard-form" onSubmit={submit}><div className="dashboard-tabs"><button type="button" className={mode === "pnr" ? "active" : ""} onClick={() => setMode("pnr")}><Icon name="ticket" size={17} />PNR</button><button type="button" className={mode === "manual" ? "active" : ""} onClick={() => setMode("manual")}><Icon name="train" size={17} />{hi ? "ट्रेन और रूट" : "Train & route"}</button></div>{mode === "pnr" ? <label><span>{hi ? "10 अंकों का PNR" : "10-digit PNR"}</span><input inputMode="numeric" maxLength={10} value={form.pnr} onChange={(event) => setForm({ ...form, pnr: event.target.value.replace(/\D/g, "") })} placeholder="1234567890" /></label> : <div className="dashboard-manual-fields"><label><span>{hi ? "ट्रेन नंबर" : "Train number"}</span><input inputMode="numeric" maxLength={5} value={form.train} onChange={(event) => setForm({ ...form, train: event.target.value.replace(/\D/g, "") })} placeholder="12951" /></label><label><span>{hi ? "कहाँ से" : "From"}</span><input maxLength={6} value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value.toUpperCase() })} placeholder="NDLS" /></label><label><span>{hi ? "कहाँ तक" : "To"}</span><input maxLength={6} value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value.toUpperCase() })} placeholder="MMCT" /></label><label><span>{hi ? "तारीख" : "Date"}</span><input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label></div>}<button className="dashboard-submit" disabled={loading}>{loading ? <><span className="spinner" />{hi ? "यात्रा बन रही है" : "Building journey"}</> : <>{hi ? "मेरा डैशबोर्ड बनाएँ" : "Build my dashboard"}<Icon name="arrow" size={18} /></>}</button>{message && <p className="dashboard-message">{message}</p>}<small><Icon name="shield" size={13} />{hi ? "PNR एनालिटिक्स में नहीं भेजा जाता।" : "PNR is never sent to analytics."}</small></form></section><AdSlot placement="top" format="970 × 90 / 320 × 100" />
    {journey ? <section className="dashboard-results"><div className="dashboard-result-head"><div><span className="kicker">{hi ? "यात्रा सारांश" : "Journey summary"}</span><h2>{journey.train ? `${hi ? "ट्रेन" : "Train"} ${journey.train}` : (hi ? "आपकी रेल यात्रा" : "Your rail journey")}</h2><p>{[journey.source, journey.destination].filter(Boolean).join(" → ") || (hi ? "PNR से उपलब्ध नवीनतम जानकारी" : "Latest information available from the PNR")}</p></div><span className="dashboard-refreshed"><span className="live-dot" />{hi ? "अभी जाँचा गया" : "Checked just now"}</span></div>{journey.errors.length > 0 && <div className="dashboard-partial"><Icon name="info" size={18} /><span><b>{hi ? "आंशिक जानकारी" : "Partial information"}</b>{hi ? "कुछ प्रदाता डेटा उपलब्ध नहीं था। खाली भाग आधिकारिक माध्यम से सत्यापित करें।" : "Some provider data was unavailable. Verify missing items through official channels."}</span></div>}<div className="dashboard-card-grid">{cards.map((card) => <article key={card.number}><span className="dashboard-card-icon"><Icon name={card.icon} size={20} /></span><div className={`confidence ${card.confidence}`}>{confidenceLabel(card.confidence, hi)}</div><small>{card.number}</small><h3>{card.title}</h3><strong>{card.value}</strong><p>{card.note}</p>{card.href && <Link href={card.href}>{hi ? "खोलें" : "Open"}<Icon name="arrow" size={14} /></Link>}</article>)}</div></section> : <section className="dashboard-empty"><span><Icon name="chart" size={28} /></span><div><h2>{hi ? "दस जरूरी उत्तर आपका इंतजार कर रहे हैं।" : "Ten useful answers, ready for your journey."}</h2><p>{hi ? "ऊपर PNR या यात्रा जानकारी डालें। जहाँ लाइव डेटा उपलब्ध नहीं होगा, हम उसे स्पष्ट रूप से बताएँगे—कल्पित परिणाम नहीं दिखाएँगे।" : "Enter a PNR or journey details above. If live data is unavailable, we say so clearly—never presenting sample data as real."}</p></div></section>}
  </main>;
}

function confidenceLabel(value: Card["confidence"], hi: boolean) { return value === "provider" ? (hi ? "प्रदाता डेटा" : "Provider data") : value === "estimate" ? (hi ? "योजना अनुमान" : "Planning estimate") : value === "official" ? (hi ? "आधिकारिक लिंक" : "Official link") : (hi ? "अभी उपलब्ध नहीं" : "Not available"); }
function makeCards(data: JourneyData, pnr: string, hi: boolean): Card[] {
  const p = pnrSummary(data.pnr), live = liveSummary(data.live);
  const stop = rows(railData(data.schedule).route).find((r) => stationCode(r.station ?? r) === data.source);
  const liveStop = live.route.find((r) => stationCode(r.station ?? r) === data.source);
  const scheduled = scalar(liveStop?.scheduledDeparture, stop?.departure);
  const expected = scalar(liveStop?.actualDeparture, liveStop?.expectedDeparture);
  const platform = scalar(liveStop?.platform);
  const accommodation = p.passengers.map((person) => { const value = [person.coach, person.berth, person.berthCode].filter(Boolean).join(" · "); return value ? `P${person.number}: ${value}` : ""; }).filter(Boolean).join(" / ");
  const unavailable = hi ? "उपलब्ध नहीं" : "Not available";
  return [
    { number: "01", title: hi ? "PNR और कन्फर्मेशन" : "PNR & confirmation", value: p.status || unavailable, note: data.pnr && pnr ? `PNR ••••••${pnr.slice(-4)}` : (hi ? "PNR परिणाम उपलब्ध नहीं" : "No PNR result available"), confidence: p.status ? "provider" : "pending", icon: "ticket", href: "/pnr-status" },
    { number: "02", title: hi ? "ट्रेन रनिंग स्थिति" : "Train running status", value: live.status || unavailable, note: [live.current || live.previous, live.next && `${hi ? "अगला" : "Next"}: ${live.next}`].filter(Boolean).join(" · "), confidence: live.status ? "provider" : "pending", icon: "pulse", href: "/live-train-status" },
    { number: "03", title: hi ? "बोर्डिंग स्टेशन से प्रस्थान" : "Departure from boarding station", value: scheduled ? `${scheduled} → ${expected || unavailable}` : unavailable, note: hi ? "निर्धारित → वास्तविक/अपेक्षित। सभी समय IST हैं।" : "Scheduled → actual/expected. All times are IST.", confidence: scheduled ? "provider" : "pending", icon: "clock", href: data.train ? `/train/${data.train}` : "/train-schedule" },
    { number: "04", title: hi ? "चार्ट स्थिति" : "Chart status", value: p.chartStatus || unavailable, note: hi ? "चार्ट समय कैलकुलेटर केवल अनुमान देता है" : "The chart-time calculator provides an estimate only", confidence: p.chartStatus ? "provider" : "pending", icon: "chart", href: "/chart-preparation-calculator" },
    { number: "05", title: hi ? "रद्दीकरण और रिफंड" : "Cancellation & refund", value: hi ? "समय-सीमा और अनुमान निकालें" : "Calculate deadline and estimate", note: hi ? "अंतिम कटौती आधिकारिक नियम पर निर्भर" : "Final deduction depends on official rules", confidence: "estimate", icon: "refund", href: "/refund-calculator" },
    { number: "06", title: hi ? "हर यात्री का कोच और बर्थ" : "Coach & berth by passenger", value: accommodation || unavailable, note: hi ? "अंतिम आवंटन चार्ट में बदल सकता है" : "Final allocation may change at charting", confidence: accommodation ? "provider" : "pending", icon: "seat", href: "/seat-berth-finder" },
    { number: "07", title: hi ? "बोर्डिंग प्लेटफॉर्म" : "Boarding platform", value: platform || unavailable, note: hi ? "स्टेशन डिस्प्ले और घोषणा अंतिम मानें" : "Station display and announcement take priority", confidence: platform ? "provider" : "pending", icon: "pin", href: "/platform-number" },
    { number: "08", title: hi ? "बोर्डिंग स्टेशन" : "Boarding station", value: p.from || data.source || unavailable, note: data.date || (hi ? "टिकट पर तारीख जाँचें" : "Check the date on your ticket"), confidence: p.from ? "provider" : data.source ? "estimate" : "pending", icon: "route" },
    { number: "09", title: hi ? "कैलेंडर रिमाइंडर" : "Calendar reminders", value: hi ? "बुकिंग और तत्काल" : "Booking and Tatkal", note: hi ? "PNR ईमेल अलर्ट जल्द आ रहे हैं" : "PNR email alerts are coming soon", confidence: "estimate", icon: "bell", href: "/booking-reminders" },
    { number: "10", title: hi ? "आधिकारिक सत्यापन" : "Official verification", value: "IRCTC · NTES · RailMadad", note: hi ? "बुकिंग, लाइव पूछताछ और सहायता" : "Booking, live enquiry and assistance", confidence: "official", icon: "external", href: "/official-services" },
  ];
}

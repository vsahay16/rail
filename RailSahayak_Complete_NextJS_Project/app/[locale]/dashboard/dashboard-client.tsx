"use client";
import { ToolQueryPrefill } from "@/components/tool-query-prefill";
import type { SavedTrip } from "@/lib/saved-trips";
import { TripSummary, type JourneyData } from "./trip-summary";
import { extraInputProblem } from "@/lib/railkit-tools";
import { SavedTrips } from "@/components/saved-trips";
import { parseJourneyDate } from "@/lib/seat-availability";
import { PageGuidance } from "@/components/page-guidance";

import { LocalizedLink as Link } from "@/components/localized-link";
import { FormEvent, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import { railRequest, railError, pnrSummary, railData, rows, stationCode } from "@/lib/rail-data";

type JourneyRequest = { pnr: string; trip?: never } | { trip: SavedTrip; pnr?: never };
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

  const prefill = useCallback((query: URLSearchParams) => {
    const train = query.get("train") ?? "";
    const source = query.get("from") ?? "";
    const destination = query.get("to") ?? "";
    const date = parseJourneyDate(query.get("date"));
    if (!/^\d{5}$/.test(train) || !/^[A-Z0-9]{1,5}$/.test(source)
      || !/^[A-Z0-9]{1,5}$/.test(destination) || source === destination || !date) return;
    setMode("manual");
    setForm({ pnr: "", train, source, destination, date });
    setJourney(null);
  }, []);

  const active = useRef(false);
  const lastRequest = useRef<JourneyRequest | null>(null);
  const focusSummary = useRef(false);

  useEffect(() => {
    if (!journey || loading || !focusSummary.current) return;
    focusSummary.current = false;
    const summary = document.getElementById("trip-summary");
    summary?.focus({ preventScroll: true });
    summary?.scrollIntoView({ block: "start" });
  }, [journey, loading]);

  async function loadJourney(request: JourneyRequest, refresh = false) {
    if (active.current) return;
    active.current = true;
    lastRequest.current = request;
    focusSummary.current = !refresh;
    setLoading(true);
    setMessage("");
    if (!refresh) setJourney(null);
    const trip = request.trip;
    const next: JourneyData = {
      errors: [], train: trip?.train, name: trip?.name, source: trip?.from, destination: trip?.to,
      date: trip?.boardingDate, originDate: trip?.originDate, travelClass: trip?.travelClass, quota: trip?.quota,
    };
    try {
      if (request.pnr) {
        const result = await rail(new URLSearchParams({ action: "pnr", pnr: request.pnr }), hi);
        if (result.ok) {
          const pnr = pnrSummary(result.payload);
          next.pnr = result.payload;
          next.train = pnr.trainNumber;
          next.name = pnr.trainName;
          next.source = pnr.fromCode;
          next.destination = pnr.toCode;
          next.date = parseJourneyDate(pnr.journeyDate) ?? undefined;
        } else {
          next.errors.push(result.error ?? (hi ? "PNR उपलब्ध नहीं" : "PNR unavailable"));
        }
      }
      if (next.train && /^\d{5}$/.test(next.train)) {
        const schedule = await rail(new URLSearchParams({ action: "schedule", train: next.train }), hi);
        if (schedule.ok) next.schedule = schedule.payload;
        else next.errors.push(schedule.error ?? (hi ? "समय-सारणी उपलब्ध नहीं" : "Timetable unavailable"));
        if (!next.originDate && next.date && next.source) {
          const stop = rows(railData(next.schedule).route).find(row => stationCode(row.station ?? row) === next.source);
          const day = Number(stop?.departureDay ?? stop?.arrivalDay ?? stop?.day);
          if (Number.isInteger(day) && day >= 1 && day <= 30) {
            const start = new Date(`${next.date}T12:00:00Z`);
            start.setUTCDate(start.getUTCDate() - (day - 1));
            next.originDate = start.toISOString().slice(0, 10);
          }
        }
        if (next.originDate) {
          const params = new URLSearchParams({ action: "live", train: next.train, date: next.originDate });
          if (extraInputProblem("live", params)) {
            next.errors.push(hi ? "लाइव स्थिति मूल स्टेशन से प्रस्थान की आज और पिछली पाँच तारीखों के लिए उपलब्ध है। समय-सारणी नीचे देखें।" : "Live tracking covers today and the previous five origin-departure dates. Use the timetable to plan future trips.");
          } else {
            const result = await rail(params, hi);
            if (result.ok) next.live = result.payload;
            else next.errors.push(result.error ?? (hi ? "लाइव स्थिति उपलब्ध नहीं" : "Live status unavailable"));
          }
        } else {
          next.errors.push(hi ? "मूल स्टेशन से प्रस्थान की तारीख नहीं मिली। लाइव जाँच में सही तारीख चुनें।" : "The origin-departure date could not be verified. Choose it in the live train tool.");
        }
      }
      setJourney(next);
      trackEvent("journey_dashboard_loaded", { mode: request.pnr ? "pnr" : "manual", live_sources: [next.pnr, next.schedule, next.live].filter(Boolean).length });
    } catch {
      setMessage(hi ? "यात्रा जाँच पूरी नहीं हुई। फिर प्रयास करें।" : "The journey check could not finish. Try again.");
    } finally {
      active.current = false;
      setLoading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (mode === "pnr") {
      if (!/^\d{10}$/.test(form.pnr)) {
        setMessage(hi ? "सही 10 अंकों का PNR डालें।" : "Enter a valid 10-digit PNR.");
        return;
      }
      void loadJourney({ pnr: form.pnr });
      return;
    }
    const from = form.source.trim().toUpperCase();
    const to = form.destination.trim().toUpperCase();
    const date = parseJourneyDate(form.date);
    if (!/^\d{5}$/.test(form.train) || !/^[A-Z0-9]{1,5}$/.test(from) || !/^[A-Z0-9]{1,5}$/.test(to) || from === to || !date) {
      setMessage(hi ? "ट्रेन, स्टेशन कोड और तारीख जाँचें।" : "Check the train number, station codes and date.");
      return;
    }
    void loadJourney({ trip: { train: form.train, from, to, boardingDate: date } });
  }

  function openSavedTrip(trip: SavedTrip) {
    setMode("manual");
    setForm({ pnr: "", train: trip.train, source: trip.from ?? "", destination: trip.to ?? "", date: trip.boardingDate ?? "" });
    void loadJourney({ trip });
  }

  const cards = journey ? makeCards(journey, hi) : [];
  return <main data-mobile-refresh className="dashboard-page"><Suspense fallback={null}><ToolQueryPrefill onPrefill={prefill} /></Suspense><section className="dashboard-hero" id="journey-start"><nav className="breadcrumbs"><Link href="/">{hi ? "होम" : "Home"}</Link><span>/</span><span>{hi ? "मेरी यात्रा" : "My journey"}</span></nav><div className="dashboard-copy"><span className="kicker"><Icon name="chart" size={17} />{hi ? "एक यात्रा, एक स्क्रीन" : "One journey, one screen"}</span><h1>{hi ? "आपकी यात्रा।" : "Your journey."}<br /><em>{hi ? "साफ़ और तैयार।" : "Clear and ready."}</em></h1><p>{hi ? "PNR या ट्रेन और रूट डालें। स्थिति, समय, चार्ट, रिफंड, कोच और जरूरी लिंक एक जगह देखें।" : "Enter a PNR or train and route. Combine status, timing, chart, refund, coach and useful links in one place."}</p></div><form className="dashboard-form" onSubmit={submit}><div className="dashboard-tabs"><button type="button" className={mode === "pnr" ? "active" : ""} onClick={() => setMode("pnr")}><Icon name="ticket" size={17} />PNR</button><button type="button" className={mode === "manual" ? "active" : ""} onClick={() => setMode("manual")}><Icon name="train" size={17} />{hi ? "ट्रेन और रूट" : "Train & route"}</button></div>{mode === "pnr" ? <label><span>{hi ? "10 अंकों का PNR" : "10-digit PNR"}</span><input inputMode="numeric" maxLength={10} value={form.pnr} onChange={(event) => setForm({ ...form, pnr: event.target.value.replace(/\D/g, "") })} placeholder="1234567890" /></label> : <div className="dashboard-manual-fields"><label><span>{hi ? "ट्रेन नंबर" : "Train number"}</span><input inputMode="numeric" maxLength={5} value={form.train} onChange={(event) => setForm({ ...form, train: event.target.value.replace(/\D/g, "") })} placeholder="12951" /></label><label><span>{hi ? "कहाँ से" : "From"}</span><input maxLength={6} value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value.toUpperCase() })} placeholder="NDLS" /></label><label><span>{hi ? "कहाँ तक" : "To"}</span><input maxLength={6} value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value.toUpperCase() })} placeholder="MMCT" /></label><label><span>{hi ? "तारीख" : "Date"}</span><input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label></div>}<button className="dashboard-submit" disabled={loading}>{loading ? <><span className="spinner" />{hi ? "यात्रा बन रही है" : "Building journey"}</> : <>{hi ? "मेरा डैशबोर्ड बनाएँ" : "Build my dashboard"}<Icon name="arrow" size={18} /></>}</button>{message && <p className="dashboard-message">{message}</p>}<small><Icon name="shield" size={13} />{hi ? "PNR एनालिटिक्स में नहीं भेजा जाता।" : "PNR is never sent to analytics."}</small></form></section>
    {journey && <section className="dashboard-results" aria-live="polite">
      <TripSummary journey={journey} busy={loading} hi={hi} onRefresh={() => {
        if (lastRequest.current) void loadJourney(lastRequest.current, true);
      }} />
      <div className="dashboard-card-grid">{cards.map((card) => <article key={card.number}><span className="dashboard-card-icon"><Icon name={card.icon} size={20} /></span><div className={`confidence ${card.confidence}`}>{confidenceLabel(card.confidence, hi)}</div><small>{card.number}</small><h3>{card.title}</h3><strong>{card.value}</strong><p>{card.note}</p>{card.href && <Link href={card.href}>{hi ? "खोलें" : "Open"}<Icon name="arrow" size={14} /></Link>}</article>)}</div></section>}
  <SavedTrips hi={hi} busy={loading} onOpen={openSavedTrip} />
  <AdSlot placement="top" format="970 × 90 / 320 × 100" />
  <PageGuidance slug="dashboard" /></main>;
}

function confidenceLabel(value: Card["confidence"], hi: boolean) { return value === "provider" ? (hi ? "प्रदाता डेटा" : "Provider data") : value === "estimate" ? (hi ? "योजना अनुमान" : "Planning estimate") : value === "official" ? (hi ? "आधिकारिक लिंक" : "Official link") : (hi ? "अभी उपलब्ध नहीं" : "Not available"); }
function makeCards(data: JourneyData, hi: boolean): Card[] {
  const p = pnrSummary(data.pnr);
  const accommodation = p.passengers.map((person) => { const value = [person.coach, person.berth, person.berthCode].filter(Boolean).join(" · "); return value ? `P${person.number}: ${value}` : ""; }).filter(Boolean).join(" / ");
  const unavailable = hi ? "उपलब्ध नहीं" : "Not available";
  return [
    { number: "01", title: hi ? "PNR और कन्फर्मेशन" : "PNR & confirmation", value: p.status || unavailable, note: data.pnr ? (hi ? "यात्री की वर्तमान रेलवे स्थिति" : "Current railway passenger status") : (hi ? "PNR परिणाम उपलब्ध नहीं" : "No PNR result available"), confidence: p.status ? "provider" : "pending", icon: "ticket", href: "/pnr-status" },
    { number: "04", title: hi ? "चार्ट स्थिति" : "Chart status", value: p.chartStatus || unavailable, note: hi ? "चार्ट समय कैलकुलेटर केवल अनुमान देता है" : "The chart-time calculator provides an estimate only", confidence: p.chartStatus ? "provider" : "pending", icon: "chart", href: "/chart-preparation-calculator" },
    { number: "05", title: hi ? "रद्दीकरण और रिफंड" : "Cancellation & refund", value: hi ? "समय-सीमा और अनुमान निकालें" : "Calculate deadline and estimate", note: hi ? "अंतिम कटौती आधिकारिक नियम पर निर्भर" : "Final deduction depends on official rules", confidence: "estimate", icon: "refund", href: "/refund-calculator" },
    { number: "06", title: hi ? "हर यात्री का कोच और बर्थ" : "Coach & berth by passenger", value: accommodation || unavailable, note: hi ? "अंतिम आवंटन चार्ट में बदल सकता है" : "Final allocation may change at charting", confidence: accommodation ? "provider" : "pending", icon: "seat", href: "/seat-berth-finder" },
    { number: "09", title: hi ? "कैलेंडर रिमाइंडर" : "Calendar reminders", value: hi ? "बुकिंग और तत्काल" : "Booking and Tatkal", note: hi ? "अपने कैलेंडर में रिमाइंडर जोड़ें" : "Add a reminder to your calendar", confidence: "estimate", icon: "bell", href: "/booking-reminders" },
    { number: "10", title: hi ? "आधिकारिक सत्यापन" : "Official verification", value: "IRCTC · NTES · RailMadad", note: hi ? "बुकिंग, लाइव पूछताछ और सहायता" : "Booking, live enquiry and assistance", confidence: "official", icon: "external", href: "/official-services" },
  ];
}

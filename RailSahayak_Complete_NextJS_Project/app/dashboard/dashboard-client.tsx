"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { FormEvent, useState } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";

type JourneyData = { pnr?: Record<string, unknown>; schedule?: Record<string, unknown>; live?: Record<string, unknown>; between?: Record<string, unknown>; train?: string; source?: string; destination?: string; date?: string; errors: string[] };
type Card = { number: string; title: string; value: string; note: string; confidence: "provider" | "estimate" | "official" | "pending"; icon: string; href?: string };

function normalize(value: string) { return value.toLowerCase().replace(/[^a-z0-9]/g, ""); }
function findValue(input: unknown, names: string[], depth = 0): string | undefined {
  if (!input || depth > 5) return undefined;
  if (Array.isArray(input)) { for (const item of input.slice(0, 12)) { const found = findValue(item, names, depth + 1); if (found) return found; } return undefined; }
  if (typeof input !== "object") return undefined;
  const target = names.map(normalize);
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) if (target.includes(normalize(key)) && ["string", "number", "boolean"].includes(typeof value)) return String(value);
  for (const value of Object.values(input as Record<string, unknown>)) { const found = findValue(value, names, depth + 1); if (found) return found; }
  return undefined;
}
function first(...values: Array<string | undefined>) { return values.find(Boolean); }

async function rail(params: URLSearchParams) {
  const response = await fetch(`/api/rail?${params}`, { cache: "no-store" });
  const payload = await response.json().catch(() => ({})) as Record<string, unknown>;
  return { ok: response.ok, payload, error: response.ok ? undefined : String(payload.message ?? "Live data unavailable") };
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
    setLoading(true); const next: JourneyData = { errors: [], train: form.train, source: form.source.toUpperCase(), destination: form.destination.toUpperCase(), date: form.date };
    try {
      if (mode === "pnr") {
        const result = await rail(new URLSearchParams({ action: "pnr", pnr: form.pnr }));
        if (result.ok) { next.pnr = result.payload; next.train = findValue(result.payload, ["trainNumber", "trainNo", "train_number"]); next.source = findValue(result.payload, ["boardingStation", "boardingPoint", "from", "source"]); next.destination = findValue(result.payload, ["destination", "to", "destinationStation"]); next.date = findValue(result.payload, ["journeyDate", "dateOfJourney", "doj"]); } else next.errors.push(result.error ?? "PNR unavailable");
      }
      const tasks: Array<Promise<void>> = [];
      if (next.train && /^\d{5}$/.test(next.train)) {
        tasks.push(rail(new URLSearchParams({ action: "schedule", train: next.train })).then((result) => { if (result.ok) next.schedule = result.payload; else next.errors.push(result.error ?? "Schedule unavailable"); }));
        const liveParams = new URLSearchParams({ action: "live", train: next.train }); if (next.date && /^\d{4}-\d{2}-\d{2}$/.test(next.date)) liveParams.set("date", next.date);
        tasks.push(rail(liveParams).then((result) => { if (result.ok) next.live = result.payload; else next.errors.push(result.error ?? "Live status unavailable"); }));
      }
      if (mode === "manual") tasks.push(rail(new URLSearchParams({ action: "between", from: next.source ?? "", to: next.destination ?? "" })).then((result) => { if (result.ok) next.between = result.payload; else next.errors.push(result.error ?? "Route unavailable"); }));
      await Promise.all(tasks); setJourney({ ...next }); trackEvent("journey_dashboard_loaded", { mode, live_sources: [next.pnr, next.schedule, next.live, next.between].filter(Boolean).length });
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
  const pnrStatus = first(findValue(data.pnr, ["currentStatus", "status", "bookingStatus"]), hi ? "प्रदाता उत्तर देखें" : "See provider response");
  const running = first(findValue(data.live, ["runningStatus", "status", "currentStatus", "message"]), hi ? "लाइव स्थिति उपलब्ध नहीं" : "Live status unavailable");
  const scheduled = first(findValue(data.live, ["scheduledDeparture", "scheduledDepartureTime", "std"]), findValue(data.schedule, ["departureTime", "scheduledDeparture", "std"]));
  const expected = first(findValue(data.live, ["expectedDeparture", "expectedDepartureTime", "etd"]), scheduled);
  const coach = first(findValue(data.pnr, ["coach", "coachNumber"]), hi ? "चार्ट के बाद जाँचें" : "Check after charting");
  const berth = findValue(data.pnr, ["berth", "berthNumber", "seatNumber"]);
  const platform = findValue(data.live, ["platform", "platformNumber"]);
  const boarding = first(findValue(data.pnr, ["boardingStation", "boardingPoint"]), data.source, hi ? "टिकट पर जाँचें" : "Check the ticket");
  return [
    { number: "01", title: hi ? "PNR और कन्फर्मेशन" : "PNR & confirmation", value: data.pnr ? pnrStatus! : (hi ? "PNR नहीं दिया" : "No PNR entered"), note: pnr ? `PNR ••••••${pnr.slice(-4)}` : (hi ? "मैनुअल यात्रा इनपुट" : "Manual journey input"), confidence: data.pnr ? "provider" : "pending", icon: "ticket", href: "/pnr-status" },
    { number: "02", title: hi ? "ट्रेन रनिंग स्थिति" : "Train running status", value: running!, note: hi ? "लाइव प्रदाता की नवीनतम प्रतिक्रिया" : "Latest response from the live provider", confidence: data.live ? "provider" : "pending", icon: "pulse", href: "/live-train-status" },
    { number: "03", title: hi ? "प्रस्थान" : "Departure", value: expected ? `${scheduled ?? "—"} → ${expected}` : (hi ? "समय उपलब्ध नहीं" : "Timing unavailable"), note: hi ? "निर्धारित → अपेक्षित" : "Scheduled → expected", confidence: data.live || data.schedule ? "provider" : "pending", icon: "clock", href: data.train ? `/train/${data.train}` : "/train-schedule" },
    { number: "04", title: hi ? "चार्ट तैयारी" : "Chart preparation", value: scheduled ? (hi ? "प्रस्थान से पहले अनुमान देखें" : "Estimate before departure") : (hi ? "प्रस्थान समय जरूरी" : "Departure time required"), note: hi ? "वास्तविक समय ट्रेन और स्टेशन से बदल सकता है" : "Actual time can vary by train and station", confidence: scheduled ? "estimate" : "pending", icon: "chart", href: "/chart-preparation-calculator" },
    { number: "05", title: hi ? "रद्दीकरण और रिफंड" : "Cancellation & refund", value: hi ? "समय-सीमा और अनुमान निकालें" : "Calculate deadline and estimate", note: hi ? "अंतिम कटौती आधिकारिक नियम पर निर्भर" : "Final deduction depends on official rules", confidence: "estimate", icon: "refund", href: "/refund-calculator" },
    { number: "06", title: hi ? "कोच और बर्थ" : "Coach & berth", value: berth ? `${coach} · ${berth}` : coach!, note: hi ? "अंतिम आवंटन चार्ट में बदल सकता है" : "Final allocation may change at charting", confidence: data.pnr && (coach || berth) ? "provider" : "pending", icon: "seat", href: "/seat-berth-finder" },
    { number: "07", title: hi ? "प्लेटफॉर्म" : "Platform", value: platform ? `Platform ${platform}` : (hi ? "स्टेशन पर सत्यापित करें" : "Verify at the station"), note: hi ? "डिस्प्ले और घोषणा अंतिम मानें" : "Station display and announcement take priority", confidence: platform ? "provider" : "pending", icon: "pin", href: "/platform-number" },
    { number: "08", title: hi ? "बोर्डिंग स्टेशन" : "Boarding station", value: boarding!, note: hi ? "सही तारीख और रिपोर्टिंग समय भी जाँचें" : "Also confirm the correct date and reporting time", confidence: data.pnr || data.source ? "provider" : "pending", icon: "route" },
    { number: "09", title: hi ? "रिमाइंडर" : "Available reminders", value: hi ? "PNR और बुकिंग अलर्ट" : "PNR and booking alerts", note: hi ? "ईमेल और कैलेंडर विकल्प" : "Email and calendar options", confidence: "estimate", icon: "bell", href: "/pnr-alerts" },
    { number: "10", title: hi ? "आधिकारिक सत्यापन" : "Official verification", value: "IRCTC · NTES · RailMadad", note: hi ? "बुकिंग, लाइव पूछताछ और सहायता" : "Booking, live enquiry and assistance", confidence: "official", icon: "external", href: "/official-services" },
  ];
}

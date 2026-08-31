"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import { RailProviderResult } from "@/components/rail-provider-result";
import { railRequest, railError } from "@/lib/rail-data";

type Mode = "train" | "station" | "route";
type Props = { mode: Mode; train?: string; station?: string; from?: string; to?: string };

export function DynamicRailPage(props: Props) {
  const { language } = useLanguage();
  return <DynamicRailPageContent key={[language, props.mode, props.train, props.station, props.from, props.to].join(":")} {...props} />;
}

function DynamicRailPageContent(props: Props) {
  const { language } = useLanguage(); const hi = language === "hi";
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<Array<{ label: string; tool: string; payload?: Record<string, unknown>; error?: string }>>([]);
  const identity = props.mode === "train" ? props.train : props.mode === "station" ? props.station : `${props.from} → ${props.to}`;
  const copy = props.mode === "train"
    ? { title: `${hi ? "ट्रेन" : "Train"} ${props.train}`, intro: hi ? "समय-सारणी और लाइव स्थिति एक ही जगह देखें।" : "See the timetable and live running information in one place.", icon: "train" }
    : props.mode === "station"
      ? { title: `${hi ? "स्टेशन" : "Station"} ${props.station}`, intro: hi ? "आगमन, प्रस्थान और प्लेटफॉर्म जानकारी देखें।" : "Check arrivals, departures and available platform information.", icon: "pin" }
      : { title: `${props.from} ${hi ? "से" : "to"} ${props.to}`, intro: hi ? "इस रूट की उपलब्ध ट्रेनों और यात्रा जानकारी का पता लगाएँ।" : "Explore trains and journey information for this route.", icon: "route" };

  useEffect(() => {
    const urls = props.mode === "train"
      ? [[hi ? "समय-सारणी" : "Schedule", "train-schedule", `/api/rail?action=schedule&train=${props.train}`], [hi ? "लाइव स्थिति" : "Live status", "live-train-status", `/api/rail?action=live&train=${props.train}`]]
      : props.mode === "station"
        ? [[hi ? "स्टेशन बोर्ड" : "Station board", "station-arrivals-departures", `/api/rail?action=station&station=${props.station}&hours=4`]]
        : [[hi ? "उपलब्ध ट्रेनें" : "Available trains", "trains-between-stations", `/api/rail?action=between&from=${props.from}&to=${props.to}`]];
    let active = true;
    const controller = new AbortController();
    Promise.all(urls.map(async ([label, tool, url]) => {
      try {
        const { payload, ok } = await railRequest(new URLSearchParams(url.split("?")[1]), controller.signal);
        return ok ? { label, tool, payload } : { label, tool, error: railError(payload, hi).message };
      } catch { return { label, tool, error: hi ? "कनेक्शन नहीं हुआ। कुछ देर बाद फिर प्रयास करें।" : "Connection interrupted. Please try again shortly." }; }
    })).then((next) => { if (active) { setResponses(next); setLoading(false); trackEvent("dynamic_rail_page_loaded", { mode: props.mode, outcome: next.some((item) => item.payload) ? "success" : "unavailable" }); } });
    return () => { active = false; controller.abort(); };
  }, [hi, props.from, props.mode, props.station, props.to, props.train]);

  return <main className="detail-page"><section className="detail-hero"><nav className="breadcrumbs"><Link href="/">{hi ? "होम" : "Home"}</Link><span>/</span><span>{identity}</span></nav><span className="kicker"><Icon name={copy.icon} size={17} />{hi ? "रेलवे यात्रा पेज" : "Railway journey page"}</span><h1>{copy.title}</h1><p>{copy.intro}</p><div className="detail-trust"><span><Icon name="pulse" size={16} />{hi ? "प्रदाता से नवीनतम डेटा" : "Latest provider data"}</span><span><Icon name="shield" size={16} />{hi ? "आधिकारिक सत्यापन लिंक" : "Official verification links"}</span></div></section><AdSlot placement="top" format="970 × 90 / 320 × 100" />
    <section className="detail-results">{loading ? <div className="detail-loading"><span className="spinner dark" />{hi ? "नवीनतम जानकारी मिल रही है…" : "Getting the latest information…"}</div> : responses.map((result) => <ResultPanel key={result.label} result={result} hi={hi} />)}</section>
    <section className="detail-actions"><div><span className="kicker light">{hi ? "अपनी यात्रा पूरी करें" : "Complete your journey"}</span><h2>{hi ? "अगला जरूरी कदम चुनें।" : "Choose the next useful step."}</h2></div><div><Link href="/dashboard"><Icon name="chart" size={18} />{hi ? "यात्रा डैशबोर्ड" : "Journey dashboard"}<Icon name="arrow" size={15} /></Link><Link href="/seat-availability"><Icon name="seat" size={18} />{hi ? "सीट उपलब्धता" : "Seat availability"}<Icon name="arrow" size={15} /></Link><a href="https://enquiry.indianrail.gov.in/" target="_blank" rel="noreferrer"><Icon name="external" size={18} />{hi ? "NTES पर सत्यापित करें" : "Verify on NTES"}<Icon name="arrow" size={15} /></a></div></section>
  </main>;
}

function ResultPanel({ result, hi }: { result: { label: string; tool: string; payload?: Record<string, unknown>; error?: string }; hi: boolean }) {
  return <article className={`detail-result-card${result.error ? " unavailable" : ""}`}><h2>{result.label}</h2>{result.error ? <p role="status">{result.error}</p> : result.payload ? <RailProviderResult toolSlug={result.tool} payload={result.payload} hi={hi} /> : null}</article>;
}

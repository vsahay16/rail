"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { classOptions, quotaOptions } from "@/lib/rail-booking-options";
import { liveResultOutcome, railData, railError, railRequest, record, rows } from "@/lib/rail-data";
import { numericEstimate, parseJourneyDate, seatDayText, type SeatDay } from "@/lib/seat-availability";
import formStyles from "./route-seat-availability.module.css";
import styles from "./route-seat-comparison.module.css";

export type ComparisonTrain = {
  key: string;
  number: string;
  name: string;
  from: string;
  to: string;
  classes: string[];
};

export const comparisonLimit = 3;

type TrainResult = {
  train: ComparisonTrain;
  dates: Map<string, SeatDay>;
  error?: string;
  fetchedAt?: string;
  cached?: boolean;
};

export function RouteSeatComparison({ trains, initialDate = "", hi, onRemove }: {
  trains: ComparisonTrain[];
  initialDate?: string;
  hi: boolean;
  onRemove: (key: string) => void;
}) {
  const t = (en: string, hindi: string) => hi ? hindi : en;
  const active = useRef<AbortController | null>(null);
  const [date, setDate] = useState(initialDate);
  const [preferredClass, setPreferredClass] = useState("3A");
  const [quota, setQuota] = useState("GN");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ selection: ComparisonTrain[]; date: string; trains: TrainResult[] } | null>(null);
  const options = classOptions.filter(([code]) => trains.every(train => !train.classes.length || train.classes.includes(code)));
  const travelClass = options.some(([code]) => code === preferredClass) ? preferredClass : options[0]?.[0];
  const visible = result?.selection === trains ? result : null;

  useEffect(() => () => active.current?.abort(), [trains]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (active.current || trains.length < 2 || trains.length > comparisonLimit || !travelClass || !parseJourneyDate(date)) return;
    const controller = new AbortController();
    active.current = controller;
    setBusy(true);
    setResult(null);
    try {
      const results = await Promise.all(trains.map(async train => {
        const dates = new Map<string, SeatDay>();
        const started = performance.now();
        let outcome = "error";
        trackEvent("live_tool_submitted", { tool: "seat-availability" });
        try {
          const { ok, payload } = await railRequest(new URLSearchParams({
            action: "availability", train: train.number, from: train.from, to: train.to,
            date, class: travelClass, quota,
          }), controller.signal);
          if (!ok) return { train, dates, error: railError(payload, hi).message };
          for (const day of rows(railData(payload).calendar) as unknown as SeatDay[]) {
            const dayDate = parseJourneyDate(day.date);
            if (dayDate && !dates.has(dayDate)) dates.set(dayDate, day);
          }
          const cache = record(payload.railq);
          outcome = liveResultOutcome("seat-availability", payload);
          return { train, dates, fetchedAt: typeof cache.fetchedAt === "string" ? cache.fetchedAt : undefined, cached: cache.cached === true };
        } catch {
          return { train, dates, error: t("Availability could not be checked. Try again.", "उपलब्धता जाँच पूरी नहीं हुई। फिर कोशिश करें।") };
        } finally {
          if (!controller.signal.aborted) trackEvent("live_tool_result", {
            tool: "seat-availability", outcome, duration_ms: Math.round(performance.now() - started),
          });
        }
      }));
      if (!controller.signal.aborted) setResult({ selection: trains, date, trains: results });
    } finally {
      active.current = null;
      setBusy(false);
    }
  }

  if (!trains.length) return null;
  return <section id="route-seat-comparison" className={styles.panel} aria-labelledby="seat-comparison-heading" tabIndex={-1}>
    <h2 id="seat-comparison-heading">{t("Compare seat availability", "सीट उपलब्धता की तुलना करें")}</h2>
    <ul className={styles.selected}>
      {trains.map(train => <li key={train.key}>
        {train.number} · {train.name} · {train.from} → {train.to}{" "}
        <button type="button" className={styles.remove} onClick={() => onRemove(train.key)}
          aria-label={t(`Remove train ${train.number} from comparison`, `तुलना से ट्रेन ${train.number} हटाएँ`)}>{t("Remove", "हटाएँ")}</button>
      </li>)}
    </ul>
    {trains.length < 2 ? <p>{t("Select one more train to compare.", "तुलना के लिए एक और ट्रेन चुनें।")}</p> :
      !travelClass ? <p>{t("These trains have no listed class in common. Choose a different train or check their seats individually.", "इन ट्रेनों में कोई समान सूचीबद्ध श्रेणी नहीं है। दूसरी ट्रेन चुनें या सीटें अलग से जाँचें।")}</p> :
      <form onSubmit={submit}>
        <fieldset className={formStyles.fields} disabled={busy}>
          <label>{t("Journey date", "यात्रा की तारीख")}
            <input type="date" value={date} required onChange={event => { setDate(event.target.value); setResult(null); }} />
          </label>
          <label>{t("Class", "श्रेणी")}
            <select value={travelClass} onChange={event => { setPreferredClass(event.target.value); setResult(null); }}>
              {options.map(([code, en, hindi]) => <option key={code} value={code}>{code} · {hi ? hindi : en}</option>)}
            </select>
          </label>
          <label>{t("Quota", "कोटा")}
            <select value={quota} onChange={event => { setQuota(event.target.value); setResult(null); }}>
              {quotaOptions.map(([code, en, hindi]) => <option key={code} value={code}>{hi ? hindi : en}</option>)}
            </select>
          </label>
          <button className="primary-button" type="submit">{busy ? t("Checking seats…", "सीटें जाँची जा रही हैं…") : t("Compare seats", "सीटों की तुलना करें")}</button>
        </fieldset>
      </form>}
    <div aria-live="polite" aria-busy={busy}>
      {visible && <ComparisonTable results={visible.trains} requestedDate={visible.date} hi={hi} />}
    </div>
  </section>;
}

function ComparisonTable({ results, requestedDate, hi }: { results: TrainResult[]; requestedDate: string; hi: boolean }) {
  const t = (en: string, hindi: string) => hi ? hindi : en;
  const locale = hi ? "hi-IN" : "en-IN";
  const dates = [...new Set([requestedDate, ...results.flatMap(result => [...result.dates.keys()])])].sort();
  const dateFormat = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  const checkedFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
  return <>
    <p className={styles.hint}>{t("Scroll across to see all selected trains.", "सभी चुनी ट्रेनें देखने के लिए तालिका दाएँ-बाएँ खिसकाएँ।")}</p>
    <div className={styles.scroll} tabIndex={0} role="region" aria-label={t("Seat availability comparison by date", "तारीख के अनुसार सीट उपलब्धता की तुलना")}>
      <table className={styles.table}>
        <thead><tr>
          <th scope="col">{t("Journey date", "यात्रा की तारीख")}</th>
          {results.map(({ train, error, fetchedAt, cached }) => <th scope="col" key={train.key}>
            {train.number} · {train.name}
            <small>{train.from} → {train.to}</small>
            {error ? <small>{error}</small> :
              fetchedAt && Number.isFinite(Date.parse(fetchedAt)) ? <small>
                {cached ? t("Cached · ", "सहेजा परिणाम · ") : ""}
                {t("Checked ", "जाँच ")}<time dateTime={fetchedAt}>{checkedFormat.format(new Date(fetchedAt))} IST</time>
              </small> : <small>{t("Check time unavailable", "जाँच का समय उपलब्ध नहीं")}</small>}
          </th>)}
        </tr></thead>
        <tbody>{dates.map(date => <tr key={date} className={date === requestedDate ? styles.requested : undefined}>
          <th scope="row"><time dateTime={date}>{dateFormat.format(new Date(date + "T12:00:00+05:30"))}</time>
            {date === requestedDate && <small>{t("Requested date", "चुनी तारीख")}</small>}
          </th>
          {results.map(result => {
            const day = result.dates.get(date);
            const estimate = day?.kind === "waitlist" && day.canBook === true ? numericEstimate(day.estimate) : null;
            return <td key={result.train.key}>
              {day ? <><strong>{seatDayText(day, hi)}{day.waitlistType ? ` · ${day.waitlistType}` : ""}</strong>
                {estimate !== null && <small>{t("Provider estimate", "प्रदाता का अनुमान")} <b>{estimate}%</b></small>}</>
                : result.error ? t("Lookup failed", "जाँच विफल") : t("No result for this date", "इस तारीख का परिणाम नहीं मिला")}
            </td>;
          })}
        </tr>)}</tbody>
      </table>
    </div>
    <p>{t("Additional dates come from the provider. Check times show when RailQ retrieved each result. Waitlist estimates are supplied by RailKit and can change before booking.", "अतिरिक्त तारीखें प्रदाता से मिली हैं। जाँच का समय बताता है कि RailQ ने परिणाम कब प्राप्त किया। वेटलिस्ट अनुमान RailKit से मिले हैं और बुकिंग से पहले बदल सकते हैं।")}</p>
  </>;
}

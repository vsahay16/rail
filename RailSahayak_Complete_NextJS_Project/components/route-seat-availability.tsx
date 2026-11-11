"use client";

import { useRef, useState, type FormEvent } from "react";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { liveResultOutcome, railData, railError, railRequest } from "@/lib/rail-data";
import { trackEvent } from "@/lib/analytics";
import { classOptions, quotaOptions } from "@/lib/rail-booking-options";
import styles from "./route-seat-availability.module.css";

export function RouteSeatAvailability({ train, from, to, classes, initialDate = "", hi }: {
  train: string;
  from: string;
  to: string;
  classes: string[];
  initialDate?: string;
  hi: boolean;
}) {
  const availableClasses = classOptions.filter(([code]) => classes.includes(code));
  const options = availableClasses.length ? availableClasses : classOptions;
  const [date, setDate] = useState(initialDate);
  const [travelClass, setTravelClass] = useState(options.some(([code]) => code === "3A") ? "3A" : options[0][0]);
  const [quota, setQuota] = useState("GN");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const t = (en: string, hindi: string) => hi ? hindi : en;

  function clearResult() {
    setResult(null);
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !date) return;
    submitting.current = true;
    setBusy(true);
    clearResult();
    const started = performance.now();
    let outcome = "error";
    trackEvent("live_tool_submitted", { tool: "seat-availability" });
    try {
      const { ok, payload } = await railRequest(new URLSearchParams({
        action: "availability", train, from, to, date, class: travelClass, quota,
      }));
      if (ok) {
        setResult(payload);
        outcome = liveResultOutcome("seat-availability", payload);
      } else {
        setError(railError(payload, hi).message);
      }
    } catch {
      setError(t("Seat availability could not be checked. Please try again.", "सीट उपलब्धता की जाँच पूरी नहीं हुई। कृपया फिर कोशिश करें।"));
    } finally {
      submitting.current = false;
      setBusy(false);
      trackEvent("live_tool_result", { tool: "seat-availability", outcome, duration_ms: Math.round(performance.now() - started) });
    }
  }

  const cache = result?.railq as { fetchedAt?: string; cached?: boolean } | undefined;
  return <details className={styles.panel}>
    <summary>{t("Check seats and waitlist estimates", "सीटें और वेटलिस्ट अनुमान देखें")}</summary>
    <form onSubmit={submit}>
      <fieldset className={styles.fields} disabled={busy}>
        <label>{t("Journey date", "यात्रा की तारीख")}
          <input type="date" value={date} required onChange={e => { setDate(e.target.value); clearResult(); }} />
        </label>
        <label>{t("Class", "श्रेणी")}
          <select value={travelClass} onChange={e => { setTravelClass(e.target.value); clearResult(); }}>
            {options.map(([code, en, hindi]) => <option key={code} value={code}>{code} · {hi ? hindi : en}</option>)}
          </select>
        </label>
        <label>{t("Quota", "कोटा")}
          <select value={quota} onChange={e => { setQuota(e.target.value); clearResult(); }}>
            {quotaOptions.map(([code, en, hindi]) => <option key={code} value={code}>{hi ? hindi : en}</option>)}
          </select>
        </label>
        <button type="submit" className="primary-button">{busy ? t("Checking seats…", "सीटें जाँची जा रही हैं…") : t("Check availability", "उपलब्धता जाँचें")}</button>
      </fieldset>
    </form>
    <div aria-live="polite" aria-busy={busy}>
      {error && <p role="alert">{error}</p>}
      {result && <AvailabilityCalendar data={railData(result)} hi={hi} fetchedAt={cache?.fetchedAt} cached={cache?.cached} />}
    </div>
  </details>;
}

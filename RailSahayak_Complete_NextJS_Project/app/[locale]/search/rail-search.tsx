"use client";

import { useState } from "react";
import { LocalizedLink as Link } from "@/components/localized-link";
import styles from "./search.module.css";

export type SearchEntry = { href: string; title: string; description: string; kind: "tool" | "guide" };

const shortcuts: [RegExp, string[]][] = [
  [/\brac\b|आरएसी/i, ["/guides/can-you-travel-with-rac-ticket", "/pnr-status"]],
  [/wait.?list|वेटलिस्ट|प्रतीक्षा/i, ["/guides/waitlisted-ticket-after-chart-preparation", "/seat-availability"]],
  [/\bpnr\b|पीएनआर/i, ["/pnr-status", "/guides/pnr-status-explained"]],
  [/cancelled|रद्द ट्रेन|ट्रेन रद्द/i, ["/cancelled-trains", "/guides/train-cancelled-delayed-refund"]],
  [/refund|रिफंड/i, ["/refund-calculator", "/guides/cancellation-and-refunds"]],
  [/tatkal|तत्काल/i, ["/tatkal-time-calculator", "/guides/tatkal"]],
  [/seat|availability|उपलब्धता|सीट/i, ["/seat-availability", "/trains-between-stations"]],
  [/running|live|where is my train|लाइव|रनिंग/i, ["/live-train-status"]],
  [/platform|प्लेटफॉर्म/i, ["/platform-number"]],
  [/coach|कोच/i, ["/coach-position", "/coach-layout"]],
  [/chart|चार्ट/i, ["/chart-preparation-calculator", "/guides/chart-preparation"]],
];

const stopWords = new Set(["can", "i", "my", "is", "the", "a", "with", "to", "of", "how", "what", "क्या", "है", "में", "के", "का"]);

function searchEntries(entries: SearchEntry[], query: string) {
  const normalized = query.toLocaleLowerCase();
  const words = [...new Set(normalized.match(/[\p{L}\p{M}\p{N}]+/gu) ?? [])].filter(word => !stopWords.has(word));
  const suggested = shortcuts.flatMap(([pattern, paths]) => pattern.test(normalized) ? paths : []);
  return entries.map(entry => {
    const title = entry.title.toLocaleLowerCase();
    const body = `${entry.description} ${entry.href.replaceAll("-", " ")}`.toLocaleLowerCase();
    const shortcut = suggested.indexOf(entry.href);
    const score = (title.includes(normalized) ? 24 : 0) + (shortcut < 0 ? 0 : Math.max(16, 60 - shortcut * 5))
      + words.reduce((sum, word) => sum + (title.includes(word) ? 8 : body.includes(word) ? 2 : 0), 0);
    return { entry, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 12).map(item => item.entry);
}

export function RailSearch({ entries, hi }: { entries: SearchEntry[]; hi: boolean }) {
  const [input, setInput] = useState("");
  const t = (en: string, hindi: string) => hi ? hindi : en;
  const query = input.trim();
  const digits = query.replace(/\s+/g, "");
  const pnr = /^\d{10}$/.test(digits);
  const train = query.match(/^(?:train\s+|ट्रेन\s+)?(\d{5})$/i)?.[1];
  const matches = query && !pnr && !train ? searchEntries(entries, query) : [];
  return <main className={styles.page} data-mobile-refresh>
    <nav className={styles.links} aria-label={t("Quick links", "त्वरित लिंक")}>
      <Link href="/">{t("Home", "होम")}</Link><Link href="/tools">{t("All tools", "सभी टूल्स")}</Link><Link href="/guides">{t("Travel guides", "यात्रा गाइड")}</Link>
    </nav>
    <h1>{t("Search railway tools and guides", "रेलवे टूल्स और गाइड खोजें")}</h1>
    <label className={styles.field}>{t("What do you need help with?", "आपको किस बारे में मदद चाहिए?")}
      <input type="search" value={input} onChange={event => setInput(event.target.value)} maxLength={120} autoComplete="off"
        placeholder={t("Try RAC, refund, or train 12952", "RAC, रिफंड या 12952 खोजें")} />
    </label>
    <div aria-live="polite" className={styles.results}>
      {pnr ? <p><Link href="/pnr-status">{t("Open the private PNR status form", "PNR स्थिति जाँच का निजी फॉर्म खोलें")}</Link></p>
        : train ? <nav className={styles.links} aria-label={t("Tools for this train", "इस ट्रेन के टूल्स")}>
          <Link href={`/train-schedule?train=${train}`}>{t("Timetable", "समय-सारणी")} · {train}</Link>
          <Link href={`/live-train-status?train=${train}`}>{t("Live status", "लाइव स्थिति")} · {train}</Link>
          <Link href={`/seat-availability?train=${train}`}>{t("Seat availability", "सीट उपलब्धता")} · {train}</Link>
        </nav>
        : query ? matches.length ? <ul className={styles.list}>{matches.map(entry => <li key={entry.href}>
          <Link href={entry.href}>{entry.title}</Link>
          <p>{entry.description}</p>
        </li>)}</ul> : <p>{t("No matching tool or guide. Try a shorter topic or browse all tools.", "कोई टूल या गाइड नहीं मिली। छोटा विषय लिखें या सभी टूल्स देखें।")}</p>
        : <nav className={styles.links} aria-label={t("Popular questions", "लोकप्रिय प्रश्न")}>
          <Link href="/guides/can-you-travel-with-rac-ticket">{t("Can I travel with RAC?", "क्या RAC टिकट से यात्रा कर सकते हैं?")}</Link>
          <Link href="/seat-availability">{t("Check seats", "सीटें देखें")}</Link>
          <Link href="/live-train-status">{t("Track a train", "ट्रेन की स्थिति देखें")}</Link>
        </nav>}
    </div>
  </main>;
}

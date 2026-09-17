"use client";
import { useEffect, useState } from "react";
import { readPlaces, writePlaces, validPlace, recentTrains, clearRecent, type SavedPlace } from "@/lib/local-journeys";
import { LocalizedLink as Link } from "@/components/localized-link";

export function SavedPlaces({ hi }: { hi: boolean }) {
  const [recent, setRecent] = useState<string[]>([]);
  const [items, setItems] = useState<SavedPlace[]>([]); const [value, setValue] = useState(""); const [kind, setKind] = useState<SavedPlace["kind"]>("station"); const [message, setMessage] = useState("");
  useEffect(() => { const refresh = () => { setItems(readPlaces()); setRecent(recentTrains()); }; refresh(); window.addEventListener("railq:saved", refresh); window.addEventListener("storage", refresh); return () => { window.removeEventListener("railq:saved", refresh); window.removeEventListener("storage", refresh); }; }, []);
  function save() {
    const next = { kind, value: value.trim().toUpperCase() };
    if (!validPlace(next)) { setMessage(hi ? "5 अंकों का ट्रेन नंबर या 2–6 अक्षरों का स्टेशन कोड डालें।" : "Enter a five-digit train number or a 2–6 letter station code."); return; }
    const ok = writePlaces([next, ...items.filter((x) => x.kind !== kind || x.value !== next.value)]);
    setMessage(ok ? (hi ? "इस डिवाइस पर सेव किया।" : "Saved on this device.") : (hi ? "ब्राउज़र स्टोरेज उपलब्ध नहीं है।" : "Browser storage is unavailable.")); if (ok) setValue("");
  }
  return <section className="saved-places"><h2>{hi ? "आपके ट्रेन और स्टेशन" : "Your trains and stations"}</h2><p>{hi ? "केवल इस ब्राउज़र में सेव होंगे। PNR या यात्रा तारीख सेव नहीं होती।" : "Saved only in this browser. No PNR or travel date is saved."}</p>
    <div className="saved-controls"><label>{hi ? "प्रकार" : "Type"}<select value={kind} onChange={(e) => setKind(e.target.value as SavedPlace["kind"])}><option value="station">{hi ? "स्टेशन" : "Station"}</option><option value="train">{hi ? "ट्रेन" : "Train"}</option></select></label><label>{hi ? "कोड / नंबर" : "Code / number"}<input value={value} maxLength={6} onChange={(e) => setValue(e.target.value)} /></label><button type="button" onClick={save}>{hi ? "सेव करें" : "Save favourite"}</button></div>
    <ul>{items.map((item) => <li key={`${item.kind}:${item.value}`}><Link href={`/${item.kind}/${item.value}`}>{hi ? (item.kind === "train" ? "ट्रेन" : "स्टेशन") : item.kind} {item.value}</Link><button type="button" aria-label={`${hi ? "हटाएँ" : "Remove"} ${item.value}`} onClick={() => { if (!writePlaces(items.filter((x) => x !== item))) setMessage(hi ? "स्टोरेज उपलब्ध नहीं है।" : "Storage is unavailable."); }}>×</button></li>)}</ul>
    {!!items.length && <button type="button" onClick={() => { if (!writePlaces([])) setMessage(hi ? "स्टोरेज उपलब्ध नहीं है।" : "Storage is unavailable."); }}>{hi ? "पसंदीदा हटाएँ" : "Clear favourites"}</button>}
    {!!recent.length && <><h3>{hi ? "हाल में खोजे गए ट्रेन नंबर" : "Recently searched train numbers"}</h3><ul>{recent.map((train) => <li key={train}><Link href={`/train/${train}`}>{train}</Link></li>)}</ul><button onClick={() => { if (!clearRecent()) setMessage(hi ? "स्टोरेज उपलब्ध नहीं है।" : "Storage is unavailable."); }}>{hi ? "हाल की खोज हटाएँ" : "Clear recent searches"}</button></>}<p role="status">{message}</p>
  </section>;
}

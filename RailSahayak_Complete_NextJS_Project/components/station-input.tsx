"use client";
import { useId, useState } from "react";
import { stations, stationMatches, loadStationDirectory, type Station } from "@/lib/stations";

export function StationInput({ value, onChange, hi, name }: { value: string; onChange: (value: string) => void; hi: boolean; name: string }) {
  const id = useId();
  const [open, setOpen] = useState(false), [active, setActive] = useState(-1);
  const [directory, setDirectory] = useState<readonly Station[]>(stations);
  const [loading, setLoading] = useState(false), [failed, setFailed] = useState(false);
  const matches = stationMatches(value, directory);
  const selected = directory.find(station => station[0] === value.trim().toUpperCase());
  const label = (station: Station) => hi && station[3] ? station[3] : station[1];
  async function focus() {
    setOpen(true);
    if (directory.length > stations.length || loading) return;
    setLoading(true); setFailed(false);
    try { setDirectory(await loadStationDirectory()); } catch { setFailed(true); } finally { setLoading(false); }
  }
  function choose(code: string) { onChange(code); setOpen(false); setActive(-1); }
  return <span className="station-picker">
    <input name={name} role="combobox" aria-expanded={open} aria-controls={open ? `${id}-list` : undefined} aria-describedby={`${id}-hint`} aria-autocomplete="list" aria-activedescendant={open && active >= 0 && matches[active] ? `${id}-${active}` : undefined} autoComplete="off" spellCheck={false} maxLength={60} value={value}
      placeholder={hi ? "स्टेशन या कोड, जैसे PNBE" : "Station or code, e.g. PNBE"}
      onFocus={focus} onBlur={() => { setOpen(false); setActive(-1); }}
      onChange={e => { onChange(e.target.value); setActive(-1); setOpen(true); }}
      onKeyDown={e => {
        if (e.key === "Escape") { e.preventDefault(); setOpen(false); setActive(-1); return; }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault(); setOpen(true);
          if (matches.length) setActive(n => e.key === "ArrowDown" ? (n + 1) % matches.length : n <= 0 ? matches.length - 1 : n - 1);
        }
        if (e.key === "Enter" && open && matches.length && (active >= 0 || !selected)) { e.preventDefault(); choose(matches[Math.max(active, 0)][0]); }
      }} />
    <small id={`${id}-hint`} className="station-hint">{selected ? `${label(selected)} · ${selected[0]}` : hi ? "नाम खोजें या टिकट का कोड डालें।" : "Search by name or use the code on your ticket."}</small>
    {open && <span className="station-dropdown">
      <span id={`${id}-list`} role="listbox" className="station-options" aria-label={hi ? "स्टेशन सुझाव" : "Station suggestions"}>
        {matches.map((station, i) => <span role="option" aria-selected={active === i} id={`${id}-${i}`} key={station[0]} onMouseDown={e => e.preventDefault()} onClick={() => choose(station[0])}>
          <b>{station[0]}</b><span className="station-option-name">{label(station)}{station[2] && <small>{station[2]}</small>}</span>
        </span>)}
      </span>
      <span className="station-search-note" role="status">{loading ? (hi ? "स्टेशन सूची लोड हो रही है…" : "Loading station directory…") : failed ? (hi ? "पूरी सूची लोड नहीं हुई। टिकट का कोड डालें।" : "Full directory could not load. Enter the code on your ticket.") : !matches.length ? (hi ? "स्टेशन नहीं मिला। टिकट का सही कोड डाल सकते हैं।" : "No match. You can still enter the exact code on your ticket.") : (hi ? "स्टेशन चुनें · कोड से सही मिलान पहले" : "Select a station · Exact code matches first")}</span>
    </span>}
  </span>;
}

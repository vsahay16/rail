"use client";
import { useId, useState } from "react";
import { stations, stationMatches } from "@/lib/stations";

export function StationInput({ value, onChange, hi, name }: { value: string; onChange: (value: string) => void; hi: boolean; name: string }) {
  const id = useId(); const [open, setOpen] = useState(false); const [active, setActive] = useState(-1);
  const matches = stationMatches(value); const selected = stations.find((s) => s[0] === value.toUpperCase());
  function choose(code: string) { onChange(code); setOpen(false); setActive(-1); }
  return <span className="station-picker">
    <input name={name} role="combobox" aria-expanded={open} aria-controls={`${id}-list`} aria-autocomplete="list" aria-activedescendant={open && active >= 0 ? `${id}-${active}` : undefined} autoComplete="off" maxLength={60} value={value}
      placeholder={hi ? "शहर, स्टेशन या कोड" : "City, station or code"}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      onChange={(e) => { onChange(e.target.value); setActive(-1); setOpen(true); }}
      onKeyDown={(e) => {
        if (e.key === "Escape") { setOpen(false); return; }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setOpen(true); setActive((n) => Math.max(0, Math.min(matches.length - 1, n + (e.key === "ArrowDown" ? 1 : -1)))); }
        if (e.key === "Enter" && open && active >= 0 && matches[active]) { e.preventDefault(); choose(matches[active][0]); }
      }} />
    {open && <span id={`${id}-list`} role="listbox" className="station-options">{matches.map((s, i) => <span role="option" aria-selected={active === i} id={`${id}-${i}`} key={s[0]} onMouseDown={(e) => { e.preventDefault(); choose(s[0]); }}><b>{s[0]}</b> {hi ? s[3] : s[1]} <small>{s[2]}</small></span>)}{!matches.length && <span>{hi ? "सूची सीमित है। टिकट का स्टेशन कोड डाल सकते हैं।" : "Limited directory. You can enter the station code from your ticket."}</span>}</span>}
    <small>{selected ? `${hi ? selected[3] : selected[1]} · ${selected[0]}` : hi ? "सुझाव चुनें या सही स्टेशन कोड डालें।" : "Choose a suggestion or enter an exact station code."}</small>
  </span>;
}

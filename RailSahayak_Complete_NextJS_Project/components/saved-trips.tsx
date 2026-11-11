"use client";

import { useEffect, useState } from "react";
import { LocalizedLink as Link } from "./localized-link";
import { readTrips, tripHref, tripKey, writeTrips, type SavedTrip } from "@/lib/saved-trips";

export function SavedTrips({ hi }: { hi: boolean }) {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const refresh = () => setTrips(readTrips());
    refresh();
    window.addEventListener("railq:saved", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("railq:saved", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return <section className="saved-places" aria-labelledby="saved-trips-heading">
    <h2 id="saved-trips-heading">{hi ? "सेव की गई यात्राएँ" : "Saved journeys"}</h2>
    <p>{hi ? "यात्रा की जानकारी इस ब्राउज़र में सेव होती है। PNR या यात्री विवरण सेव नहीं होता।" : "Trip details are saved in this browser. PNRs and passenger details are never saved here."}</p>
    {trips.length === 0 && <p>{hi ? "सीट तुलना या लाइव ट्रेन परिणाम से कोई यात्रा सेव करें।" : "Save a journey from a seat comparison or a live train result."}</p>}
    {trips.map(trip => <article key={tripKey(trip)} className="saved-journey-shortcuts">
      <h3>{trip.train}{trip.name ? ` · ${trip.name}` : ""}</h3>
      <p>{[trip.from && trip.to && `${trip.from} → ${trip.to}`, trip.boardingDate, trip.travelClass, trip.quota].filter(Boolean).join(" · ")}</p>
      {trip.originDate && <p>{hi ? "मूल स्टेशन से प्रस्थान" : "Origin departure"} · {trip.originDate}</p>}
      <nav className="saved-journey-actions">
        {trip.from && trip.to && trip.boardingDate && <Link href={tripHref("/dashboard", trip)}>{hi ? "यात्रा खोलें" : "Open journey"}</Link>}
        <Link href={tripHref("/train-schedule", trip)}>{hi ? "समय-सारणी" : "Timetable"}</Link>
        <Link href={tripHref("/live-train-status", trip)}>{hi ? "लाइव स्थिति" : "Live status"}</Link>
        <Link href={tripHref("/coach-position", trip)}>{hi ? "कोच की स्थिति" : "Coach position"}</Link>
        <Link href={tripHref("/seat-availability", trip)}>{hi ? "सीटें फिर जाँचें" : "Recheck seats"}</Link>
        <button type="button" onClick={() => {
          const ok = writeTrips(readTrips().filter(item => tripKey(item) !== tripKey(trip)));
          setError(ok ? "" : hi ? "यात्रा हटाई नहीं जा सकी।" : "The browser could not remove this journey.");
        }}>{hi ? "हटाएँ" : "Remove"}</button>
      </nav>
    </article>)}
    {error && <p role="alert">{error}</p>}
  </section>;
}

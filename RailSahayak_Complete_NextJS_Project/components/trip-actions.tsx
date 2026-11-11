"use client";

import { useState } from "react";
import { LocalizedLink as Link } from "./localized-link";
import { normalizeTrip, readTrips, tripHref, tripKey, writeTrips, type SavedTrip } from "@/lib/saved-trips";

export function SaveTripButton({ trip: rawTrip, hi }: { trip: SavedTrip; hi: boolean }) {
  const [message, setMessage] = useState("");
  const trip = normalizeTrip(rawTrip);
  if (!trip) return null;

  function save() {
    if (!trip) return;
    const ok = writeTrips([trip, ...readTrips().filter(item => tripKey(item) !== tripKey(trip))]);
    setMessage(ok ? (hi ? "इस ब्राउज़र में यात्रा सेव हुई।" : "Journey saved on this browser.")
      : (hi ? "यात्रा सेव नहीं हुई।" : "The browser could not save this journey."));
  }

  return <div className="saved-journey-actions">
    <button type="button" onClick={save}>{hi ? "यात्रा सेव करें" : "Save this journey"}</button>
    {message && <span role="status">{message} <Link href="/dashboard">{hi ? "मेरी यात्रा" : "My Journey"}</Link></span>}
  </div>;
}

export function LiveTripActions({ trip: rawTrip, hi }: { trip: SavedTrip; hi: boolean }) {
  const [message, setMessage] = useState("");
  const trip = normalizeTrip(rawTrip);
  if (!trip) return null;

  async function share() {
    if (!trip) return;
    const url = new URL(`${hi ? "/hi" : ""}${tripHref("/live-train-status", trip)}`, location.origin).href;
    try {
      if (navigator.share) await navigator.share({ title: `${trip.train} · RailQ`, url });
      else {
        await navigator.clipboard.writeText(url);
        setMessage(hi ? "लिंक कॉपी हुआ।" : "Link copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage(url);
    }
  }

  return <section className="saved-journey-shortcuts" aria-label={hi ? "इस ट्रेन के टूल्स" : "Tools for this train"}>
    <nav className="saved-journey-actions">
      <Link href={tripHref("/train-schedule", trip)}>{hi ? "समय-सारणी" : "Timetable"}</Link>
      <Link href={tripHref("/coach-position", trip)}>{hi ? "कोच की स्थिति" : "Coach position"}</Link>
      <Link href={tripHref("/seat-availability", trip)}>{hi ? "सीट उपलब्धता" : "Seat availability"}</Link>
      <button type="button" onClick={share}>{hi ? "ट्रेन का लिंक साझा करें" : "Share train lookup"}</button>
    </nav>
    {message && <p role="status" style={{ overflowWrap: "anywhere" }}>{message}</p>}
    <SaveTripButton key={tripKey(trip)} trip={trip} hi={hi} />
  </section>;
}

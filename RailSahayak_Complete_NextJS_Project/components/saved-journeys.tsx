"use client";
import { useEffect, useState } from "react";
import { LocalizedLink as Link } from "./localized-link";
import { readPlaces, writePlaces, readRoutes, writeRoutes, validRoute, type SavedRoute } from "@/lib/local-journeys";
import { trackEvent } from "@/lib/analytics";
type Fields = Record<string, string>;
export function SavedJourneys({ hi, train, from, to, onChoose, acceptsTrain = false, acceptsRoute = false, routesOnly = false }: { hi: boolean; routesOnly?: boolean; acceptsTrain?: boolean; acceptsRoute?: boolean; train?: string; from?: string; to?: string; onChoose?: (fields: Fields) => void }) {
 const [trains, setTrains] = useState<string[]>([]), [routes, setRoutes] = useState<SavedRoute[]>([]), [message, setMessage] = useState("");
 useEffect(() => {
  const refresh = () => { setTrains(routesOnly ? [] : readPlaces().filter(p => p.kind === "train").map(p => p.value)); setRoutes(readRoutes()); };
  refresh(); window.addEventListener("railq:saved", refresh); window.addEventListener("storage", refresh);
  return () => { window.removeEventListener("railq:saved", refresh); window.removeEventListener("storage", refresh); };
 }, [routesOnly]);
 const canTrain = !!train && /^\d{5}$/.test(train), route = { from: from?.toUpperCase() ?? "", to: to?.toUpperCase() ?? "" }, canRoute = validRoute(route);
 const trainSaved = trains.includes(train || ""), routeSaved = routes.some(r => r.from === route.from && r.to === route.to);
 const text = (en: string, hindi: string) => hi ? hindi : en;
 function notify(ok: boolean) { setMessage(ok ? text("Saved on this device.", "इस डिवाइस पर सेव किया।") : text("Storage is unavailable. You can still use the tools.", "स्टोरेज उपलब्ध नहीं है। टूल फिर भी इस्तेमाल कर सकते हैं।")); if(ok) trackEvent("saved_journey_action", { outcome:"success", action:"save" }); }
 const reuse = (fields: Fields) => { onChoose?.(fields); trackEvent("saved_journey_action", { action:"reuse" }); };
 if (!canTrain && !canRoute && !trains.length && !routes.length) return null;
 return <aside className="saved-journey-shortcuts" aria-label={text("Saved journey shortcuts", "सेव यात्रा शॉर्टकट")}>
  <div className="saved-journey-actions">
   {canTrain && <button type="button" disabled={trainSaved} onClick={() => notify(writePlaces([{ kind:"train", value:train! }, ...readPlaces().filter(p => p.kind !== "train" || p.value !== train)]))}>{trainSaved ? text("Train saved", "ट्रेन सेव है") : text("Save this train", "यह ट्रेन सेव करें")}</button>}
   {canRoute && <button type="button" disabled={routeSaved} onClick={() => notify(writeRoutes([route,...routes.filter(r => r.from !== route.from || r.to !== route.to)]))}>{routeSaved ? text("Route saved", "मार्ग सेव है") : text("Save this route", "यह मार्ग सेव करें")}</button>}
  </div>
  {!!(trains.length || routes.length) && <details><summary>{routesOnly ? text("Your saved routes", "आपके सेव मार्ग") : text("Your saved trains and routes", "आपकी सेव ट्रेनें और मार्ग")}</summary>
   <ul>{trains.map(value => <li key={value}>{onChoose && acceptsTrain ? <button type="button" onClick={() => reuse({ train:value })}>{text("Train", "ट्रेन")} {value}</button> : <Link href={`/live-train-status?train=${value}`} onClick={() => reuse({ train:value })}>{text("Train", "ट्रेन")} {value}</Link>}<button type="button" aria-label={text(`Remove train ${value}`, `ट्रेन ${value} हटाएँ`)} onClick={() => { if(!writePlaces(readPlaces().filter(p => p.kind !== "train" || p.value !== value))) notify(false); }}>×</button></li>)}
   {routes.map(r => <li key={r.from+r.to}>{onChoose && acceptsRoute ? <button type="button" onClick={() => reuse(r)}>{r.from} → {r.to}</button> : <Link href={`/trains-between-stations?from=${r.from}&to=${r.to}`} onClick={() => reuse(r)}>{r.from} → {r.to}</Link>}<button type="button" aria-label={text(`Remove route ${r.from} to ${r.to}`, `मार्ग ${r.from} से ${r.to} हटाएँ`)} onClick={() => { if(!writeRoutes(routes.filter(x => x.from !== r.from || x.to !== r.to))) notify(false); }}>×</button></li>)}</ul></details>}
  <p>{text("Only in this browser. No PNR or travel date is saved.", "केवल इस ब्राउज़र में। PNR या यात्रा तारीख सेव नहीं होती।")}</p><p role="status">{message}</p>
 </aside>;
}

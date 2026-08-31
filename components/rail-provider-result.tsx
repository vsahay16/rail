import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { LocalizedLink as Link } from "@/components/localized-link";
import { stationLabel } from "@/lib/rail-data";

type JsonRecord = Record<string, unknown>;

function record(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : null;
}

function list(value: unknown): unknown[] { return Array.isArray(value) ? value : []; }
function objectAt(value: JsonRecord, key: string) { return record(value[key]) ?? {}; }
function text(value: unknown, fallback = "—") {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? String(value) : fallback;
}
function first(...values: unknown[]) {
  for (const value of values) if ((typeof value === "string" && value.trim()) || typeof value === "number" || typeof value === "boolean") return String(value);
  return "—";
}
function titleCase(value: unknown) {
  return text(value).replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function duration(value: unknown, hi: boolean) {
  const minutes = value === null || value === undefined || value === "" ? NaN : Number(value);
  if (!Number.isFinite(minutes)) return "—";
  const hours = Math.floor(minutes / 60); const remaining = Math.round(minutes % 60);
  return hi ? `${hours} घं ${remaining} मि` : `${hours}h ${remaining}m`;
}
function delay(value: unknown, hi: boolean) {
  const minutes = value === null || value === undefined || value === "" ? NaN : Number(value);
  if (!Number.isFinite(minutes)) return hi ? "उपलब्ध नहीं" : "Not available";
  if (minutes <= 0) return hi ? "समय पर" : "On time";
  return hi ? `${minutes} मिनट देरी` : `${minutes} min late`;
}
function dateTime(value: unknown, hi: boolean) {
  if (typeof value !== "string" || !value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) return value;
  return parsed.toLocaleString(hi ? "hi-IN" : "en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
}
function money(value: unknown) {
  const amount = value === null || value === undefined || value === "" ? NaN : Number(value);
  return Number.isFinite(amount) ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount) : "—";
}
function stationName(value: JsonRecord) { return first(value.name, value.stationName, value.code, value.stationCode); }
function stationCode(value: JsonRecord) { return first(value.code, value.stationCode); }

function ResultShell({ children, hi, updated }: { children: ReactNode; hi: boolean; updated?: unknown }) {
  return <div className="rail-provider-result" aria-live="polite">
    <div className="rail-result-source"><span className="live-dot" />{hi ? "प्रदाता डेटा" : "Provider data"}{updated !== undefined && updated !== null ? <small>{hi ? "अपडेट" : "Updated"} {dateTime(updated, hi)}</small> : null}</div>
    {children}
    <div className="rail-result-verification"><Icon name="shield" size={15} /><span>{hi ? "महत्वपूर्ण और अंतिम जानकारी आधिकारिक रेलवे माध्यम पर जाँचें।" : "Verify critical and final journey information through official railway channels."}</span></div>
  </div>;
}

function Metric({ label, value, tone = "" }: { label: string; value: string; tone?: string }) {
  return <div className={`rail-metric ${tone}`}><small>{label}</small><strong>{value}</strong></div>;
}

function LiveResult({ data, hi }: { data: JsonRecord; hi: boolean }) {
  const train = objectAt(data, "train"); const previous = objectAt(data, "previousHalt"); const next = objectAt(data, "nextHalt");
  const route = list(data.route).map(record).filter(Boolean) as JsonRecord[];
  const halts = route.filter((row) => row.isHalt === true);
  const nextCode = stationCode(next);
  const nextIndex = halts.findIndex((row) => first(row.stationCode, objectAt(row, "station").code) === nextCode);
  const importantHalts = nextIndex >= 0 ? halts.slice(Math.max(0, nextIndex - 1), nextIndex + 4) : halts.slice(0, 6);
  return <ResultShell hi={hi} updated={data.lastUpdatedAt}>
    <div className="rail-result-heading"><div><span>{first(data.trainNumber, train.number)}</span><h2>{first(data.trainName, train.name, hi ? "लाइव ट्रेन स्थिति" : "Live train status")}</h2><p>{stationName(objectAt(train, "source"))} → {stationName(objectAt(train, "destination"))}</p></div><div className={`rail-status-badge ${Number(data.delayMinutes) > 0 ? "late" : "on-time"}`}>{delay(data.delayMinutes, hi)}</div></div>
    <div className="rail-summary-grid">
      <Metric label={hi ? "स्थिति" : "Status"} value={titleCase(data.status)} />
      <Metric label={hi ? "देरी" : "Delay"} value={delay(data.delayMinutes, hi)} tone={Number(data.delayMinutes) > 0 ? "warning" : "success"} />
      <Metric label={hi ? "पिछला ठहराव" : "Previous halt"} value={`${stationCode(previous)} · ${stationName(previous)}`} />
      <Metric label={hi ? "अगला ठहराव" : "Next halt"} value={`${stationCode(next)} · ${stationName(next)}`} tone="accent" />
    </div>
    {importantHalts.length > 0 && <div className="rail-timeline"><div className="rail-subheading"><h3>{hi ? "अगले मुख्य ठहराव" : "Next important halts"}</h3><small>{hi ? "पिछला और अगले चार तक" : "Previous and up to four ahead"}</small></div>{importantHalts.map((row, index) => <div className={`rail-timeline-row ${text(row.status, "scheduled")}`} key={`${text(row.stationCode)}-${index}`}><span className="rail-timeline-dot" /><div><b>{text(row.stationCode)} · {text(row.stationName)}</b><small>{titleCase(row.status)}</small></div><div><small>{hi ? "आगमन" : "Arrival"}</small><b>{dateTime(first(row.expectedArrival, row.scheduledArrival), hi)}</b></div><div><small>{hi ? "प्रस्थान" : "Departure"}</small><b>{dateTime(first(row.expectedDeparture, row.scheduledDeparture), hi)}</b></div><div><small>{hi ? "प्लेटफॉर्म" : "Platform"}</small><b>{text(row.platform)}</b></div></div>)}</div>}
  </ResultShell>;
}

function ScheduleResult({ data, hi }: { data: JsonRecord; hi: boolean }) {
  const train = objectAt(data, "train"); const source = objectAt(train, "source"); const destination = objectAt(train, "destination");
  const route = (list(data.route).map(record).filter(Boolean) as JsonRecord[]).filter((row) => row.isHalt === true || (row.isHalt === undefined && Boolean(row.arrival || row.departure)));
  return <ResultShell hi={hi}>
    <div className="rail-result-heading"><div><span>{text(train.number)}</span><h2>{first(train.name, hi ? "ट्रेन समय-सारणी" : "Train schedule")}</h2><p>{stationCode(source)} · {stationName(source)} → {stationCode(destination)} · {stationName(destination)}</p></div><div className="rail-status-badge neutral">{titleCase(train.type)}</div></div>
    <div className="rail-summary-grid">
      <Metric label={hi ? "दूरी" : "Distance"} value={`${text(train.distance)} km`} />
      <Metric label={hi ? "यात्रा समय" : "Duration"} value={duration(train.duration, hi)} />
      <Metric label={hi ? "मुख्य ठहराव" : "Halts"} value={text(route.length)} />
      <Metric label={hi ? "चलने के दिन" : "Running days"} value={list(train.runDays).map(titleCase).join(" · ") || "—"} />
    </div>
    {route.length > 0 && <div className="rail-timeline"><div className="rail-subheading"><h3>{hi ? "स्टेशन समय-सारणी" : "Station timetable"}</h3><small>{route.length} {hi ? "ठहराव" : "halts"}</small></div>{route.slice(0, 8).map((row, index) => { const station = objectAt(row, "station"); return <div className="rail-timeline-row" key={`${stationCode(station)}-${index}`}><span className="rail-timeline-dot" /><div><b>{stationCode(station)} · {stationName(station)}</b><small>{text(row.distance)} km</small></div><div><small>{hi ? "आगमन" : "Arrival"}</small><b>{text(row.arrival)}</b></div><div><small>{hi ? "प्रस्थान" : "Departure"}</small><b>{text(row.departure)}</b></div><div><small>{hi ? "दिन" : "Day"}</small><b>{text(first(row.departureDay, row.arrivalDay), "1")}</b></div></div>; })}{route.length > 8 && <details className="rail-more-stops"><summary>{hi ? `बाकी ${route.length - 8} ठहराव देखें` : `Show ${route.length - 8} more halts`}</summary>{route.slice(8).map((row, i) => <div className="rail-timeline-row" key={i}><span className="rail-timeline-dot" /><div><b>{stationLabel(row.station) || stationLabel(row)}</b></div><div><small>{hi ? "आगमन" : "Arrival"}</small><b>{text(row.arrival)}</b></div><div><small>{hi ? "प्रस्थान" : "Departure"}</small><b>{text(row.departure)}</b></div><div><small>{hi ? "दिन" : "Day"}</small><b>{first(row.departureDay, row.arrivalDay)}</b></div></div>)}</details>}</div>}
  </ResultShell>;
}

function BetweenResult({ data, hi }: { data: JsonRecord; hi: boolean }) {
  const from = objectAt(data, "from"); const to = objectAt(data, "to"); const trains = list(data.trains).map(record).filter(Boolean) as JsonRecord[];
  return <ResultShell hi={hi}>
    <div className="rail-result-heading"><div><span>{stationCode(from)} → {stationCode(to)}</span><h2>{hi ? "मिलने वाली ट्रेनें" : "Available trains"}</h2><p>{stationName(from)} → {stationName(to)}</p></div><div className="rail-status-badge neutral">{text(data.count, text(trains.length))} {hi ? "ट्रेन" : "trains"}</div></div>
    {trains.length === 0 ? <div className="rail-empty"><Icon name="info" size={20} /><div><h3>{hi ? "सीधी ट्रेन नहीं मिली" : "No direct train found"}</h3><p>{hi ? "स्टेशन कोड जाँचें या पास के मुख्य स्टेशन से खोजें।" : "Check the station codes or try a nearby major station."}</p></div></div> : <div className="rail-train-list">{trains.map((row, index) => { const train = objectAt(row, "train"); const origin = { ...from, ...objectAt(row, "from") }; const destination = { ...to, ...objectAt(row, "to") }; return <article key={`${text(train.number)}-${index}`}><div className="rail-train-title"><span>{text(train.number)}</span><div><h3><Link href={`/train/${text(train.number)}`}>{text(train.name)}</Link></h3><small>{titleCase(train.type)}</small></div></div><div className="rail-train-times"><div><small>{stationCode(origin)}</small><b>{text(origin.departure)}</b><span>{hi ? "दिन" : "Day"} {text(origin.day)}</span></div><i /><div><small>{stationCode(destination)}</small><b>{text(destination.arrival)}</b><span>{hi ? "दिन" : "Day"} {text(destination.day)}</span></div></div><div className="rail-train-meta"><span>{duration(row.duration, hi)}</span><span>{text(row.distance)} km</span><span>{list(train.runDays).map((day) => text(day).slice(0, 3).toUpperCase()).join(" · ")}</span></div></article>; })}</div>}
  </ResultShell>;
}

function AvailabilityResult({ data, hi }: { data: JsonRecord; hi: boolean }) {
  const entries = [data.calendar, data.avlDayList, data.availability, data.days, data.results, data.dates].map(list).find((items) => items.length > 0) ?? [];
  return <ResultShell hi={hi} updated={data.lastUpdatedAt}>
    <div className="rail-result-heading"><div><span>{first(data.trainNumber, data.trainNo)}</span><h2>{hi ? "सीट उपलब्धता" : "Seat availability"}</h2><p>{(stationLabel(data.sourceStation ?? data.source ?? data.from) || "—")} → {(stationLabel(data.destinationStation ?? data.destination ?? data.to) || "—")} · {first(data.classCode, data.class)} · {first(data.quotaCode, data.quota)}</p></div><div className="rail-status-badge neutral">{entries.length} {hi ? "तारीखें" : "dates"}</div></div>
    {entries.length === 0 && <p className="rail-empty">{hi ? "प्रदाता ने तारीखवार उपलब्धता नहीं दी। बाद में जाँचें।" : "The provider did not return date-by-date availability. Please check again later."}</p>}<div className="rail-availability-grid">{entries.map((item, index) => { const row = record(item) ?? {}; const status = first(row.currentStatus, row.status, row.availablityStatus, row.availabilityStatus, row.availability); return <article key={`${first(row.journeyDate, row.date, row.availablityDate, row.availabilityDate)}-${index}`}><small>{dateTime(first(row.journeyDate, row.date, row.availablityDate, row.availabilityDate), hi)}</small><strong>{status}</strong><span>{first(row.prediction, row.confirmationProbability, row.racStatus, hi ? "लाइव प्रदाता स्थिति" : "Live provider status")}</span></article>; })}</div>
  </ResultShell>;
}

function FareResult({ data, hi }: { data: JsonRecord; hi: boolean }) {
  const breakdown = objectAt(data, "breakdown");
  return <ResultShell hi={hi} updated={data.lastUpdatedAt}>
    <div className="rail-result-heading"><div><span>{first(data.trainNumber, data.trainNo)}</span><h2>{first(data.trainName, hi ? "अनुमानित कुल किराया" : "Estimated total fare")}</h2><p>{(stationLabel(data.sourceStation ?? data.source ?? data.from) || "—")} → {(stationLabel(data.destinationStation ?? data.destination ?? data.to) || "—")} · {first(data.classCode, data.class)} · {first(data.quotaCode, data.quota)}</p></div><div className="rail-fare-total"><small>{hi ? "कुल" : "Total"}</small><strong>{money(first(breakdown.totalFare, data.totalFare, data.fare, data.amount))}</strong></div></div>
    <div className="rail-fare-breakdown">{Object.entries(breakdown).filter(([key, value]) => key !== "totalFare" && value !== null && value !== "" && Number.isFinite(Number(value))).map(([key, value]) => <div key={key}><span>{titleCase(key)}</span><b>{money(value)}</b></div>)}</div>
  </ResultShell>;
}

function StationResult({ data, hi }: { data: JsonRecord; hi: boolean }) {
  const station = objectAt(data, "station"); const trains = list(data.trains).map(record).filter(Boolean) as JsonRecord[];
  return <ResultShell hi={hi} updated={data.lastUpdatedAt}>
    <div className="rail-result-heading"><div><span>{stationCode(station)}</span><h2>{stationName(station)}</h2><p>{hi ? "लाइव आगमन और प्रस्थान बोर्ड" : "Live arrivals and departures board"}</p></div><div className="rail-status-badge neutral">{text(data.count, text(trains.length))} {hi ? "ट्रेन" : "trains"}</div></div>
    {trains.length === 0 && <p className="rail-empty">{hi ? "इस समय-विंडो में कोई ट्रेन नहीं मिली।" : "No trains were returned for this time window."}</p>}<div className="rail-board-list">{trains.map((row, index) => { const train = objectAt(row, "train"); const stop = objectAt(row, "stop"); const live = objectAt(row, "live"); return <article key={`${text(train.number)}-${index}`}><span>{text(train.number)}</span><div><h3><Link href={`/train/${text(train.number)}`}>{text(train.name)}</Link></h3><small>{(stationLabel(train.source) || "—")} → {(stationLabel(train.destination) || "—")}</small></div><div><small>{hi ? "आगमन" : "Arrival"}</small><b>{dateTime(first(live.expectedArrivalTime, stop.arrival), hi)}</b></div><div><small>{hi ? "प्रस्थान" : "Departure"}</small><b>{dateTime(first(live.expectedDepartureTime, stop.departure), hi)}</b></div><div><small>{hi ? "प्लेटफॉर्म" : "Platform"}</small><b>{first(live.platform, stop.platform)}</b></div><div className="rail-board-status">{titleCase(live.type)}</div></article>; })}</div>
  </ResultShell>;
}

function CoachResult({ data, hi, platform }: { data: JsonRecord; hi: boolean; platform: boolean }) {
  const raw = list(data.rake).length ? list(data.rake) : list(data.coaches);
  const coaches = raw.map((item, index) => typeof item === "string" ? { code: item, position: index + 1 } : record(item)).filter(Boolean) as JsonRecord[];
  const station = objectAt(data, "station");
  return <ResultShell hi={hi} updated={data.lastUpdatedAt}>
    <div className="rail-result-heading"><div><span>{first(data.trainNumber, data.trainNo)}</span><h2>{platform ? (hi ? "प्लेटफॉर्म कोच स्थिति" : "Platform coach position") : first(data.trainName, hi ? "कोच संरचना" : "Coach composition")}</h2><p>{platform ? `${first(station.code, data.stationCode)} · ${first(station.name, data.stationName)}` : `${text(data.totalCoaches, text(coaches.length))} ${hi ? "कोच" : "coaches"}`}</p></div>{platform && <div className="rail-platform-number"><small>{hi ? "प्लेटफॉर्म" : "Platform"}</small><strong>{first(station.platform, data.platform)}</strong></div>}</div>
    {typeof data.direction === "string" && data.direction ? <div className="rail-inline-note">{hi ? "दिशा" : "Direction"}: <b>{text(data.direction)}</b></div> : null}
    {coaches.length === 0 && <p className="rail-empty">{hi ? "कोच क्रम उपलब्ध नहीं है। स्टेशन पर सत्यापित करें।" : "Coach order is unavailable. Please verify at the station."}</p>}<div className="rail-coach-strip">{coaches.map((coach, index) => <div className={text(coach.category, text(coach.classType, "coach")).toLowerCase()} key={`${text(coach.code)}-${index}`}><small>{text(coach.position, String(index + 1))}</small><b>{text(coach.code)}</b><span>{first(coach.name, coach.classType)}</span></div>)}</div>
    {typeof data.formation === "string" || typeof data.baseFormation === "string" ? <p className="rail-formation">{hi ? "रेक क्रम" : "Rake order"}: {first(data.formation, data.baseFormation)}</p> : null}
  </ResultShell>;
}

function GenericResult({ hi }: { hi: boolean }) {
  return <ResultShell hi={hi}><p className="rail-empty">{hi ? "इस उत्तर का प्रारूप समर्थित नहीं है। आधिकारिक रेलवे सेवा पर सत्यापित करें।" : "This response format is not supported. Please verify through an official railway service."}</p></ResultShell>;
}

export function RailProviderResult({ toolSlug, payload, hi }: { toolSlug: string; payload: JsonRecord; hi: boolean }) {
  const data = record(payload.data) ?? record(payload.result) ?? payload;
  const cache = record(payload.railq);
  const content = toolSlug === "live-train-status" ? <LiveResult data={data} hi={hi} />
    : toolSlug === "train-schedule" ? <ScheduleResult data={data} hi={hi} />
    : toolSlug === "trains-between-stations" ? <BetweenResult data={data} hi={hi} />
    : toolSlug === "seat-availability" ? <AvailabilityResult data={data} hi={hi} />
    : toolSlug === "train-fare" ? <FareResult data={data} hi={hi} />
    : toolSlug === "station-arrivals-departures" ? <StationResult data={data} hi={hi} />
    : toolSlug === "coach-position" ? <CoachResult data={data} hi={hi} platform={false} />
    : toolSlug === "platform-number" ? <CoachResult data={data} hi={hi} platform /> : <GenericResult hi={hi} />;
  return <>{cache?.cached === true && <p className="rail-cache-note">{hi ? "हाल में प्राप्त प्रदाता डेटा" : "Recently fetched provider data"} · {dateTime(cache.fetchedAt, hi)}</p>}{content}</>;
}

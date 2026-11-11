import { LocalizedLink as Link } from "@/components/localized-link";
import { LiveTripActions } from "@/components/trip-actions";
import { RailFreshness, railwayTime } from "@/components/rail-freshness";
import { liveSummary, railData, record, rows, scalar, stationCode, stationLabel } from "@/lib/rail-data";
import type { SavedTrip } from "@/lib/saved-trips";
import styles from "./trip-summary.module.css";

export type JourneyData = {
  pnr?: Record<string, unknown>;
  schedule?: Record<string, unknown>;
  live?: Record<string, unknown>;
  train?: string;
  name?: string;
  source?: string;
  destination?: string;
  date?: string;
  originDate?: string;
  travelClass?: string;
  quota?: string;
  errors: string[];
};

export function TripSummary({ journey, busy, hi, onRefresh }: {
  journey: JourneyData;
  busy: boolean;
  hi: boolean;
  onRefresh: () => void;
}) {
  const t = (en: string, hindi: string) => hi ? hindi : en;
  const schedule = railData(journey.schedule);
  const live = railData(journey.live);
  const summary = liveSummary(journey.live);
  const timetable = rows(schedule.route);
  const timeline = rows(live.route);
  const findStop = (list: Record<string, unknown>[], code?: string) =>
    code ? list.find(row => stationCode(row.station ?? row) === code) : undefined;
  const boarding = findStop(timetable, journey.source);
  const liveBoarding = findStop(timeline, journey.source);
  const destination = findStop(timetable, journey.destination);
  const liveDestination = findStop(timeline, journey.destination);
  const unavailable = t("Unavailable", "उपलब्ध नहीं");
  const checked = record(journey.live?.railq);
  const trainName = scalar(journey.name, summary.trainName, record(schedule.train).name);
  const trip: SavedTrip | undefined = journey.train ? {
    train: journey.train, name: trainName, from: journey.source, to: journey.destination,
    boardingDate: journey.date, originDate: journey.originDate, travelClass: journey.travelClass, quota: journey.quota,
  } : undefined;
  function timetableArrival() {
    const time = railwayTime(destination?.arrival, hi) || railwayTime(liveDestination?.scheduledArrival, hi);
    const day = Number(destination?.arrivalDay ?? destination?.day);
    if (!time || !journey.originDate || !Number.isInteger(day) || day < 1 || day > 30) return time;
    const date = new Date(`${journey.originDate}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + day - 1);
    return `${date.toISOString().slice(0, 10)} · ${time}`;
  }
  const values = [
    [t("Boarding station", "बोर्डिंग स्टेशन"), stationLabel(boarding?.station) || journey.source],
    [t("Boarding date", "बोर्डिंग की तारीख"), journey.date],
    [t("Origin departure date", "मूल स्टेशन से प्रस्थान की तारीख"), journey.originDate],
    [t("Scheduled departure", "निर्धारित प्रस्थान"), railwayTime(boarding?.departure, hi) || railwayTime(liveBoarding?.scheduledDeparture, hi)],
    [t("Reported departure", "प्रदाता से मिला प्रस्थान समय"), railwayTime(scalar(liveBoarding?.actualDeparture, liveBoarding?.expectedDeparture), hi)],
    [t("Reported live status", "प्रदाता से मिली लाइव स्थिति"), summary.status],
    [t("Next stop", "अगला ठहराव"), summary.next],
    [t("Boarding platform reported", "प्रदाता से मिला बोर्डिंग प्लेटफॉर्म"), scalar(liveBoarding?.platform)],
    [t("Scheduled arrival at destination", "मंज़िल पर निर्धारित आगमन"), timetableArrival()],
    [t("Reported arrival at destination", "प्रदाता से मिला मंज़िल का आगमन समय"), railwayTime(scalar(liveDestination?.actualArrival, liveDestination?.expectedArrival), hi)],
  ];
  return <section id="trip-summary" className={styles.panel} aria-labelledby="trip-summary-heading" aria-busy={busy} tabIndex={-1}>
    <h2 id="trip-summary-heading">{journey.train ? `${journey.train}${trainName ? ` · ${trainName}` : ""}` : t("Journey summary", "यात्रा सारांश")}</h2>
    {journey.source && journey.destination && <p>{journey.source} → {journey.destination}</p>}
    <div className="saved-journey-actions">
      <button type="button" disabled={busy} onClick={onRefresh}>{busy ? t("Checking journey…", "यात्रा जाँची जा रही है…") : t("Refresh trip", "यात्रा फिर जाँचें")}</button>
      <Link href="/official-services">{t("Official railway enquiry", "आधिकारिक रेलवे पूछताछ")}</Link>
    </div>
    <dl className={styles.grid}>{values.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || unavailable}</dd></div>)}</dl>
    <RailFreshness hi={hi} updated={scalar(live.lastUpdatedAt, live.providerUpdated)} checked={checked.fetchedAt ?? null} cached={checked.cached === true} />
    <p>{t("Check the station display for platform changes. All timetable times use Indian time.", "प्लेटफॉर्म में बदलाव के लिए स्टेशन डिस्प्ले देखें। समय-सारणी के समय भारतीय मानक समय में हैं।")}</p>
    {journey.errors.length > 0 && <ul className={styles.errors} aria-label={t("Lookup notices", "जाँच की जानकारी")}>
      {journey.errors.map((error, i) => <li key={i}>{error}</li>)}
    </ul>}
    {trip && <LiveTripActions hi={hi} trip={trip} />}
  </section>;
}

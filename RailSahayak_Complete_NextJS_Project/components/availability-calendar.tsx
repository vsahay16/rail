import { rows } from "@/lib/rail-data";
import { parseJourneyDate, seatDayText, numericEstimate, type SeatDay } from "@/lib/seat-availability";
import styles from "./seat-availability.module.css";
export function AvailabilityCalendar({ data, hi, fetchedAt, cached = false }: { data: Record<string, unknown>; hi: boolean; fetchedAt?: string; cached?: boolean }) {
  const days = rows(data.calendar) as unknown as SeatDay[];
  const requested = parseJourneyDate(data.requestedDate);
  const displayDate = (value: string | null) => value ? new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", { day:"numeric", month:"short", year:"numeric", timeZone:"Asia/Kolkata" }).format(new Date(`${value}T12:00:00+05:30`)) : (hi ? "तारीख उपलब्ध नहीं" : "Date unavailable");
  const checked = fetchedAt && Number.isFinite(Date.parse(fetchedAt)) ? new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", { dateStyle:"medium", timeStyle:"short", timeZone:"Asia/Kolkata" }).format(new Date(fetchedAt)) : null;
  const matches = requested && days.some(d => d.date === requested);
  return <div className={styles.results}>
    <p><strong>{hi ? "माँगी गई यात्रा तारीख" : "Requested journey date"}: {displayDate(requested)}</strong></p>
    <p className={styles.checked}>{cached ? (hi ? "कैश में सहेजा गया परिणाम। " : "Cached result. ") : ""}{hi ? "पिछली जाँच" : "Last checked"}: {checked ? <time dateTime={fetchedAt}>{checked} IST</time> : (hi ? "समय उपलब्ध नहीं" : "Time unavailable")}. {hi ? "यह RailQ के डेटा प्राप्त करने का समय है, रेलवे के अपडेट का समय नहीं।" : "This is when RailQ retrieved the data, not the railway’s update time."}</p>
    {!matches && <p role="status">{hi ? "माँगी गई तारीख का परिणाम नहीं मिला। नीचे अन्य तारीखें हों तो वे आपकी चुनी तारीख का विकल्प अपने-आप नहीं हैं।" : "No result was returned for the requested date. Any other dates below do not replace your selected journey date."}</p>}
    {!days.length ? <p>{hi ? "उपलब्धता की जानकारी नहीं मिली। इसका मतलब सीटें खत्म होना नहीं है।" : "Availability was not returned. This does not mean the train is sold out."}</p> : <div className={styles.days}>{days.map((day, index) => {
      const percentage = day.kind === "waitlist" && day.canBook === true ? numericEstimate(day.estimate) : null;
      const current = day.date === requested && requested !== null;
      const status = seatDayText(day, hi);
      return <article className={`${styles.day} ${day.kind === "available" ? styles.available : ""}`} key={`${day.date}-${index}`}>
        <span className={styles.dateKind}>{current ? (hi ? "चुनी गई तारीख" : "Requested date") : (hi ? "प्रदाता की अन्य तारीख" : "Additional provider date")}</span>
        <h3><time dateTime={day.date || undefined}>{displayDate(day.date)}</time></h3>
        <strong>{status}{day.kind === "waitlist" && day.waitlistType ? ` · ${day.waitlistType}` : ""}</strong>
        {day.kind === "unavailable" && day.status && <p>{day.status}</p>}
        {day.kind === "rac" && <p>{hi ? "RAC पूरी कन्फर्म बर्थ नहीं है। पूरी बर्थ मिलने की संभावना का प्रतिशत यहाँ नहीं दिखाया गया है।" : "RAC is not a confirmed full berth. No percentage is interpreted here as a chance of a full berth."}</p>}
        {percentage !== null && <p className={styles.estimate}>{hi ? "प्रदाता का अनुमान" : "Provider estimate"}: <b>{percentage}%</b></p>}
        {day.kind === "waitlist" && percentage === null && <p>{hi ? "प्रतिशत अनुमान उपलब्ध नहीं" : "Percentage estimate unavailable"}</p>}
        {day.kind === "available" && <p>{hi ? "सीटें बुकिंग से पहले बदल सकती हैं।" : "Availability can change before booking."}</p>}
        {day.rawStatus && <details><summary>{hi ? "प्रदाता की स्थिति का विवरण" : "Provider status details"}</summary><p>{day.rawStatus}</p></details>}
      </article>;
    })}</div>}
    <p className={styles.note}>{hi ? "दिखाई गई उपलब्धता का अनुमान RailKit के माध्यम से मिला है। यह गारंटी या किसी मौजूदा PNR का अनुमान नहीं है।" : "Estimate supplied via RailKit for the availability shown. It is not a guarantee or a prediction for an existing PNR."}</p>
    <p className={styles.note}>{hi ? "केवल प्रदाता की लौटाई तारीखें दिखाई गई हैं। प्रत्येक तारीख या श्रेणी के लिए अपने-आप अलग खोज नहीं होती। RailQ टिकट बुक नहीं करता।" : "Only provider-returned dates are shown. RailQ does not automatically search every date or class and does not book tickets."}</p>
  </div>;
}

"use client";
import { pnrSummary } from "@/lib/rail-data";
import { LocalizedLink as Link } from "@/components/localized-link";
import styles from "./pnr-journey-card.module.css";
type Summary = ReturnType<typeof pnrSummary>;
export function PnrJourneyCard({ summary: s, hi }: { summary: Summary; hi: boolean }) {
  const text = (en: string, hindi: string) => hi ? hindi : en;
  const missing = text("Not provided", "जानकारी नहीं मिली");
  return <section className={styles.card} aria-label={text("Your journey result", "आपकी यात्रा का परिणाम")}>
    <header className={styles.header}><div><span className={styles.kicker}>{text("YOUR JOURNEY", "आपकी यात्रा")}</span><h2>{s.trainName || text("PNR result", "PNR परिणाम")} <small>{s.trainNumber}</small></h2><p>{s.from || missing} <span aria-hidden="true">→</span> {s.to || missing}</p></div><span className={styles.chart}>{s.chartStatus || missing}</span></header>
    <dl className={styles.facts}><div><dt>{text("Journey date", "यात्रा तारीख")}</dt><dd>{s.journeyDate || missing}</dd></div><div><dt>{text("Class", "श्रेणी")}</dt><dd>{s.travelClass || missing}</dd></div><div><dt>{text("Passengers returned", "मिले यात्री रिकॉर्ड")}</dt><dd>{s.passengers.length}</dd></div></dl>
    <div className={styles.people}>{s.passengers.map((p,i)=>{
      const rac=/^RAC\b/i.test(p.current), confirmed=/^(CNF|CONFIRMED)\b/i.test(p.current), waiting=/WL/i.test(p.current), cancelled=/^(CAN|CANCELLED)\b/i.test(p.current);
      const tone=confirmed?styles.confirmed:rac?styles.rac:waiting?styles.waiting:styles.neutral;
      const explanation=confirmed?text("Confirmed status reported. Check the assigned coach and berth below.","कन्फर्म स्थिति मिली है। नीचे आवंटित कोच और बर्थ देखें।"):rac?text("RAC is not a full confirmed berth. Check again for an allocation update.","RAC का अर्थ पूरी कन्फर्म बर्थ नहीं है। आवंटन में बदलाव के लिए दोबारा जाँचें।"):waiting?text("Still waitlisted. Verify the final status and ticket-specific travel eligibility before boarding.","अभी प्रतीक्षा सूची में है। चढ़ने से पहले अंतिम स्थिति और अपने टिकट की यात्रा पात्रता जाँचें।"):cancelled?text("Cancellation reported for this passenger.","इस यात्री की रद्द स्थिति मिली है।"):text("Check the official record if the status is unclear.","स्थिति स्पष्ट न हो तो आधिकारिक रिकॉर्ड जाँचें।");
      return <article className={styles.person} key={i}><div className={styles.personTop}><h3>{text("Passenger", "यात्री")} {p.number}</h3><strong className={`${styles.badge} ${tone}`}>{p.current || missing}</strong></div><div className={styles.change}><span>{text("Booked", "बुकिंग")} <b>{p.booking || missing}</b></span><span aria-hidden="true">→</span><span>{text("Current", "वर्तमान")} <b>{p.current || missing}</b></span></div><p>{explanation}</p><div className={styles.berth}>{text("Coach / berth", "कोच / बर्थ")}: <b>{[p.coach,p.berth,p.berthCode].filter(Boolean).join(" · ") || text("Not assigned or not returned", "आवंटित नहीं या जानकारी नहीं मिली")}</b></div></article>;
    })}</div>
    <nav className={styles.actions} aria-label={text("Next journey steps", "यात्रा के अगले चरण")}>
      {s.trainNumber && <Link href={`/train/${encodeURIComponent(s.trainNumber)}`}>{text("Train schedule", "ट्रेन समय-सारणी")} →</Link>}
      <Link href="/live-train-status">{text("Check live running status", "लाइव ट्रेन स्थिति देखें")} →</Link><Link href="/waitlist-guide">{text("Understand WL / RAC", "WL / RAC समझें")} →</Link>
    </nav>
    <p className={styles.note}>{text("Latest provider response, not a ticket. Check each passenger separately. Confirmation probability is not included in this result.","प्रदाता से मिला नवीनतम उत्तर, यह टिकट नहीं है। हर यात्री की स्थिति अलग जाँचें। इस परिणाम में कन्फर्म होने की संभावना शामिल नहीं है।")}</p>
  </section>;
}

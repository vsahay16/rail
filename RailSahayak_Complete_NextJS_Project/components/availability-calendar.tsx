import { availabilityDays } from "@/lib/journey-options";
import styles from "./journey-upgrade.module.css";
export function AvailabilityCalendar({data,hi}:{data:Record<string,unknown>;hi:boolean}){
 const days=availabilityDays(data);const available=days.filter(d=>d.available);
 return <div><p>{hi?'प्रदाता द्वारा लौटाई गई तारीखें ही दिखाई गई हैं। हर दिन के लिए अलग अनुरोध नहीं किया गया।':'Only dates returned by the provider are shown; no separate request is made for each day.'}</p>{available.length>0&&<p><b>{hi?'उपलब्ध सीट वाली तारीखें':'Dates reporting available seats'}:</b> {available.map(d=>d.date).filter(Boolean).join(' · ')}</p>}<div className={styles.days}>{days.map((d,i)=><article key={i} className={`${styles.day} ${d.available?styles.available:''}`}><time>{d.date||'—'}</time><strong>{d.status||'—'}</strong></article>)}</div>{!days.length&&<p>{hi?'तारीखवार उपलब्धता नहीं मिली।':'Date-by-date availability was not returned.'}</p>}<p className={styles.note}>{hi?'हरा रंग उपलब्ध सीट दर्शाता है, बुकिंग की गारंटी नहीं।':'Green indicates reported available seats, not a booking guarantee.'}</p></div>;
}

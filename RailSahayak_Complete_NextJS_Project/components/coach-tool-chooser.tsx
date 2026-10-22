"use client";
import { LocalizedLink as Link } from "./localized-link";
import styles from "./journey-improvements.module.css";
const tools = [
 ["coach-layout", "Coach layout", "कोच लेआउट", "See seats and berths inside a coach.", "कोच के अंदर सीट और बर्थ का क्रम देखें।"],
 ["coach-position", "Coach position", "कोच स्थिति", "Find a coach along the length of the train.", "ट्रेन में कोच का क्रम और स्थान देखें।"],
 ["seat-berth-finder", "Seat / berth finder", "सीट / बर्थ खोजें", "Understand berth type from a seat number and coach pattern.", "सीट नंबर और कोच पैटर्न से बर्थ का प्रकार समझें।"]
];
export function CoachToolChooser({slug,hi}:{slug:string;hi:boolean}) {
 if (!tools.some(t=>t[0]===slug)) return null;
 return <nav className={`${styles.panel} ${styles.chooserPanel}`} aria-label={hi?"कौन सा टूल चाहिए?":"Which tool do you need?"}><h2>{hi?"कौन सा टूल चाहिए?":"Which tool do you need?"}</h2><ul className={styles.chooser}>{tools.map(([id,en,hindi,description,descriptionHi])=><li key={id}><Link href={`/${id}`} aria-current={id===slug?"page":undefined}>{hi?hindi:en}</Link>{id===slug && <small>{hi?"आप यहाँ हैं":"You are here"}</small>}<p>{hi?descriptionHi:description}</p></li>)}</ul></nav>;
}

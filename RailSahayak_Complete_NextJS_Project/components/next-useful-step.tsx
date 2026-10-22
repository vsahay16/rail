"use client";
import { LocalizedLink as Link } from "./localized-link";
import styles from "./journey-improvements.module.css";
export function NextUsefulStep({tool,hi}:{tool:string;hi:boolean}) {
 const t=(en:string,hindi:string)=>hi?hindi:en;
 let description:string; let links: Array<[string,string]>;
 if(tool==="pnr-status") {description=t("Use the allocated coach and berth details to understand where you will sit or sleep. An estimate does not change the official passenger status.","आवंटित कोच और बर्थ से बैठने या सोने का स्थान समझें। अनुमान से आधिकारिक यात्री स्थिति नहीं बदलती।"); links=[["/coach-position",t("Find your coach along the train","ट्रेन में अपना कोच खोजें")],["/seat-berth-finder",t("Understand your berth number","अपना बर्थ नंबर समझें")],["/guides/pnr-confirmation-probability",t("Understand confirmation estimates","कन्फर्मेशन अनुमान समझें")]];}
 else if(tool==="seat-availability") {description=t("If no suitable seat is available, try another date in the form or compare a connecting journey. Check availability separately for every leg.","उपयुक्त सीट न मिले तो फॉर्म में दूसरी तारीख चुनें या कनेक्टिंग मार्ग देखें। हर ट्रेन की उपलब्धता अलग जाँचें।");links=[["#rail-search",t("Change the journey date","यात्रा तारीख बदलें")],["/connecting-trains",t("Compare connecting trains","कनेक्टिंग ट्रेनें देखें")]];}
 else if(tool==="chart-preparation-calculator") {description=t("This is a time estimate, not confirmation that a chart has been prepared. Check the actual chart and each passenger’s status through PNR enquiry.","यह समय का अनुमान है, चार्ट तैयार होने की पुष्टि नहीं। PNR पूछताछ में वास्तविक चार्ट और हर यात्री की स्थिति जाँचें।");links=[["/pnr-status",t("Check actual PNR chart status","वास्तविक PNR चार्ट स्थिति देखें")],["/guides/chart-preparation",t("Understand chart preparation","चार्ट तैयारी समझें")]];}
 else if(tool==="connecting-trains") {description=t("Check whether the transfer gap works for your luggage, mobility needs and any station change. Scheduled timings cannot guarantee a connection.","सामान, चलने-फिरने की जरूरत और स्टेशन बदलने के लिए पर्याप्त समय जाँचें। निर्धारित समय कनेक्शन की गारंटी नहीं है।");links=[["/connection-buffer-calculator",t("Check your connection buffer","कनेक्शन का समय जाँचें")]];}
 else return null;
 return <aside className={styles.panel}><h2>{t("Next useful step","अगला उपयोगी कदम")}</h2><p>{description}</p><nav className={styles.links}>{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav></aside>;
}

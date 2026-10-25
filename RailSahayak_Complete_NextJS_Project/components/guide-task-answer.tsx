"use client";
import { LocalizedLink as Link } from "./localized-link";
import styles from "./journey-improvements.module.css";

/** Original task summaries; detailed source-qualified guidance remains below. */
export function GuideTaskAnswer({slug,hi}:{slug:string;hi:boolean}) {
 const t=(en:string,hindi:string)=>hi?hindi:en;
 if(slug==="train-classes-and-coaches") return <section className={styles.panel} aria-labelledby="class-comparison-heading">
  <h2 id="class-comparison-heading">{t("Compare the class before choosing your berth","बर्थ चुनने से पहले श्रेणी की तुलना करें")}</h2>
  <p>{t("Start with your need for sleeping accommodation, air-conditioning and budget. Then check the actual class, fare and coach pattern offered on your chosen train.","पहले सोने की व्यवस्था, AC और बजट की जरूरत देखें। फिर चुनी ट्रेन की वास्तविक श्रेणी, किराया और कोच पैटर्न जाँचें।")}</p>
  <p className="table-scroll-hint">{t("Swipe the table sideways to compare all three classes.","तीनों श्रेणियाँ मिलाने के लिए तालिका को बाएँ-दाएँ स्क्रॉल करें।")}</p><div className={styles.scroll} role="region" aria-label={t("Sleeper, 3A and 2A comparison","स्लीपर, 3A और 2A की तुलना")} tabIndex={0}><table><caption>{t("Common berth patterns, not a guarantee for every coach","सामान्य बर्थ पैटर्न; हर कोच के लिए गारंटी नहीं")}</caption><thead><tr><th scope="col">{t("Compare","क्या मिलाएँ")}</th><th scope="col">{t("Sleeper","स्लीपर")}</th><th scope="col">3A</th><th scope="col">2A</th></tr></thead><tbody>
   <tr><th scope="row">{t("Accommodation","व्यवस्था")}</th><td>{t("Non-AC sleeping class","बिना AC की सोने वाली श्रेणी")}</td><td>{t("AC three-tier","AC तीन-टियर")}</td><td>{t("AC two-tier","AC दो-टियर")}</td></tr>
   <tr><th scope="row">{t("Typical main berths","सामान्य मुख्य बर्थ")}</th><td>{t("Lower, middle and upper","लोअर, मिडिल और अपर")}</td><td>{t("Lower, middle and upper","लोअर, मिडिल और अपर")}</td><td>{t("Lower and upper","लोअर और अपर")}</td></tr>
   <tr><th scope="row">{t("Before booking","बुकिंग से पहले")}</th><td colSpan={3}>{t("Check the fare for your date, the available class and the coach variant. A class label does not establish a particular berth allocation.","अपनी तारीख का किराया, उपलब्ध श्रेणी और कोच का प्रकार जाँचें। श्रेणी का नाम किसी खास बर्थ का आवंटन तय नहीं करता।")}</td></tr>
  </tbody></table></div>
  <nav className={styles.links}><Link href="/coach-layout">{t("See supported coach layouts","समर्थित कोच लेआउट देखें")}</Link><Link href="/seat-availability">{t("Check seats for your train and class","ट्रेन और श्रेणी की सीट जाँचें")}</Link><Link href="/guides/3e-vs-3a-train-class">{t("Comparing 3E and 3A?","3E और 3A की तुलना चाहिए?")}</Link></nav>
 </section>;
 if(slug!=="missed-train-what-to-do") return null;
 return <section className={styles.panel} aria-labelledby="missed-train-steps"><h2 id="missed-train-steps">{t("Missed your train? Choose the right next step","ट्रेन छूट गई? सही अगला कदम चुनें")}</h2>
  <p>{t("First confirm the train, station, date and actual departure with official enquiry or station staff. Keep the immediate onward-journey decision separate from the refund question.","पहले आधिकारिक पूछताछ या स्टेशन कर्मचारी से ट्रेन, स्टेशन, तारीख और वास्तविक प्रस्थान की पुष्टि करें। आगे की यात्रा और रिफंड को अलग निर्णय मानें।")}</p>
  <ol><li><h3>{t("You arrived after departure","आप प्रस्थान के बाद पहुँचे")}</h3><p>{t("Check your booking’s current conditions and ask railway staff about permitted options. Do not assume a berth will remain available at another boarding station.","बुकिंग की वर्तमान शर्तें जाँचें और रेलवे कर्मचारी से अनुमत विकल्प पूछें। दूसरे बोर्डिंग स्टेशन पर बर्थ उपलब्ध रहने का अनुमान न लगाएँ।")}</p></li>
  <li><h3>{t("An incoming train was late","पहली ट्रेन देर से पहुँची")}</h3><p>{t("Check whether the journeys were officially linked or booked separately. Keep the relevant booking references and delay details for the official assistance or claim process.","जाँचें कि यात्राएँ आधिकारिक रूप से लिंक थीं या अलग बुक हुई थीं। आधिकारिक सहायता या दावे के लिए बुकिंग संदर्भ और देरी का विवरण रखें।")}</p></li>
  <li><h3>{t("You need another departure","आपको दूसरी ट्रेन चाहिए")}</h3><p>{t("Compare a train you can reach safely, its actual seat status and any station change. Check the travel date again if the next departure is after midnight.","सुरक्षित रूप से पहुँच सकने वाली ट्रेन, उसकी वास्तविक सीट स्थिति और स्टेशन बदलाव देखें। अगली ट्रेन आधी रात के बाद हो तो यात्रा तारीख फिर मिलाएँ।")}</p></li></ol>
  <p>{t("Missing a train alone does not establish refund eligibility. Verify ticket-specific cancellation or TDR conditions through the official booking service.","ट्रेन छूटने से अपने-आप रिफंड पात्रता नहीं बनती। आधिकारिक बुकिंग सेवा में अपने टिकट की रद्दीकरण या TDR शर्तें सत्यापित करें।")}</p>
  <nav className={styles.links}><Link href="/trains-between-stations">{t("Find another departure","दूसरी ट्रेन खोजें")}</Link><Link href="/guides/train-cancelled-delayed-refund">{t("Understand railway disruption and refund checks","रेलवे व्यवधान और रिफंड की जाँच समझें")}</Link></nav>
 </section>;
}

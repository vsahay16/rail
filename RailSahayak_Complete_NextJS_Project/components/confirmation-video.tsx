"use client";
import { VideoTranscript } from "./video-transcript";
import { useLanguage } from "@/components/language-provider";
import { LocalizedLink } from "@/components/localized-link";
import styles from "./confirmation-video.module.css";

export function ConfirmationVideo() {
  const { language } = useLanguage();
  const hi = language === "hi";
  return <section className={styles.section} aria-labelledby="confirmation-video-title">
    <div className={styles.intro}>
      <span>{hi ? "36 सेकंड में समझें · वीडियो अंग्रेज़ी में" : "36-second explainer · English video"}</span>
      <h2 id="confirmation-video-title">{hi ? "80% संभावना का मतलब टिकट कन्फर्म होना नहीं है" : "80% chance does not mean a confirmed ticket"}</h2>
      <p>{hi ? "पहले हर यात्री की वर्तमान स्थिति देखें। फिर उपलब्ध होने पर बुकिंग का अलग अनुमान माँगें।" : "Read every passenger’s current status first. Then request a separate booking estimate where available."}</p>
    </div>
    <video className={styles.video} controls playsInline preload="none" width="1920" height="1080" poster="/videos/confirmation-chance-poster.svg" aria-label={hi ? "PNR कन्फर्मेशन संभावना समझें — अंग्रेज़ी वीडियो" : "Understanding PNR confirmation chances — English video"} aria-describedby="confirmation-video-note">
      <source src="/videos/confirmation-chance.mp4" type="video/mp4" />
      <track kind="captions" src="/videos/confirmation-chance.en.vtt" srcLang="en" label="English" default={!hi} />
      <track kind="subtitles" src="/videos/confirmation-chance.hi.vtt" srcLang="hi" label="हिंदी" default={hi} />
      <a href="/videos/confirmation-chance.mp4">{hi ? "वीडियो खोलें" : "Open video"}</a>
    </video>
    <p id="confirmation-video-note" className={styles.note}>{hi ? "यह एक उदाहरणात्मक एनीमेशन है, लाइव टिकट परिणाम नहीं। दिखाया गया प्रतिशत बुकिंग का अनुमान है, यात्री 3 की व्यक्तिगत संभावना नहीं। लोड होते समय दिखता 0% वास्तविक परिणाम न मानें। अंतिम PNR स्थिति आधिकारिक रेलवे सेवा पर जाँचें; NTES ट्रेन की रनिंग स्थिति के लिए है।" : "Illustrative animation, not a live ticket result. The percentage represents a booking-level estimate, not Passenger 3’s individual chance. A loading animation showing 0% is not a real result. Verify final PNR status through the official railway enquiry; NTES is for train-running information."}</p>
    <details className={styles.summary}><summary>{hi ? "वीडियो की मुख्य बातें हिंदी में पढ़ें" : "Read the key points"}</summary><ul>
      <li>{hi ? "80% अनुमान टिकट या बर्थ कन्फर्म होने की गारंटी नहीं है।" : "An 80% estimate does not guarantee confirmation or a berth."}</li>
      <li>{hi ? "एक ही PNR में यात्रियों की स्थितियाँ अलग हो सकती हैं। हर यात्री की CNF, RAC या WL स्थिति अलग से पढ़ें।" : "Passengers on the same PNR can have different statuses. Read each person’s CNF, RAC or WL status separately."}</li>
      <li>{hi ? "RailQ में समर्थित बुकिंग के लिए ‘कन्फर्मेशन संभावना जाँचें’ चुनकर अनुमान माँग सकते हैं। अनुमान उपलब्ध न हो तो इसका अर्थ 0% नहीं है।" : "On RailQ, use Check confirmation chance to request an estimate for a supported booking. An unavailable estimate does not mean 0%."}</li>
      <li>{hi ? "अनुमान से वैकल्पिक यात्रा की योजना बनाएँ। यात्रा से पहले आधिकारिक टिकट स्थिति और लागू नियम जाँचें।" : "Use the estimate to plan alternatives. Before travelling, check the official ticket status and applicable rules."}</li>
    </ul></details>
    <VideoTranscript topic="confirmation-chance" hi={hi} />
    <LocalizedLink className={styles.link} href="/pnr-status">{hi ? "अपना PNR स्टेटस जाँचें →" : "Check your PNR status →"}</LocalizedLink>
  </section>;
}

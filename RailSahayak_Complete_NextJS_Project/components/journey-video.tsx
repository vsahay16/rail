"use client";
import { VideoTranscript } from "./video-transcript";
import { LocalizedLink as Link } from "./localized-link";
import { useLanguage } from "@/components/language-provider";
import styles from "./journey-video.module.css";
const videos = {
  "connecting-trains": {
    "seconds": 40,
    "title": "Check both trains before booking",
    "titleHi": "बुकिंग से पहले दोनों ट्रेनें जाँचें",
    "summary": "Read the dates, station codes and transfer gap. Check seats and fares separately for each leg. A timetable route is not a reservation or a guaranteed connection.",
    "summaryHi": "हर ट्रेन की तारीख, स्टेशन कोड और बीच का समय पढ़ें। दोनों ट्रेनों की सीट और किराया अलग जाँचें। समय-सारणी में मार्ग मिलना आरक्षण या कनेक्शन की गारंटी नहीं है."
  },
  "family-pnr": {
    "seconds": 25,
    "title": "Family PNR: check every passenger",
    "titleHi": "पारिवारिक PNR: हर यात्री की स्थिति जाँचें",
    "summary": "Passengers on one PNR can have different statuses. Read every row and verify the applicable travel conditions through the official booking service. Keep ticket details private.",
    "summaryHi": "एक PNR में यात्रियों की स्थिति अलग हो सकती है। हर यात्री की पंक्ति पढ़ें और आधिकारिक बुकिंग सेवा पर लागू यात्रा शर्तें जाँचें। टिकट की निजी जानकारी साझा न करें।"
  },
  "station-codes": {
    "seconds": 36,
    "title": "Same city does not mean the same station",
    "titleHi": "एक शहर का मतलब एक ही स्टेशन नहीं है",
    "summary": "NDLS and NZM are different stations. Match the station codes on both tickets and allow for exiting, local transport and boarding, as well as luggage and your group’s needs.",
    "summaryHi": "NDLS और NZM अलग स्टेशन हैं। दोनों टिकटों के स्टेशन कोड मिलाएँ। बाहर निकलने, स्थानीय परिवहन और अगली ट्रेन में चढ़ने का समय रखें; सामान और साथ यात्रा कर रहे लोगों की जरूरतें भी ध्यान में रखें।"
  }
} as const;
export function JourneyVideo({ topic }: { topic: keyof typeof videos }) {
  const { language } = useLanguage();
  const hi = language === "hi", lang = hi ? "hi" : "en";
  const item = videos[topic], title = hi ? item.titleHi : item.title;
  const base = `/videos/${topic}-${lang}`;
  return <section className={styles.section} aria-labelledby={`video-${topic}`}>
    <div className={styles.intro}><span>{hi ? `${item.seconds} सेकंड · हिंदी वीडियो` : `${item.seconds} seconds · English video`}</span><h2 id={`video-${topic}`}>{title}</h2></div>
    <video key={base} className={styles.video} controls playsInline preload="none" width="1920" height="1080" poster={`${base}.jpg`} aria-label={title}>
      <source src={`${base}.mp4`} type="video/mp4" />
      <track kind={hi?"subtitles":"captions"} src={`${base}.en.vtt`} srcLang="en" label="English" default={!hi} />
      <track kind={hi?"captions":"subtitles"} src={`${base}.hi.vtt`} srcLang="hi" label="हिंदी" default={hi} /><a href={`${base}.mp4`}>{hi ? "वीडियो खोलें" : "Open video"}</a>
    </video>
    <p className={styles.note}>{hi ? "उदाहरणात्मक एनीमेशन; लाइव टिकट या समय-सारणी का परिणाम नहीं।" : "Illustrative animation; not a live ticket or timetable result."}</p>
    <p>{hi ? item.summaryHi : item.summary}</p>
    <VideoTranscript topic={topic} hi={hi} />
    <Link href={topic==="family-pnr"?"/pnr-status":topic==="station-codes"?"/connection-buffer-calculator":"/connecting-trains"}>{topic==="family-pnr"?(hi?"हर यात्री की PNR स्थिति जाँचें":"Check each passenger’s PNR status"):topic==="station-codes"?(hi?"स्टेशन बदलने का समय जाँचें":"Check your station-transfer buffer"):(hi?"कनेक्टिंग ट्रेनें खोजें":"Find connecting trains")}</Link>
  </section>;
}

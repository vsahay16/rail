"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { Brand } from "@/components/site-header";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";

const officialLinks = [
  ["IRCTC", "https://www.irctc.co.in/"],
  ["NTES", "https://enquiry.indianrail.gov.in/"],
  ["RailMadad", "https://railmadad.indianrailways.gov.in/"],
] as const;

export function SiteFooter() {
  const { language } = useLanguage();
  const hi = language === "hi";
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-identity"><Brand inverse /><p>{hi ? "भारत के यात्रियों के लिए तेज़, सरल और भरोसेमंद स्वतंत्र रेलवे यात्रा सुविधा।" : "A fast, calm and trustworthy independent railway travel utility built around Indian passengers."}</p><span className="independent-badge"><Icon name="shield" size={15} />{hi ? "स्वतंत्र · गोपनीयता पहले" : "Independent · Privacy first"}</span></div>
      <div className="footer-alert"><span>{hi ? "अगली यात्रा के लिए तैयार रहें" : "Be ready before your next journey"}</span><h2>{hi ? "समय पर जरूरी रेलवे अपडेट पाएँ।" : "Get useful railway updates at the right time."}</h2><Link href="/alerts">{hi ? "अपडेट अलर्ट शुरू करें" : "Set up update alerts"}<Icon name="arrow" size={17} /></Link></div>
    </div>
    <div className="footer-links">
      <div><b>{hi ? "लोकप्रिय टूल्स" : "Popular tools"}</b><Link href="/pnr-status">{hi ? "PNR स्थिति" : "PNR status"}</Link><Link href="/live-train-status">{hi ? "लाइव ट्रेन स्थिति" : "Live train status"}</Link><Link href="/trains-between-stations">{hi ? "स्टेशनों के बीच ट्रेनें" : "Trains between stations"}</Link><Link href="/booking-date-calculator">{hi ? "बुकिंग तारीख" : "Booking date calculator"}</Link><Link href="/tatkal-time-calculator">{hi ? "तत्काल समय" : "Tatkal timing"}</Link></div>
      <div><b>{hi ? "यात्रा सहायता" : "Journey help"}</b><Link href="/refund-calculator">{hi ? "रिफंड कैलकुलेटर" : "Refund calculator"}</Link><Link href="/seat-berth-finder">{hi ? "बर्थ पहचानें" : "Berth finder"}</Link><Link href="/chart-preparation-calculator">{hi ? "चार्ट तैयारी समय" : "Chart preparation"}</Link><Link href="/coach-position">{hi ? "कोच स्थिति" : "Coach position"}</Link><Link href="/status-code-decoder">{hi ? "रेलवे स्थिति कोड" : "Railway status codes"}</Link></div>
      <div><b>{hi ? "जानकारी" : "Resources"}</b><Link href="/railway-updates">{hi ? "रेलवे नियम अपडेट" : "Railway rule updates"}</Link><Link href="/guides">{hi ? "यात्रा गाइड" : "Travel guides"}</Link><Link href="/blog">{hi ? "ब्लॉग" : "Blog"}</Link><Link href="/about">{hi ? "हमारे बारे में" : "About RailSahayak"}</Link><Link href="/contact">{hi ? "संपर्क करें" : "Contact us"}</Link></div>
      <div><b>{hi ? "भरोसा और कानूनी" : "Trust & legal"}</b><Link href="/methodology">{hi ? "हमारी प्रक्रिया" : "Methodology"}</Link><Link href="/corrections">{hi ? "सुधार नीति" : "Corrections policy"}</Link><Link href="/privacy">{hi ? "गोपनीयता नीति" : "Privacy policy"}</Link><Link href="/terms">{hi ? "नियम और शर्तें" : "Terms of use"}</Link><Link href="/disclaimer">{hi ? "अस्वीकरण" : "Disclaimer"}</Link><Link href="/advertise">{hi ? "विज्ञापन दें" : "Advertise with us"}</Link></div>
      <div><b>{hi ? "आधिकारिक सेवाएँ" : "Official services"}</b>{officialLinks.map(([name, href]) => <a href={href} key={href} target="_blank" rel="noreferrer">{name}<Icon name="external" size={13} /></a>)}</div>
    </div>
    <div className="footer-bottom"><span>© 2026 RailSahayak</span><p>{hi ? "RailSahayak भारतीय रेल या IRCTC से संबद्ध नहीं है। अंतिम और महत्वपूर्ण जानकारी हमेशा आधिकारिक रेलवे माध्यम से सत्यापित करें।" : "RailSahayak is not affiliated with Indian Railways or IRCTC. Always verify critical and final journey information through official railway channels."}</p></div>
  </footer>;
}

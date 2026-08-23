"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";

const tools = [
  ["PNR Status", "PNR स्थिति", "/pnr-status", "ticket"],
  ["Live Train Status", "लाइव ट्रेन स्थिति", "/live-train-status", "pulse"],
  ["Trains Between Stations", "स्टेशनों के बीच ट्रेनें", "/trains-between-stations", "route"],
  ["Booking Date Calculator", "बुकिंग तारीख कैलकुलेटर", "/booking-date-calculator", "calendar"],
  ["Tatkal Timing", "तत्काल समय", "/tatkal-time-calculator", "clock"],
  ["Refund Calculator", "रिफंड कैलकुलेटर", "/refund-calculator", "refund"],
] as const;

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link className={`brand${inverse ? " inverse" : ""}`} href="/" aria-label="RailSahayak home"><span className="brand-mark"><i /><i /><i /></span><span><b>Rail</b>Sahayak<small>यात्रा का साथी</small></span></Link>;
}

export function SiteHeader() {
  const { language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const hi = language === "hi";

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") { setMobileOpen(false); setToolsOpen(false); } }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function changeLanguage() {
    trackEvent("language_changed", { language: hi ? "en" : "hi" });
    const current = window.location.pathname;
    const nextPath = hi ? (current === "/hi" ? "/" : current.replace(/^\/hi(?=\/)/, "")) : (current.startsWith("/hi") ? current : `/hi${current}`);
    window.localStorage.setItem("railsahayak_language", hi ? "en" : "hi");
    window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
  }

  return <div className="site-header-shell">
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-dropdown">
          <button className="nav-trigger" onClick={() => setToolsOpen(!toolsOpen)} aria-expanded={toolsOpen}>{hi ? "रेल टूल्स" : "Rail tools"}<Icon name="chevron" size={15} /></button>
          {toolsOpen && <div className="tools-menu">{tools.map(([en, hindi, href, icon]) => <Link href={href} key={href} onClick={() => setToolsOpen(false)}><span><Icon name={icon} size={18} /></span><b>{hi ? hindi : en}</b><Icon name="arrow" size={14} /></Link>)}<Link className="all-tools-link" href="/tools" onClick={() => setToolsOpen(false)}>{hi ? "सभी टूल्स देखें" : "View all railway tools"}<Icon name="arrow" size={15} /></Link></div>}
        </div>
        <Link href="/dashboard">{hi ? "मेरी यात्रा" : "My journey"}</Link>
        <Link href="/railway-updates">{hi ? "रेलवे अपडेट" : "Railway updates"}</Link>
        <Link href="/guides">{hi ? "यात्रा गाइड" : "Travel guides"}</Link>
        <Link href="/blog">{hi ? "ब्लॉग" : "Blog"}</Link>
      </nav>
      <div className="header-actions">
        <button className="language-switch" onClick={changeLanguage} aria-label={hi ? "Switch to English" : "हिंदी में बदलें"}><Icon name="globe" size={17} />{hi ? "English" : "हिंदी"}</button>
        <Link className="header-cta" href="/pnr-status">{hi ? "PNR देखें" : "Check PNR"}<Icon name="arrow" size={16} /></Link>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}><Icon name={mobileOpen ? "close" : "menu"} /></button>
      </div>
    </header>
    {mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-tools"><span>{hi ? "लोकप्रिय टूल्स" : "Popular tools"}</span>{tools.slice(0, 4).map(([en, hindi, href, icon]) => <Link href={href} key={href} onClick={() => setMobileOpen(false)}><Icon name={icon} size={18} />{hi ? hindi : en}</Link>)}</div>
      <div className="mobile-main-links"><Link href="/tools" onClick={() => setMobileOpen(false)}>{hi ? "सभी रेल टूल्स" : "All rail tools"}</Link><Link href="/dashboard" onClick={() => setMobileOpen(false)}>{hi ? "मेरी यात्रा" : "My journey"}</Link><Link href="/railway-updates" onClick={() => setMobileOpen(false)}>{hi ? "रेलवे अपडेट" : "Railway updates"}</Link><Link href="/guides" onClick={() => setMobileOpen(false)}>{hi ? "यात्रा गाइड" : "Travel guides"}</Link><Link href="/blog" onClick={() => setMobileOpen(false)}>{hi ? "ब्लॉग" : "Blog"}</Link></div>
    </nav>}
  </div>;
}

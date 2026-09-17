"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { LocalizedLink as Link } from "@/components/localized-link";

type Consent = "analytics_ads" | "necessary" | null;
let sessionConsent: Consent = null;
type ConsentSnapshot = Consent | "loading";

export function ConsentManager({ gaId, adsenseClient }: { gaId?: string; adsenseClient?: string }) {
  const consent = useSyncExternalStore<ConsentSnapshot>(subscribe, getConsent, () => "loading");
  function choose(value: Exclude<Consent, null>) { sessionConsent = value; try { window.localStorage.setItem("railsahayak_consent", value); } catch {} window.dispatchEvent(new Event("railsahayak:consent")); }
  return <>
    {consent === "analytics_ads" && gaId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}</Script></>}
    {consent === "analytics_ads" && adsenseClient && <Script id="adsense" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} />}
    {consent === null && <aside className="consent-banner" role="dialog" aria-label="Privacy choices" aria-live="polite"><div><b>Privacy choices · गोपनीयता विकल्प</b><p>We use optional analytics to improve RailQ and advertising to fund it. Essential railway tools work without them. <Link href="/privacy">Read privacy policy</Link>.</p></div><div><button className="consent-secondary" onClick={() => choose("necessary")}>Necessary only</button><button className="consent-primary" onClick={() => choose("analytics_ads")}>Allow analytics & ads</button></div></aside>}
  </>;
}

function getConsent(): Consent { let saved: string | null = null; try { saved = window.localStorage.getItem("railsahayak_consent"); } catch { return sessionConsent; } return saved === "analytics_ads" || saved === "necessary" ? saved : null; }
function subscribe(callback: () => void) { window.addEventListener("storage", callback); window.addEventListener("railsahayak:consent", callback); return () => { window.removeEventListener("storage", callback); window.removeEventListener("railsahayak:consent", callback); }; }

"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
let started = false;
export function MobileMetrics() {
 useEffect(() => {
  const start = () => {
   try { if (started || localStorage.getItem("railsahayak_consent") !== "analytics_ads") return; } catch { return; }
   started = true;
   void import("web-vitals").then(({ onCLS, onINP, onLCP }) => {
    // Keep the initial path: these metrics describe a document load, not a later client navigation.
    const initialPath = location.pathname;
    const report = (metric: { name: string; value: number; rating: string }) => {
     if (location.pathname === initialPath) trackEvent("web_vital", { metric: metric.name, metric_value: Math.round(metric.value * 1000) / 1000, rating: metric.rating });
    };
    onCLS(report); onINP(report); onLCP(report);
   }).catch(() => { started = false; });
  };
  start(); window.addEventListener("railsahayak:consent", start); window.addEventListener("storage", start);
  return () => { window.removeEventListener("railsahayak:consent", start); window.removeEventListener("storage", start); };
 }, []);
 return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

import { analyticsEvents,safeAnalyticsProperties,safeAnalyticsPath } from "./analytics-safety";

export function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !analyticsEvents.has(name)) return;
  try {
  if (window.localStorage.getItem("railsahayak_consent") !== "analytics_ads") return;
  let sessionId = window.localStorage.getItem("rs_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem("rs_session_id", sessionId);
  }
  const safeProperties = safeAnalyticsProperties(properties);
  const path=safeAnalyticsPath(window.location.pathname);
  window.gtag?.("event", name, {...safeProperties,page_location:window.location.origin+path,page_referrer:""});
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({ eventName: name, path, sessionId, properties: safeProperties }),
  }).catch(() => undefined);
  } catch { /* Optional analytics must never block a railway tool. */ }
}

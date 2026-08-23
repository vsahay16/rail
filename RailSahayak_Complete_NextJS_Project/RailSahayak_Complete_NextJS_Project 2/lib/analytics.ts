declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const blockedKeys = new Set(["pnr", "phone", "email", "name", "passenger", "passengerName"]);

function sanitize(properties: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(properties).filter(([key]) => !blockedKeys.has(key)).slice(0, 20));
}

export function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem("railsahayak_consent") !== "analytics_ads") return;
  let sessionId = window.localStorage.getItem("rs_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem("rs_session_id", sessionId);
  }
  const safeProperties = sanitize(properties);
  window.gtag?.("event", name, safeProperties);
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({ eventName: name, path: window.location.pathname, sessionId, properties: safeProperties }),
  }).catch(() => undefined);
}

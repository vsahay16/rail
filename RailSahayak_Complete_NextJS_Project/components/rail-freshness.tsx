export function railwayTime(value: unknown, hi: boolean): string {
  if (typeof value !== "string" || !value.trim() || /^[-–—]+$/.test(value.trim())) return "";
  const input = value.trim();
  if (!/[T ]\d{2}:\d{2}.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(input)) return input;
  const time = Date.parse(input);
  if (!Number.isFinite(time)) return "";
  return `${new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata",
  }).format(time)} IST`;
}

export function RailFreshness({ hi, updated, checked, cached = false }: {
  hi: boolean; updated?: unknown; checked?: unknown; cached?: boolean;
}) {
  const update = railwayTime(updated, hi);
  const check = railwayTime(checked, hi);
  return <div className="rail-result-source">
    <span>{hi ? "प्रदाता का अपडेट" : "Provider updated"}: {update || (hi ? "समय उपलब्ध नहीं" : "Time unavailable")}</span>
    {checked !== undefined && <span>
      {hi ? "RailQ की पिछली जाँच" : "Last checked by RailQ"}: {check || (hi ? "समय उपलब्ध नहीं" : "Time unavailable")}
      {cached && (hi ? " · सहेजा परिणाम" : " · Cached result")}
    </span>}
  </div>;
}

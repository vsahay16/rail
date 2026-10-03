/** Railway wall-clock values are represented in UTC solely for date arithmetic.
 * They are not real instants until railwayCalendarIso applies the IST offset.
 * This avoids using the visitor's time zone or daylight-saving rules.
 */
export function railwayDateValue(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?)?$/.test(value)) return null;
  const wall = value.includes("T") ? value : `${value}T12:00:00`;
  const normalized = wall.length === 16 ? `${wall}:00` : wall;
  const date = new Date(`${normalized}Z`);
  return Number.isNaN(date.valueOf()) || date.toISOString().slice(0,19) !== normalized ? null : date;
}
export function formatRailwayDate(date: Date, hi: boolean, withTime = true): string {
  const text = date.toLocaleString(hi ? "hi-IN" : "en-IN", {
    timeZone: "UTC", dateStyle: "full", ...(withTime ? { timeStyle: "short" as const } : {}),
  });
  return withTime ? `${text} (${hi ? "भारतीय समय" : "IST"})` : text;
}
export function railwayCalendarIso(wall: Date): string {
  return new Date(wall.valueOf() - 330 * 60_000).toISOString();
}

/** Public, non-passenger availability model. Never use this for PNR predictions. */
import { record, rows, scalar, type RailRecord } from "./rail-data";
export const seatClasses = ["1A", "2A", "3A", "3E", "CC", "EC", "EA", "FC", "SL", "2S", "VS", "CH", "HS", "VC", "VA"];
export const seatQuotas = ["GN", "TQ", "LD", "DF", "FT", "LB", "PT", "YU", "DP", "HP", "PH", "SS"];
export function parseJourneyDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/), dmy = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (!iso && !dmy) return null;
  const [y, m, d] = iso ? [+iso[1], +iso[2], +iso[3]] : [+dmy![3], +dmy![2], +dmy![1]];
  if (y < 1900 || y > 9999 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}` : null;
}
export function railkitDate(value: string): string {
  const iso = parseJourneyDate(value);
  if (!iso) throw new Error("Invalid journey date");
  return iso.split("-").reverse().join("-");
}
export function todayInIndia(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone:"Asia/Kolkata", year:"numeric", month:"2-digit", day:"2-digit" }).formatToParts(now);
  const part = (name: string) => parts.find(p => p.type === name)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function numericEstimate(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100 ? value : null;
}
export type SeatDay = {
  date: string | null; providerDate: string; kind: "unavailable" | "available" | "waitlist" | "rac" | "other";
  status: string; rawStatus: string; waitlistType: string; seats: number | null;
  estimate: number | null; canBook: boolean | null; providerPrediction: string;
};
export function normalizeSeatDay(value: unknown): SeatDay {
  const r = record(value), rawStatus = scalar(r.rawStatus), providerStatus = scalar(r.status).toUpperCase();
  const status = scalar(r.availabilityText, r.status, r.rawStatus), canBook = typeof r.canBook === "boolean" ? r.canBook : null;
  const waitlistType = rawStatus.toUpperCase().match(/(?:^|[^A-Z])(GNWL|RLWL|PQWL|TQWL|RQWL|DPWL)(?=\d|\b)/)?.[1] ?? "";
  const kind = canBook === false ? "unavailable" : providerStatus === "AVAILABLE" ? "available" : /^RAC\b/.test(providerStatus) || /^RAC(?:\b|\d)/.test(status.toUpperCase()) ? "rac" : providerStatus === "WAITLIST" || /^(?:WL|GNWL|RLWL|PQWL|TQWL|RQWL|DPWL)(?:\b|\d)/.test(status.toUpperCase()) ? "waitlist" : "other";
  const count = kind === "available" ? (status.match(/^(?:AVL|AVAILABLE)[\s-]+(\d+)$/i) ?? rawStatus.match(/^AVAILABLE[\s-]+(\d+)$/i))?.[1] : undefined;
  const seats = count !== undefined && Number.isSafeInteger(Number(count)) ? Number(count) : null;
  return { date: parseJourneyDate(r.date), providerDate: scalar(r.date), kind, status, rawStatus, waitlistType, seats, canBook,
    estimate: kind === "waitlist" && canBook === true ? numericEstimate(r.predictionPercentage) : null,
    providerPrediction: scalar(r.prediction) };
}
export function seatDayText(day: SeatDay, hi: boolean): string {
  if (day.kind === "unavailable") return hi ? "बुकिंग उपलब्ध नहीं" : "Booking unavailable";
  if (day.kind === "available" && day.seats !== null) return hi ? `${day.seats} सीटें उपलब्ध` : `${day.seats} seats available`;
  return day.status || (hi ? "उपलब्धता की जानकारी नहीं मिली" : "Availability not returned");
}
export type TrainMetadata = { number: string; classes: string[]; runDays: string[]; route: RailRecord[] };
export function trainMetadata(payload: unknown): TrainMetadata {
  const root = record(payload), data = record(root.data ?? root), train = record(data.train);
  return { number: scalar(train.number), classes: Array.isArray(train.classes) ? train.classes.filter((c): c is string => typeof c === "string" && seatClasses.includes(c)) : [], runDays: Array.isArray(train.runDays) ? train.runDays.filter((d): d is string => typeof d === "string") : [], route: rows(data.route) };
}
export function metadataProblem(params: URLSearchParams, meta: TrainMetadata): string | null {
  if (meta.number !== params.get("train")) return null;
  if (meta.classes.length && !meta.classes.includes(params.get("class") || "")) return `This train lists these classes: ${meta.classes.join(", ")}. Choose a listed class.`;
  // Running days refer to origin departure. Adjust only when boarding day is known.
  const stop = meta.route.find(r => record(r.station).code === params.get("from"));
  const day = Number(stop?.departureDay), date = parseJourneyDate(params.get("date"));
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (date && Number.isInteger(day) && day >= 1 && day <= 30 && meta.runDays.length && meta.runDays.every(d => names.includes(d))) {
    const origin = new Date(`${date}T12:00:00Z`); origin.setUTCDate(origin.getUTCDate() - (day - 1));
    if (!meta.runDays.includes(names[origin.getUTCDay()])) return "The known timetable does not list this train on the selected journey date. Check another date or verify the timetable.";
  }
  return null;
}
export function seatInputProblem(params: URLSearchParams, now = new Date()): string | null {
  if (!/^\d{5}$/.test(params.get("train") ?? "")) return "Enter a five-digit train number.";
  for (const name of ["from", "to", "class", "quota"]) params.set(name, (params.get(name) ?? "").trim().toUpperCase());
  if (!["from", "to"].every(name => /^[A-Z0-9]{1,5}$/.test(params.get(name)!))) return "Enter valid station codes.";
  if (params.get("from") === params.get("to")) return "Choose two different stations.";
  const date = parseJourneyDate(params.get("date"));
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(params.get("date")!)) return "Choose a valid calendar date.";
  if (date < todayInIndia(now)) return "Choose today or a future journey date (Indian time).";
  if (!seatClasses.includes(params.get("class")!)) return "Choose a supported travel class.";
  if (!seatQuotas.includes(params.get("quota")!)) return "Choose a supported quota.";
  return null;
}

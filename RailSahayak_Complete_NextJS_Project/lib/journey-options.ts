import { record, rows, scalar, railData } from "./rail-data";
export function predictionPercent(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) return null;
  return Math.round(value * 100);
}
export function availabilityDays(payload: unknown) {
  const d=railData(payload);
  const entries=[d.calendar,d.avlDayList,d.availability,d.days,d.results,d.dates].map(rows).find(x=>x.length) || [];
  return entries.map(r=>({date:scalar(r.journeyDate,r.date,r.availablityDate,r.availabilityDate),status:scalar(r.currentStatus,r.status,r.availablityStatus,r.availabilityStatus,r.availability)})).map(r=>({...r,available:/^AVAILABLE(?:\b|[-_])/i.test(r.status)}));
}
export function fareTotal(payload: unknown): string {
  const d=railData(payload),b=record(d.breakdown);const value=b.totalFare ?? d.totalFare ?? d.fare ?? d.amount;
  return (typeof value === "number" || typeof value === "string") && String(value).trim() && Number.isFinite(Number(value)) && Number(value)>=0 ? `₹${Number(value).toLocaleString("en-IN")}` : "—";
}

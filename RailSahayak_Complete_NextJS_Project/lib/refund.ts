/** Ordinary voluntary cancellation estimate, verified against IRCTC 2026-08-31.
 * Excludes GST/service charges, mixed-status tickets and exceptional TDR claims.
 * https://contents.irctc.co.in/en/eticketCancel.html
 */
export function estimateRefund(input: { fare: number; passengers: number; travelClass: string; status: string; hours: number; ticketType: string }) {
  const { fare, passengers, hours, status, ticketType, travelClass } = input;
  const flat: Record<string, number> = { "1A": 240, EC: 240, "2A": 200, FC: 200, "3A": 180, "3E": 180, CC: 180, SL: 120, "2S": 60 };
  if (!Number.isFinite(fare) || fare <= 0 || !Number.isInteger(passengers) || passengers < 1 || passengers > 12 || !Number.isFinite(hours) || hours < 0 || !(travelClass in flat) || !["confirmed", "rac", "waitlist"].includes(status) || !["normal", "tatkal"].includes(ticketType)) throw new Error("Invalid refund inputs");
  let deduction: number;
  if (status === "confirmed" && ticketType === "tatkal") deduction = fare;
  else if (status === "confirmed") {
    const minimum = flat[travelClass] * passengers;
    deduction = hours > 48 ? minimum : hours >= 12 ? Math.max(fare * 0.25, minimum) : hours >= 4 ? Math.max(fare * 0.5, minimum) : fare;
  } else deduction = hours >= 0.5 ? 60 * passengers : fare;
  deduction = Math.min(fare, deduction);
  return { deduction, refund: fare - deduction, confirmedTatkal: status === "confirmed" && ticketType === "tatkal" };
}

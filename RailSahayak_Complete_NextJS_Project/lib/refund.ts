/** Planning estimate checked 2026-10-13. Revised ordinary confirmed-ticket
 * windows: Ministry of Railways, 24 March 2026; PIB New India Samachar, April 16–30.
 * https://www.pib.gov.in/PressReleasePage.aspx?PRID=2244597
 * Flat charges / RAC / Tatkal basis: IRCTC RefundCancellationRules.pdf.
 * Retains published class minimums; excludes GST, service fees, mixed statuses,
 * exceptional claims and trains with a separate refund policy. Booking quote wins.
 */
export const confirmedCancellationHours = [72, 24, 8] as const;
export function cancellationHours(status: string, ticketType = "normal"): readonly number[] {
  if (!["confirmed", "rac", "waitlist"].includes(status) || !["normal", "tatkal"].includes(ticketType)) throw new Error("Unsupported cancellation inputs");
  return status === "confirmed" ? (ticketType === "tatkal" ? [] : confirmedCancellationHours) : [0.5];
}
export function estimateRefund(input: { fare: number; passengers: number; travelClass: string; status: string; hours: number; ticketType: string }) {
  const { fare, passengers, hours, status, ticketType, travelClass } = input;
  const flat: Record<string, number> = { "1A": 240, EC: 240, "2A": 200, FC: 200, "3A": 180, "3E": 180, CC: 180, SL: 120, "2S": 60 };
  if (!Number.isFinite(fare) || fare <= 0 || !Number.isInteger(passengers) || passengers < 1 || passengers > 12 || !Number.isFinite(hours) || hours < 0 || !(travelClass in flat) || !["confirmed", "rac", "waitlist"].includes(status) || !["normal", "tatkal"].includes(ticketType)) throw new Error("Invalid refund inputs");
  let deduction: number;
  if (status === "confirmed" && ticketType === "tatkal") deduction = fare;
  else if (status === "confirmed") {
    const minimum = flat[travelClass] * passengers;
    deduction = hours > 72 ? minimum : hours >= 24 ? Math.max(fare * 0.25, minimum) : hours >= 8 ? Math.max(fare * 0.5, minimum) : fare;
  } else deduction = hours >= 0.5 ? 60 * passengers : fare;
  deduction = Math.min(fare, deduction);
  deduction = Math.round(deduction * 100) / 100;
  return { deduction, refund: Math.round((fare - deduction) * 100) / 100, confirmedTatkal: status === "confirmed" && ticketType === "tatkal" };
}

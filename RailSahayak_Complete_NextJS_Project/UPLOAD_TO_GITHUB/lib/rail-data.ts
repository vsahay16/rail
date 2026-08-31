/** Shared, browser-safe adapters. Never persist a PNR or pass one to analytics. */
export type RailRecord = Record<string, unknown>;
export function record(value: unknown): RailRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as RailRecord : {};
}
export function scalar(...values: unknown[]): string {
  for (const value of values) {
    if ((typeof value === "string" && value.trim()) || typeof value === "number" || typeof value === "boolean") return String(value);
  }
  return "";
}
export function rows(value: unknown): RailRecord[] {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object" && !Array.isArray(item)).map(record) : [];
}
export function railData(payload: unknown): RailRecord {
  const root = record(payload);
  return record(root.data ?? root.result ?? root);
}
export function stationLabel(value: unknown): string {
  const station = record(value);
  const code = scalar(station.code, station.stationCode);
  const name = scalar(station.name, station.stationName);
  return name && code && name !== code ? `${name} (${code})` : name || code || scalar(value);
}
export function stationCode(value: unknown): string {
  const station = record(value);
  return scalar(station.code, station.stationCode, value);
}
export function pnrSummary(payload: unknown) {
  const data = railData(payload), train = record(data.train), journey = record(data.journey), chart = record(data.charting);
  const from = train.boardingPoint ?? data.boardingPoint ?? data.boardingStation ?? data.from ?? train.source ?? data.sourceStation ?? data.source;
  const to = train.reservationUpto ?? data.reservationUpto ?? data.to ?? train.destination ?? data.destinationStation ?? data.destination;
  const passengers = rows(data.passengers ?? data.passengerList ?? data.passengerStatus).map((person, i) => ({
    number: scalar(person.passengerNumber, person.number, person.no) || String(i + 1),
    booking: scalar(person.bookingStatus, person.booking_status, person.bookStatus),
    current: scalar(person.currentStatus, person.current_status, person.status),
    coach: scalar(person.coach, person.coachNumber, person.currentCoach),
    berth: scalar(person.berthNumber, person.berth, person.currentBerth, person.seatNumber),
    berthCode: scalar(person.berthCode, person.berthType),
  }));
  const prepared = chart.isPrepared ?? data.chartPrepared;
  return {
    trainNumber: scalar(train.number, data.trainNumber, data.trainNo, data.train_number),
    trainName: scalar(train.name, data.trainName, data.train_name),
    journeyDate: scalar(journey.date, data.journeyDate, data.dateOfJourney, data.doj, data.travelDate),
    travelClass: scalar(journey.class, data.class, data.journeyClass, data.travelClass),
    quota: scalar(journey.quota, data.quota),
    from: stationLabel(from), to: stationLabel(to), fromCode: stationCode(from), toCode: stationCode(to),
    chartStatus: scalar(chart.status, data.chartStatus, data.chart_status) || (prepared === true ? "Chart Prepared" : prepared === false ? "Chart Not Prepared" : ""),
    passengers,
    status: passengers.map((p) => `P${p.number}: ${p.current || "—"}`).join(" · ") || scalar(data.currentStatus, data.status),
  };
}
export function liveSummary(payload: unknown) {
  const data = railData(payload), train = record(data.train);
  return {
    trainNumber: scalar(train.number, data.trainNumber, data.trainNo),
    trainName: scalar(train.name, data.trainName),
    status: scalar(data.status, data.runningStatus),
    current: stationLabel(data.currentLocation) || stationLabel(data.currentStation) || stationLabel(data.currentHalt),
    previous: stationLabel(data.previousHalt), next: stationLabel(data.nextHalt) || stationLabel(data.nextStation),
    delayMinutes: data.delayMinutes === null || data.delayMinutes === undefined || data.delayMinutes === "" ? null : Number.isFinite(Number(data.delayMinutes)) ? Number(data.delayMinutes) : null,
    updated: scalar(data.lastUpdatedAt), route: rows(data.route),
  };
}
export function railError(payload: unknown, hi = false) {
  const root = record(payload), error = record(root.error);
  const code = scalar(error.code, root.code) || "PROVIDER_ERROR";
  const copy: Record<string, [string, string]> = {
    NOT_FOUND: ["No result was found. Check your input; the record may be expired or unavailable.", "परिणाम नहीं मिला। जानकारी जाँचें; रिकॉर्ड पुराना या अनुपलब्ध हो सकता है।"],
    RATE_LIMITED: ["Too many lookups. Please wait before trying again.", "बहुत अधिक खोज हुई हैं। थोड़ी देर बाद फिर प्रयास करें।"],
    API_BUDGET_REACHED: ["Live lookups are temporarily paused to protect the site's API allowance. Please use an official railway service.", "API सीमा की सुरक्षा के लिए लाइव खोज अस्थायी रूप से रुकी है। आधिकारिक रेलवे सेवा देखें।"],
    API_BURST_LIMIT: ["The live service is busy. Please try again in a minute.", "लाइव सेवा व्यस्त है। एक मिनट बाद फिर प्रयास करें।"],
    PROTECTION_UNAVAILABLE: ["Live lookups are temporarily unavailable. Please try later or use an official railway service.", "लाइव खोज अस्थायी रूप से अनुपलब्ध है। बाद में प्रयास करें या आधिकारिक रेलवे सेवा देखें।"],
    PROVIDER_NOT_CONFIGURED: ["The live service has not been connected yet.", "लाइव सेवा अभी जुड़ी नहीं है।"],
  };
  const message = copy[code]?.[hi ? 1 : 0] ?? (hi ? "जानकारी नहीं मिली। इनपुट जाँचें और कुछ देर बाद फिर प्रयास करें।" : scalar(error.message, root.message) || "Information is unavailable. Check your input and try again shortly.");
  return { code, message: message.replace(/\b\d{10}\b/g, "[PNR hidden]") };
}
export async function railRequest(params: URLSearchParams, signal?: AbortSignal) {
  const pnr = params.get("action") === "pnr";
  const response = await fetch(pnr ? "/api/rail" : `/api/rail?${params}`, {
    ...(pnr ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "pnr", pnr: params.get("pnr") }) } : {}),
    cache: "no-store", signal,
  });
  const payload = record(await response.json().catch(() => ({ success: false, message: "Invalid service response." })));
  return { response, payload, ok: response.ok && payload.success !== false };
}

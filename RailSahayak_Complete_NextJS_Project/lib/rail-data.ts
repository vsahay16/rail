/** Shared, browser-safe adapters. Never persist a PNR or pass one to analytics. */
export type RailRecord = Record<string, unknown>;

export function record(value: unknown): RailRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as RailRecord)
    : {};
}

export function scalar(...values: unknown[]): string {
  for (const value of values) {
    if (
      (typeof value === "string" && value.trim()) ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }
  }
  return "";
}

export function rows(value: unknown): RailRecord[] {
  return Array.isArray(value)
    ? value
        .filter(
          (item) =>
            item && typeof item === "object" && !Array.isArray(item)
        )
        .map(record)
    : [];
}

export function railData(payload: unknown): RailRecord {
  const root = record(payload);
  return record(root.data ?? root.result ?? root);
}

export function stationLabel(value: unknown): string {
  const station = record(value);
  const code = scalar(station.code, station.stationCode);
  const name = scalar(station.name, station.stationName);

  return name && code && name !== code
    ? `${name} (${code})`
    : name || code || scalar(value);
}

export function stationCode(value: unknown): string {
  const station = record(value);
  return scalar(station.code, station.stationCode, value);
}

export function pnrSummary(payload: unknown) {
  const data = railData(payload);
  const train = record(data.train);
  const journey = record(data.journey);
  const chart = record(data.charting);

  const from =
    train.boardingPoint ??
    data.boardingPoint ??
    data.boardingStation ??
    data.from ??
    train.source ??
    data.sourceStation ??
    data.source;

  const to =
    train.reservationUpto ??
    data.reservationUpto ??
    data.to ??
    train.destination ??
    data.destinationStation ??
    data.destination;

  const passengers = rows(
    data.passengers ?? data.passengerList ?? data.passengerStatus
  ).map((person, i) => {
    const booking = record(person.booking);
    const current = record(person.current);

    const currentStatus = scalar(
      current.formatted,
      person.currentStatus,
      person.current_status,
      current.status,
      person.status
    );

    const waitlisted =
      person.isWaitlisted === true ||
      /^(?:WL|GNWL|RLWL|PQWL|TQWL|RQWL|DPWL|REGRET)(?:\b|\/)/i.test(
        currentStatus
      );

    const cancelled =
      person.isCancelled === true ||
      /^(?:CAN|CANCELLED)(?:\b|\/)/i.test(currentStatus);

    const confirmed =
      person.isConfirmed === true ||
      /^(?:CNF|CONFIRMED)(?:\b|\/)/i.test(currentStatus);

    const assigned = !waitlisted && !cancelled;

    return {
      number:
        scalar(
          person.serialNumber,
          person.passengerNumber,
          person.number,
          person.no
        ) || String(i + 1),

      booking: scalar(
        booking.formatted,
        person.bookingStatus,
        person.booking_status,
        person.bookStatus,
        booking.status
      ),

      current: currentStatus,

      coach: assigned
        ? scalar(
            current.coach,
            current.coachNumber,
            person.coach,
            person.coachNumber,
            person.currentCoach
          )
        : "",

      // WL/RAC positions are not assigned berth numbers.
      // Use the ambiguous nested berthNo only when confirmed.
      berth: assigned
        ? scalar(
            current.berthNumber,
            person.berthNumber,
            person.berth,
            person.currentBerth,
            person.seatNumber,
            confirmed ? current.berthNo : undefined
          )
        : "",

      berthCode: assigned
        ? scalar(
            current.berthCode,
            current.berthType,
            person.berthCode,
            person.berthType
          )
        : "",
    };
  });

  const prepared = chart.isPrepared ?? data.chartPrepared;

  return {
    trainNumber: scalar(
      train.number,
      data.trainNumber,
      data.trainNo,
      data.train_number
    ),

    trainName: scalar(
      train.name,
      data.trainName,
      data.train_name
    ),

    journeyDate: scalar(
      journey.date,
      train.journeyDate,
      data.journeyDate,
      data.dateOfJourney,
      data.doj,
      data.travelDate
    ),

    travelClass: scalar(
      journey.class,
      train.journeyClass,
      data.class,
      data.journeyClass,
      data.travelClass
    ),

    quota: scalar(journey.quota, data.quota),

    from: stationLabel(from),
    to: stationLabel(to),
    fromCode: stationCode(from),
    toCode: stationCode(to),

    chartStatus:
      scalar(chart.status, data.chartStatus, data.chart_status) ||
      (prepared === true
        ? "Chart Prepared"
        : prepared === false
          ? "Chart Not Prepared"
          : ""),

    passengers,

    status:
      passengers
        .map((p) => `P${p.number}: ${p.current || "—"}`)
        .join(" · ") ||
      scalar(data.currentStatus, data.status),
  };
}

export function liveSummary(payload: unknown) {
  const data = railData(payload);
  const train = record(data.train);

  return {
    trainNumber: scalar(
      train.number,
      data.trainNumber,
      data.trainNo
    ),
    trainName: scalar(train.name, data.trainName),
    status: scalar(data.status, data.runningStatus),

    current:
      stationLabel(data.currentLocation) ||
      stationLabel(data.currentStation) ||
      stationLabel(data.currentHalt),

    previous: stationLabel(data.previousHalt),

    next:
      stationLabel(data.nextHalt) ||
      stationLabel(data.nextStation),

    delayMinutes:
      data.delayMinutes === null ||
      data.delayMinutes === undefined ||
      data.delayMinutes === ""
        ? null
        : Number.isFinite(Number(data.delayMinutes))
          ? Number(data.delayMinutes)
          : null,

    updated: scalar(data.lastUpdatedAt),
    route: rows(data.route),
  };
}

export function railError(payload: unknown, hi = false) {
  const root = record(payload);
  const error = record(root.error);
  const code = scalar(error.code, root.code) || "PROVIDER_ERROR";

  const copy: Record<string, [string, string]> = {
    INVALID_INPUT: [
      "Check the input and try again. Select station suggestions or use exact station codes; keep your original search in the form.",
      "जानकारी जाँचकर फिर प्रयास करें। स्टेशन सुझाव चुनें या सही कोड डालें। फॉर्म की जानकारी बनी रहेगी।",
    ],
    NETWORK_ERROR: [
      "The connection was interrupted. Your input is still in the form; reconnect and submit again.",
      "कनेक्शन रुक गया। आपकी जानकारी फॉर्म में है; इंटरनेट जाँचकर फिर प्रयास करें।",
    ],
    PROVIDER_UNAVAILABLE: [
      "The railway provider could not return a usable result. Your input is preserved. Try later or check the official service.",
      "रेलवे प्रदाता से उपयोगी परिणाम नहीं मिला। जानकारी फॉर्म में है। बाद में या आधिकारिक सेवा पर जाँचें।",
    ],
    NOT_FOUND: [
      "No result was found. Check your input; the record may be expired or unavailable.",
      "परिणाम नहीं मिला। जानकारी जाँचें; रिकॉर्ड पुराना या अनुपलब्ध हो सकता है।",
    ],
    RATE_LIMITED: [
      "Too many lookups. Please wait before trying again.",
      "बहुत अधिक खोज हुई हैं। थोड़ी देर बाद फिर प्रयास करें।",
    ],
    API_BUDGET_REACHED: [
      "Live lookups are temporarily paused to protect the site's API allowance. Please use an official railway service.",
      "API सीमा की सुरक्षा के लिए लाइव खोज अस्थायी रूप से रुकी है। आधिकारिक रेलवे सेवा देखें।",
    ],
    API_BURST_LIMIT: [
      "The live service is busy. Please try again in a minute.",
      "लाइव सेवा व्यस्त है। एक मिनट बाद फिर प्रयास करें।",
    ],
    PROTECTION_UNAVAILABLE: [
      "Live lookups are temporarily unavailable. Please try later or use an official railway service.",
      "लाइव खोज अस्थायी रूप से अनुपलब्ध है। बाद में प्रयास करें या आधिकारिक रेलवे सेवा देखें।",
    ],
    PROVIDER_NOT_CONFIGURED: [
      "The live service has not been connected yet.",
      "लाइव सेवा अभी जुड़ी नहीं है।",
    ],
  };

  const message =
    copy[code]?.[hi ? 1 : 0] ??
    (hi
      ? "जानकारी नहीं मिली। इनपुट जाँचें और कुछ देर बाद फिर प्रयास करें।"
      : scalar(error.message, root.message) ||
        "Information is unavailable. Check your input and try again shortly.");

  const titles: Record<string, [string, string]> = {
    INVALID_INPUT: [
      "Check your search",
      "खोज की जानकारी जाँचें",
    ],
    NOT_FOUND: [
      "No matching result",
      "मिलता-जुलता परिणाम नहीं मिला",
    ],
    RATE_LIMITED: [
      "Please wait before another lookup",
      "अगली खोज से पहले प्रतीक्षा करें",
    ],
    API_BUDGET_REACHED: [
      "Live lookups are paused",
      "लाइव खोज रुकी है",
    ],
    API_BURST_LIMIT: [
      "The service is busy",
      "सेवा व्यस्त है",
    ],
    PROVIDER_NOT_CONFIGURED: [
      "Live service unavailable",
      "लाइव सेवा अनुपलब्ध है",
    ],
    PROTECTION_UNAVAILABLE: [
      "Live service temporarily unavailable",
      "लाइव सेवा अस्थायी रूप से अनुपलब्ध है",
    ],
    NETWORK_ERROR: [
      "Check your connection",
      "इंटरनेट कनेक्शन जाँचें",
    ],
  };

  return {
    code,
    title:
      titles[code]?.[hi ? 1 : 0] ||
      (hi ? "अभी परिणाम उपलब्ध नहीं है" : "Result unavailable right now"),
    message: message.replace(/\b\d{10}\b/g, "[PNR hidden]"),
  };
}

export async function railRequest(
  params: URLSearchParams,
  signal?: AbortSignal
) {
  const pnr = params.get("action") === "pnr";

  const response = await fetch(
    pnr ? "/api/rail" : `/api/rail?${params}`,
    {
      ...(pnr
        ? {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              action: "pnr",
              pnr: params.get("pnr"),
            }),
          }
        : {}),
      cache: "no-store",
      signal: signal
        ? AbortSignal.any([signal, AbortSignal.timeout(25000)])
        : AbortSignal.timeout(25000),
    }
  );

  const payload = record(
    await response.json().catch(() => ({
      success: false,
      message: "Invalid service response.",
    }))
  );

  return {
    response,
    payload,
    ok: response.ok && payload.success !== false,
  };
}

import { parseJourneyDate, seatClasses, seatQuotas } from "@/lib/seat-availability";

export type SavedTrip = {
  train: string;
  name?: string;
  from?: string;
  to?: string;
  boardingDate?: string;
  originDate?: string;
  travelClass?: string;
  quota?: string;
};

const storageKey = "railq_saved_trips_v1";
const station = /^[A-Z0-9]{1,5}$/;

export function normalizeTrip(value: unknown): SavedTrip | null {
  if (!value || typeof value !== "object") return null;
  const trip = value as Partial<SavedTrip>;
  if (typeof trip.train !== "string" || !/^\d{5}$/.test(trip.train)) return null;
  const route = typeof trip.from === "string" && typeof trip.to === "string"
    && station.test(trip.from) && station.test(trip.to) && trip.from !== trip.to
    ? { from: trip.from, to: trip.to } : {};
  return {
    train: trip.train,
    name: typeof trip.name === "string" ? trip.name.trim().slice(0, 100) : undefined,
    ...route,
    boardingDate: parseJourneyDate(trip.boardingDate) ?? undefined,
    originDate: parseJourneyDate(trip.originDate) ?? undefined,
    travelClass: seatClasses.includes(trip.travelClass ?? "") ? trip.travelClass : undefined,
    quota: seatQuotas.includes(trip.quota ?? "") ? trip.quota : undefined,
  };
}

export function tripKey(trip: SavedTrip) {
  return [trip.train, trip.from, trip.to, trip.boardingDate, trip.originDate, trip.travelClass, trip.quota].join(":");
}

export function readTrips(): SavedTrip[] {
  try {
    const values: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(values) ? values.map(normalizeTrip).filter((trip): trip is SavedTrip => !!trip).slice(0, 8) : [];
  } catch { return []; }
}

export function writeTrips(trips: SavedTrip[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(trips.map(normalizeTrip).filter(Boolean).slice(0, 8)));
    window.dispatchEvent(new Event("railq:saved"));
    return true;
  } catch { return false; }
}

export function tripHref(path: string, trip: SavedTrip) {
  const query = new URLSearchParams({ train: trip.train });
  if (path === "/seat-availability" || path === "/dashboard") {
    if (trip.from) query.set("from", trip.from);
    if (trip.to) query.set("to", trip.to);
    if (trip.boardingDate) query.set("date", trip.boardingDate);
    if (path === "/seat-availability") {
      if (trip.travelClass) query.set("class", trip.travelClass);
      if (trip.quota) query.set("quota", trip.quota);
    }
  }
  if (path === "/live-train-status" || path === "/coach-position") {
    if (trip.originDate) query.set("date", trip.originDate);
  }
  return `${path}?${query}${path === "/dashboard" ? "#journey-start" : ""}`;
}

export type SavedPlace = { kind: "train" | "station"; value: string };
const KEY = "railq_saved_places_v1";
export function validPlace(item: SavedPlace) {
  if (typeof item.value !== "string") return false;
  return item.kind === "train" ? /^\d{5}$/.test(item.value) : item.kind === "station" && /^[A-Z]{2,6}$/.test(item.value);
}
export function readPlaces(): SavedPlace[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((x): x is SavedPlace => !!x && typeof x === "object" && validPlace(x)).slice(0, 12) : [];
  } catch { return []; }
}
export function writePlaces(items: SavedPlace[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items.filter(validPlace).slice(0, 12))); window.dispatchEvent(new Event("railq:saved")); return true; }
  catch { return false; }
}
export function recentTrains(): string[] {
  try { const raw: unknown = JSON.parse(localStorage.getItem("railq_recent_trains") || "[]"); return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === "string" && /^\d{5}$/.test(v)).slice(0, 5) : []; }
  catch { return []; }
}
export function rememberTrain(train: string) {
  if (!/^\d{5}$/.test(train)) return;
  try { localStorage.setItem("railq_recent_trains", JSON.stringify([train, ...recentTrains().filter((v) => v !== train)].slice(0, 5))); window.dispatchEvent(new Event("railq:saved")); } catch { /* Storage is optional. */ }
}
export function clearRecent() {
  try { localStorage.removeItem("railq_recent_trains"); window.dispatchEvent(new Event("railq:saved")); return true; } catch { return false; }
}

import { record, rows, scalar } from "@/lib/rail-data";

export type JourneyLeg = { train: string; name: string; from: string; fromName: string; to: string; toName: string; departure: string; arrival: string; departureDate: string; arrivalDate: string };
export type JourneyOption = { legs: JourneyLeg[]; gaps: number[]; stationChanges: boolean[]; duration: number };
export function railDateTime(date: string, time: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return null;
  const value = Date.parse(`${date}T${time}:00+05:30`);
  const check = new Date(`${date}T12:00:00Z`);
  return Number.isFinite(value) && check.toISOString().slice(0, 10) === date ? value : null;
}
function leg(value: unknown): JourneyLeg | null {
  const data = record(value), train = record(data.train), from = record(data.from), to = record(data.to);
  const result = { train: scalar(train.number), name: scalar(train.name), from: scalar(from.code), fromName: scalar(from.name), to: scalar(to.code), toName: scalar(to.name), departure: scalar(from.departure), arrival: scalar(to.arrival), departureDate: scalar(from.date), arrivalDate: scalar(to.date) };
  const start = railDateTime(result.departureDate, result.departure), end = railDateTime(result.arrivalDate, result.arrival);
  return /^\d{5}$/.test(result.train) && /^[A-Z0-9]{2,6}$/.test(result.from) && /^[A-Z0-9]{2,6}$/.test(result.to) && start !== null && end !== null && end > start ? result : null;
}
/** Accept only complete, chronological journeys. Unknown layouts never become invented routes. */
export function connectingOptions(payload: unknown, from: string, to: string, date: string, minimum: number) {
  const data = record(record(payload).data);
  const segments = rows(data.segments);
  const plans = segments.length ? segments.map(s => record(s.plan)) : [data];
  const options: JourneyOption[] = []; let omitted = 0;
  const seen = new Set<string>();
  for (const plan of plans) {
    const candidates = [...rows(plan.direct).map(item => [item]), ...rows(plan.itineraries).map(item => rows(item.legs))];
    for (const candidate of candidates) {
      const legs = candidate.map(leg);
      if (legs.length < 1 || legs.length > 2 || legs.some(l => !l)) { omitted++; continue; }
      const valid = legs as JourneyLeg[];
      if (valid[0].from !== from || valid.at(-1)!.to !== to || valid[0].departureDate !== date) { omitted++; continue; }
      const gaps = valid.slice(1).map((next, i) => (railDateTime(next.departureDate, next.departure)! - railDateTime(valid[i].arrivalDate, valid[i].arrival)!) / 60000);
      const stationChanges = valid.slice(1).map((next, i) => valid[i].to !== next.from);
      // Cross-station ground travel cannot be established by a timetable alone.
      if (gaps.some((gap, i) => gap < minimum || (stationChanges[i] && gap < Math.max(180, minimum)))) { omitted++; continue; }
      const key = valid.map(l => `${l.train}:${l.from}:${l.to}:${l.departureDate}:${l.departure}`).join("|");
      if (seen.has(key)) continue; seen.add(key);
      options.push({ legs: valid, gaps, stationChanges, duration: (railDateTime(valid.at(-1)!.arrivalDate, valid.at(-1)!.arrival)! - railDateTime(valid[0].departureDate, valid[0].departure)!) / 60000 });
    }
  }
  return { options: options.sort((a, b) => a.duration - b.duration).slice(0, 20), omitted };
}

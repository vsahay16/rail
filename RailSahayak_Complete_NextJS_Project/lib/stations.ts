// Small bundled directory: no provider calls while typing. Other codes remain supported.
export const stations = [
  ["NDLS", "New Delhi", "Delhi", "नई दिल्ली"], ["DLI", "Delhi Junction", "Delhi", "दिल्ली जंक्शन"],
  ["NZM", "Hazrat Nizamuddin", "Delhi", "हज़रत निज़ामुद्दीन"], ["ANVT", "Anand Vihar Terminal", "Delhi", "आनंद विहार"],
  ["MMCT", "Mumbai Central", "Mumbai Bombay", "मुंबई सेंट्रल"], ["CSMT", "Chhatrapati Shivaji Maharaj Terminus", "Mumbai Bombay", "छत्रपति शिवाजी महाराज टर्मिनस"],
  ["LTT", "Lokmanya Tilak Terminus", "Mumbai", "लोकमान्य तिलक टर्मिनस"], ["BDTS", "Bandra Terminus", "Mumbai", "बांद्रा टर्मिनस"],
  ["HWH", "Howrah Junction", "Kolkata Calcutta", "हावड़ा"], ["SDAH", "Sealdah", "Kolkata Calcutta", "सियालदह"],
  ["MAS", "MGR Chennai Central", "Chennai Madras", "चेन्नई सेंट्रल"], ["MS", "Chennai Egmore", "Chennai Madras", "चेन्नई एग्मोर"],
  ["SBC", "KSR Bengaluru", "Bengaluru Bangalore", "बेंगलुरु"], ["YPR", "Yesvantpur Junction", "Bengaluru Bangalore", "यशवंतपुर"],
  ["SC", "Secunderabad Junction", "Hyderabad Secunderabad", "सिकंदराबाद"], ["HYB", "Hyderabad Deccan", "Hyderabad", "हैदराबाद"],
  ["PUNE", "Pune Junction", "Pune", "पुणे"], ["ADI", "Ahmedabad Junction", "Ahmedabad", "अहमदाबाद"],
  ["JP", "Jaipur Junction", "Jaipur", "जयपुर"], ["PNBE", "Patna Junction", "Patna", "पटना"],
  ["LKO", "Lucknow Charbagh NR", "Lucknow", "लखनऊ चारबाग"], ["BSB", "Varanasi Junction", "Varanasi Banaras", "वाराणसी"],
  ["BPL", "Bhopal Junction", "Bhopal", "भोपाल"], ["NGP", "Nagpur Junction", "Nagpur", "नागपुर"],
  ["KOTA", "Kota Junction", "Kota", "कोटा"], ["AGC", "Agra Cantt", "Agra", "आगरा कैंट"],
] as const;

export type Station = readonly [string, string, string, string];
function normalize(value: string) { return value.toLocaleLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim(); }
export function stationMatches(query: string, directory: readonly Station[] = stations): Station[] {
  const q = normalize(query);
  if (!q) return [...stations].slice(0, 8);
  const tokens = q.split(/\s+/);
  return directory.map((station, index) => {
    const code = station[0].toLowerCase(), name = normalize(station[1]), text = normalize(station.join(" "));
    const score = code === q ? 0 : name === q ? 1 : code.startsWith(q) ? 2 : name.startsWith(q) ? 3 : tokens.every(token => text.includes(token)) ? 4 : 99;
    return { station, score, index };
  }).filter(item => item.score < 99).sort((a, b) => a.score - b.score || a.index - b.index).slice(0, 12).map(item => item.station);
}
let directoryPromise: Promise<Station[]> | undefined;
export function loadStationDirectory(): Promise<Station[]> {
  if (!directoryPromise) directoryPromise = import("./station-directory.json").then(module => {
    const merged = new Map<string, Station>(stations.map(station => [station[0], station]));
    for (const row of module.default) {
      if (row.length === 4 && !merged.has(row[0])) merged.set(row[0], [row[0], row[1], row[2], row[3]]);
    }
    return [...merged.values()];
  }).catch(error => { directoryPromise = undefined; throw error; });
  return directoryPromise;
}

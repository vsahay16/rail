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

export function stationMatches(query: string) {
  const q = query.trim().toLocaleLowerCase();
  return stations.filter((s) => s.join(" ").toLocaleLowerCase().includes(q)).slice(0, 8);
}

"use client";

import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import type { ToolConfig } from "@/lib/tool-registry";

type Option = [string, string, string];
type Field = { name: string; type?: "text" | "number" | "date" | "datetime-local" | "email" | "select" | "checkbox"; label: string; labelHi: string; placeholder?: string; placeholderHi?: string; options?: Option[]; min?: string; max?: string };
type LocalResult = { tone: "success" | "warning" | "error"; eyebrow: string; title: string; description: string; metrics?: Array<[string, string]>; calendarIso?: string };

const classOptions: Option[] = [["1A", "AC First Class", "AC प्रथम श्रेणी"], ["2A", "AC 2 Tier", "AC 2 टियर"], ["3A", "AC 3 Tier", "AC 3 टियर"], ["3E", "AC 3 Economy", "AC 3 इकोनॉमी"], ["CC", "Chair Car", "चेयर कार"], ["SL", "Sleeper", "स्लीपर"], ["2S", "Second Sitting", "सेकंड सिटिंग"]];
const quotaOptions: Option[] = [["GN", "General", "सामान्य"], ["TQ", "Tatkal", "तत्काल"], ["LD", "Ladies", "महिला"], ["SS", "Lower berth / senior citizen", "लोअर बर्थ / वरिष्ठ नागरिक"]];
const yesNo: Option[] = [["yes", "Yes", "हाँ"], ["no", "No", "नहीं"]];
const coachOptions: Option[] = [["SL3A", "Sleeper / AC 3 Tier", "स्लीपर / AC 3 टियर"], ["2A", "AC 2 Tier", "AC 2 टियर"], ["CC", "Chair Car", "चेयर कार"], ["2S", "Second Sitting", "सेकंड सिटिंग"], ["1A", "AC First Class", "AC प्रथम श्रेणी"]];

const fieldMap: Record<string, Field[]> = {
  "live-train-status": [{ name: "train", label: "Train number", labelHi: "ट्रेन नंबर", placeholder: "12951", type: "number" }, { name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }],
  "trains-between-stations": [{ name: "from", label: "From station code", labelHi: "शुरुआती स्टेशन कोड", placeholder: "NDLS" }, { name: "to", label: "To station code", labelHi: "मंज़िल स्टेशन कोड", placeholder: "BCT" }, { name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }],
  "seat-availability": [{ name: "train", label: "Train number", labelHi: "ट्रेन नंबर", placeholder: "12951", type: "number" }, { name: "from", label: "From", labelHi: "कहाँ से", placeholder: "NDLS" }, { name: "to", label: "To", labelHi: "कहाँ तक", placeholder: "BCT" }, { name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }, { name: "class", label: "Class", labelHi: "श्रेणी", type: "select", options: classOptions }, { name: "quota", label: "Quota", labelHi: "कोटा", type: "select", options: quotaOptions }],
  "train-schedule": [{ name: "train", label: "Train number", labelHi: "ट्रेन नंबर", placeholder: "12951", type: "number" }],
  "train-fare": [{ name: "train", label: "Train number", labelHi: "ट्रेन नंबर", placeholder: "12951", type: "number" }, { name: "from", label: "From", labelHi: "कहाँ से", placeholder: "NDLS" }, { name: "to", label: "To", labelHi: "कहाँ तक", placeholder: "BCT" }, { name: "class", label: "Class", labelHi: "श्रेणी", type: "select", options: classOptions }, { name: "quota", label: "Quota", labelHi: "कोटा", type: "select", options: quotaOptions }],
  "station-arrivals-departures": [{ name: "station", label: "Station code", labelHi: "स्टेशन कोड", placeholder: "NDLS" }, { name: "hours", label: "Time window", labelHi: "समय अवधि", type: "select", options: [["2", "Next 2 hours", "अगले 2 घंटे"], ["4", "Next 4 hours", "अगले 4 घंटे"], ["8", "Next 8 hours", "अगले 8 घंटे"]] }],
  "coach-position": [{ name: "train", label: "Train number", labelHi: "ट्रेन नंबर", placeholder: "12951", type: "number" }, { name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }],
  "platform-number": [{ name: "train", label: "Train number", labelHi: "ट्रेन नंबर", placeholder: "12951", type: "number" }, { name: "station", label: "Station code", labelHi: "स्टेशन कोड", placeholder: "NDLS" }, { name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }],
  "pnr-alerts": [{ name: "pnr", label: "10-digit PNR", labelHi: "10 अंकों का PNR", placeholder: "1234567890", type: "number" }, { name: "email", label: "Email for alerts", labelHi: "अलर्ट के लिए ईमेल", placeholder: "you@example.com", type: "email" }, { name: "consent", label: "I consent to secure PNR rechecks and email alerts", labelHi: "मैं सुरक्षित PNR जाँच और ईमेल अलर्ट के लिए सहमत हूँ", type: "checkbox" }],
  "booking-date-calculator": [{ name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }],
  "tatkal-time-calculator": [{ name: "date", label: "Journey date from train origin", labelHi: "ट्रेन के शुरुआती स्टेशन से यात्रा तारीख", type: "date" }, { name: "group", label: "Travel class group", labelHi: "यात्रा श्रेणी समूह", type: "select", options: [["ac", "AC classes", "AC श्रेणियाँ"], ["nonac", "Non-AC classes", "नॉन-AC श्रेणियाँ"]] }],
  "chart-preparation-calculator": [{ name: "departure", label: "Scheduled departure from your boarding station", labelHi: "आपके बोर्डिंग स्टेशन से निर्धारित प्रस्थान", type: "datetime-local" }],
  "booking-reminders": [{ name: "date", label: "Journey date", labelHi: "यात्रा तारीख", type: "date" }, { name: "type", label: "Reminder type", labelHi: "रिमाइंडर प्रकार", type: "select", options: [["general", "General booking opening", "सामान्य बुकिंग खुलना"], ["tatkal-ac", "Tatkal AC opening", "तत्काल AC खुलना"], ["tatkal-nonac", "Tatkal non-AC opening", "तत्काल नॉन-AC खुलना"]] }],
  "cancellation-deadline-calculator": [{ name: "departure", label: "Scheduled departure", labelHi: "निर्धारित प्रस्थान", type: "datetime-local" }, { name: "status", label: "Ticket status", labelHi: "टिकट स्थिति", type: "select", options: [["confirmed", "Confirmed", "कन्फर्म"], ["rac", "RAC", "RAC"], ["waitlist", "Waitlisted", "वेटलिस्ट"]] }],
  "refund-calculator": [{ name: "fare", label: "Total ticket fare (₹)", labelHi: "कुल टिकट किराया (₹)", type: "number", min: "0" }, { name: "passengers", label: "Passengers", labelHi: "यात्री", type: "number", min: "1", max: "12" }, { name: "class", label: "Class", labelHi: "श्रेणी", type: "select", options: classOptions }, { name: "status", label: "Ticket status", labelHi: "टिकट स्थिति", type: "select", options: [["confirmed", "Confirmed", "कन्फर्म"], ["rac", "RAC", "RAC"], ["waitlist", "Waitlisted", "वेटलिस्ट"]] }, { name: "hours", label: "Hours before departure", labelHi: "प्रस्थान से पहले घंटे", type: "number", min: "0" }],
  "seat-berth-finder": [{ name: "coach", label: "Coach type", labelHi: "कोच प्रकार", type: "select", options: coachOptions }, { name: "seat", label: "Seat / berth number", labelHi: "सीट / बर्थ नंबर", type: "number", min: "1", max: "120" }],
  "coach-layout": [{ name: "coach", label: "Coach type", labelHi: "कोच प्रकार", type: "select", options: coachOptions }],
  "status-code-decoder": [{ name: "code", label: "Status code", labelHi: "स्थिति कोड", placeholder: "GNWL", type: "text" }],
  "waitlist-guide": [{ name: "code", label: "Your waitlist category", labelHi: "आपकी वेटलिस्ट श्रेणी", type: "select", options: [["GNWL", "GNWL", "GNWL"], ["RLWL", "RLWL", "RLWL"], ["PQWL", "PQWL", "PQWL"], ["TQWL", "TQWL", "TQWL"], ["RAC", "RAC", "RAC"]] }],
  "vikalp-eligibility": [{ name: "eticket", label: "Is this an e-ticket?", labelHi: "क्या यह ई-टिकट है?", type: "select", options: yesNo }, { name: "waitlisted", label: "Is the booking waitlisted?", labelHi: "क्या बुकिंग वेटलिस्ट है?", type: "select", options: yesNo }, { name: "opted", label: "Did you opt for VIKALP?", labelHi: "क्या आपने VIKALP चुना था?", type: "select", options: yesNo }],
  "connection-buffer-calculator": [{ name: "arrival", label: "Expected arrival of first train", labelHi: "पहली ट्रेन का अपेक्षित आगमन", type: "datetime-local" }, { name: "departure", label: "Departure of connecting train", labelHi: "कनेक्टिंग ट्रेन का प्रस्थान", type: "datetime-local" }, { name: "stationChange", label: "Do you need to change stations?", labelHi: "क्या स्टेशन बदलना है?", type: "select", options: yesNo }, { name: "delay", label: "Extra delay buffer (minutes)", labelHi: "अतिरिक्त देरी समय (मिनट)", type: "number", min: "0" }],
  "luggage-allowance": [{ name: "class", label: "Travel class", labelHi: "यात्रा श्रेणी", type: "select", options: classOptions }, { name: "adults", label: "Adult passengers", labelHi: "वयस्क यात्री", type: "number", min: "1", max: "12" }, { name: "children", label: "Children aged 5–12", labelHi: "5–12 वर्ष के बच्चे", type: "number", min: "0", max: "12" }],
};

const decoder: Record<string, [string, string, string, string]> = {
  CNF: ["Confirmed", "कन्फर्म", "Accommodation is confirmed; allocation details may appear later.", "सीट कन्फर्म है; आवंटन विवरण बाद में दिखाई दे सकता है।"], RAC: ["Reservation Against Cancellation", "रद्दीकरण के विरुद्ध आरक्षण", "Travel is generally permitted with shared accommodation until a berth opens.", "आम तौर पर साझा सीट के साथ यात्रा की अनुमति होती है, पूरी बर्थ बाद में मिल सकती है।"], GNWL: ["General Waiting List", "सामान्य प्रतीक्षा सूची", "A common waitlist category under the general quota.", "सामान्य कोटा की आम प्रतीक्षा सूची।"], RLWL: ["Remote Location Waiting List", "रिमोट लोकेशन प्रतीक्षा सूची", "Waitlist linked to selected intermediate-station quotas.", "चुनिंदा बीच के स्टेशन कोटा से जुड़ी प्रतीक्षा सूची।"], PQWL: ["Pooled Quota Waiting List", "पूल्ड कोटा प्रतीक्षा सूची", "Waitlist under a quota shared by selected stations.", "चुनिंदा स्टेशनों के साझा कोटा की प्रतीक्षा सूची।"], TQWL: ["Tatkal Waiting List", "तत्काल प्रतीक्षा सूची", "Waiting status under the Tatkal quota.", "तत्काल कोटा की प्रतीक्षा स्थिति।"], WL: ["Waiting List", "प्रतीक्षा सूची", "Not confirmed yet; check the final chart and official status.", "अभी कन्फर्म नहीं; अंतिम चार्ट और आधिकारिक स्थिति देखें।"], CAN: ["Cancelled", "रद्द", "The booking or passenger entry has been cancelled.", "बुकिंग या यात्री प्रविष्टि रद्द हो चुकी है।"],
};

function initialForm(fields: Field[]) { return Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? "false" : field.options?.[0]?.[0] ?? ""])); }
function dateValue(value: string) { const date = new Date(value.includes("T") ? value : `${value}T12:00:00`); return Number.isNaN(date.valueOf()) ? null : date; }
function formatDate(date: Date, hi: boolean, withTime = true) { return date.toLocaleString(hi ? "hi-IN" : "en-IN", withTime ? { dateStyle: "full", timeStyle: "short" } : { dateStyle: "full" }); }
function money(value: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, value)); }
function record(value: unknown) { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }

export function ToolEngine({ tool }: { tool: ToolConfig }) {
  const { language } = useLanguage(); const hi = language === "hi";
  const fields = fieldMap[tool.slug] ?? [];
  const [form, setForm] = useState<Record<string, string>>(() => initialForm(fields));
  const [loading, setLoading] = useState(false);
  const [localResult, setLocalResult] = useState<LocalResult | null>(null);
  const [providerResult, setProviderResult] = useState<Record<string, unknown> | null>(null);
  const submitLabel = tool.live ? (hi ? "लाइव जानकारी देखें" : "Check live information") : (hi ? "परिणाम निकालें" : "Calculate result");
  const primitiveProviderFields = useMemo(() => {
    const source = providerResult ? record(providerResult.data) ?? record(providerResult.result) ?? providerResult : null;
    return source ? Object.entries(source).filter(([, value]) => ["string", "number", "boolean"].includes(typeof value)).slice(0, 12) : [];
  }, [providerResult]);
  const providerList = useMemo(() => {
    const source = providerResult ? record(providerResult.data) ?? record(providerResult.result) ?? providerResult : null;
    if (!source) return [];
    const found = Object.values(source).find(Array.isArray);
    return Array.isArray(found) ? found.slice(0, 20) : [];
  }, [providerResult]);

  function error(title: string, description: string) { setLocalResult({ tone: "error", eyebrow: hi ? "जानकारी जाँचें" : "Check the information", title, description }); }

  function calculate(): LocalResult | null {
    const slug = tool.slug;
    if (slug === "booking-date-calculator" || slug === "booking-reminders") {
      const journey = dateValue(form.date); if (!journey) { error(hi ? "यात्रा तारीख चुनें" : "Select a journey date", hi ? "गणना के लिए सही तारीख जरूरी है।" : "A valid date is required for the calculation."); return null; }
      const opening = new Date(journey);
      let hour = 8; let days = 60; let event = hi ? "सामान्य बुकिंग खुलना" : "General booking opening";
      if (slug === "booking-reminders" && form.type !== "general") { days = 1; hour = form.type === "tatkal-ac" ? 10 : 11; event = form.type === "tatkal-ac" ? (hi ? "तत्काल AC बुकिंग" : "Tatkal AC booking") : (hi ? "तत्काल नॉन-AC बुकिंग" : "Tatkal non-AC booking"); }
      opening.setDate(opening.getDate() - days); opening.setHours(hour, 0, 0, 0);
      return { tone: "success", eyebrow: hi ? "अनुमानित खुलने का समय" : "Expected opening time", title: formatDate(opening, hi), description: hi ? "सामान्य नियम पर आधारित अनुमान। विशेष ट्रेन या नियम अपवाद हो सकते हैं।" : "An estimate based on the general rule. Special trains or rule exceptions may apply.", metrics: [[hi ? "यात्रा तारीख" : "Journey date", formatDate(journey, hi, false)], [hi ? "रिमाइंडर" : "Reminder", event]], calendarIso: opening.toISOString() };
    }
    if (slug === "tatkal-time-calculator") {
      const journey = dateValue(form.date); if (!journey) { error(hi ? "यात्रा तारीख चुनें" : "Select a journey date", hi ? "ट्रेन के शुरुआती स्टेशन की यात्रा तारीख डालें।" : "Use the journey date from the train’s originating station."); return null; }
      const opening = new Date(journey); opening.setDate(opening.getDate() - 1); opening.setHours(form.group === "ac" ? 10 : 11, 0, 0, 0);
      return { tone: "success", eyebrow: hi ? "अनुमानित तत्काल समय" : "Expected Tatkal time", title: formatDate(opening, hi), description: hi ? "AC के लिए सुबह 10 बजे और नॉन-AC के लिए सुबह 11 बजे के सामान्य नियम पर आधारित।" : "Based on the general 10:00 AM AC and 11:00 AM non-AC opening rule.", calendarIso: opening.toISOString() };
    }
    if (slug === "chart-preparation-calculator") {
      const departure = dateValue(form.departure); if (!departure) { error(hi ? "प्रस्थान समय डालें" : "Enter the departure time", hi ? "बोर्डिंग स्टेशन से निर्धारित समय इस्तेमाल करें।" : "Use the scheduled time from your boarding station."); return null; }
      const chart = new Date(departure); const hour = departure.getHours(); if (hour >= 5 && hour < 14) { chart.setDate(chart.getDate() - 1); chart.setHours(21, 0, 0, 0); } else chart.setHours(chart.getHours() - 8);
      return { tone: "warning", eyebrow: hi ? "अनुमानित पहला चार्ट" : "Estimated first chart", title: formatDate(chart, hi), description: hi ? "यह योजना के लिए अनुमान है। वास्तविक चार्ट समय ट्रेन, स्टेशन और रेलवे निर्देश के अनुसार बदल सकता है।" : "This is a planning estimate. Actual chart timing can vary by train, station and railway instruction.", metrics: [[hi ? "निर्धारित प्रस्थान" : "Scheduled departure", formatDate(departure, hi)]] };
    }
    if (slug === "cancellation-deadline-calculator") {
      const departure = dateValue(form.departure); if (!departure) { error(hi ? "प्रस्थान समय डालें" : "Enter scheduled departure", hi ? "समय-सीमा निकालने के लिए यह जरूरी है।" : "It is required to calculate the windows."); return null; }
      const marks = (form.status === "confirmed" ? [48, 12, 4] : [.5]).map((hours) => { const date = new Date(departure); date.setMinutes(date.getMinutes() - hours * 60); return [hours === .5 ? (hi ? "30 मिनट पहले" : "30 minutes before") : `${hours} ${hi ? "घंटे पहले" : "hours before"}`, formatDate(date, hi)] as [string, string]; });
      return { tone: "warning", eyebrow: hi ? "महत्वपूर्ण समय-सीमाएँ" : "Important cancellation windows", title: hi ? "कटौती समय के साथ बदल सकती है" : "Deduction can change across these windows", description: hi ? "वास्तविक रिफंड टिकट प्रकार, चार्ट और मौजूदा नियम पर निर्भर करता है।" : "The actual refund depends on ticket type, chart status and current rules.", metrics: marks };
    }
    if (slug === "refund-calculator") {
      const fare = Number(form.fare); const passengers = Math.max(1, Number(form.passengers)); const hours = Number(form.hours); if (!(fare > 0) || !(hours >= 0)) { error(hi ? "किराया और समय डालें" : "Enter fare and time", hi ? "सही संख्या इस्तेमाल करें।" : "Use valid numeric values."); return null; }
      const flat: Record<string, number> = { "1A": 240, "2A": 200, "3A": 180, "3E": 180, CC: 180, SL: 120, "2S": 60 };
      let deduction = 0; if (form.status === "confirmed") { const minimum = (flat[form.class] ?? 120) * passengers; deduction = hours > 48 ? minimum : hours > 12 ? Math.max(fare * .25, minimum) : hours > 4 ? Math.max(fare * .5, minimum) : fare; } else deduction = hours > .5 ? Math.min(fare, 60 * passengers) : fare;
      return { tone: "warning", eyebrow: hi ? "अनुमानित रिफंड" : "Estimated refund", title: money(fare - deduction), description: hi ? "सिर्फ योजना के लिए अनुमान। सेवा शुल्क, GST, चार्ट और टिकट नियम अंतिम राशि बदल सकते हैं।" : "A planning estimate only. Service charges, GST, chart status and ticket rules can change the final amount.", metrics: [[hi ? "अनुमानित कटौती" : "Estimated deduction", money(deduction)], [hi ? "दिया गया किराया" : "Entered fare", money(fare)]] };
    }
    if (slug === "seat-berth-finder") {
      const seat = Number(form.seat); if (!(seat > 0)) { error(hi ? "सीट नंबर डालें" : "Enter a seat number", hi ? "सही सकारात्मक संख्या इस्तेमाल करें।" : "Use a valid positive number."); return null; }
      if (form.coach === "1A") return { tone: "warning", eyebrow: hi ? "कोच आवंटन जरूरी" : "Coach allocation required", title: hi ? "1A बर्थ केवल सीट नंबर से तय नहीं होती" : "1A berth cannot be reliably decoded from seat number alone", description: hi ? "केबिन/कूप और बर्थ चार्ट आवंटन से देखें।" : "Check cabin/coupe and berth through the final allocation." };
      const patterns: Record<string, string[]> = { SL3A: ["Lower", "Middle", "Upper", "Lower", "Middle", "Upper", "Side Lower", "Side Upper"], "2A": ["Lower", "Upper", "Lower", "Upper", "Side Lower", "Side Upper"], CC: ["Window", "Middle", "Aisle", "Aisle", "Middle", "Window"], "2S": ["Window", "Middle", "Aisle", "Aisle", "Middle", "Window"] };
      const hiMap: Record<string, string> = { Lower: "लोअर बर्थ", Middle: "मिडिल बर्थ", Upper: "अपर बर्थ", "Side Lower": "साइड लोअर", "Side Upper": "साइड अपर", Window: "विंडो सीट", Aisle: "आइल सीट" };
      const pattern = patterns[form.coach]; const type = pattern[(seat - 1) % pattern.length];
      return { tone: "success", eyebrow: hi ? "अनुमानित सीट प्रकार" : "Expected seat type", title: hi ? hiMap[type] ?? type : type, description: hi ? "सामान्य कोच नंबरिंग पर आधारित। वास्तविक रेक लेआउट अलग हो सकता है।" : "Based on common coach numbering. The actual rake layout can differ.", metrics: [[hi ? "सीट नंबर" : "Seat number", String(seat)], [hi ? "कोच प्रकार" : "Coach type", form.coach]] };
    }
    if (slug === "status-code-decoder" || slug === "waitlist-guide") {
      const code = form.code.trim().toUpperCase(); const info = decoder[code]; if (!info) { error(hi ? "कोड नहीं मिला" : "Code not found", hi ? "CNF, RAC, GNWL, RLWL, PQWL, TQWL, WL या CAN आज़माएँ।" : "Try CNF, RAC, GNWL, RLWL, PQWL, TQWL, WL or CAN."); return null; }
      return { tone: code === "CNF" ? "success" : "warning", eyebrow: code, title: hi ? info[1] : info[0], description: hi ? info[3] : info[2] };
    }
    if (slug === "vikalp-eligibility") {
      const likely = form.eticket === "yes" && form.waitlisted === "yes" && form.opted === "yes";
      return { tone: likely ? "warning" : "error", eyebrow: hi ? "पात्रता संकेत" : "Eligibility indication", title: likely ? (hi ? "आपकी बुकिंग पर VIKALP विचार हो सकता है" : "Your booking may be considered for VIKALP") : (hi ? "दिए गए उत्तरों से VIKALP लागू नहीं दिखता" : "VIKALP does not appear applicable from these answers"), description: hi ? "यह गारंटी नहीं है। वैकल्पिक ट्रेन आवंटन उपलब्धता और रेलवे नियम पर निर्भर करता है।" : "This is not a guarantee. Alternate-train allocation depends on availability and railway rules." };
    }
    if (slug === "connection-buffer-calculator") {
      const arrival = dateValue(form.arrival); const departure = dateValue(form.departure); if (!arrival || !departure) { error(hi ? "दोनों समय डालें" : "Enter both times", hi ? "आगमन और अगली ट्रेन का प्रस्थान जरूरी है।" : "Arrival and connecting departure are required."); return null; }
      const total = Math.floor((departure.valueOf() - arrival.valueOf()) / 60000); const recommended = form.stationChange === "yes" ? 180 : 90; const usable = total - Number(form.delay || 0); const safe = usable >= recommended;
      return { tone: safe ? "success" : "warning", eyebrow: hi ? "व्यावहारिक कनेक्शन संकेत" : "Practical connection indication", title: safe ? (hi ? `${usable} मिनट उपलब्ध — उचित बफर` : `${usable} minutes available — reasonable buffer`) : (hi ? `${usable} मिनट उपलब्ध — जोखिम अधिक` : `${usable} minutes available — higher risk`), description: hi ? "यह गारंटी नहीं है। ट्रेन देरी, प्लेटफॉर्म दूरी, भीड़ और स्टेशन बदलाव को ध्यान में रखें।" : "This is not a guarantee. Consider delays, platform distance, crowding and station changes.", metrics: [[hi ? "कुल अंतर" : "Total gap", `${total} min`], [hi ? "सुझाया न्यूनतम" : "Suggested minimum", `${recommended} min`]] };
    }
    if (slug === "luggage-allowance") {
      const allowance: Record<string, number> = { "1A": 70, "2A": 50, "3A": 40, "3E": 40, CC: 40, SL: 40, "2S": 35 }; const adults = Math.max(1, Number(form.adults)); const children = Math.max(0, Number(form.children)); const kg = (allowance[form.class] ?? 35) * adults + Math.floor((allowance[form.class] ?? 35) / 2) * children;
      return { tone: "warning", eyebrow: hi ? "अनुमानित मुफ्त सीमा" : "Estimated free allowance", title: `${kg} kg`, description: hi ? "सामान नियम, न्यूनतम/अधिकतम सीमा और विशेष वस्तुएँ अलग हो सकती हैं। आधिकारिक नियम सत्यापित करें।" : "Luggage rules, minimum/maximum limits and special articles can differ. Verify the official rules.", metrics: [[hi ? "प्रति वयस्क आधार" : "Base per adult", `${allowance[form.class] ?? 35} kg`], [hi ? "बच्चे" : "Children", String(children)]] };
    }
    if (slug === "coach-layout") return { tone: "success", eyebrow: hi ? "प्रतिनिधि लेआउट" : "Representative layout", title: hi ? "नीचे सामान्य सीट क्रम देखें" : "See the common seat sequence below", description: hi ? "वास्तविक कोच और रेक में अंतर हो सकता है।" : "The actual coach and rake may differ." };
    return null;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLocalResult(null); setProviderResult(null);
    if (!tool.live) { const calculated = calculate(); if (calculated) { setLocalResult(calculated); trackEvent("calculator_completed", { tool: tool.slug, outcome: calculated.tone }); } return; }
    if (tool.slug === "pnr-alerts") {
      if (!/^\d{10}$/.test(form.pnr) || !/^\S+@\S+\.\S+$/.test(form.email) || form.consent !== "true") { error(hi ? "PNR, ईमेल और सहमति जाँचें" : "Check PNR, email and consent", hi ? "अलर्ट बनाने के लिए सभी जानकारी सही होना जरूरी है।" : "Valid information and explicit consent are required."); return; }
      setLoading(true); try { const response = await fetch("/api/reminders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pnr: form.pnr, email: form.email, consent: true }) }); const payload = await response.json() as Record<string, unknown>; if (!response.ok) throw new Error(); setLocalResult({ tone: "success", eyebrow: hi ? "अलर्ट अनुरोध मिला" : "Alert request received", title: hi ? "स्थिति बदलाव पर सूचना तैयार है" : "Status-change monitoring is ready", description: String(payload.message ?? (hi ? "सेवा सक्रिय होने पर ईमेल भेजा जाएगा।" : "Email will be sent when the monitoring service is active.")) }); } catch { setLocalResult({ tone: "warning", eyebrow: hi ? "सुरक्षित अलर्ट सेटअप आवश्यक" : "Secure alert setup required", title: hi ? "होस्टिंग में रिमाइंडर सेवा कॉन्फ़िगर करें" : "Configure the reminder service in hosting", description: hi ? "एन्क्रिप्शन, Supabase और ईमेल प्रदाता की कुंजी जोड़ने के बाद यह सुविधा सक्रिय होगी।" : "This activates after encryption, Supabase and email-provider keys are configured." }); } finally { setLoading(false); } return;
    }
    setLoading(true); trackEvent("live_tool_submitted", { tool: tool.slug });
    const actionMap: Record<string, string> = { "live-train-status": "live", "trains-between-stations": "between", "seat-availability": "availability", "train-schedule": "schedule", "train-fare": "fare", "station-arrivals-departures": "station", "coach-position": "coach", "platform-number": "platform" };
    const params = new URLSearchParams({ action: actionMap[tool.slug] ?? tool.slug }); Object.entries(form).forEach(([key, value]) => { if (value) params.set(key, ["from", "to", "station"].includes(key) ? value.toUpperCase() : value); });
    try { const response = await fetch(`/api/rail?${params}`, { cache: "no-store" }); const payload = await response.json() as Record<string, unknown>; if (!response.ok) { const missing = payload.code === "PROVIDER_FEATURE_NOT_CONFIGURED" || payload.code === "PROVIDER_NOT_CONFIGURED"; setLocalResult({ tone: "warning", eyebrow: missing ? (hi ? "प्रदाता कनेक्शन आवश्यक" : "Provider connection required") : (hi ? "लाइव जानकारी नहीं मिली" : "Live information unavailable"), title: missing ? (hi ? "इस सुविधा के लिए स्वीकृत API एंडपॉइंट जोड़ें" : "Add an approved API endpoint for this feature") : (hi ? "कुछ देर बाद फिर प्रयास करें" : "Please try again shortly"), description: hi ? "पेज और सुरक्षित सर्वर रूट तैयार हैं। डेटा लाइसेंस और प्रदाता कॉन्फ़िगरेशन के बाद परिणाम दिखाई देंगे।" : "The page and secure server route are ready. Results appear after data licensing and provider configuration." }); trackEvent("live_tool_result", { tool: tool.slug, outcome: missing ? "not_configured" : "error" }); } else { setProviderResult(payload); trackEvent("live_tool_result", { tool: tool.slug, outcome: "success" }); } } catch { setLocalResult({ tone: "error", eyebrow: hi ? "कनेक्शन रुक गया" : "Connection interrupted", title: hi ? "लाइव सेवा तक नहीं पहुँच सके" : "Could not reach the live service", description: hi ? "फिर प्रयास करें और जरूरी जानकारी आधिकारिक माध्यम से सत्यापित करें।" : "Try again and verify critical information through official channels." }); } finally { setLoading(false); }
  }

  function downloadCalendar() {
    if (!localResult?.calendarIso) return; const date = new Date(localResult.calendarIso); const stamp = date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); const end = new Date(date.valueOf() + 30 * 60000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//RailSahayak//Journey Reminder//EN\r\nBEGIN:VEVENT\r\nUID:${crypto.randomUUID()}@railsahayak\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}\r\nDTSTART:${stamp}\r\nDTEND:${end}\r\nSUMMARY:${tool.title}\r\nDESCRIPTION:Verify the final opening time through official railway channels.\r\nEND:VEVENT\r\nEND:VCALENDAR`; const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "railsahayak-reminder.ics"; anchor.click(); URL.revokeObjectURL(url); trackEvent("calendar_reminder_downloaded", { tool: tool.slug });
  }

  const layoutPattern = form.coach === "2A" ? ["LB", "UB", "LB", "UB", "SL", "SU"] : form.coach === "CC" || form.coach === "2S" ? ["W", "M", "A", "A", "M", "W"] : form.coach === "1A" ? ["Cabin", "Cabin", "Coupe", "Coupe"] : ["LB", "MB", "UB", "LB", "MB", "UB", "SL", "SU"];

  return <section className="tool-engine"><form onSubmit={submit}><div className={`engine-fields fields-${Math.min(fields.length, 3)}`}>{fields.map((field) => <label className={field.type === "checkbox" ? "engine-checkbox" : ""} key={field.name}>{field.type === "checkbox" ? <><input type="checkbox" checked={form[field.name] === "true"} onChange={(event) => setForm({ ...form, [field.name]: String(event.target.checked) })} /><span>{hi ? field.labelHi : field.label}</span></> : <><span>{hi ? field.labelHi : field.label}</span>{field.type === "select" ? <select value={form[field.name]} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}>{field.options?.map(([value, en, hindi]) => <option key={value} value={value}>{hi ? hindi : en}</option>)}</select> : <input type={field.type ?? "text"} min={field.min} max={field.max} value={form[field.name]} onChange={(event) => setForm({ ...form, [field.name]: event.target.value.replace(field.type === "number" && ["train", "pnr", "seat"].includes(field.name) ? /\D/g : /$^/, "") })} placeholder={hi ? field.placeholderHi ?? field.placeholder : field.placeholder} />}</>}</label>)}</div><button className="engine-submit" type="submit" disabled={loading}>{loading ? <><span className="spinner" />{hi ? "जानकारी मिल रही है" : "Getting information"}</> : <>{submitLabel}<Icon name="arrow" size={18} /></>}</button><p className="engine-disclaimer"><Icon name="shield" size={14} />{tool.live ? (hi ? "लाइव डेटा प्रदाता की उपलब्धता पर निर्भर करता है।" : "Live data depends on provider availability.") : (hi ? "यह योजना के लिए सहायक अनुमान है; महत्वपूर्ण नियम सत्यापित करें।" : "This is a planning aid; verify important rules.")}</p></form>

    {tool.slug === "coach-layout" && <div className="coach-visual"><div className="coach-corridor">{hi ? "गलियारा / Aisle" : "Aisle"}</div><div className={`coach-seat-map map-${form.coach}`}>{Array.from({ length: 24 }, (_, index) => <span className={layoutPattern[index % layoutPattern.length].toLowerCase()} key={index}><b>{index + 1}</b><small>{layoutPattern[index % layoutPattern.length]}</small></span>)}</div><p>{hi ? "यह प्रतिनिधि लेआउट है। वास्तविक रेक संरचना अलग हो सकती है।" : "Representative layout only. The actual rake formation may differ."}</p></div>}

    {localResult && <div className={`engine-result ${localResult.tone}`} aria-live="polite"><span>{localResult.eyebrow}</span><h2>{localResult.title}</h2><p>{localResult.description}</p>{localResult.metrics && <dl>{localResult.metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}{localResult.calendarIso && <button onClick={downloadCalendar}><Icon name="calendar" size={17} />{hi ? "कैलेंडर में जोड़ें" : "Add to calendar"}</button>}</div>}

    {providerResult && <div className="provider-result" aria-live="polite"><div><span className="live-dot" />{hi ? "नवीनतम प्रदाता उत्तर" : "Latest provider response"}</div><h2>{hi ? "लाइव जानकारी मिल गई" : "Live information received"}</h2>{primitiveProviderFields.length > 0 && <dl>{primitiveProviderFields.map(([key, value]) => <div key={key}><dt>{key.replace(/([A-Z])/g, " $1")}</dt><dd>{String(value)}</dd></div>)}</dl>}{providerList.length > 0 && <div className="provider-list">{providerList.map((item, index) => { const row = record(item); return <article key={index}>{row ? Object.entries(row).filter(([, value]) => ["string", "number", "boolean"].includes(typeof value)).slice(0, 6).map(([key, value]) => <span key={key}><small>{key.replace(/([A-Z])/g, " $1")}</small><b>{String(value)}</b></span>) : <b>{String(item)}</b>}</article>; })}</div>}<p>{hi ? "अंतिम और महत्वपूर्ण जानकारी आधिकारिक रेलवे माध्यम से सत्यापित करें।" : "Verify final and critical information through official railway channels."}</p></div>}
  </section>;
}

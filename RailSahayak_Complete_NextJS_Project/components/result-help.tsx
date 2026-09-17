"use client";
import { useState } from "react";
import { LocalizedLink as Link } from "@/components/localized-link";

export function ResultHelp(props: { hi: boolean; tool: string; code?: string; fetchedAt?: string; pnr?: boolean }) {
  return <ResultHelpContent key={`${props.tool}:${props.code}:${props.fetchedAt}`} {...props} />;
}
function ResultHelpContent({ hi, tool, code = "DISPLAY_ISSUE", fetchedAt, pnr = false }: { hi: boolean; tool: string; code?: string; fetchedAt?: string; pnr?: boolean }) {
  const [message, setMessage] = useState(""); const [sending, setSending] = useState(false);
  async function report() {
    setSending(true);
    try {
      const r = await fetch("/api/tool-report", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tool, code }), signal: AbortSignal.timeout(10000) });
      setMessage(r.ok ? (hi ? "समस्या दर्ज हुई। कोई PNR या यात्री जानकारी नहीं भेजी गई।" : "Problem recorded. No PNR or passenger details were sent.") : (hi ? "रिपोर्ट नहीं भेजी जा सकी। संपर्क पेज उपयोग करें।" : "Could not send the report. Please use the contact page."));
    } catch { setMessage(hi ? "कनेक्शन नहीं हुआ। संपर्क पेज उपयोग करें।" : "Could not connect. Please use the contact page."); }
    finally { setSending(false); }
  }
  const parsed = fetchedAt ? new Date(fetchedAt) : null;
  return <aside className="result-help">
    {parsed && !Number.isNaN(parsed.valueOf()) && <p>{hi ? "जानकारी प्राप्त हुई" : "Result fetched"}: {parsed.toLocaleString(hi ? "hi-IN" : "en-IN", { timeZone: "Asia/Kolkata" })} IST</p>}
    {pnr && <p>{hi ? "CNF: कन्फर्म। RAC: आरक्षण रद्द होने पर बर्थ मिलने की स्थिति। WL: प्रतीक्षा सूची। हर यात्री और अंतिम चार्ट की स्थिति अलग जाँचें; अनुमान यात्रा की अनुमति नहीं है।" : "CNF: confirmed. RAC: Reservation Against Cancellation. WL: waiting list. Check each passenger and the final chart separately; a prediction is not permission to travel."}</p>}
    <div><a href={pnr ? "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en" : "https://enquiry.indianrail.gov.in/"} target="_blank" rel="noreferrer">{hi ? "आधिकारिक सेवा पर जाँचें" : "Verify with the official service"}</a><Link href={pnr ? "/guides/pnr-and-waiting-lists" : "/guides/station-and-onboard-travel"}>{hi ? "अगला कदम समझें" : "Understand your next step"}</Link><button type="button" disabled={sending || message.startsWith("Problem recorded") || message.startsWith("समस्या दर्ज")} onClick={report}>{sending ? (hi ? "भेज रहे हैं…" : "Sending…") : (hi ? "समस्या बताएँ" : "Report a problem")}</button><Link href="/contact">{hi ? "संपर्क" : "Contact"}</Link></div><small>{hi ? "रिपोर्ट में केवल टूल और समस्या कोड भेजते हैं।" : "Reports include only the tool and problem code."}</small><p role="status">{message}</p>
  </aside>;
}

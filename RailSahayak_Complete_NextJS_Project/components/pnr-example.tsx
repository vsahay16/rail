import { LocalizedLink as Link } from "@/components/localized-link";

export function PnrExample({ hi }: { hi: boolean }) {
  return <section className="pnr-example" aria-labelledby="pnr-example-title">
    <span className="kicker">{hi ? "काल्पनिक उदाहरण · लाइव टिकट नहीं" : "Fictional example · Not a live ticket"}</span>
    <h2 id="pnr-example-title">{hi ? "PNR परिणाम में कौन-सी जानकारी पढ़ें?" : "How to read a PNR result"}</h2>
    <p>{hi ? "बुकिंग स्थिति टिकट बनते समय की जानकारी है। वर्तमान स्थिति प्रदाता से मिली नवीनतम स्थिति है। एक ही PNR में हर यात्री का परिणाम अलग हो सकता है।" : "Booking status records the position when the ticket was booked. Current status is the latest status returned by the provider. Passengers on the same PNR can have different results."}</p>
    <div className="pnr-example-grid">
      <article><h3>{hi ? "उदाहरण यात्री A" : "Example passenger A"}</h3><dl>
        <div><dt>{hi ? "बुकिंग स्थिति" : "Booking status"}</dt><dd>WL/9</dd></div>
        <div><dt>{hi ? "वर्तमान स्थिति" : "Current status"}</dt><dd>WL/7</dd></div>
        <div><dt>{hi ? "कोच / बर्थ" : "Coach / berth"}</dt><dd>{hi ? "नहीं दिखाया गया" : "Not supplied"}</dd></div>
      </dl><p>{hi ? "प्रतीक्षा क्रम 9 से 7 हुआ है। इसका अर्थ बर्थ 7 या कन्फर्म टिकट नहीं है।" : "The waiting position moved from 9 to 7. This does not mean berth 7 or a confirmed ticket."}</p></article>
      <article><h3>{hi ? "उदाहरण यात्री B" : "Example passenger B"}</h3><dl>
        <div><dt>{hi ? "बुकिंग स्थिति" : "Booking status"}</dt><dd>WL/4</dd></div>
        <div><dt>{hi ? "वर्तमान स्थिति" : "Current status"}</dt><dd>CNF</dd></div>
        <div><dt>{hi ? "कोच / बर्थ" : "Coach / berth"}</dt><dd>S2 / 15</dd></div>
      </dl><p>{hi ? "इस काल्पनिक परिणाम में कन्फर्म स्थिति और आवंटन दिख रहे हैं। दूसरे यात्री का परिणाम इससे तय नहीं होता।" : "This fictional result shows confirmed status and an allocation. It does not determine another passenger’s status."}</p></article>
    </div>
    <p>{hi ? "कन्फर्मेशन प्रतिशत एक अलग, प्रदाता-निर्भर अनुमान है। यह वर्तमान स्थिति नहीं बदलता। अनुमान उपलब्ध न होना 0% नहीं है। यात्रा से पहले आधिकारिक रिकॉर्ड और लागू यात्रा शर्तें जाँचें।" : "A confirmation percentage is a separate, provider-dependent estimate. It does not change the current status. An unavailable estimate does not mean 0%. Check the official record and applicable travel conditions before travelling."}</p>
    <Link href="/guides/pnr-status-explained">{hi ? "PNR परिणाम की पूरी जानकारी पढ़ें →" : "Read the full guide to PNR results →"}</Link>
  </section>;
}

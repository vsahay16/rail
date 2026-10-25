"use client";
import { useEffect, useState } from "react";
export function LookupProgress({ hi }: { hi: boolean }) {
 const [slow, setSlow] = useState(false);
 useEffect(() => { const timer = setTimeout(() => setSlow(true), 8000); return () => clearTimeout(timer); }, []);
 return <p className="lookup-progress" role="status">{slow ? (hi ? "सेवा में समय लग रहा है। आपकी जानकारी भरी हुई है; दोबारा दबाने की जरूरत नहीं।" : "The service is taking longer. Your details are still here; no need to submit again.") : (hi ? "नवीनतम जानकारी माँग रहे हैं…" : "Requesting the latest information…")}</p>;
}

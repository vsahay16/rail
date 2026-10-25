"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
export function ShareTool({ hi }: { hi: boolean }) {
 const [message, setMessage] = useState("");
 async function share() {
  const path = location.pathname;
  if (!/^\/(?:[a-z-]+\/?)*$/.test(path)) return;
  const url = location.origin + path;
  try {
   if (navigator.share) await navigator.share({ title:document.title, url });
   else { await navigator.clipboard.writeText(url); setMessage(hi ? "टूल का लिंक कॉपी किया।" : "Tool link copied."); }
   trackEvent("tool_shared");
  } catch (error) { if (!(error instanceof Error && error.name === "AbortError")) setMessage(hi ? "ब्राउज़र से इस पेज का लिंक शेयर करें।" : "Use your browser to share this page link."); }
 }
 return <div className="share-tool"><button type="button" onClick={share}>{hi ? "टूल का लिंक शेयर करें" : "Share this tool"}</button><span role="status">{message}</span></div>;
}

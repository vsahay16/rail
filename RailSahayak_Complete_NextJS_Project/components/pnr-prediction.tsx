"use client";
import { useEffect, useRef, useState } from "react";
import { railRequest, railData } from "@/lib/rail-data";
import styles from "./journey-upgrade.module.css";
export function PnrPrediction({pnr,hi}:{pnr:string;hi:boolean}) {
 const [enabled,setEnabled]=useState(false),[busy,setBusy]=useState(false),[score,setScore]=useState<number|null>(null),[checked,setChecked]=useState(""),[failed,setFailed]=useState(false);const lock=useRef(false);
 useEffect(()=>{const c=new AbortController();fetch('/api/rail/capabilities',{signal:c.signal}).then(r=>r.json()).then(d=>setEnabled(d.prediction===true)).catch(()=>{});return()=>c.abort();},[]);
 async function check(){if(lock.current)return;lock.current=true;setBusy(true);setFailed(false);try{const r=await railRequest(new URLSearchParams({action:'prediction',pnr}));const d=railData(r.payload);if(!r.ok||typeof d.percentage!=='number'||d.percentage<0||d.percentage>100)throw Error();setScore(d.percentage);setChecked(new Date().toLocaleString(hi?'hi-IN':'en-IN',{timeZone:'Asia/Kolkata'}));}catch{setFailed(true);}finally{setBusy(false);lock.current=false;}}
 if(!enabled)return null;
 return <aside className={styles.panel}><h3>{hi?'कन्फर्म होने की अनुमानित संभावना':'Estimated confirmation probability'}</h3><p>{hi?'RailRadar का PNR-स्तर का अनुमान। यह हर यात्री का अलग स्कोर या यात्रा की अनुमति नहीं है।':'A PNR-level estimate from RailRadar, not an individual passenger score or permission to travel.'}</p>{score!==null?<><strong className={styles.score}>{score}%</strong><meter min={0} max={100} value={score} aria-label={hi?'अनुमानित संभावना':'Estimated probability'}/><p>{hi?'जाँचा गया':'Checked'}: {checked} IST</p><p>{hi?'अनुमान गलत हो सकता है। अंतिम यात्री स्थिति आधिकारिक रिकॉर्ड पर जाँचें।':'The estimate can be wrong. Verify final passenger status with the official railway record.'}</p></>:<button type="button" disabled={busy} onClick={check}>{busy?(hi?'जाँच रहे हैं…':'Checking…'):(hi?'अनुमान देखें':'Check estimate')}</button>}{failed&&<p role="status">{hi?'इस PNR के लिए अनुमान नहीं मिला। वर्तमान स्थिति ऊपर देखें।':'An estimate is unavailable for this PNR. Your current status remains available above.'}</p>}</aside>;
}

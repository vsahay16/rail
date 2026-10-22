"use client";
import { useRef, useState, type FormEvent } from "react";
import styles from "./journey-improvements.module.css";
export function PageFeedback({page,hi}:{page:string;hi:boolean}) {
 const t=(en:string,hindi:string)=>hi?hindi:en;
 const [busy,setBusy]=useState(false),[message,setMessage]=useState(""),[voted,setVoted]=useState(false),[reported,setReported]=useState(false);
 const lock=useRef(false);
 async function send(kind:"helpful"|"issue",value:string){
  if(lock.current)return;lock.current=true;setBusy(true);setMessage("");
  try {const response=await fetch("/api/feedback",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({page:hi?`/hi${page}`:page,kind,value}),signal:AbortSignal.timeout(10000)});
   if(!response.ok)throw new Error();if(kind==="helpful")setVoted(true);else setReported(true);
   setMessage(t("Thank you. Your feedback was recorded.","धन्यवाद। आपकी प्रतिक्रिया दर्ज हुई।"));
  }catch{setMessage(t("Could not send feedback. Please try later.","प्रतिक्रिया नहीं भेजी जा सकी। बाद में कोशिश करें।"));}finally{setBusy(false);lock.current=false;}
 }
 function report(event:FormEvent<HTMLFormElement>){event.preventDefault();void send("issue",String(new FormData(event.currentTarget).get("category")));}
 return <section className={styles.panel} aria-label={t("Page feedback","पेज पर प्रतिक्रिया")}><h2>{t("Was this explanation helpful?","क्या यह जानकारी उपयोगी थी?")}</h2><div className={styles.links}><button type="button" disabled={busy||voted} onClick={()=>void send("helpful","yes")}>{t("Yes","हाँ")}</button><button type="button" disabled={busy||voted} onClick={()=>void send("helpful","no")}>{t("No","नहीं")}</button></div><details><summary>{t("Report an issue with this page","इस पेज की समस्या बताएँ")}</summary><form onSubmit={report}><label>{t("Issue category","समस्या की श्रेणी")}<select name="category" disabled={busy||reported}><option value="unclear">{t("Explanation is unclear","जानकारी स्पष्ट नहीं है")}</option><option value="incorrect">{t("Information may be incorrect","जानकारी गलत हो सकती है")}</option><option value="broken">{t("Tool or link is not working","टूल या लिंक काम नहीं करता")}</option><option value="translation">{t("Translation or captions","अनुवाद या कैप्शन")}</option><option value="accessibility">{t("Display or accessibility","दिखावट या सुगम उपयोग")}</option></select></label><button disabled={busy||reported} type="submit">{t("Send issue report","समस्या भेजें")}</button></form></details><p><small>{t("Do not submit PNRs or passenger details. This form sends only this page’s path and your selected answer/category, without URL queries. It does not use visitor analytics or tracking cookies.","PNR या यात्री विवरण न भेजें। यह फॉर्म केवल पेज का पथ और चुना उत्तर/श्रेणी भेजता है, URL क्वेरी नहीं। यह विज़िटर एनालिटिक्स या ट्रैकिंग कुकी उपयोग नहीं करता।")}</small></p><p role="status">{message}</p></section>;
}

"use client";
import { useState, type FormEvent } from "react";
import { ShareTool } from "./share-tool";
import { trackEvent } from "@/lib/analytics";
import { LocalizedLink as Link } from "@/components/localized-link";
import { berthNames, berthProfiles, findBerth } from "@/lib/berth-layout";
import styles from "./berth-tools.module.css";

export function BerthTools({hi, finder}:{hi:boolean;finder:boolean}) {
 const [profileId,setProfileId]=useState("sl72");
 const [seat,setSeat]=useState("");
 const [selected,setSelected]=useState<number|null>(null);
 const [invalid,setInvalid]=useState(false);
 const profile=berthProfiles.find(p=>p.id===profileId);
 const result=profile && selected!==null ? findBerth(profileId,selected):null;
 function show(n:number){setSelected(n);const result=findBerth(profileId,n);setInvalid(!result);trackEvent("calculator_completed",{tool:finder?"seat-berth-finder":"coach-layout",outcome:result?"success":"error"});}
 function submit(e:FormEvent){e.preventDefault();show(Number(seat));}
 const text=(en:string,hindi:string)=>hi?hindi:en;
 const label=(code:string)=>berthNames[code][hi?1:0];
 const bayNumber=result?.bay??1;
 const bayStart=profile?(bayNumber-1)*profile.pattern.length:0;
 function chip(offset:number){if(!profile || bayStart+offset>profile.capacity)return null;const n=bayStart+offset;const code=profile.pattern[offset-1];return <div key={n} className={`${styles.berth} ${selected===n?styles.active:""}`} aria-label={`${n}: ${label(code)}${selected===n?text(" (selected)"," (चुनी हुई)"):""}`}><strong>{n}</strong>{code}</div>;}
 return <section className={styles.panel} aria-label={text("Coach layout and berth finder","कोच लेआउट और बर्थ खोज")}>
 <p>{finder?text("Enter an allocated berth number to check its type in a matching standard coach pattern.","आवंटित बर्थ नंबर भरकर मिलते सामान्य कोच पैटर्न में उसका प्रकार देखें।"):text("Compare the berth arrangement inside Sleeper, 3A and 2A coaches. Choose the pattern matching your coach.","स्लीपर, 3A और 2A कोच के अंदर बर्थ व्यवस्था समझें। अपने कोच से मिलता पैटर्न चुनें।")}</p>
 <form className={styles.form} onSubmit={submit}>
 <label>{text("Coach layout pattern","कोच लेआउट पैटर्न")}<select value={profileId} onChange={e=>{setProfileId(e.target.value);setSelected(null);setInvalid(false);}}>{berthProfiles.map(p=><option key={p.id} value={p.id}>{hi?p.hi:p.en}</option>)}<option value="other">{text("Other / unsure / CC / 2S / 1A / 3E","अन्य / निश्चित नहीं / CC / 2S / 1A / 3E")}</option></select></label>
 {profile && <><label>{text("Allocated berth number","आवंटित बर्थ नंबर")}<input inputMode="numeric" enterKeyHint="go" type="number" min="1" max={profile.capacity} step="1" required value={seat} onChange={e=>{setSeat(e.target.value);setSelected(null);setInvalid(false);}} /></label><button type="submit">{text("Find and highlight berth","बर्थ खोजें और दिखाएँ")}</button></>}
 </form>
 <p className={styles.note}>{text("Match the capacity and numbering with your actual coach. These are selected standard patterns, not every Indian Railways coach. No PNR is needed. WL/12 is a waiting position, not berth 12.","क्षमता और नंबरिंग अपने वास्तविक कोच से मिलाएँ। ये चुने सामान्य पैटर्न हैं, हर रेलवे कोच नहीं। PNR की जरूरत नहीं। WL/12 प्रतीक्षा क्रम है, बर्थ 12 नहीं।")}</p>
 {!profile?<div className={styles.result} role="status"><h2>{text("Check your coach-specific layout","अपने कोच का वास्तविक लेआउट देखें")}</h2><p>{text("Chair Car and Second Sitting numbering varies by design; a universal window-seat formula is unreliable. First AC cabin/coupe allocation and 3E or special layouts need their own map. Use your ticket, official chart or ask railway staff.","चेयर कार और सेकंड सिटिंग की नंबरिंग डिज़ाइन के अनुसार बदलती है; एक फॉर्मूले से विंडो सीट तय करना भरोसेमंद नहीं। प्रथम AC के केबिन/कूप आवंटन, 3E और विशेष कोच का अलग नक्शा जरूरी है। टिकट, आधिकारिक चार्ट या रेलवे कर्मचारी से पुष्टि करें।")}</p></div>:<>
 <div className={styles.examples}><span>{text("Try an example:","उदाहरण आज़माएँ:")}</span>{[1,7,8,15].map(n=><button type="button" key={n} onClick={()=>{setSeat(String(n));show(n);}}>{text("Berth","बर्थ")} {n}</button>)}</div>
 <div aria-live="polite">{invalid?<p role="alert">{text("Enter a whole berth number within the selected coach capacity.","चुने कोच की क्षमता के अंदर पूर्ण बर्थ संख्या भरें।")}</p>:result && <div className={styles.result}><h2>{selected} · {label(result.code)} ({result.code})</h2><p>{text("Expected type in this selected pattern. Your actual ticket allocation takes priority.","चुने पैटर्न में अनुमानित प्रकार। आपके टिकट का वास्तविक आवंटन मान्य है।")}</p></div>}</div>
 <div className={styles.bays}><section className={styles.bay}><h3>{text("Bay","खंड")} {bayNumber} · {text("numbering schematic","नंबरिंग का चित्र")}</h3><div className={styles.diagram}><div className={styles.main}>{(profile.pattern.length===8?[1,4,2,5,3,6]:[1,3,2,4]).map(chip)}</div><div className={styles.aisle}>{text("Aisle","गलियारा")}</div><div className={styles.side}>{(profile.pattern.length===8?[7,8]:[5,6]).map(chip)}</div></div><p className={styles.note}>{text("Berths are stacked vertically. This schematic is not to scale and does not show doors, toilets or travel direction.","बर्थ ऊँचाई में एक के ऊपर एक होती हैं। यह चित्र पैमाने पर नहीं है; दरवाज़े, शौचालय और यात्रा दिशा नहीं दिखाता।")}</p></section></div>
 <div className={styles.legend}>{Array.from(new Set(profile.pattern)).map(code=><span key={code}><strong>{code}</strong> = {label(code)}</span>)}</div>
 <table className={styles.table}><caption>{text("Worked examples for the selected pattern","चुने पैटर्न के उदाहरण")}</caption><thead><tr><th>{text("Number","नंबर")}</th><th>{text("Berth type","बर्थ प्रकार")}</th></tr></thead><tbody>{[1,7,8,15].map(n=><tr key={n}><td>{n}</td><td>{label(findBerth(profileId,n)!.code)}</td></tr>)}</tbody></table>
 </>}
 <p className={styles.note}>{text("SL in a berth label means Side Lower; SL as a travel class means Sleeper. This tool does not check vacancy, confirmation, coach position or berth entitlement.","बर्थ लेबल में SL का अर्थ साइड लोअर है; यात्रा श्रेणी में SL का अर्थ स्लीपर है। यह टूल खाली बर्थ, कन्फर्मेशन, कोच स्थिति या यात्रा का अधिकार नहीं जाँचता।")}</p>
 <nav className={styles.links} aria-label={text("Continue your journey check","यात्रा की अगली जाँच")}><Link href={finder?"/coach-layout":"/seat-berth-finder"}>{finder?text("Compare coach layouts","कोच लेआउट समझें"):text("Open berth finder","बर्थ खोज खोलें")}</Link><Link href="/coach-position">{text("Find coach position","कोच की स्थिति देखें")}</Link><Link href="/pnr-status">{text("Check allocated coach and berth","आवंटित कोच और बर्थ देखें")}</Link><Link href="/guides/train-classes-and-coaches">{text("Compare train classes","ट्रेन श्रेणियाँ समझें")}</Link><a href="https://www.irctc.co.in/" target="_blank" rel="noreferrer">{text("IRCTC: use Charts / Vacancy","IRCTC: चार्ट / वैकेंसी देखें")}</a></nav>
 {result && <ShareTool hi={hi} />}
 <p className={styles.note}>{text("Updated: 13 October 2026. Official reference:","अपडेट: 13 अक्टूबर 2026। आधिकारिक संदर्भ:")} <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=1566500" target="_blank" rel="noreferrer">{text("Railway chart and coach-layout facility","रेलवे चार्ट और कोच लेआउट सुविधा")}</a>. {text("This source explains the official facility, not certification of these illustrative patterns.","यह स्रोत आधिकारिक सुविधा समझाता है, इन उदाहरण पैटर्न का प्रमाणन नहीं है।")}</p>
 </section>;
}

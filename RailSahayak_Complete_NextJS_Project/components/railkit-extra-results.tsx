"use client";
import { useState } from "react";
import { record, rows, scalar, stationLabel, type RailRecord } from "@/lib/rail-data";
import { LocalizedLink as Link } from "./localized-link";
const facilities: Record<string,[string,string]> = {
  platforms:["Platform labels","प्लेटफॉर्म"],stationCategory:["Station category","स्टेशन श्रेणी"],wheelchairAvailable:["Wheelchair service listed","व्हीलचेयर सुविधा"],liftCount:["Lifts","लिफ्ट"],escalatorCount:["Escalators","एस्केलेटर"],toiletCount:["Toilets","शौचालय"],retiringRoomCount:["Retiring rooms","रिटायरिंग रूम"],waitingRoomSeatCount:["Waiting-room seats","प्रतीक्षालय सीटें"],footOverBridgeCount:["Foot overbridges","पैदल पुल"],foodPlazaAvailable:["Food plaza","फूड प्लाज़ा"],parkingAvailable:["Parking","पार्किंग"],waterFacilityCount:["Water facilities","पानी की सुविधाएँ"],enquiryOfficeCount:["Enquiry offices","पूछताछ कार्यालय"],electronicTrainDisplayAvailable:["Electronic train display","इलेक्ट्रॉनिक ट्रेन डिस्प्ले"]
};
export function RailkitExtraResults({slug,data,hi}:{slug:string;data:RailRecord;hi:boolean}) {
 const [filter,setFilter]=useState("");
 const trains=rows(data.trains), shown=trains.filter(t=>`${scalar(t.number)} ${scalar(t.name)}`.toLowerCase().includes(filter.trim().toLowerCase()));
 const value=(v:unknown)=>typeof v==="boolean" ? (v ? (hi?"हाँ":"Yes"):(hi?"नहीं":"No")) : scalar(v)||"—";
 return <div className="rail-provider-result" aria-live="polite">
 {slug==="station-facilities" ? <><h2>{scalar(data.station)} · {hi?"स्टेशन सुविधाएँ":"Station facilities"}</h2><p>{hi?"ये प्रदाता में दर्ज सुविधाएँ हैं। संख्या से आज उपलब्धता या चालू होने की पुष्टि नहीं होती। यात्रा से पहले स्टेशन से पूछें।":"These are provider-listed facilities. Counts do not confirm current availability or operating condition; check with the station before travelling."}</p><div className="rail-summary-grid">{Object.entries(facilities).map(([key,label])=><div className="rail-metric" key={key}><small>{label[hi?1:0]}</small><strong>{value(record(data.facilities)[key])}</strong></div>)}</div></>
 : slug==="train-history" ? <><h2>{scalar(data.trainNumber)} · {scalar(data.trainName)}</h2><p>{hi?"पूरी हुई यात्रा का रिकॉर्ड, लाइव स्थिति नहीं":"Completed journey record, not live status"} · {scalar(data.journeyDate)}</p><div className="rail-board-list">{rows(data.stations).map((s,i)=><article key={i}><div><b>{scalar(s.code)} · {scalar(s.name)}</b></div><div><small>{hi?"आगमन":"Arrival"}</small><b>{value(s.arrival)}</b></div><div><small>{hi?"प्रस्थान":"Departure"}</small><b>{value(s.departure)}</b></div><div><small>{hi?"दर्ज देरी":"Recorded delay"}</small><b>{value(s.delay)}</b></div><div><small>{hi?"उस यात्रा का प्लेटफॉर्म":"Recorded platform"}</small><b>{value(s.platform)}</b></div></article>)}</div></>
 : <>
 <h2>{slug==="station-timetable"?`${scalar(data.station)} · ${hi?"निर्धारित ट्रेनें":"Scheduled trains"}`:slug==="cancelled-trains"?(hi?"प्रदाता की रद्द ट्रेन सूची":"Provider cancellation list"):(hi?"ट्रेन खोज परिणाम":"Train search results")}</h2>
 {slug==="station-timetable" && <p>{hi?"यह निर्धारित समय-सारणी है, लाइव आगमन या प्लेटफॉर्म की पुष्टि नहीं।":"This is a scheduled timetable, not live arrivals or confirmed platforms."} {scalar(data.date) || (hi?"सभी निर्धारित दिन":"All scheduled days")}</p>}
 {slug==="cancelled-trains" && <p>{hi?"हर पंक्ति में यात्रा तारीख और रद्द हिस्सा जाँचें। सूची में नाम न होना ट्रेन चलने की पुष्टि नहीं है।":"Check each journey date and cancelled segment. Absence from this list does not confirm a train is running."}</p>}
 {slug==="train-search" && <p>{hi?"प्रदाता अधिकतम 10 मिलते-जुलते नाम या नंबर लौटाता है। समय-सारणी खोलकर सही ट्रेन चुनें।":"The provider returns up to 10 matching names or numbers. Open the timetable to confirm the correct train."}</p>}
 <label className="rail-list-filter">{hi?"परिणामों में नाम या नंबर खोजें":"Filter these results by name or number"}<input type="search" value={filter} onChange={e=>setFilter(e.target.value)} /></label>
 <p>{shown.length} / {trains.length} {hi?"लौटाए गए परिणाम":"returned results"}</p>
 {!shown.length && <p>{hi?"कोई मिलती पंक्ति नहीं मिली। फ़िल्टर और खोज जाँचें।":"No matching rows. Check your filter or search details."}</p>}
 <div className="rail-train-list">{shown.map((t,i)=><article key={`${scalar(t.number)}-${i}`}><div className="rail-train-title"><span>{scalar(t.number)}</span><h3>{scalar(t.name)}</h3></div>
 {slug==="station-timetable" && <><p>{scalar(t.source)} → {scalar(t.destination)}</p><p>{hi?"निर्धारित आगमन":"Scheduled arrival"}: {value(t.arrival)} · {hi?"प्रस्थान":"Departure"}: {value(t.departure)}</p><p>{hi?"श्रेणियाँ":"Classes"}: {value(t.classes)}</p></>}
 {slug==="cancelled-trains" && <><p><strong>{t.kind==="partial"?(hi?"आंशिक रद्द":"Partially cancelled"):(hi?"पूरी तरह रद्द":"Fully cancelled")}</strong> · {scalar(t.date)}</p><p>{t.kind==="partial"?`${stationLabel(record(t.segment).from)||"—"} → ${stationLabel(record(t.segment).to)||"—"}`:`${stationLabel(t.source)||"—"} → ${stationLabel(t.destination)||"—"}`}</p></>}
 {/^\d{5}$/.test(scalar(t.number)) && <Link className="route-seat-link" href={`/train-schedule?train=${scalar(t.number)}`}>{hi?"समय-सारणी देखें":"View timetable"}</Link>}
 </article>)}</div></>}
 </div>;
}

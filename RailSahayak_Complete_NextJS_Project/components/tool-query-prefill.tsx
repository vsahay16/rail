"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
/** Only this invisible helper suspends. The working form is server-rendered. */
export function ToolQueryPrefill({onPrefill}:{onPrefill:(query:URLSearchParams)=>void}) {
 const query=useSearchParams();
 useEffect(()=>{onPrefill(new URLSearchParams(query.toString()));},[query,onPrefill]);
 return null;
}

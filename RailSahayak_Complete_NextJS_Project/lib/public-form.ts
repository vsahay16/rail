import { NextRequest } from "next/server";
import { RailServiceError } from "./rail-server";
export async function readPublicForm(request:NextRequest) {
 const origin=request.headers.get("origin");
 let sameOrigin=false;try{if(origin){const parsed=new URL(origin);sameOrigin=["http:","https:"].includes(parsed.protocol)&&parsed.origin===origin&&parsed.host===request.headers.get("host");}}catch{/* Reject malformed origins. */}
 if(!sameOrigin || request.headers.get("sec-fetch-site")==="cross-site")throw new RailServiceError("INVALID_INPUT","Invalid request origin.",403,0);
 if(!request.headers.get("content-type")?.startsWith("application/json"))throw new RailServiceError("INVALID_INPUT","JSON required.",415,0);
 // Bound the stream before parsing, not just the declared content length.
 const reader=request.body?.getReader(); if(!reader)throw new RailServiceError("INVALID_INPUT","Body required.",400,0);
 let text="",bytes=0;const decoder=new TextDecoder();
 try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>1024){await reader.cancel();throw new RailServiceError("INVALID_INPUT","Body too large.",413,0);}text+=decoder.decode(value,{stream:true});}}finally{reader.releaseLock();}
 try{return JSON.parse(text+decoder.decode()) as unknown;}catch{throw new RailServiceError("INVALID_INPUT","Invalid JSON.",400,0);}
}

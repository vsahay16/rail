import { createHash,timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/rail-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow","Vary":"Authorization"};
export async function GET(request:NextRequest){
 const expected=process.env.RAILQ_ADMIN_TOKEN;
 const supplied=request.headers.get("authorization")??"";
 const hash=(value:string)=>createHash("sha256").update(value).digest();
 if(!expected || expected.length<32 || supplied.length>1024 || !timingSafeEqual(hash(supplied),hash(`Bearer ${expected}`)))return NextResponse.json({error:"Not authorised"},{status:401,headers});
 const quota=Number(process.env.RAILKIT_MONTHLY_QUOTA??0),reset=Number(process.env.RAILKIT_QUOTA_RESET_DAY??1);
 if(!Number.isInteger(quota)||quota<1||quota>10000000||!Number.isInteger(reset)||reset<1||reset>28)return NextResponse.json({error:"Check quota configuration"},{status:503,headers});
 try{const stats=await database("rpc/railkit_health_snapshot",{p_reset_day:reset});
 return NextResponse.json({provider:"RailKit",stats,quota,safetyLimit:Math.max(1,Math.floor(quota*.8)),providerConfigured:!!process.env.RAILKIT_API_KEY,note:"Operational request counts, not unique visitors. Includes validation errors and repeat searches. Success means a usable provider response, not ticket confirmation. Quota counts local reserved upstream attempts, including errors; reconcile with the provider account. No raw PNR, query, passenger data or visitor identifier is stored in these aggregates."},{headers});
 }catch{return NextResponse.json({error:"Monitoring storage unavailable. Check the SQL migration and server configuration."},{status:503,headers});}
}

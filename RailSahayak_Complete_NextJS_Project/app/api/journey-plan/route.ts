import { after,NextRequest,NextResponse } from "next/server";
import { fetchRailway,limitVisitor,recordHealth,RailServiceError } from "@/lib/rail-server";
import { readPublicForm } from "@/lib/public-form";
import { connectingOptions,railDateTime } from "@/lib/connecting-journeys";
export const runtime="nodejs";
export const maxDuration=30;
export async function POST(request:NextRequest){
 const start=performance.now();let outcome="SERVICE_UNAVAILABLE",cached=false;
 try{
 const body=await readPublicForm(request);
 if(!body||typeof body!=="object"||Array.isArray(body))throw new RailServiceError("INVALID_INPUT","Invalid journey request.",400,0);
 const data=body as Record<string,unknown>;
 const from=typeof data.from==="string"?data.from.trim().toUpperCase():"",to=typeof data.to==="string"?data.to.trim().toUpperCase():"",date=typeof data.date==="string"?data.date:"",minimum=data.minimum;
 if(Object.keys(data).some(k=>!["from","to","date","minimum"].includes(k))||!/^[A-Z0-9]{2,6}$/.test(from)||!/^[A-Z0-9]{2,6}$/.test(to)||from===to||railDateTime(date,"12:00")===null||typeof minimum!=="number"||![120,180,240].includes(minimum))throw new RailServiceError("INVALID_INPUT","Check stations, departure date and transfer time.",400,0);
 await limitVisitor(request,"journey");
 // Legacy planner request; unsupported by the current provider and rejected by the service guard.
 const payload=await fetchRailway("/journeys/plan","journey",{stops:[{station:from,date},{station:to}],maxTransfers:1});
 cached=payload.railq.cached===true;const result=connectingOptions(payload,from,to,date,minimum);outcome="SUCCESS";
 return NextResponse.json({success:true,...result,railq:payload.railq},{headers:{"Cache-Control":"no-store"}});
 }catch(error){const problem=error instanceof RailServiceError?error:new RailServiceError("SERVICE_UNAVAILABLE","The journey service is temporarily unavailable.");outcome=problem.code;
 return NextResponse.json({success:false,code:problem.code,error:{code:problem.code,message:problem.message}},{status:problem.status,headers:{"Cache-Control":"no-store",...(problem.retryAfter?{"Retry-After":String(problem.retryAfter)}:{})}});
 }finally{const duration=performance.now()-start;after(()=>recordHealth("journey",outcome,duration,cached));}
}

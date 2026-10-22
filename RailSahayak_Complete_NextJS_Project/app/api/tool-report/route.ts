import { NextRequest, NextResponse } from "next/server";
import { database,limitPublicForm,RailServiceError } from "@/lib/rail-server";
import { reportTools,reportCodes } from "@/lib/feedback-validation";
import { readPublicForm } from "@/lib/public-form";
export const runtime="nodejs";
export async function POST(request:NextRequest){
 try{const body=await readPublicForm(request);if(!body||typeof body!=="object"||Array.isArray(body))throw new RailServiceError("INVALID_INPUT","Invalid report.",400,0);
 const data=body as Record<string,unknown>;
 if(Object.keys(data).some(k=>!["tool","code"].includes(k))||typeof data.tool!=="string"||!reportTools.has(data.tool)||typeof data.code!=="string"||!reportCodes.has(data.code))throw new RailServiceError("INVALID_INPUT","Invalid report.",400,0);
 await limitPublicForm(request);await database("railq_tool_reports",{tool:data.tool,code:data.code});
 return NextResponse.json({success:true},{headers:{"Cache-Control":"no-store"}});
 }catch(error){return NextResponse.json({success:false},{status:error instanceof RailServiceError?error.status:503,headers:{"Cache-Control":"no-store"}});}
}

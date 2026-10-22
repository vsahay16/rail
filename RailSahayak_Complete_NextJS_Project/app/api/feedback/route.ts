import { NextRequest, NextResponse } from "next/server";
import { database,limitPublicForm,RailServiceError } from "@/lib/rail-server";
import { feedbackInput } from "@/lib/feedback-validation";
import { readPublicForm } from "@/lib/public-form";
export const runtime="nodejs";
export async function POST(request:NextRequest){
 try{const input=feedbackInput(await readPublicForm(request));if(!input)throw new RailServiceError("INVALID_INPUT","Invalid feedback.",400,0);
 await limitPublicForm(request);await database("rpc/railq_record_feedback",{p_page:input.page,p_kind:input.kind,p_value:input.value});
 return NextResponse.json({success:true},{headers:{"Cache-Control":"no-store"}});
 }catch(error){return NextResponse.json({success:false},{status:error instanceof RailServiceError?error.status:503,headers:{"Cache-Control":"no-store"}});}
}

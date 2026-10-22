import { toolConfigs } from "./tool-registry";
import { guides } from "./guide-registry";
const pages = new Set([...toolConfigs.map(t=>`/${t.slug}`),...guides.map(g=>`/guides/${g.slug}`),"/connecting-trains"]);
export function feedbackInput(body:unknown) {
 if(!body || typeof body!=="object" || Array.isArray(body))return null;
 const data=body as Record<string,unknown>;
 if(Object.keys(data).some(k=>!["page","kind","value"].includes(k)))return null;
 const {page,kind,value}=data;
 if(typeof page!=="string"||typeof value!=="string"||!pages.has(page.replace(/^\/hi(?=\/)/,"")))return null;
 if(kind==="helpful" && !["yes","no"].includes(value))return null;
 if(kind==="issue" && !["unclear","incorrect","broken","translation","accessibility"].includes(value))return null;
 if(kind!=="helpful"&&kind!=="issue")return null;
 return {page,kind,value};
}
export const reportTools=new Set([...toolConfigs.map(t=>t.slug),"connecting-trains"]);
export const reportCodes=new Set(["DISPLAY_ISSUE","NETWORK_ERROR","PROVIDER_ERROR","INVALID_INPUT","RATE_LIMITED","API_BUDGET_REACHED","API_BURST_LIMIT","PROTECTION_UNAVAILABLE","PROVIDER_NOT_CONFIGURED","PROVIDER_UNAVAILABLE","NOT_FOUND","SERVICE_UNAVAILABLE","PREDICTION_DISABLED","PREDICTION_UNAVAILABLE","POST_REQUIRED"]);

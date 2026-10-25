import { toolConfigs } from "./tool-registry";
export const analyticsEvents=new Set(["tool_page_view","homepage_view","search_tab_selected","tool_completed","live_tool_submitted","live_tool_result","tool_card_clicked","journey_cta_clicked","calculator_completed","calendar_reminder_downloaded","pnr_prediction_requested","pnr_prediction_result","language_changed","ad_slot_view","dynamic_rail_page_loaded","pnr_page_view","pnr_validation_error","pnr_lookup_submitted","pnr_lookup_result","journey_plan_requested","journey_plan_result","journey_dashboard_loaded"]);
const allowed:Record<string,Set<string>>={
 language:new Set(["en","hi"]),tool:new Set([...toolConfigs.flatMap(t=>[t.slug,t.title]),"pnr","live","between","schedule","availability","fare","booking","booking_date"]),
 tab:new Set(["pnr","live","between","schedule","availability","fare","booking"]),
 outcome:new Set(["success","warning","error","empty","unavailable","not_configured","network_error","provider_not_configured","provider_error","incomplete"]),
 reason:new Set(["invalid_length"]),mode:new Set(["pnr","train","station","route"]),placement:new Set(["top","square","bottom"]),format:new Set(["970 × 90 / 320 × 100","300 × 250","Responsive","728 × 90"])
};
export function safeAnalyticsProperties(input:unknown){
 if(!input||typeof input!=="object"||Array.isArray(input))return {};
 const result:Record<string,string|number|boolean>={};
 for(const [key,value] of Object.entries(input)){
 if(typeof value==="string"&&allowed[key]?.has(value))result[key]=value;
 if(key==="configured"&&typeof value==="boolean")result[key]=value;
 if(key==="live_sources"&&typeof value==="number"&&Number.isInteger(value)&&value>=0&&value<=4)result[key]=value;
 }return result;
}
// No query, fragment or numeric identifier is accepted into page analytics.
export function safeAnalyticsPath(value:unknown){return typeof value==="string"&&value.length<=180&&/^\/(?:[a-z-]+\/?)*$/.test(value)?value:"/tools";}

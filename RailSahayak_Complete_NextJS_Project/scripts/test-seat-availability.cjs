/* eslint-disable @typescript-eslint/no-require-imports -- Isolated Node fixture harness; no live credentials or quota. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const root = path.resolve(__dirname,'..');
const fixture = JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/seat-availability.json'),'utf8'));
const endpoint = '/trains/15743/seats?source=PNBE&destination=DLI&journeyDate=2026-11-02&classCode=3A&quotaCode=GN';
let calls=0, reservations=0, status=200, payload=fixture, retryAfter, fetchDelay=0, simulatedMetadata=null;
const cache=new Map(), modules=new Map();
const pnr={success:true,data:{train:{number:'12345',name:'Synthetic test'},journey:{class:'3A'},passengers:[{current:{status:'WL',details:'WL/7'},booking:{status:'WL',details:'WL/9'}}]}};
const sdk={configure(){},async checkPNRStatus(){return pnr;}};
function load(file) {
 let filename=path.resolve(root,file);
 if(!fs.existsSync(filename)) filename += fs.existsSync(filename+'.ts')?'.ts':'.tsx';
 if(modules.has(filename))return modules.get(filename).exports;
 const entry={exports:{}}; modules.set(filename,entry);
 const js=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const req=id=>id==='railkit'?sdk:id.endsWith('.css')?new Proxy({},{get:(_,key)=>key==='default'?{}:String(key)}):id.startsWith('@/')?load(id.slice(2)):id.startsWith('./')?load(path.resolve(path.dirname(filename),id)):require(id);
 const fetch=async(url,options)=>{
   if(url.includes('rail_api_cache')) {
     const key=new URL(url).searchParams.get('cache_key')?.replace('eq.','');
     if(options.body) {const row=JSON.parse(options.body);cache.set(row.cache_key,row);return new Response(null,{status:204});}
     const row=cache.get(key);
     return new Response(JSON.stringify(row?[row]:simulatedMetadata?[{payload:simulatedMetadata}]:[]));
   }
   if(url.includes('railkit_api_reserve')) {reservations++;return new Response('{"allowed":true}');}
   assert.ok(url.startsWith('https://api.railkit.in/api/v1/seats/'));assert.equal(options.headers['x-api-key'],'fixture-key');assert.ok(options.signal);calls++;
   if(fetchDelay)await new Promise(r=>setTimeout(r,fetchDelay));
   return new Response(JSON.stringify(payload),{status,headers:retryAfter?{'retry-after':retryAfter}:{}});
 };
 vm.runInNewContext(`(function(require,module,exports,process,fetch,URL,URLSearchParams,AbortSignal,Response,console){${js}\n})`,{})(req,entry,entry.exports,process,fetch,URL,URLSearchParams,AbortSignal,Response,console);
 return entry.exports;
}
(async()=>{
 const model=load('lib/seat-availability.ts');
 const {normalizeRailkit,railkitRequest}=load('lib/railkit-provider.ts');
 const {AvailabilityCalendar}=load('components/availability-calendar.tsx');
 const render=(days,requestedDate='2026-11-02',hi=false,cached=false)=>renderToStaticMarkup(React.createElement(AvailabilityCalendar,{data:{calendar:days,requestedDate},hi,cached,fetchedAt:'2026-10-31T01:02:03.000Z'}));
 const d=normalizeRailkit('availability',fixture,endpoint).data;
 assert.equal(d.requestedDate,'2026-11-02');assert.equal(d.calendar[1].date,'2026-11-02');assert.equal(d.calendar[1].status,'WL 14');assert.equal(d.calendar[1].waitlistType,'RLWL');assert.equal(d.quotaCode,'GN');assert.equal(d.calendar[1].rawStatus,'RLWL16/WL14');
 let html=render(d.calendar);assert.match(html,/Provider estimate.*84%/);assert.match(html,/WL 14.*RLWL/);assert.match(html,/Additional provider date/);assert.equal((html.match(/>Requested date</g)||[]).length,1);assert.match(html,/Booking unavailable/);assert.doesNotMatch(render([d.calendar[0]]),/0%/);
 const av=model.normalizeSeatDay({date:'4-11-2026',status:'AVAILABLE',availabilityText:'AVL 306',rawStatus:'AVAILABLE-0306',predictionPercentage:100,canBook:true});
 assert.equal(av.seats,306);assert.match(render([av]),/306 seats available/);assert.doesNotMatch(render([av]),/100%|guaranteed confirmation/);
 assert.equal(model.normalizeSeatDay({status:'AVAILABLE',availabilityText:'Available seats'}).seats,null);
 const wait={date:'2-11-2026',status:'WAITLIST',availabilityText:'WL 14',rawStatus:'RLWL16/WL14',canBook:true};
 for(const percentage of [0,1,84,85,100]) assert.match(render([model.normalizeSeatDay({...wait,predictionPercentage:percentage})]),new RegExp(`>${percentage}%<`));
 for(const percentage of [undefined,null,'', '84',NaN,Infinity,-1,101,{},false]) assert.doesNotMatch(render([model.normalizeSeatDay({...wait,predictionPercentage:percentage,prediction:'84% Chance'})]),/Provider estimate:/);
 assert.equal(model.normalizeSeatDay({...wait,rawStatus:'WL14'}).waitlistType,'');
 const rac=model.normalizeSeatDay({...wait,status:'RAC',availabilityText:'RAC 6',predictionPercentage:95});assert.equal(rac.kind,'rac');assert.match(render([rac]),/RAC 6/);assert.match(render([rac]),/not a confirmed full berth/);assert.doesNotMatch(render([rac]),/95%/);
 assert.match(render(d.calendar, '2026-11-03'),/No result was returned for the requested date/);
 assert.match(render([], '2026-11-03'),/does not mean the train is sold out/);
 assert.match(render(d.calendar,'2026-11-02',true),/प्रदाता का अनुमान/);
 assert.equal(model.parseJourneyDate('2-11-2026'),'2026-11-02');assert.equal(model.railkitDate('2026-11-02'),'02-11-2026');
 for(const invalid of ['31-2-2026','2026-02-29','2026-13-01','0-11-2026','2/11/2026'])assert.equal(model.parseJourneyDate(invalid),null);
 assert.equal(model.parseJourneyDate('29-2-2028'),'2028-02-29');assert.equal(model.todayInIndia(new Date('2026-10-30T19:00:00Z')),'2026-10-31');
 const input=new URLSearchParams({train:'15743',from:' pnbe ',to:'dli',date:'2026-11-02',class:'3a',quota:'gn'});assert.equal(model.seatInputProblem(input,new Date('2026-10-31T00:00:00Z')),null);assert.equal(input.get('from'),'PNBE');input.set('to','PNBE');assert.ok(model.seatInputProblem(input));
 const meta={number:'22349',classes:['CC','EC'],runDays:[],route:[]};assert.ok(model.metadataProblem(new URLSearchParams({train:'22349',class:'3A'}),meta));assert.equal(model.metadataProblem(new URLSearchParams({train:'22349',class:'CC'}),meta),null);
 const monday={number:'15743',classes:[],runDays:['Mon'],route:[{station:{code:'PNBE'},departureDay:'2'}]};assert.equal(model.metadataProblem(new URLSearchParams({train:'15743',from:'PNBE',date:'2026-11-03'}),monday),null);assert.ok(model.metadataProblem(new URLSearchParams({train:'15743',from:'PNBE',date:'2026-11-04'}),monday));
 assert.match(railkitRequest(endpoint,'availability').path,/\/02-11-2026\/3A\/GN$/);
 Object.assign(process.env,{SUPABASE_URL:'https://fixture.invalid',SUPABASE_SERVICE_ROLE_KEY:'fixture-only',RAILKIT_API_KEY:'fixture-key',RAILKIT_ENABLED:'true',RAILKIT_MONTHLY_QUOTA:'10000',RAILKIT_BURST_LIMIT:'50',RAILKIT_TRANSPORT:'sdk'});
 const {fetchRailway}=load('lib/rail-server.ts');
 const first=await fetchRailway(endpoint,'availability');assert.equal(first.railq.cacheSeconds,120);assert.equal(first.railq.cached,false);assert.equal(calls,1);
 const second=await fetchRailway(endpoint,'availability');assert.equal(second.railq.fetchedAt,first.railq.fetchedAt);assert.equal(second.railq.cached,true);assert.equal(calls,1);assert.equal(reservations,1);assert.match(render(second.data.calendar,second.data.requestedDate,false,true),/Cached result/);
 cache.clear();fetchDelay=10;const before=calls;await Promise.all([fetchRailway(endpoint,'availability'),fetchRailway(endpoint,'availability')]);assert.equal(calls,before+1);fetchDelay=0;
 for(const [http,error] of [[400,'INVALID_INPUT'],[403,'PROVIDER_AUTH_ERROR'],[429,'API_BURST_LIMIT'],[500,'PROVIDER_UNAVAILABLE']]) {cache.clear();status=http;retryAfter='180';payload={success:false,error:'DO_NOT_EXPOSE'};const n=calls;await assert.rejects(fetchRailway(endpoint,'availability'),e=>e.code===error&&!e.message.includes('DO_NOT_EXPOSE')&&(http!==429||e.retryAfter===180));assert.equal(calls,n+1);assert.equal(cache.size,0);}
 status=200;payload={success:false};await assert.rejects(fetchRailway(endpoint,'availability'));assert.equal(cache.size,0);
 payload={success:true,data:{}};await assert.rejects(fetchRailway(endpoint,'availability'));assert.equal(cache.size,0);
 assert.equal((await fetchRailway('/pnr/0000000000','pnr')).data.passengers[0].current.formatted,'WL/7');
 assert.equal(cache.size,0);
 console.log('PASS: statuses, percentages, EN/HI rendered cards, explicit dates, request context, metadata constraints, auth, retry-after, cache timestamp, in-flight dedupe, errors and PNR isolation. All fixtures; zero live calls.');
})().catch(e=>{console.error(e);process.exitCode=1});

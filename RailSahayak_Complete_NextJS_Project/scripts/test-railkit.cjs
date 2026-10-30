/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness transpiles TypeScript without adding a test dependency. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let upstream = 0, budget = 0, allowed = true, httpStatus = 200, responseData;
const sdk = new Proxy({}, {get: (_, name) => name === 'configure' ? () => {} : async () => { upstream++; return responseData; }});
const modules = new Map();
function load(file) {
 file = path.resolve(root, file);
 if (modules.has(file)) return modules.get(file).exports;
 const loadedModule = { exports: {} }; modules.set(file, loadedModule);
 const code = ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const req = id => id === 'railkit' ? sdk : id.startsWith('@/') ? load(id.slice(2)+'.ts') : id.startsWith('./') ? load(path.resolve(path.dirname(file),id)+'.ts') : require(id);
 const fetch = async (url, options) => {
   if (url.includes('/rpc/railkit_api_reserve')) {budget++; assert.equal(JSON.parse(options.body).p_limit,80); return new Response(JSON.stringify({allowed,reason:'API_BUDGET_REACHED'}));}
   if (url.includes('/rpc/rail_api_reserve')) throw Error('Old provider budget used');
   if (url.includes('rail_api_cache')) return new Response('[]');
   if (url.startsWith('https://api.railkit.in/')) {upstream++; assert.equal(options.headers['x-api-key'],'test-only-key'); assert.equal(options.headers.authorization,undefined); return new Response(JSON.stringify(responseData),{status:httpStatus});}
   throw Error('Unexpected request');
 };
 vm.runInNewContext(`(function(require,module,exports,process,fetch,URL,URLSearchParams,AbortSignal,Response){${code}\n})`, {})(req,loadedModule,loadedModule.exports,process,fetch,URL,URLSearchParams,AbortSignal,Response);
 return loadedModule.exports;
}
(async () => {
 const {railkitRequest: request, normalizeRailkit: norm} = load('lib/railkit-provider.ts');
 const {pnrSummary} = load('lib/rail-data.ts');
 const endpoint='/pnr/0000000000';
 const fixture={success:true,data:{train:{number:'12345',name:'Fixture train'},journey:{dateOfJourney:'Oct 31, 2026 4:40:00 AM',class:'3A',boardingPoint:{code:'AAA'},destination:{code:'BBB'}},chart:{status:'Chart Not Prepared'},passengers:[{booking:{status:'WL',details:'WL/9'},current:{status:'WL',details:'WL/7',berthNo:7}}]}};
 const p = pnrSummary(norm('pnr',fixture,endpoint));
 assert.equal(p.trainNumber,'12345');assert.equal(p.travelClass,'3A');assert.equal(p.passengers[0].current,'WL/7'); assert.equal(p.fromCode,'AAA'); assert.equal(p.toCode,'BBB');assert.ok(p.journeyDate);
 assert.throws(()=>norm('pnr',{success:true,data:{}},endpoint));
 const between=norm('between',{success:true,data:[{train_no:'12345',train_name:'Fixture',from_stn_code:'AAA',to_stn_code:'BBB',travel_time:'04:35 hrs',running_days:'1111111'}]},'/trains/between/AAA/BBB');
 assert.equal(between.data.trains[0].train.number,'12345');assert.equal(between.data.trains[0].duration,275);
 assert.equal(norm('between',{success:true,data:[]},'/trains/between/AAA/BBB').data.count,0);
 assert.equal(request('/trains/12345/seats?source=AAA&destination=BBB&journeyDate=2026-11-02&classCode=3A&quotaCode=GN','availability').path,'/api/v1/seats/12345/AAA/BBB/02-11-2026/3A/GN');
 assert.equal(request('/trains/12345/fare?source=AAA&destination=BBB&journeyDate=2026-11-02&classCode=3A&quotaCode=GN','fare').path,'/api/v1/fare/12345/02-11-2026/AAA/BBB/3A/GN');
 assert.equal(request('/trains/12345','schedule').path,'/api/v1/trains/12345/info');
 assert.equal(request('/stations/NDLS/live?hours=8','station').path,'/api/v1/stations/NDLS/live?hrs=8');
 const av=norm('availability',{success:true,data:{train:{trainNo:'12345',travelClass:'3A'},availability:[{date:'2-11-2026',availabilityText:'WL 7',predictionPercentage:99}]}},'/trains/12345/seats?source=AAA&destination=BBB&journeyDate=2026-11-02&classCode=3A&quotaCode=GN');
 assert.equal(av.data.calendar[0].status,'WL 7');assert.equal(av.data.calendar[0].predictionPercentage,undefined);
 const fare=norm('fare',{success:true,data:{trainNo:'12345',totalFare:1200,baseFare:1100}},'/trains/12345/fare?source=AAA&destination=BBB&journeyDate=2026-11-02&classCode=3A&quotaCode=GN');assert.equal(fare.data.breakdown.totalFare,1200);
 const schedule=norm('schedule',{success:true,data:{trainInfo:{train_no:'12345',train_name:'Fixture'},route:[{stnCode:'AAA',stnName:'First',departure:'10:00',day:'1'}]}},'/trains/12345');assert.equal(schedule.data.route[0].station.code,'AAA');
 const live=norm('live',{success:true,data:{trainNo:'12345',statusNote:'Arrived',currentStationCode:'AAA',timeline:[{stationCode:'AAA',type:'stoppage'},{stationCode:'BBB',type:'stoppage'}]}},'/trains/12345/live?date=2026-10-31');assert.equal(live.data.nextHalt.stationCode,'BBB');assert.equal(live.data.delayMinutes,null);
 const board=norm('station',{success:true,data:{trains:[{trainNo:'12345',trainName:'Fixture',platform:'2',arrival:{actual:'11:00'}}]}},'/stations/AAA/live?hours=4');assert.equal(board.data.trains[0].live.platform,'2');
 const {fetchRailway} = load('lib/rail-server.ts');
 Object.assign(process.env,{SUPABASE_URL:'https://test.invalid',SUPABASE_SERVICE_ROLE_KEY:'test-only',RAILKIT_API_KEY:'test-only-key',RAILKIT_MONTHLY_QUOTA:'100',RAILKIT_BURST_LIMIT:'10',RAILKIT_TRANSPORT:'rest'});
 const fail=async(code, action='pnr')=>assert.rejects(fetchRailway(endpoint,action), e=>e.code===code);
 await fail('SERVICE_PAUSED');assert.equal(upstream,0);
 process.env.RAILKIT_ENABLED='true';await fail('PREDICTION_DISABLED','prediction');await fail('TOOL_UNAVAILABLE','journey');assert.equal(budget,0);
 allowed=false;await fail('API_BUDGET_REACHED');assert.equal(upstream,0);allowed=true;
 for (const [status,code] of [[403,'PROVIDER_AUTH_ERROR'],[429,'API_BURST_LIMIT'],[404,'NOT_FOUND'],[500,'PROVIDER_UNAVAILABLE']]) {httpStatus=status;responseData={success:false,error:'private provider detail'};await fail(code);}
 httpStatus=200;responseData=fixture; const r=await fetchRailway(endpoint,'pnr');assert.equal(r.success,true);assert.equal(r.railq.cacheSeconds,0);assert.equal(r.data.pnr,undefined);
 responseData={success:true,data:{}};await fail('PROVIDER_UNAVAILABLE');
 process.env.RAILKIT_TRANSPORT='sdk';responseData=fixture;assert.equal((await fetchRailway(endpoint,'pnr')).success,true);
 console.log('RailKit adapters, transport auth, pause, unsupported actions, quotas, provider errors and PNR privacy: passed (mock responses; no live lookups).');
})().catch(e=>{console.error(e);process.exitCode=1;});

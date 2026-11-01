/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness transpiles TypeScript without adding a test dependency. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let lastSdk='',lastArgs=[];
let upstream = 0, budget = 0, allowed = true, httpStatus = 200, responseData;
const sdk = new Proxy({}, {get: (_, name) => name === 'configure' ? () => {} : async (...args) => { lastSdk=name;lastArgs=args;upstream++; return responseData; }});
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
 const {coachOrPlatform,platformValue,extraInputProblem}=load('lib/railkit-tools.ts');
 const fixtureFile=name=>JSON.parse(fs.readFileSync(path.join(root,'scripts/fixtures/railkit-'+name+'.json'),'utf8'));
 const tracked=norm('live',fixtureFile('live-tracking'),'/trains/12345/live?date=2026-10-17');
 assert.equal(tracked.data.coaches[0].code,'HA1');assert.equal(tracked.data.coaches[0].stockNumber,'194544');assert.equal(tracked.data.coaches[0].position,'4');
 assert.equal(coachOrPlatform(tracked,'platform','HWH').data.station.platform,'15');
 assert.equal(coachOrPlatform(tracked,'platform','SYAE').data.stationFound,false); // intermediate point is not a halt
 assert.equal(coachOrPlatform(tracked,'platform','UNKNOWN').data.station.platform,'');
 for(const value of [null,undefined,'','0','--','TBA'])assert.equal(platformValue(value),'');
 const v2=norm('live-v2',fixtureFile('live-tracking-v2'),'/trains/20888/live-v2?date=2026-09-12');
 assert.equal(v2.data.train.number,'20888');assert.equal(v2.data.coaches[0].code,'C7');assert.equal(v2.data.coaches[0].position,undefined);assert.equal(v2.data.currentLocation.code,'BSB');
 const table=norm('timetable',fixtureFile('station-timetable'),'/stations/ASN/timetable');assert.equal(table.data.trains[0].arrival,'00:01');assert.equal(table.data.trains[0].destination,'Kolkatta Terminal');assert.equal(table.data.trains[0].platform,undefined);
 const history=norm('history',fixtureFile('train-history'),'/trains/12301/history?date=2026-06-11');assert.equal(history.data.stations[1].platform,'4');
 const cancelled=norm('cancelled',fixtureFile('cancelled-trains'),'/trains/cancelled');assert.equal(cancelled.data.trains.length,2);assert.equal(cancelled.data.trains[1].kind,'partial');assert.equal(cancelled.data.trains[1].segment.from.code,'DR');
 const amenities=norm('amenities',fixtureFile('station-amenities'),'/stations/ASN/amenities');assert.equal(amenities.data.facilities.wheelchairAvailable,true);assert.equal(amenities.data.facilities.liftCount,2);
 const search=norm('train-search',fixtureFile('train-name-search'),'/trains/search?query=rajdhani');assert.equal(search.data.trains[0].number,'12301');
 const many=norm('between',{success:true,data:Array.from({length:132},(_,i)=>({train_no:String(10000+i),from_stn_code:'ANVT',to_stn_code:'CNB'}))},'/trains/between/NDLS/CNB');assert.equal(many.data.count,132);assert.equal(many.data.includesNearby,true);assert.equal(many.data.trains[0].from.code,'ANVT');
 const now=new Date('2026-10-30T19:00:00Z'); // 31st in India
 assert.equal(extraInputProblem('coach',new URLSearchParams({date:'2026-10-31'}),now),null);
 for(const date of ['2026-11-01','2026-10-25','2026-02-30',''])assert.ok(extraInputProblem('coach',new URLSearchParams({date}),now));
 assert.equal(extraInputProblem('timetable',new URLSearchParams(),now),null);assert.equal(extraInputProblem('timetable',new URLSearchParams({date:'2026-11-01'}),now),null);assert.ok(extraInputProblem('timetable',new URLSearchParams({date:'2026-11-02'}),now));
 assert.ok(extraInputProblem('train-search',new URLSearchParams({query:'<script>'}),now));
 for(const [action,endpoint,method,args] of [
 ['live-v2','/trains/20888/live-v2?date=2026-10-31','trackTrainV2',['20888','31-10-2026']],
 ['timetable','/stations/ASN/timetable','trainTimetableAtStation',['ASN',undefined]],
 ['amenities','/stations/ASN/amenities','stationAmenities',['ASN']],
 ['cancelled','/trains/cancelled','cancelList',[]],
 ['history','/trains/12301/history?date=2026-10-30','getTrainHistory',['12301','30-10-2026']],
 ['train-search','/trains/search?query=rajdhani','trainsByName',['rajdhani']],
 ['train-search','/trains/search?query=123','trainByNumber',['123']],
 ['availability','/trains/12345/seats?source=AAA&destination=BBB&journeyDate=2026-11-02&classCode=3A&quotaCode=GN','getAvailability',['12345','AAA','BBB','02-11-2026','3A','GN']]]) {
 process.env.RAILKIT_TRANSPORT='sdk';responseData={success:true,data:{}};await load('lib/railkit-provider.ts').callRailkit(endpoint,action,'fixture');assert.equal(lastSdk,method);assert.equal(JSON.stringify(lastArgs),JSON.stringify(args));
 }
 upstream=0;
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
 responseData=fixtureFile('live-tracking'); const before=upstream;
 const [coach,platform]=await Promise.all([fetchRailway('/trains/12345/coaches?date=2026-10-17','coach'),fetchRailway('/trains/12345/platform?station=HWH&date=2026-10-17','platform')]);
 assert.equal(upstream,before+1);assert.equal(coach.data.rake[0].code,'HA1');assert.equal(platform.data.station.platform,'15');assert.equal(coach.railq.fetchedAt,platform.railq.fetchedAt);assert.equal(platform.railq.cacheSeconds,45);
 console.log('PASS: RailKit public tools, SDK dispatch, explicit dates, 132 train rows, nearby stations, coach/platform shared lookup, missing fields, errors, quotas and PNR privacy. All fixtures; no live provider calls.');
})().catch(e=>{console.error(e);process.exitCode=1;});

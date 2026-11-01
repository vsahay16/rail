/* eslint-disable @typescript-eslint/no-require-imports -- Local Playwright fixture checks, never provider calls. */
const {spawn}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'), modules=new Map();
function load(file){const filename=path.resolve(root,file.endsWith('.ts')?file:file+'.ts');if(modules.has(filename))return modules.get(filename).exports;const m={exports:{}};modules.set(filename,m);const js=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const req=id=>id==='railkit'?{}:id.startsWith('@/')?load(id.slice(2)):id.startsWith('./')?load(path.resolve(path.dirname(filename),id)):require(id);vm.runInNewContext(`(function(require,module,exports,URL,URLSearchParams,AbortSignal,process){${js}\n})`,{})(req,m,m.exports,URL,URLSearchParams,AbortSignal,process);return m.exports;}
const {normalizeRailkit}=load('lib/railkit-provider');const {coachOrPlatform}=load('lib/railkit-tools');
const fixture=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/railkit-'+n+'.json'),'utf8'));
const live=normalizeRailkit('live',fixture('live-tracking'),'/trains/12345/live?date=2026-10-17');
const between=normalizeRailkit('between',{success:true,data:Array.from({length:132},(_,i)=>({train_no:String(10000+i),train_name:'Test '+i,from_stn_code:i?'NDLS':'ANVT',to_stn_code:'CNB',from_time:'10:00',to_time:'15:00'}))},'/trains/between/NDLS/CNB');
const byAction={coach:coachOrPlatform(live,'coach',''),platform:coachOrPlatform(live,'platform','HWH'),between,
 timetable:normalizeRailkit('timetable',fixture('station-timetable'),'/stations/ASN/timetable'),amenities:normalizeRailkit('amenities',fixture('station-amenities'),'/stations/ASN/amenities'),cancelled:normalizeRailkit('cancelled',fixture('cancelled-trains'),'/trains/cancelled'),history:normalizeRailkit('history',fixture('train-history'),'/trains/12301/history?date=2026-06-11'),'train-search':normalizeRailkit('train-search',fixture('train-name-search'),'/trains/search?query=rajdhani'),'live-v2':normalizeRailkit('live-v2',fixture('live-tracking-v2'),'/trains/20888/live-v2?date=2026-09-12')};
const cases=[['trains-between-stations',{from:'NDLS',to:'CNB'},'between'],['coach-position',{train:'12345'},'coach'],['platform-number',{train:'12345',station:'HWH'},'platform'],['station-timetable',{station:'ASN'},'timetable'],['station-facilities',{station:'ASN'},'amenities'],['cancelled-trains',{},'cancelled'],['train-history',{train:'12301',date:'2026-06-11'},'history'],['train-search',{query:'rajdhani'},'train-search'],['live-train-status',{train:'20888',source:'v2'},'live-v2']];
const port='3219', server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p',port],{cwd:root,stdio:'ignore'});
(async()=>{let browser;try{for(let i=0;i<50;i++){try{await fetch(`http://127.0.0.1:${port}/`,{signal:AbortSignal.timeout(800)});break;}catch{await new Promise(r=>setTimeout(r,200));}}
browser=await chromium.launch({headless:true,args:['--no-sandbox']});for(const [hi,width]of [[false,390],[true,1280]]){for(const [slug,fields,action]of cases){const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));let calls=0;
await page.route('**/api/**',async r=>{const u=new URL(r.request().url());if(u.pathname==='/api/rail'){calls++;const a=u.searchParams.get('action');assert.equal(a,action);return r.fulfill({json:{...byAction[a],railq:{cached:true,fetchedAt:'2026-10-31T01:02:03.000Z',cacheSeconds:45}}});}return r.fulfill({json:{success:true}});});
await page.goto(`http://127.0.0.1:${port}/${hi?'hi/':''}${slug}`);for(const [key,value]of Object.entries(fields)){const el=page.locator(`[name="${key}"]`).first();if(key==='source')await el.selectOption(value);else await el.fill(value);}
await page.locator('.engine-submit').click();await page.locator('.rail-provider-result').first().waitFor({timeout:10000});assert.equal(calls,1);assert.deepEqual(errors,[]);
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,slug+' overflow');
if(action==='between'){assert.equal(await page.locator('.rail-train-list article').count(),132);const href=await page.locator('.route-seat-link').first().getAttribute('href');assert.match(href,/from=ANVT/);await page.locator('.rail-exact-filter input').check();assert.equal(await page.locator('.rail-train-list article').count(),131);}
if(action==='platform')assert.equal(await page.locator('.rail-platform-number strong').textContent(),'15');
if(action==='coach')assert.match(await page.locator('.rail-coach-strip').textContent(),/HA1.*194544/);
if(action==='amenities')assert.equal(await page.locator('.rail-metric').count(),14);
console.log(`PASS fixture browser: ${hi?'HI':'EN'} ${width}px ${slug}`);await page.close();}}
const slugs = [...new Set([...fs.readFileSync(path.join(root,'lib/tool-registry.ts'),'utf8').matchAll(/slug:\s*["']([^"']+)["']/g)].map(m=>m[1]))];
for(const hi of [false,true]) for(const width of [360,768,1440]) {
const page=await browser.newPage({viewport:{width,height:1000}});
await page.route('**/api/**',r=>r.fulfill({json:{success:true}}));
for(const slug of slugs){ await page.goto(`http://127.0.0.1:${port}/${hi?'hi/':''}${slug}`);
const issues=await page.locator('.engine-fields > label:not(.engine-checkbox)').evaluateAll(labels=>labels.flatMap(l=>{const b=l.getBoundingClientRect();return [...l.children].filter(e=>e.matches('input,select,span:not(.station-picker)')).filter(e=>{const r=e.getBoundingClientRect();return r.top<b.top-1||r.bottom>b.bottom+1||r.right>b.right+1;}).map(()=>l.textContent.slice(0,80));}));
assert.deepEqual(issues,[],`${slug} ${hi?'HI':'EN'} ${width}px field overflow`);
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,`${slug} page overflow`);
if(slug==='refund-calculator'&& !hi && [360,1440].includes(width)) await page.locator('.tool-engine').screenshot({path:`/tmp/railq-refund-${width}.png`});
}
console.log(`PASS layout: ${slugs.length} tool pages ${hi?'HI':'EN'} ${width}px`); await page.close();
}
}finally{if(browser)await browser.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});

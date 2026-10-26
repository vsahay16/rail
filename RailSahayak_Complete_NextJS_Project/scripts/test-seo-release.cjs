/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('playwright'),fs=require('node:fs'),{spawn}=require('node:child_process'),assert=require('node:assert/strict');
const batch=JSON.parse(fs.readFileSync('validation/seo-full-expected.json','utf8')),baseline=JSON.parse(fs.readFileSync('validation/seo-full-baseline.json','utf8'));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)));
const tags=(html,tag)=>html.match(new RegExp('<'+tag+'\\b[^>]*>','g'))||[];
const attr=(tag,key)=>decode(tag.match(new RegExp('(?:^|\\s)'+key+'="([^"]*)"'))?.[1]||'');
const meta=(html,name)=>attr(tags(html,'meta').find(t=>attr(t,'name')===name||attr(t,'property')===name)||'','content');
(async()=>{const server=spawn('node',['node_modules/next/dist/bin/next','start','--port','3012','--hostname','127.0.0.1'],{stdio:'ignore'});let browser;
try{for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:3012')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
let changed=0;const titles=[],descriptions=[];
for(const original of baseline){const b=batch[original.path];const response=await fetch('http://127.0.0.1:3012'+original.path);assert.equal(response.status,200,original.path);const html=await response.text();const title=decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||''),description=meta(html,'description'),canonical=attr(tags(html,'link').find(t=>attr(t,'rel')==='canonical')||'','href');
assert.equal(/<main[^>]*data-mobile-refresh/.test(html),!!b,original.path+' mobile scope');
assert.equal(title,b?b.title+' | RailQ':original.title,original.path+' title');assert.equal(description,b?b.description:original.description,original.path+' description');assert.equal(canonical,original.canonical,original.path+' canonical');
assert.equal(meta(html,'og:title'),title);assert.equal(meta(html,'og:description'),description);assert.equal(meta(html,'twitter:title'),title);assert.equal(meta(html,'twitter:description'),description);assert(!meta(html,'robots').includes('noindex'));
if(b){changed++;if(b.h1){const h1=decode(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]||'').replace(/<[^>]*>/g,'');assert.equal(h1,b.h1);}}
titles.push(title);descriptions.push(description);}
assert.equal(changed,138);assert.equal(new Set(titles).size,148);assert.equal(new Set(descriptions).size,148);
const sitemap=await(await fetch('http://127.0.0.1:3012/sitemap.xml')).text();assert.equal((sitemap.match(/<url>/g)||[]).length,148);for(const path of Object.keys(batch)){const url='https://railq.in'+path;const xml=sitemap.split('<url>').find(s=>s.includes('<loc>'+url+'</loc>'));assert(xml&&xml.includes('2026-10-26'),url+' lastmod');}
console.log('All 148 metadata/canonical/social-tag checks passed; 138 rollout URLs and 10 preserved URLs');
browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox']});
const c=await browser.newContext({viewport:{width:360,height:800},isMobile:true,hasTouch:true}),page=await c.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await c.addInitScript(()=>localStorage.setItem('railsahayak_consent','necessary'));
await page.route('**/api/rail?**',r=>{const action=new URL(r.request().url()).searchParams.get('action');return r.fulfill({json:{success:true,data:action==='between'?{from:{code:'NDLS',name:'New Delhi'},to:{code:'MMCT',name:'Mumbai Central'},trains:[{train:{number:'12952',name:'Example train',runDays:['Mon']},from:{departure:'16:00',day:1},to:{arrival:'08:00',day:2},duration:960,distance:1000}]}:{calendar:[]}}})});
const protectedPages=baseline.filter(x=>x.protected);assert.equal(protectedPages.length,10);
for(const original of protectedPages){await page.goto('http://127.0.0.1:3012'+original.path);assert.equal((await page.locator('h1').innerText()).replace(/\s+/g,' '),original.h1,original.path+' protected H1');const main=await page.locator('main').evaluate(el=>{const clone=el.cloneNode(true);clone.querySelectorAll('script,style').forEach(x=>x.remove());return clone.textContent.replace(/\s+/g,' ').trim()});assert.equal(main.replace(/\s/g,''),original.mainText.replace(/\s/g,''),original.path+' protected content');}
for(const width of [320,360,390]){await page.setViewportSize({width,height:800});for(const path of ['/connecting-trains','/train-schedule','/guides/pnr-confirmation-probability','/guides/3e-vs-3a-train-class','/privacy','/coach-layout','/guides/train-classes-and-coaches'])for(const prefix of ['','/hi']){await page.goto('http://127.0.0.1:3012'+prefix+path);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),prefix+path+' overflow '+width);assert.equal(await page.locator('h1').count(),1);}}
console.log('Protected top 10 H1s and visible main content unchanged; representative English/Hindi pages passed at 320/360/390px');
assert.deepEqual(errors,[]);console.log('PASS SEO release checks');
}finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exit(1)});

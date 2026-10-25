/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('playwright');
const {spawn}=require('node:child_process'),fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const logs=fs.openSync('/tmp/railq-mobile-server.log','w');const server=spawn('node',['node_modules/next/dist/bin/next','start','--port','3010','--hostname','127.0.0.1'],{stdio:['ignore',logs,logs]});
 let browser;
 try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:3010')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} : {}),args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:360,height:800},isMobile:true,hasTouch:true});const page=await context.newPage(),checks=[],events=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await context.addInitScript(()=>localStorage.setItem('railsahayak_consent','analytics_ads'));
 let mode='waiting',providerError=true,prediction=false,calls=0;
 await page.route('**/api/events',async r=>{events.push(r.request().postDataJSON());await r.fulfill({json:{accepted:true}})});
 await page.route('**/api/rail/capabilities',r=>r.fulfill({json:{prediction:true}}));
 await page.route('**/api/rail',async r=>{
 const b=r.request().postDataJSON();if(b.action==='prediction')return r.fulfill({json:prediction?{success:true,data:{percentage:80}}:{success:false}});
 calls++;await new Promise(r=>setTimeout(r,200));
 if(providerError)return r.fulfill({status:503,json:{success:false,code:'PROVIDER_ERROR'}});
 return r.fulfill({json:{success:true,data:{trainName:'Example train',trainNumber:'12345',passengers:mode==='incomplete'?[]:mode==='confirmed'?[{currentStatus:'CNF',coach:'S1',berthNumber:12}]:mode==='rac'?[{currentStatus:'RAC/2'}]:[{currentStatus:'CNF',coach:'S1',berthNumber:12},{currentStatus:'WL/5',berthNumber:5}]}}});
 });
 fs.mkdirSync('/tmp/railq-mobile-screens',{recursive:true});
 for(const prefix of ['', '/hi']){
 const hi=!!prefix;mode='waiting';providerError=true;prediction=false;
 await page.goto('http://127.0.0.1:3010'+prefix+'/pnr-status');await page.locator('#pnr-number').fill('1234567890');
 const button=page.locator('.pnr-input-row button');const rect=await button.boundingBox();assert(rect.y+rect.height<800,'PNR submit should fit first viewport');
 await page.screenshot({path:'/tmp/railq-mobile-screens/pnr-'+(hi?'hi':'en')+'.png',fullPage:true});
 await button.click();await page.locator('.lookup-progress').waitFor();assert(await page.locator('#pnr-number').isDisabled());await page.locator('.pnr-result').waitFor();assert.equal(await page.locator('#pnr-number').inputValue(),'1234567890');
 providerError=false;await button.click();await page.locator('.primary-next-step').first().waitFor();assert((await page.locator('.primary-next-step').first().getAttribute('href')).includes('pnr-confirmation-probability'));
 await page.getByRole('button',{name:hi?'कन्फर्म होने की संभावना देखें':'Check confirmation chance',exact:true}).click();await page.getByText(hi?'इसका अर्थ 0% नहीं है।':'This does not mean 0%.',{exact:false}).waitFor();
 prediction=true;await page.getByRole('button',{name:hi?'अनुमान फिर माँगें':'Try estimate again',exact:true}).click();await page.getByText('80%',{exact:true}).waitFor();
 if(await page.getByRole('button',{name:hi?'यह ट्रेन सेव करें':'Save this train',exact:true}).count()) await page.getByRole('button',{name:hi?'यह ट्रेन सेव करें':'Save this train',exact:true}).click();
 checks.push((hi?'Hindi':'English')+': form in first viewport; error preserves PNR; immediate retry; WL next action; estimate recovery; explicit train save');
 for(const next of ['confirmed','rac','incomplete']){mode=next;await button.click();await page.locator('.lookup-progress').waitFor({state:'hidden'});const href=await page.locator('.primary-next-step').first().getAttribute('href');assert(href.includes(next==='confirmed'?'seat-berth-finder':next==='rac'?'can-you-travel-with-rac-ticket':'pnr-status-explained'));}
 checks.push((hi?'Hindi':'English')+': CNF, RAC and incomplete next steps');
 await page.goto('http://127.0.0.1:3010'+prefix+'/live-train-status');await page.locator('.saved-journey-shortcuts summary').click();await page.locator('.saved-journey-shortcuts').getByRole('button',{name:hi?'ट्रेन 12345':'Train 12345',exact:true}).click();assert.equal(await page.locator('input[name=train]').inputValue(),'12345');assert.equal(await page.locator('input[name=train]').getAttribute('inputmode'),'numeric');
 await page.goto('http://127.0.0.1:3010'+prefix+'/trains-between-stations');await page.locator('input[name=from]').fill('NDLS');await page.locator('input[name=to]').fill('MMCT');await page.locator('input[name=date]').fill('2026-12-10');await page.locator('input[name=date]').blur();
 const saveRoute=page.getByRole('button',{name:hi?'यह मार्ग सेव करें':'Save this route',exact:true});if(await saveRoute.count())await saveRoute.click();
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('railq_saved_routes_v1')));assert.deepEqual(stored[0],{from:'NDLS',to:'MMCT'});
 await page.reload();assert.equal(await page.locator('input[name=date]').inputValue(),'');await page.locator('.saved-journey-shortcuts summary').click();await page.getByRole('button',{name:'NDLS → MMCT',exact:true}).click();assert.equal(await page.locator('input[name=from]').inputValue(),'NDLS');assert.equal(await page.locator('input[name=to]').inputValue(),'MMCT');
 checks.push((hi?'Hindi':'English')+': saved train/route reuse, date excluded');
 for(const width of [320,360,390]){
 await page.setViewportSize({width,height:800});
 for(const slug of ['coach-layout','seat-berth-finder','chart-preparation-calculator','live-train-status','pnr-status']){
 await page.goto('http://127.0.0.1:3010'+prefix+'/'+slug);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),prefix+'/'+slug+' overflow at '+width);
 if(slug==='coach-layout'){
 await page.locator('select').first().selectOption('2a46');await page.locator('input[type=number]').fill('46');await page.locator('input[type=number]').press('Enter');await page.getByRole('heading',{name:/46 ·/}).waitFor();
 await page.locator('select').first().selectOption('other');await page.getByRole('heading',{name:hi?'अपने कोच का वास्तविक लेआउट देखें':'Check your coach-specific layout'}).waitFor();
 }
 if(slug==='chart-preparation-calculator'){
 await page.locator('input[type=datetime-local]').fill('2026-12-10T18:00');await page.locator('.engine-submit').click();await page.locator('.engine-result').waitFor();
 }
 if(width===360&&['coach-layout','chart-preparation-calculator'].includes(slug))await page.screenshot({path:'/tmp/railq-mobile-screens/'+slug+'-'+(hi?'hi':'en')+'.png',fullPage:true});
 }
 }
 checks.push((hi?'Hindi':'English')+': five tools at 320/360/390px; final berth and unsupported layout; chart calculator');
 }
 await page.waitForTimeout(200);assert(!JSON.stringify(events).includes('1234567890'));assert(events.some(e=>e.eventName==='pnr_lookup_result'&&typeof e.properties.duration_ms==='number'&&e.properties.device==='mobile'));
 checks.push('Consented timing/device analytics, no PNR in analytics');assert.deepEqual(errors,[]);
 fs.writeFileSync('/tmp/railq-mobile-browser-results.json',JSON.stringify({checks,events:events.length,calls},null,2));console.log(checks.join('\n'));
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1)});

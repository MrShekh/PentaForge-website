/* eslint-disable @typescript-eslint/no-require-imports -- Node CLI loads the available local Playwright runtime without adding a production dependency. */
/* Local browser verification. Set PLAYWRIGHT_MODULE to a bundled Playwright installation when needed. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const sharp = require('sharp');
const { schools, schoolIds, demoRoutes } = require('../data/school-demos/index.ts');
const base = process.env.TEST_BASE_URL || 'http://localhost:3012';
async function ready(page) {
 await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.querySelectorAll('main img')].filter(img => img.getBoundingClientRect().height > 0).map(img => { img.loading='eager'; return img.decode().catch(() => {}); })); });
 await page.addStyleTag({content:'nextjs-portal{display:none!important}'});
}
async function main(){
 await fs.mkdir('test-results/school-demos',{recursive:true});await fs.mkdir('public/school-demos/previews',{recursive:true});
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 try {
  if (!process.env.TEST_INTERACTIONS_ONLY) {
  for(const id of schoolIds){
   console.log(`Capturing ${id} desktop/mobile`);
   await page.setViewportSize({width:1440,height:1000});const response=await page.goto(`${base}/demos/${id}`,{waitUntil:'load',timeout:60000});assert.equal(response.status(),200);await ready(page);
   assert.equal(await page.locator('h1').count(),1);assert.ok((await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));
   assert.equal(await page.locator('.site-header').count(),0,'PentaForge chrome must not leak into demos');
   await sharp(await page.screenshot()).webp({quality:88}).toFile(`public/school-demos/previews/${id}-desktop.webp`);
   await page.screenshot({path:`test-results/school-demos/${id}-desktop.png`,fullPage:true});
   await page.setViewportSize({width:390,height:844});await ready(page);
   await sharp(await page.screenshot()).webp({quality:88}).toFile(`public/school-demos/previews/${id}-mobile.webp`);
   await page.screenshot({path:`test-results/school-demos/${id}-mobile.png`,fullPage:true});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
   await page.getByRole('button',{name:'Open school navigation',exact:true}).click();assert.ok(await page.locator('dialog[open]').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);assert.ok(await page.getByRole('button',{name:'Open school navigation',exact:true}).evaluate(el=>el===document.activeElement));
  }
  for(const route of demoRoutes){
   console.log(`Checking ${route}`);
   const response=await page.goto(base+route,{waitUntil:'load',timeout:60000});assert.equal(response.status(),200,route);assert.equal(await page.locator('h1').count(),1,route);assert.ok((await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'),route);
   for(const width of [320,768]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' width '+width);}
  }
  }
  await page.setViewportSize({width:1280,height:900});
  for(const id of schoolIds){
   console.log('Testing interactions: '+id);
   await page.goto(`${base}/demos/${id}/gallery`,{waitUntil:'load',timeout:60000});await page.getByRole('button',{name:'Campus',exact:true}).click();assert.equal(await page.getByRole('button',{name:/^Open (Room to discover|One more chapter)$/}).count(),2);await page.getByRole('button',{name:'Open Room to discover',exact:true}).click();assert.ok(await page.locator('dialog[open]').isVisible());await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);assert.ok(await page.getByRole('button',{name:'Open Room to discover',exact:true}).evaluate(el=>el===document.activeElement));
   await page.goto(`${base}/demos/${id}/${id==='littlebloom'?'programs':'academics'}`,{waitUntil:'load',timeout:60000});await page.getByRole('tab').first().focus();await page.keyboard.press('ArrowRight');assert.equal(await page.getByRole('tab',{selected:true}).innerText(),schools[id].programs[1].title);
   await page.goto(`${base}/demos/${id}/admissions`,{waitUntil:'load',timeout:60000});await page.locator('summary').filter({hasText:'Is this a real school accepting admissions?'}).click();assert.ok(await page.locator('details[open]').count()>0);
   let submitted=false;await page.route('**/api/leads',route=>{submitted=true;return route.abort();});
   await page.getByLabel('Parent / guardian name').fill('Example Parent');await page.getByLabel('Email',{exact:true}).fill('parent@example.test');await page.getByLabel('Phone',{exact:true}).fill('9000000000');await page.locator('select[name=program]').selectOption({label:schools[id].programs[0].title});await page.getByLabel('Your question').fill('This is a sample school visit question.');await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Preview enquiry submission'}).click();await page.getByText('Preview complete.',{exact:true}).waitFor();assert.equal(submitted,false,'Demo must not call lead endpoint');await page.unroute('**/api/leads');
  }
  await page.goto(`${base}/demos/nextgen/student-portal`,{waitUntil:'load',timeout:60000});await page.getByRole('tab',{name:'Homework',exact:true}).click();await page.getByRole('button',{name:'Mark complete: Mathematics practice',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Reopen: Mathematics practice',exact:true}).getAttribute('aria-pressed'),'true');await page.getByRole('tab',{name:'Results',exact:true}).click();assert.ok(await page.getByText('82/100',{exact:true}).isVisible());
  await page.goto(`${base}/demos/nextgen/parent-portal`,{waitUntil:'load',timeout:60000});await page.getByLabel('Sample child').selectOption('1');await page.getByRole('tab',{name:'Fee summary',exact:true}).click();assert.ok(await page.getByText('₹3,000',{exact:true}).isVisible());await page.getByRole('tab',{name:'Communication',exact:true}).click();await page.getByLabel('Try a sample reply').fill('This is a sample family reply.');await page.getByRole('button',{name:'Preview reply',exact:true}).click();assert.ok(await page.getByRole('status').isVisible());assert.equal(await page.getByLabel('Try a sample reply').inputValue(),'');
  await page.goto(`${base}/industries/education?demo=horizon#school-enquiry`,{waitUntil:'load',timeout:60000});let delivered;
  await page.route('**/api/leads',route=>{if(route.request().method()==='GET')return route.fulfill({json:{submissionId:'08fbfba0-152b-4340-b575-8c73f1e0d953'}});delivered=route.request().postDataJSON();return route.fulfill({json:{ok:true,message:'Mock receipt accepted for local verification.'}});});
  await page.getByLabel('Your name').fill('QA School Owner');await page.getByLabel('School name').fill('QA Institution');await page.getByLabel('Phone',{exact:false}).fill('9000000000');await page.getByLabel('Email',{exact:false}).fill('qa@example.test');await page.getByLabel('City',{exact:false}).fill('Rajkot');await page.getByLabel('Required service').selectOption('Website + ERP');await page.getByLabel('Tell us about your school project').fill('We need a website and a clear school administration workflow.');await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Start the Conversation'}).click();await page.getByText('Conversation started.',{exact:true}).waitFor();assert.ok(delivered.message.includes('Horizon International School (horizon)'));assert.ok(delivered.message.includes('City: Rajkot'));assert.ok(delivered.message.includes('Required service: Website + ERP'));assert.equal(delivered.industry,'Schools & Colleges');await page.unroute('**/api/leads');
  await page.goto(`${base}/demos/nextgen/events`,{waitUntil:'load',timeout:60000});await page.getByRole('button',{name:'Calendar',exact:true}).click();assert.equal(await page.getByRole('list',{name:'Sample November calendar'}).getByRole('listitem').count(),30);await page.getByRole('button',{name:'List',exact:true}).click();assert.equal(await page.getByRole('button',{name:'List',exact:true}).getAttribute('aria-pressed'),'true');
  for(const path of ['/demos/constructor','/demos/toString','/demos/horizon/unknown','/demos/nextgen/academics/unknown']){const response=await page.request.get(base+path);assert.equal(response.status(),404,path);}
  assert.deepEqual(errors,[],'Browser runtime errors');
  const report={passed:true,routes:process.env.TEST_INTERACTIONS_ONLY?0:demoRoutes.length,screenshots:process.env.TEST_INTERACTIONS_ONLY?0:6,viewports:[320,390,768,1280,1440],interactions:['mobile menus and Escape/focus return','gallery filters/lightbox/arrows/focus return','keyboard programme tabs','FAQ','simulated admissions with no delivery','student homework and results','parent child switch, fees and message preview','education lead payload with mocked delivery'],runtimeErrors:errors,checkedAt:new Date().toISOString()};await fs.writeFile('test-results/school-demos/browser.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const {AxeBuilder} = require('@axe-core/playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8196';
const evidence = process.env.TEST_EVIDENCE_DIR;
const report = [];
async function check(name, fn) {await fn();report.push(name);console.log(`PASS ${name}`);}
(async () => {
 const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
 try {
 const context = await browser.newContext({viewport:{width:1440,height:1050},permissions:['clipboard-read','clipboard-write']});
 const page = await context.newPage();
 const errors = [];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 await check('Existing inventory integration and newly available Añejo cocktail',async()=>{
  assert.equal(await page.locator('#availability-toggle').getAttribute('aria-pressed'),'true');
  assert(await page.locator('[data-id=anejo_old_fashioned]').count());
  assert.equal(await page.locator('#inventory-status').isVisible(),false);
 });
 await page.locator('#availability-toggle').click();
 await check('All 37 cocktails and all optimized images load',async()=>{
  assert.equal(await page.locator('.card').count(),37);
  const result=await page.evaluate(async()=>{
   const ids=window.COCKTAILS.map(c=>c.id);const images=await Promise.all(ids.map(async id=>{const img=new Image();img.src=`/images/menu-2026/${id}.webp`;await img.decode();return img.naturalWidth;}));
   return {unique:new Set(ids).size,images};
  });
  assert.equal(result.unique,37);assert(result.images.every(w=>w===640));
 });
 await check('Accent-insensitive name and ingredient search, filters and empty state',async()=>{
  await page.fill('#search','anejo');assert.equal(await page.locator('.card').count(),1);
  await page.fill('#search','Kirkland');assert.equal(await page.locator('.card').count(),1);
  await page.fill('#search','no-such-cocktail');assert.equal(await page.locator('.card').count(),0);assert(await page.locator('#empty-state').isVisible());
  await page.locator('#reset-filters').click();assert.equal(await page.locator('.card').count(),37);
  await page.selectOption('#spirit-filter','Tequila');assert(await page.locator('[data-id=anejo_old_fashioned]').count());
  const names=await page.locator('.card h3').allTextContents();assert(names.includes('Margarita'));
  await page.selectOption('#mood-filter','Strong');assert.equal(await page.locator('.card').count(),1);
  await page.selectOption('#spirit-filter','all');await page.selectOption('#mood-filter','all');
  await page.locator('[data-collection=halloween]').click();assert.equal(await page.locator('.card').count(),9);
  await page.locator('[data-collection=all]').click();
 });
 await check('Favorites persist, filter correctly and remove cleanly',async()=>{
  await page.locator('[data-favorite=anejo_old_fashioned]').click();assert.equal(await page.locator('#saved-count').textContent(),'1');
  await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('#saved-count').textContent(),'1');
  await page.locator('#nav-favorites').click();assert.equal(await page.locator('.card').count(),1);
  await page.locator('[data-favorite=anejo_old_fashioned]').click();assert.equal(await page.locator('.card').count(),0);assert(await page.locator('#empty-state').isVisible());
  await page.locator('#reset-filters').click();
 });
 await check('Exact Añejo quantities, metric conversion and bounded serving calculations',async()=>{
  await page.locator('#featured-open').click();assert(await page.locator('#recipe-dialog').isVisible());
  assert.deepEqual(await page.locator('#modal-ingredients li').allTextContents(),['2 oz Kirkland Tequila Añejo','0.25 oz simple syrup','2 dashes orange bitters']);
  assert.equal(await page.locator('#modal-description').textContent(),'A tequila drink with the sophistication of an Old Fashioned.');
  assert.equal(await page.locator('#modal-instructions li').count(),4);
  assert(await page.locator('#servings-minus').isDisabled());
  await page.locator('[data-unit=ml]').click();assert.deepEqual(await page.locator('#modal-ingredients li').allTextContents(),['60 ml Kirkland Tequila Añejo','7.5 ml simple syrup','2 dashes orange bitters']);
  await page.locator('#servings-plus').click();assert.deepEqual(await page.locator('#modal-ingredients li').allTextContents(),['120 ml Kirkland Tequila Añejo','15 ml simple syrup','4 dashes orange bitters']);
  for(let i=0;i<6;i++)await page.locator('#servings-plus').click();assert(await page.locator('#servings-plus').isDisabled());
  await page.locator('#share-recipe').click();await page.waitForFunction(()=>document.getElementById('share-status').textContent==='Recipe link copied.');
  assert((await page.evaluate(()=>navigator.clipboard.readText())).endsWith('#recipe=anejo_old_fashioned'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#recipe-dialog').isVisible(),false);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'featured-open');
 });
 await check('Recipe links open directly, retain keyboard focus and reset servings',async()=>{
  await page.goto(`${base}/#recipe=anejo_old_fashioned`,{waitUntil:'networkidle'});await page.locator('#recipe-dialog').waitFor({state:'visible'});
  assert.equal(await page.locator('#servings-value').textContent(),'1');
  for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('#recipe-dialog').contains(document.activeElement)));}
  await page.keyboard.press('Escape');
 });
 await check('Four complete translations, every recipe dialog and WCAG AA checks',async()=>{
  for(const [language,htmlLang,title] of [['en','en','Pick your poison.'],['ua','uk','Оберіть своє зілля.'],['sk','sk','Vyberte si elixír.'],['pl','pl','Wybierz swój eliksir.']]){
   await page.selectOption('#lang-select',language);assert.equal(await page.locator('html').getAttribute('lang'),htmlLang);assert.equal(await page.locator('#menu-title').textContent(),title);
   assert.equal(await page.locator('.card').count(),37);
   const cards=await page.locator('.recipe-open').evaluateAll(nodes=>nodes.map(n=>n.dataset.recipe));
   for(const id of cards){await page.locator(`[data-recipe="${id}"]`).click();assert((await page.locator('#modal-title').textContent()).length>0);assert((await page.locator('#modal-ingredients li').count())>0);assert((await page.locator('#modal-instructions li').count())>0);assert(!((await page.locator('#recipe-dialog').textContent()).includes('undefined')));await page.keyboard.press('Escape');}
   let scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(scan.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
   await page.locator('#featured-open').click();scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(scan.violations.map(v=>v.id),[]);await page.keyboard.press('Escape');
  }
 });
 await check('Responsive layouts in all languages at 320, 390, 768, 1024 and 1440 pixels',async()=>{
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:900});
   for(const language of ['en','ua','sk','pl']){await page.selectOption('#lang-select',language);const dim=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dim.scroll<=dim.width,`${language} at ${width}px overflows: ${dim.scroll}`);}
  }
 });
 await check('Language, unit and favorite preferences survive reload',async()=>{
  await page.selectOption('#lang-select','ua');await page.locator('#featured-open').click();await page.locator('[data-unit=ml]').click();await page.locator('#modal-save').click();await page.keyboard.press('Escape');
  await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('html').getAttribute('lang'),'uk');assert.equal(await page.locator('#saved-count').textContent(),'1');
  await page.locator('#featured-open').click();assert.equal(await page.locator('[data-unit=ml]').getAttribute('aria-pressed'),'true');assert((await page.locator('#modal-ingredients li').first().textContent()).startsWith('60 мл'));await page.keyboard.press('Escape');
 });
 await check('Legacy Ukrainian ingredient measures convert and scale',async()=>{
  await page.locator('[data-recipe=negroni]').click();await page.locator('[data-unit=oz]').click();assert((await page.locator('#modal-ingredients li').first().textContent()).startsWith('1 унц.'));await page.locator('#servings-plus').click();assert((await page.locator('#modal-ingredients li').first().textContent()).startsWith('2 унц.'));await page.keyboard.press('Escape');
 });
 await check('Surprise button opens a visible recipe',async()=>{await page.locator('#surprise').click();assert(await page.locator('#recipe-dialog').isVisible());await page.keyboard.press('Escape');});
 if(evidence){fs.mkdirSync(evidence,{recursive:true});await page.selectOption('#lang-select','en');await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(evidence,'desktop.png')});await page.locator('#menu').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(evidence,'menu.png')});await page.locator('#featured-open').click();await page.screenshot({path:path.join(evidence,'recipe.png')});await page.keyboard.press('Escape');await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.locator('#search').focus();await page.locator('#search').blur();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(evidence,'mobile.png')});await page.locator('#menu').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(evidence,'mobile-menu.png')});}
 await check('No uncaught browser errors',async()=>assert.deepEqual(errors,[]));
 await context.close();
 await check('Stock filtering handles a partial bar and an unavailable inventory service',async()=>{
  const ctx=await browser.newContext();const p=await ctx.newPage();await p.route('**/_a/bar/inventory',r=>r.fulfill({json:{items:['tequila','simple-syrup','orange-bitters']}}));await p.goto(base,{waitUntil:'networkidle'});assert.equal(await p.locator('.card').count(),1);assert(await p.locator('[data-id=anejo_old_fashioned]').count());
  await p.unroute('**/_a/bar/inventory');await p.route('**/_a/bar/inventory',r=>r.fulfill({status:503,body:'Unavailable'}));await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('.card').count(),37);assert((await p.locator('#inventory-status').textContent()).includes('unavailable'));await ctx.close();
 });
 await check('Blocked browser storage and reduced motion remain usable',async()=>{
  const ctx=await browser.newContext({reducedMotion:'reduce'});await ctx.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Unavailable','SecurityError');}});});const p=await ctx.newPage();await p.route('**/_a/bar/inventory',r=>r.fulfill({json:{items:[]}}));await p.goto(base,{waitUntil:'networkidle'});assert.equal(await p.locator('.card').count(),37);assert.equal(await p.locator('.title-star').evaluate(el=>getComputedStyle(el).animationName),'none');await p.locator('#featured-open').click();assert(await p.locator('#recipe-dialog').isVisible());await ctx.close();
 });
 console.log(`\n${report.length} checks passed.`);
 if(evidence)fs.writeFileSync(path.join(evidence,'test-results.json'),JSON.stringify({base,checks:report},null,2));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

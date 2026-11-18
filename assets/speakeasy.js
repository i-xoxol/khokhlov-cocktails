(() => {
'use strict';
const drinks = window.COCKTAILS;
const langs = ['en', 'ua', 'sk', 'pl'];
const $ = id => document.getElementById(id);
const dict = {
 en: {
  skip:'Skip to the menu',brandSub:'THE NEON SPEAKEASY',menuNav:'The menu',saved:'Saved',language:'Language',heroLine1:'Spirits',heroLine2:'after dark.',intro:'Classic cocktails and Kyiv originals from Igor Khokhlov’s bar. Find a recipe by name, ingredient, or what’s in the bar.',explore:'Explore the menu',surprise:'Surprise me',menuTitle:'Cocktail menu',searchLabel:'Search cocktails or ingredients',searchPlaceholder:'Name, spirit, ingredient…',allDrinks:'All cocktails',midnight:'Midnight picks',favorites:'Your favorites',baseLabel:'SPIRIT',moodLabel:'MOOD',available:'In the bar',allSpirits:'All spirits',allMoods:'All moods',reset:'Show all cocktails',menuEnd:'Good company. Great cocktails. A little neon.',footer:'Made for nights worth remembering.',backTop:'Back to the glow ↑',servings:'Servings',ingredients:'Ingredients',method:'The ritual',copyLink:'Copy recipe link',close:'Close recipe',fewer:'Fewer servings',more:'More servings',units:'Recipe units',collections:'Cocktail collections',navigation:'Main navigation',viewRecipe:'View recipe',save:'Save recipe',unsave:'Remove favorite',savedToast:'Added to your favorites',removedToast:'Removed from your favorites',empty:'No spirits here… yet.',emptyHint:'Try another search or loosen the filters.',emptyFavorites:'Your next favorite is waiting.',emptyFavoritesHint:'Tap the heart on any cocktail to keep it here on this device.',results:'{shown} / {total} cocktails',inventoryLoading:'Checking the bar inventory…',inventoryUnavailable:'Bar inventory is unavailable. Showing the full menu.',inventoryEmpty:'No bar inventory is configured. Showing the full menu.',linkCopied:'Recipe link copied.',linkFailed:'Copy this link:',approx:'Estimated strength',abvNote:'Approximate ABV after dilution; actual strength varies.',notes:'Bartender’s note',story:'Behind the glass',ml:'ml',oz:'oz',dash:'dashes',description:'Explore classic cocktails and Kyiv originals at Igor Khokhlov’s neon speakeasy. Search recipes and see what you can make with the ingredients in the bar.',pageTitle:'Khokhlov’s Bar · Spirits After Dark',
  spirits:{Vodka:'Vodka',Gin:'Gin',Whiskey:'Whiskey',Tequila:'Tequila',Rum:'Rum',Cognac:'Cognac',Liqueur:'Liqueur',Other:'Other'},moods:{Refreshing:'Refreshing',Strong:'Strong',Sweet:'Sweet',Bitter:'Bitter',Savory:'Savory'},ingredientNames:['Kirkland Tequila Añejo','simple syrup','orange bitters']
 },
 ua: {
  skip:'Перейти до меню',brandSub:'НЕОНОВИЙ СПІКІЗІ',menuNav:'Меню',saved:'Збережене',language:'Мова',heroLine1:'Коктейлі',heroLine2:'після заходу.',intro:'Класичні коктейлі й київські авторські рецепти з бару Ігоря Хохлова. Шукайте за назвою, інгредієнтами або тим, що є в барі.',explore:'Переглянути меню',surprise:'Здивуйте мене',menuTitle:'Меню коктейлів',searchLabel:'Пошук коктейлів або інгредієнтів',searchPlaceholder:'Назва, алкоголь, інгредієнт…',allDrinks:'Усі коктейлі',midnight:'Опівнічна добірка',favorites:'Улюблені',baseLabel:'ОСНОВА',moodLabel:'НАСТРІЙ',available:'Є в барі',allSpirits:'Усі основи',allMoods:'Усі настрої',reset:'Показати всі коктейлі',menuEnd:'Гарна компанія. Чудові коктейлі. Трохи неону.',footer:'Для вечорів, які хочеться пам’ятати.',backTop:'До сяйва ↑',servings:'Порції',ingredients:'Інгредієнти',method:'Ритуал приготування',copyLink:'Копіювати посилання',close:'Закрити рецепт',fewer:'Менше порцій',more:'Більше порцій',units:'Одиниці вимірювання',collections:'Добірки коктейлів',navigation:'Головна навігація',viewRecipe:'Рецепт',save:'Зберегти рецепт',unsave:'Видалити з улюблених',savedToast:'Додано до улюблених',removedToast:'Видалено з улюблених',empty:'Поки що тут порожньо…',emptyHint:'Спробуйте інший пошук або змініть фільтри.',emptyFavorites:'Ваш улюблений коктейль ще попереду.',emptyFavoritesHint:'Натисніть сердечко на коктейлі, щоб зберегти його на цьому пристрої.',results:'{shown} / {total} коктейлів',inventoryLoading:'Перевіряємо запаси бару…',inventoryUnavailable:'Запаси бару зараз недоступні. Показуємо повне меню.',inventoryEmpty:'Запаси бару ще не налаштовані. Показуємо повне меню.',linkCopied:'Посилання на рецепт скопійовано.',linkFailed:'Скопіюйте це посилання:',approx:'Орієнтовна міцність',abvNote:'Приблизний вміст алкоголю після розведення; фактична міцність може відрізнятися.',notes:'Від бармена',story:'Історія напою',ml:'мл',oz:'унц.',dash:'деші',description:'Класика й київські авторські коктейлі з неонового бару Ігоря Хохлова. Знайдіть рецепт і перевірте, чи є потрібні інгредієнти.',pageTitle:'Бар Хохлова · Коктейлі після заходу',
  spirits:{Vodka:'Горілка',Gin:'Джин',Whiskey:'Віскі',Tequila:'Текіла',Rum:'Ром',Cognac:'Коньяк',Liqueur:'Лікер',Other:'Інше'},moods:{Refreshing:'Освіжаючий',Strong:'Міцний',Sweet:'Солодкий',Bitter:'Гіркий',Savory:'Пікантний'},ingredientNames:['текіла Kirkland Tequila Añejo','цукровий сироп','апельсиновий бітер']
 },
 sk: {
  skip:'Prejsť na menu',brandSub:'NEÓNOVÝ SPEAKEASY',menuNav:'Menu',saved:'Uložené',language:'Jazyk',heroLine1:'Koktaily',heroLine2:'po zotmení.',intro:'Klasické koktaily a kyjevské originály z baru Igora Khokhlova. Recepty nájdete podľa názvu, ingrediencií alebo zásob baru.',explore:'Preskúmať menu',surprise:'Prekvapte ma',menuTitle:'Koktailové menu',searchLabel:'Hľadať kokteily alebo ingrediencie',searchPlaceholder:'Názov, alkohol, ingrediencia…',allDrinks:'Všetky kokteily',midnight:'Polnočný výber',favorites:'Obľúbené',baseLabel:'ZÁKLAD',moodLabel:'NÁLADA',available:'Máme v bare',allSpirits:'Všetky základy',allMoods:'Všetky nálady',reset:'Zobraziť všetky kokteily',menuEnd:'Dobrá spoločnosť. Skvelé kokteily. Trocha neónu.',footer:'Pre večery, na ktoré sa nezabúda.',backTop:'Späť k žiare ↑',servings:'Porcie',ingredients:'Ingrediencie',method:'Rituál prípravy',copyLink:'Kopírovať odkaz',close:'Zavrieť recept',fewer:'Menej porcií',more:'Viac porcií',units:'Jednotky receptu',collections:'Kolekcie kokteilov',navigation:'Hlavná navigácia',viewRecipe:'Recept',save:'Uložiť recept',unsave:'Odstrániť z obľúbených',savedToast:'Pridané medzi obľúbené',removedToast:'Odstránené z obľúbených',empty:'Zatiaľ tu nič nie je…',emptyHint:'Skúste iné vyhľadávanie alebo zmeňte filtre.',emptyFavorites:'Váš obľúbený kokteil ešte len čaká.',emptyFavoritesHint:'Ťuknite na srdiečko kokteilu a uložte si ho na tomto zariadení.',results:'{shown} / {total} kokteilov',inventoryLoading:'Kontrolujeme zásoby baru…',inventoryUnavailable:'Zásoby baru sú nedostupné. Zobrazujeme celé menu.',inventoryEmpty:'Zásoby baru ešte nie sú nastavené. Zobrazujeme celé menu.',linkCopied:'Odkaz na recept bol skopírovaný.',linkFailed:'Skopírujte tento odkaz:',approx:'Odhadovaná sila',abvNote:'Približný obsah alkoholu po zriedení; skutočná sila sa môže líšiť.',notes:'Poznámka barmana',story:'Príbeh drinku',ml:'ml',oz:'oz',dash:'streky',description:'Klasické koktaily a kyjevské originály z neónového baru Igora Khokhlova. Nájdite recept a overte si dostupnosť ingrediencií.',pageTitle:'Khokhlovov bar · Koktaily po zotmení',
  spirits:{Vodka:'Vodka',Gin:'Gin',Whiskey:'Whisky',Tequila:'Tequila',Rum:'Rum',Cognac:'Koňak',Liqueur:'Likér',Other:'Iné'},moods:{Refreshing:'Osviežujúci',Strong:'Silný',Sweet:'Sladký',Bitter:'Horký',Savory:'Slaný'},ingredientNames:['tequila Kirkland Tequila Añejo','cukrový sirup','pomarančový bitter']
 },
 pl: {
  skip:'Przejdź do menu',brandSub:'NEONOWY SPEAKEASY',menuNav:'Menu',saved:'Zapisane',language:'Język',heroLine1:'Koktajle',heroLine2:'po zmroku.',intro:'Klasyczne koktajle i kijowskie receptury autorskie z baru Igora Khokhlova. Szukaj według nazwy, składników lub zapasów baru.',explore:'Odkryj menu',surprise:'Zaskocz mnie',menuTitle:'Menu koktajli',searchLabel:'Szukaj koktajli lub składników',searchPlaceholder:'Nazwa, alkohol, składnik…',allDrinks:'Wszystkie koktajle',midnight:'Nocny wybór',favorites:'Ulubione',baseLabel:'BAZA',moodLabel:'NASTRÓJ',available:'Mamy w barze',allSpirits:'Wszystkie alkohole',allMoods:'Wszystkie nastroje',reset:'Pokaż wszystkie koktajle',menuEnd:'Dobre towarzystwo. Świetne koktajle. Trochę neonu.',footer:'Na wieczory, które warto pamiętać.',backTop:'Wróć do blasku ↑',servings:'Porcje',ingredients:'Składniki',method:'Rytuał przygotowania',copyLink:'Kopiuj link do przepisu',close:'Zamknij przepis',fewer:'Mniej porcji',more:'Więcej porcji',units:'Jednostki przepisu',collections:'Kolekcje koktajli',navigation:'Nawigacja główna',viewRecipe:'Przepis',save:'Zapisz przepis',unsave:'Usuń z ulubionych',savedToast:'Dodano do ulubionych',removedToast:'Usunięto z ulubionych',empty:'Jeszcze tu pusto…',emptyHint:'Spróbuj innego wyszukiwania lub zmień filtry.',emptyFavorites:'Twój ulubiony koktajl dopiero czeka.',emptyFavoritesHint:'Dotknij serduszka przy koktajlu, aby zapisać go na tym urządzeniu.',results:'{shown} / {total} koktajli',inventoryLoading:'Sprawdzamy zapasy baru…',inventoryUnavailable:'Zapasy baru są niedostępne. Pokazujemy pełne menu.',inventoryEmpty:'Zapasy baru nie są skonfigurowane. Pokazujemy pełne menu.',linkCopied:'Link do przepisu skopiowany.',linkFailed:'Skopiuj ten link:',approx:'Szacowana moc',abvNote:'Przybliżona zawartość alkoholu po rozcieńczeniu; rzeczywista moc może się różnić.',notes:'Od barmana',story:'Historia drinka',ml:'ml',oz:'oz',dash:'dashe',description:'Klasyka i kijowskie koktajle autorskie z neonowego baru Igora Khokhlova. Znajdź przepis i sprawdź dostępność składników.',pageTitle:'Bar Khokhlova · Koktajle po zmroku',
  spirits:{Vodka:'Wódka',Gin:'Gin',Whiskey:'Whisky',Tequila:'Tequila',Rum:'Rum',Cognac:'Koniak',Liqueur:'Likier',Other:'Inne'},moods:{Refreshing:'Orzeźwiający',Strong:'Mocny',Sweet:'Słodki',Bitter:'Gorzki',Savory:'Wytrawny'},ingredientNames:['tequila Kirkland Tequila Añejo','syrop cukrowy','bitter pomarańczowy']
 }
};
Object.assign(dict.en, {"inventoryNav": "Home bar", "inventoryTitle": "Dr. Igor’s Home Bar", "inventorySummary": "{total} listed · {confirmed} identified · {tentative} tentative", "inventoryDate": "Photo inventory · {date}", "inventoryExplanation": "The November 6 photo inventory. Tentative identities do not count toward “In the bar.” Garnishes are optional; ice and remaining quantities are not verified.", "inventoryListed": "Listed items", "inventorySpirits": "Base spirits", "inventoryLiqueurs": "Liqueurs & aperitifs", "identified": "Identified", "tentative": "Tentative", "recipeReady": "Required ingredients are in the bar. Garnishes are optional.", "recipeMissing": "Not in confirmed stock: {items}. Garnishes are optional.", "recipeStockLoading": "Checking ingredient availability…", "recipeStockUnknown": "Ingredient availability could not be verified."});
Object.assign(dict.ua, {"inventoryNav": "Домашній бар", "inventoryTitle": "Домашній бар доктора Ігоря", "inventorySummary": "{total} у списку · {confirmed} визначено · {tentative} попередньо", "inventoryDate": "Фотоінвентаризація · {date}", "inventoryExplanation": "Інвентар за фото від 6 листопада. Непідтверджені інгредієнти не враховуються у фільтрі «Є в барі». Гарніші необов’язкові; лід і залишки не перевірено.", "inventoryListed": "Позицій у списку", "inventorySpirits": "Базових спиртних напоїв", "inventoryLiqueurs": "Лікерів і аперитивів", "identified": "Визначено", "tentative": "Попередньо", "recipeReady": "Необхідні інгредієнти є в барі. Гарніші необов’язкові.", "recipeMissing": "Немає серед підтверджених запасів: {items}. Гарніші необов’язкові.", "recipeStockLoading": "Перевіряємо наявність інгредієнтів…", "recipeStockUnknown": "Наявність інгредієнтів не вдалося перевірити."});
Object.assign(dict.sk, {"inventoryNav": "Domáci bar", "inventoryTitle": "Domáci bar Dr. Igora", "inventorySummary": "{total} položiek · {confirmed} určených · {tentative} predbežné", "inventoryDate": "Fotoinventár · {date}", "inventoryExplanation": "Inventár podľa fotografií zo 6. novembra. Predbežné identifikácie sa nezapočítavajú do filtra „Máme v bare“. Ozdoby sú voliteľné; ľad a zostávajúce množstvá nie sú overené.", "inventoryListed": "Položiek v zozname", "inventorySpirits": "Základných destilátov", "inventoryLiqueurs": "Likérov a aperitívov", "identified": "Určené", "tentative": "Predbežné", "recipeReady": "Potrebné ingrediencie sú v bare. Ozdoby sú voliteľné.", "recipeMissing": "Nie je v potvrdených zásobách: {items}. Ozdoby sú voliteľné.", "recipeStockLoading": "Overujeme dostupnosť ingrediencií…", "recipeStockUnknown": "Dostupnosť ingrediencií sa nepodarilo overiť."});
Object.assign(dict.pl, {"inventoryNav": "Domowy bar", "inventoryTitle": "Domowy bar dr. Igora", "inventorySummary": "{total} pozycji · {confirmed} rozpoznanych · {tentative} wstępne", "inventoryDate": "Inwentarz ze zdjęć · {date}", "inventoryExplanation": "Inwentarz ze zdjęć z 6 listopada. Wstępne identyfikacje nie liczą się do filtra „Mamy w barze”. Dekoracje są opcjonalne; lód i pozostałe ilości nie są zweryfikowane.", "inventoryListed": "Pozycji na liście", "inventorySpirits": "Alkoholi bazowych", "inventoryLiqueurs": "Likierów i aperitifów", "identified": "Rozpoznane", "tentative": "Wstępne", "recipeReady": "Potrzebne składniki są w barze. Dekoracje są opcjonalne.", "recipeMissing": "Brak w potwierdzonych zapasach: {items}. Dekoracje są opcjonalne.", "recipeStockLoading": "Sprawdzamy dostępność składników…", "recipeStockUnknown": "Nie udało się potwierdzić dostępności składników."});
const storage = {get(key, fallback) {try{return localStorage.getItem(key) ?? fallback;}catch{return fallback;}},set(key,value){try{localStorage.setItem(key,value);}catch{}}};
let lang = storage.get('cocktails_lang','en');
if (!langs.includes(lang)) lang='en';
let unit=storage.get('cocktails_units_v1','oz');
if(!['oz','ml'].includes(unit))unit='oz';
let favorites=new Set();
try{const saved=JSON.parse(storage.get('cocktails_favorites_v1','[]'));if(Array.isArray(saved))favorites=new Set(saved.filter(id=>drinks.some(c=>c.id===id)));}catch{}
let available=storage.get('khokhlov_show_available_only_v1','1')==='1';
let inventory=null,inventoryState='loading',collection='all',visible=[],activeDrink=null,servings=1,previousHash='',toastTimeout;
const midnight = new Set(['long_island_iced_tea','anejo_old_fashioned','tequila_manhattan','the_blackout','espresso_martini','boulevardier','old_fashioned','negroni','white_russian','the_oligarch','kyiv_cake']);
const text=key=>dict[lang][key]??dict.en[key];
const data=c=>c[lang]||c.en;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/’/g,"'");
const imagePath=c=>`/images/menu-2026/${c.id}.webp`;
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('toast').classList.remove('visible'),2500);}
function populateSelect(id,options,allLabel){const el=$(id),value=el.value||'all';el.replaceChildren(...Object.entries({all:allLabel,...options}).map(([key,label])=>new Option(label,key)));el.value=value;}
function translate(){
 document.documentElement.lang=lang==='ua'?'uk':lang;
 document.title=text('pageTitle');
 document.querySelector('meta[name=description]').content=text('description');
 $('lang-select').value=lang;
 document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=text(el.dataset.i18n);});
 document.querySelectorAll('[data-placeholder]').forEach(el=>{el.placeholder=text(el.dataset.placeholder);});
 populateSelect('spirit-filter',text('spirits'),text('allSpirits'));populateSelect('mood-filter',text('moods'),text('allMoods'));
 $('main-nav').setAttribute('aria-label',text('navigation'));$('collection-tabs').setAttribute('aria-label',text('collections'));$('unit-switch').setAttribute('aria-label',text('units'));
 $('modal-close').setAttribute('aria-label',text('close'));$('servings-minus').setAttribute('aria-label',text('fewer'));$('servings-plus').setAttribute('aria-label',text('more'));
 renderInventory();updateFavorites();applyFilters();if(activeDrink)renderRecipe();
}
function renderInventory(){
 const snapshot=BAR.SNAPSHOT,confirmed=snapshot.items.filter(item=>item.status==='confirmed').length;
 $('inventory-summary').textContent=text('inventorySummary').replace('{total}',snapshot.items.length).replace('{confirmed}',confirmed).replace('{tentative}',snapshot.items.length-confirmed);
 const date=new Intl.DateTimeFormat(lang==='ua'?'uk':lang,{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(snapshot.date+'T12:00:00Z'));
 $('inventory-date').textContent=text('inventoryDate').replace('{date}',date);
 const stats=[[snapshot.items.length,'inventoryListed'],[snapshot.items.filter(item=>item.group<3).length,'inventorySpirits'],[snapshot.items.filter(item=>item.group===3).length,'inventoryLiqueurs']];
 $('inventory-stats').innerHTML=stats.map(([count,key])=>`<p><strong>${count}</strong><span>${escape(text(key))}</span></p>`).join('');
 $('inventory-groups').innerHTML=snapshot.groups.map((group,index)=>`<section class="inventory-group"><h3>${escape(group[lang]||group.en)}</h3><ul>${snapshot.items.filter(item=>item.group===index).map(item=>`<li class="inventory-item"><span class="inventory-item-copy"><strong>${item.number}. ${escape(item.labels[lang]||item.labels.en)}</strong>${item.brand?`<small>${escape(item.brand)}</small>`:''}${item.notes?`<small class="inventory-item-note">${escape(item.notes[lang]||item.notes.en)}</small>`:''}</span><span class="stock-badge ${item.status}">${escape(text(item.status==='confirmed'?'identified':'tentative'))}</span></li>`).join('')}</ul></section>`).join('');
}
function abv(c){
 const parts=c.en.ingredients.split(',');let volume=0,alcohol=0;
 const rules=[[/\b(?:vodka|gin|tequila|rum|cognac)\b/i,.4],[/whiskey|bourbon|rye/i,.45],[/vermouth/i,.16],[/campari/i,.24],[/aperol|prosecco/i,.11],[/liqueur|kahl|amaretto|irish cream|baileys|curacao|schnapps/i,.2],[/bitters/i,.44],[/juice|soda|tonic|syrup|sugar|cream|lemon|lime|ginger|lemonade/i,0]];
 for(const part of parts){const match=part.match(/(\d+(?:\.\d+)?)\s*(ml|oz)\b/i);if(!match)continue;const amount=Number(match[1])*(match[2].toLowerCase()==='oz'?30:1);const rule=rules.find(([re])=>re.test(part));volume+=amount;alcohol+=amount*(rule?rule[1]:.2);}
 const dilution=/stir|shake/i.test(c.en.instructions)?1.2:1.1;
 return volume?Math.min(60,Math.round(alcohol/volume/dilution*100)):0;
}
function strength(c){const value=abv(c);return value>=22?5:value>=18?4:value>=14?3:value>=9?2:1;}
function updateFavorites(){
 $('saved-count').textContent=favorites.size;document.querySelectorAll('.favorites-count').forEach(el=>el.textContent=favorites.size);
 if(activeDrink){$('modal-save').textContent=`${favorites.has(activeDrink.id)?'♥':'♡'}  ${text(favorites.has(activeDrink.id)?'unsave':'save')}`;$('modal-save').setAttribute('aria-pressed',String(favorites.has(activeDrink.id)));}
}
function toggleFavorite(id){
 const added=!favorites.has(id);added?favorites.add(id):favorites.delete(id);storage.set('cocktails_favorites_v1',JSON.stringify([...favorites]));
 const focus=document.activeElement?.dataset?.favorite;updateFavorites();applyFilters();
 if(focus)document.querySelector(`[data-favorite="${focus}"]`)?.focus({preventScroll:true});
 toast(text(added?'savedToast':'removedToast'));
}
function applyFilters(){
 const spirit=$('spirit-filter').value,mood=$('mood-filter').value,query=normalize($('search').value.trim());
 visible=drinks.filter(c=>{
  if(spirit!=='all'&&c.spirit!==spirit)return false;if(mood!=='all'&&c.mood!==mood)return false;
  if(collection==='midnight'&&!midnight.has(c.id))return false;if(collection==='favorites'&&!favorites.has(c.id))return false;
  if(available&&inventory?.size>0&&!BAR.isMakeable(c,inventory))return false;
  const d=data(c);return !query||normalize([d.name,d.ingredients,d.notes,c.en.name,c.en.ingredients,text('spirits')[c.spirit],text('moods')[c.mood]].filter(Boolean).join(' ')).includes(query);
 });
 $('availability-toggle').setAttribute('aria-pressed',String(available));
 document.querySelectorAll('[data-collection]').forEach(el=>{const active=el.dataset.collection===collection;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
 const stockNote=$('inventory-status');stockNote.hidden=!available||(inventoryState==='ready'&&inventory?.size>0);stockNote.textContent=text(inventoryState==='loading'?'inventoryLoading':inventoryState==='error'?'inventoryUnavailable':'inventoryEmpty');
 $('results-count').textContent=text('results').replace('{shown}',visible.length).replace('{total}',drinks.length);
 $('empty-title').textContent=text(collection==='favorites'&&!favorites.size?'emptyFavorites':'empty');$('empty-description').textContent=text(collection==='favorites'&&!favorites.size?'emptyFavoritesHint':'emptyHint');
 renderGrid();
}
function renderGrid(){
 const byName = new Intl.Collator(document.documentElement.lang);
 const shown = [...visible].sort((left, right) => byName.compare(data(left).name, data(right).name));
 $('cocktail-grid').innerHTML=shown.map(c=>{
  const d=data(c),saved=favorites.has(c.id),score=strength(c);
  const flavor=d.notes||[text('moods')[c.mood],text('spirits')[c.spirit]].join(' · ');
  return `<article class="card" data-id="${c.id}"><button type="button" class="recipe-open" data-recipe="${c.id}" aria-label="${escape(text('viewRecipe')+': '+d.name)}"><div class="card-picture"><img src="${imagePath(c)}" alt="${escape(d.name)}" width="640" height="640" loading="lazy" decoding="async"></div><div class="card-info"><p class="card-meta">${escape(text('spirits')[c.spirit])}<span class="meta-dot">/</span>${escape(text('moods')[c.mood])}</p><h3>${escape(d.name)}</h3><p class="card-flavor">${escape(flavor)}</p><div class="card-bottom"><span class="strength-dots" role="img" aria-label="${escape(text('approx'))}: ${score}/5">${Array.from({length:5},(_,i)=>`<i class="${i<score?'on':''}"></i>`).join('')}</span><span class="card-link">${escape(text('viewRecipe'))}<span aria-hidden="true">↗</span></span></div></div></button><button class="favorite-button" type="button" data-favorite="${c.id}" aria-pressed="${saved}" aria-label="${escape(text(saved?'unsave':'save')+': '+d.name)}">${saved?'♥':'♡'}</button></article>`;
 }).join('');
 $('empty-state').hidden=shown.length>0;
 $('results-count').textContent=text('results').replace('{shown}',shown.length).replace('{total}',drinks.length);
}
function chooseCollection(value){collection=value;applyFilters();}
function resetFilters(){collection='all';$('search').value='';$('spirit-filter').value='all';$('mood-filter').value='all';available=false;storage.set('khokhlov_show_available_only_v1','0');applyFilters();}
function number(value){return Number(value.toFixed(2)).toLocaleString(lang==='ua'?'uk':lang,{maximumFractionDigits:2});}
function ingredientsFor(c){
 if(c.measurements)return c.measurements.map((m,i)=>{
  if(m.unit==='top')return data(c).ingredientNames[i];
  const amount=m.unit==='oz'?(unit==='ml'?m.ml:m.amount):m.amount;
  const label=m.unit==='dashes'?text('dash'):text(unit);
  return `${number(amount*servings)} ${label} ${(data(c).ingredientNames||text('ingredientNames'))[i]}`;
 });
 return data(c).ingredients.split(',').map(raw=>raw.trim()).filter(Boolean).map(raw=>raw.replace(/(\d+(?:\.\d+)?)\s*(ml|мл|oz|dashes?|tsp|tbsp)/gi,(match,amount,originalUnit)=>{
  const ml=/^(ml|мл)$/i.test(originalUnit),oz=/^oz$/i.test(originalUnit);
  const scaled=Number(amount)*servings*(ml&&unit==='oz'?1/30:oz&&unit==='ml'?30:1);
  return `${number(scaled)} ${ml||oz?text(unit):originalUnit}`;
 }));
}
function renderRecipe(){
 const c=activeDrink;if(!c)return;const d=data(c);
 $('modal-title').textContent=d.name;$('modal-img').src=imagePath(c);$('modal-img').alt=d.name;
 $('modal-category').textContent=`${text('spirits')[c.spirit]} / ${text('moods')[c.mood]}`;
 $('modal-notes').textContent=d.notes||'';$('modal-notes').hidden=!d.notes;
 $('modal-description').textContent=d.description||'';$('modal-description').hidden=!d.description;
 const stock=$('recipe-availability');
 const missing=inventoryState==='ready'&&inventory?.size?BAR.missingIngredients(c,inventory,lang):null;
 stock.textContent=missing?(missing.length?text('recipeMissing').replace('{items}',missing.join(', ')):text('recipeReady')):text(inventoryState==='loading'?'recipeStockLoading':'recipeStockUnknown');
 stock.classList.toggle('is-missing',Boolean(missing?.length));
 $('modal-ingredients').replaceChildren(...ingredientsFor(c).map(value=>{const li=document.createElement('li');li.textContent=value;return li;}));
 $('modal-instructions').replaceChildren(...d.instructions.split(/\n|(?=\d+\.\s)/).map(s=>s.replace(/^\s*\d+\.\s*/,'').trim()).filter(Boolean).map(step=>{const li=document.createElement('li');li.textContent=step;return li;}));
 $('modal-history').textContent=d.history?`${text('story')}: ${d.history}`:'';$('modal-history').hidden=!d.history;
 $('modal-joke').textContent=d.joke?`${text('notes')}: ${d.joke}`:'';$('modal-joke').hidden=!d.joke;
 const value=abv(c);$('modal-strength').textContent=value?`${text('approx')}: ~${value}% ABV. ${text('abvNote')}`:'';
 $('servings-value').value=servings;$('servings-minus').disabled=servings<=1;$('servings-plus').disabled=servings>=8;
 document.querySelectorAll('[data-unit]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.unit===unit)));
 updateFavorites();
}
function openRecipe(id,fromHash=false){
 const c=drinks.find(c=>c.id===id);if(!c)return;
 activeDrink=c;servings=1;$('share-status').textContent='';renderRecipe();
 if(!$('recipe-dialog').open){previousHash=fromHash?'':location.hash;$('recipe-dialog').showModal();}
 $('recipe-dialog').scrollTop=0;
 if(!fromHash)history.replaceState(null,'',`#recipe=${c.id}`);
 track('recipe');
}
function closeRecipe(){if($('recipe-dialog').open){onClose();$('recipe-dialog').close();}}
function onClose(){activeDrink=null;if(location.hash.startsWith('#recipe='))history.replaceState(null,'',location.pathname+location.search+previousHash);}
function openFromHash(){if(location.hash.startsWith('#recipe='))openRecipe(location.hash.slice(8),true);else if(activeDrink)closeRecipe();}
function track(reason){try{const pixel=new Image();pixel.src=`/_a/p.gif?path=${encodeURIComponent(location.pathname+location.hash)}&lang=${lang}&r=${reason}`;}catch{}}
$('lang-select').addEventListener('change',event=>{lang=event.target.value;storage.set('cocktails_lang',lang);translate();track('lang');});
$('search').addEventListener('input',applyFilters);$('spirit-filter').addEventListener('change',applyFilters);$('mood-filter').addEventListener('change',applyFilters);
$('availability-toggle').addEventListener('click',()=>{available=!available;storage.set('khokhlov_show_available_only_v1',available?'1':'0');applyFilters();});
$('collection-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-collection]');if(button)chooseCollection(button.dataset.collection);});
$('nav-favorites').addEventListener('click',()=>{resetFilters();chooseCollection('favorites');$('menu').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$('reset-filters').addEventListener('click',resetFilters);
$('cocktail-grid').addEventListener('click',event=>{const favorite=event.target.closest('[data-favorite]');if(favorite){toggleFavorite(favorite.dataset.favorite);return;}const recipe=event.target.closest('[data-recipe]');if(recipe)openRecipe(recipe.dataset.recipe);});
$('surprise').addEventListener('click',()=>{if(visible.length)openRecipe(visible[Math.floor(Math.random()*visible.length)].id);else toast(text('emptyHint'));});
$('modal-close').addEventListener('click',closeRecipe);
// Restore the route during cancellation, before the deferred native close event.
// A delayed close must never erase a newly opened shared recipe link.
$('recipe-dialog').addEventListener('cancel',onClose);
$('recipe-dialog').addEventListener('close',()=>{if(!$('recipe-dialog').open)activeDrink=null;});
$('recipe-dialog').addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const controls=[...$('recipe-dialog').querySelectorAll('button:not(:disabled),a[href],input,select,[tabindex="0"]')].filter(el=>el.getClientRects().length);
 const first=controls[0],last=controls.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
$('recipe-dialog').addEventListener('click',event=>{if(event.target!==$('recipe-dialog'))return;const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeRecipe();});
$('unit-switch').addEventListener('click',event=>{const button=event.target.closest('[data-unit]');if(!button)return;unit=button.dataset.unit;storage.set('cocktails_units_v1',unit);renderRecipe();});
$('servings-minus').addEventListener('click',()=>{servings=Math.max(1,servings-1);renderRecipe();});$('servings-plus').addEventListener('click',()=>{servings=Math.min(8,servings+1);renderRecipe();});
$('modal-save').addEventListener('click',()=>{if(activeDrink)toggleFavorite(activeDrink.id);});
$('share-recipe').addEventListener('click',async()=>{if(!activeDrink)return;const url=new URL(location.href);url.hash=`recipe=${activeDrink.id}`;try{await navigator.clipboard.writeText(url.href);$('share-status').textContent=text('linkCopied');}catch{$('share-status').textContent=`${text('linkFailed')} ${url.href}`;}});
window.addEventListener('hashchange',openFromHash);
window.addEventListener('storage',event=>{if(event.key==='cocktails_favorites_v1'){try{const saved=JSON.parse(event.newValue||'[]');if(Array.isArray(saved)){favorites=new Set(saved.filter(id=>drinks.some(c=>c.id===id)));updateFavorites();applyFilters();}}catch{}}});
translate();openFromHash();track('load');
(async()=>{try{inventory=await BAR.apiGetInventory();inventoryState='ready';}catch{inventoryState='error';}applyFilters();if(activeDrink)renderRecipe();})();
})();

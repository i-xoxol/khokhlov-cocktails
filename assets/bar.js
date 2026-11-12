/* bar.js
   Inventory + ingredient catalog for cocktails.khokhlov.org
   Storage: shared server inventory; localStorage retained for legacy callers
*/

(function (global) {
  'use strict';

  const STORAGE_KEY = 'khokhlov_bar_inventory_v1'; // legacy (local-only)
  const API_BASE = '/_a/bar'; // served by cocktails-analytics via nginx proxy

  /** Ingredient catalog
   * id: stable identifier
   * label: display label
   * category: for grouping in /manage
   * synonyms: strings that may appear in cocktail ingredient phrases
   */
  const LEGACY_CATALOG = [
    // Spirits
    { id: 'gin', label: 'Gin', category: 'Spirits', synonyms: ['gin'] },
    { id: 'vodka', label: 'Vodka', category: 'Spirits', synonyms: ['vodka'] },
    { id: 'tequila', label: 'Tequila', category: 'Spirits', synonyms: ['tequila'] },
    { id: 'rum', label: 'Rum', category: 'Spirits', synonyms: ['rum'] },
    { id: 'white-rum', label: 'White Rum', category: 'Spirits', synonyms: ['white rum'] },
    { id: 'aged-rum', label: 'Aged Rum', category: 'Spirits', synonyms: ['aged rum'] },
    { id: 'black-rum', label: 'Black Rum', category: 'Spirits', synonyms: ['black rum'] },
    { id: 'bourbon', label: 'Bourbon', category: 'Spirits', synonyms: ['bourbon'] },
    { id: 'rye', label: 'Rye Whiskey', category: 'Spirits', synonyms: ['rye whiskey', 'rye'] },
    { id: 'cognac', label: 'Cognac', category: 'Spirits', synonyms: ['cognac'] },

    // Liqueurs / Cordials / Aperitifs
    { id: 'campari', label: 'Campari', category: 'Liqueurs & Aperitifs', synonyms: ['campari', 'italian red bitter aperitif'] },
    { id: 'aperol', label: 'Aperol', category: 'Liqueurs & Aperitifs', synonyms: ['aperol', 'orange aperitif'] },
    { id: 'amaretto', label: 'Amaretto', category: 'Liqueurs & Aperitifs', synonyms: ['amaretto'] },
    { id: 'blue-curacao', label: 'Blue Curaçao', category: 'Liqueurs & Aperitifs', synonyms: ['blue curacao', 'blue curaçao'] },
    { id: 'orange-liqueur', label: 'Orange Liqueur (Cointreau/Triple Sec)', category: 'Liqueurs & Aperitifs', synonyms: ['orange liqueur'] },
    { id: 'coffee-liqueur', label: 'Coffee Liqueur (Kahlúa)', category: 'Liqueurs & Aperitifs', synonyms: ['coffee liqueur', 'espresso liqueur'] },
    { id: 'irish-cream', label: 'Irish Cream', category: 'Liqueurs & Aperitifs', synonyms: ['irish cream'] },
    { id: 'peach-schnapps', label: 'Peach Schnapps', category: 'Liqueurs & Aperitifs', synonyms: ['peach schnapps'] },
    { id: 'lime-cordial', label: 'Lime Cordial', category: 'Liqueurs & Aperitifs', synonyms: ['lime cordial'] },

    // Fortified / Wine
    { id: 'sweet-vermouth', label: 'Sweet Vermouth', category: 'Fortified & Wine', synonyms: ['sweet vermouth'] },
    { id: 'prosecco', label: 'Prosecco', category: 'Fortified & Wine', synonyms: ['prosecco', 'top with prosecco'] },

    // Bitters
    { id: 'angostura-bitters', label: 'Angostura Bitters', category: 'Bitters', synonyms: ['angostura bitters'] },
    { id: 'orange-bitters', label: 'Orange Bitters', category: 'Bitters', synonyms: ['orange bitters'] },
    { id: 'bitters', label: 'Bitters (generic)', category: 'Bitters', synonyms: ['bitters'] },

    // Mixers / Soda
    { id: 'ginger-beer', label: 'Ginger Beer', category: 'Mixers & Soda', synonyms: ['ginger beer'] },
    { id: 'tonic-water', label: 'Tonic Water', category: 'Mixers & Soda', synonyms: ['tonic water'] },
    { id: 'soda-water', label: 'Soda / Club Soda', category: 'Mixers & Soda', synonyms: ['soda water', 'soda', 'soda splash'] },
    { id: 'lemonade', label: 'Lemonade', category: 'Mixers & Soda', synonyms: ['lemonade'] },

    // Juices
    { id: 'lemon-juice', label: 'Lemon Juice', category: 'Juices', synonyms: ['lemon juice'] },
    { id: 'lime-juice', label: 'Lime Juice', category: 'Juices', synonyms: ['lime juice'] },
    { id: 'orange-juice', label: 'Orange Juice', category: 'Juices', synonyms: ['orange juice'] },
    { id: 'cranberry-juice', label: 'Cranberry', category: 'Juices', synonyms: ['cranberry'] },
    { id: 'tomato-juice', label: 'Tomato Juice', category: 'Juices', synonyms: ['tomato juice'] },

    // Sweeteners / Syrups
    { id: 'sugar', label: 'Sugar', category: 'Sweeteners & Syrups', synonyms: ['sugar'] },
    { id: 'sugar-cube', label: 'Sugar Cube', category: 'Sweeteners & Syrups', synonyms: ['sugar cube'] },
    { id: 'simple-syrup', label: 'Syrup (Simple)', category: 'Sweeteners & Syrups', synonyms: ['syrup', 'sugar syrup'] },
    { id: 'maple-syrup', label: 'Maple Syrup', category: 'Sweeteners & Syrups', synonyms: ['maple syrup'] },
    { id: 'mint-syrup', label: 'Mint Syrup', category: 'Sweeteners & Syrups', synonyms: ['mint syrup'] },

    // Other
    { id: 'mint', label: 'Mint', category: 'Other', synonyms: ['mint'] },
    { id: 'lime', label: 'Fresh Lime', category: 'Other', synonyms: ['lime', 'lime wedge'] },
    { id: 'espresso', label: 'Espresso', category: 'Other', synonyms: ['fresh espresso', 'espresso'] },
    { id: 'heavy-cream', label: 'Heavy Cream', category: 'Other', synonyms: ['heavy cream'] },
    { id: 'spices', label: 'Spices', category: 'Other', synonyms: ['spices'] },
  ];

  const SNAPSHOT = global.BAR_INVENTORY_SNAPSHOT || { date: '2026-11-06', groups: [], items: [] };
  const catalogById = new Map(LEGACY_CATALOG.map(item => [item.id, item]));
  for (const item of SNAPSHOT.items) {
    const previous = catalogById.get(item.id);
    catalogById.set(item.id, {
      ...previous, id: item.id, label: item.labels.en,
      category: SNAPSHOT.groups[item.group].en,
      brand: item.brand, status: item.status, labels: item.labels,
      note: item.notes?.en || '',
      synonyms: [...new Set([...(previous?.synonyms || []), item.labels.en, item.id.replace(/-/g, ' ')])]
    });
  }
  catalogById.set('grenadine', { id: 'grenadine', label: 'Grenadine (confirmed identity)', category: 'Sweeteners & Syrups', synonyms: ['grenadine', 'grenadine syrup'] });
  catalogById.set('cola', { id: 'cola', label: 'Cola', category: 'Mixers & Soda', synonyms: ['cola'] });
  const CATALOG = [...catalogById.values()];

  // Any ingredient phrase containing these words is considered optional/garnish.
  const OPTIONAL_MARKERS = [
    'optional', 'garnish', 'twist', 'wedge', 'slice', 'rim', 'mint sprig', 'ice'
  ];

  const byId = new Map(CATALOG.map(i => [i.id, i]));

  const synonymToId = (() => {
    const m = new Map();
    for (const item of CATALOG) {
      for (const s of item.synonyms || []) {
        m.set(norm(s), item.id);
      }
    }
    return m;
  })();

  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[’']/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  function loadInventoryLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return new Set();
      return new Set(arr.filter(x => typeof x === 'string'));
    } catch {
      return new Set();
    }
  }

  function saveInventoryLocal(set) {
    const arr = Array.from(set || []);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  async function apiGetInventory() {
    const r = await fetch(`${API_BASE}/inventory`, { credentials: 'include' });
    if (!r.ok) throw new Error(`inventory ${r.status}`);
    const j = await r.json();
    const items = Array.isArray(j.items) ? j.items : [];
    return new Set(items.filter(x => typeof x === 'string'));
  }

  async function apiSaveInventory(set) {
    const items = Array.from(set || []);
    const r = await fetch(`${API_BASE}/inventory`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ items })
    });
    if (!r.ok) throw new Error(`save ${r.status}`);
    return true;
  }

  async function apiLogin(password) {
    const r = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password })
    });
    if (!r.ok) throw new Error(`login ${r.status}`);
    return true;
  }

  async function apiLogout() {
    await fetch(`${API_BASE}/logout`, { method: 'POST', credentials: 'include' });
  }

  function isOptionalPhrase(phrase) {
    const p = norm(phrase);
    return OPTIONAL_MARKERS.some(m => new RegExp(`\\b${m}\\b`).test(p));
  }

  // Strip amounts/units and parentheticals; keep words.
  function cleanPhrase(phrase) {
    let p = String(phrase || '').trim();
    p = p.replace(/\([^)]*\)/g, ' ');
    p = p.replace(/^\s*\d+(?:\.\d+)?\s*(ml|oz|cl|dashes?|dash|tsp|tbsp)\b\s*/i, '');
    p = p.replace(/^\s*\d+(?:\.\d+)?\s*/i, '');
    p = p.replace(/\s+/g, ' ').trim();
    return p;
  }

  /**
   * Extract requirement groups from a human ingredient string.
   * Returns: Array< Array<ingredientId> >
   * Each inner array means OR-substitution (any ingredient in group satisfies it).
   */
  function requirementGroups(ingredientsString) {
    const s = String(ingredientsString || '');
    if (!s) return [];

    const groups = [];
    const parts = s.split(',').map(x => x.trim()).filter(Boolean);

    for (const rawPart of parts) {
      const part = cleanPhrase(rawPart);
      if (!part) continue;
      if (isOptionalPhrase(part)) continue;

      // Handle basic OR substitutions: "X or Y"
      const lower = norm(part);
      const orSplit = lower.split(/\s+or\s+/i).map(x => x.trim()).filter(Boolean);
      if (orSplit.length > 1) {
        const altIds = new Set();
        for (const alt of orSplit) {
          const ids = ingredientIdsFromPhrase(alt);
          ids.forEach(id => altIds.add(id));
        }
        if (altIds.size) groups.push([...altIds]);
        continue;
      }

      const ids = ingredientIdsFromPhrase(lower);
      // If multiple ids in a single phrase (rare), treat as AND by pushing separate singleton groups.
      for (const id of ids) groups.push([id]);
    }

    return dedupeGroups(groups);
  }

  function ingredientIdsFromPhrase(phraseLower) {
    const phrase = norm(phraseLower);
    const exact = synonymToId.get(phrase);
    if (exact) return [exact];
    // Prefer the most specific complete phrase: ginger beer is not gin,
    // mint syrup is not plain syrup, and orange bitters are not aromatic bitters.
    const matches = [...synonymToId.entries()].sort((a, b) => b[0].length - a[0].length);
    for (const [syn, id] of matches) {
      const escaped = syn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp(`(^|[^a-z])${escaped}(?=$|[^a-z])`).test(phrase)) return [id];
    }
    // An unrecognized required ingredient must not silently pass the filter.
    return [`unknown:${phrase}`];
  }

  function dedupeGroups(groups) {
    const seen = new Set();
    const out = [];
    for (const g of groups) {
      const sorted = [...new Set(g)].sort();
      const key = sorted.join('|');
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(sorted);
    }
    return out;
  }

  const SUBSTITUTES = {
    gin: ['gin', 'gunpowder-gin'],
    rum: ['rum', 'white-rum', 'aged-rum', 'black-rum'],
    'orange-liqueur': ['orange-liqueur', 'dry-curacao'],
    bitters: ['bitters', 'angostura-bitters'],
    cola: ['cola', 'diet-pepsi']
  };

  function hasIngredient(id, inventorySet) {
    if (id.startsWith('unknown:')) return false;
    return (SUBSTITUTES[id] || [id]).some(candidate => inventorySet.has(candidate));
  }

  function missingIngredients(cocktail, inventorySet, locale = 'en') {
    const inv = inventorySet || loadInventoryLocal();
    return requirementGroups(cocktail?.en?.ingredients)
      .filter(group => !group.some(id => hasIngredient(id, inv)))
      .map(group => group.map(id => byId.get(id)?.labels?.[locale] || byId.get(id)?.label || id.replace(/^unknown:/, '')).join(' / '));
  }

  function isMakeable(cocktail, inventorySet) {
    const groups = requirementGroups(cocktail?.en?.ingredients);
    return groups.length > 0 && missingIngredients(cocktail, inventorySet).length === 0;
  }

  function categories() {
    const cats = new Map();
    for (const item of CATALOG) {
      if (!cats.has(item.category)) cats.set(item.category, []);
      cats.get(item.category).push(item);
    }
    // Sort categories and items for stable UI
    for (const [k, items] of cats.entries()) {
      items.sort((a, b) => a.label.localeCompare(b.label));
    }
    return cats;
  }

  global.BAR = {
    STORAGE_KEY,
    CATALOG,
    SNAPSHOT,
    missingIngredients,
    byId,
    categories,
    // local (legacy)
    loadInventoryLocal,
    saveInventoryLocal,

    // server API
    API_BASE,
    apiGetInventory,
    apiSaveInventory,
    apiLogin,
    apiLogout,

    requirementGroups,
    isMakeable,
  };
})(window);

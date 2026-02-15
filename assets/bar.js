/* bar.js
   Inventory + ingredient catalog for cocktails.khokhlov.org
   Storage: localStorage (browser-only)
*/

(function (global) {
  'use strict';

  const STORAGE_KEY = 'khokhlov_bar_inventory_v1';

  /** Ingredient catalog
   * id: stable identifier
   * label: display label
   * category: for grouping in /manage
   * synonyms: strings that may appear in cocktail ingredient phrases
   */
  const CATALOG = [
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
    { id: 'lime', label: 'Lime (wedge)', category: 'Other', synonyms: ['lime', 'lime wedge'] },
    { id: 'espresso', label: 'Espresso', category: 'Other', synonyms: ['fresh espresso', 'espresso'] },
    { id: 'heavy-cream', label: 'Heavy Cream', category: 'Other', synonyms: ['heavy cream'] },
    { id: 'spices', label: 'Spices', category: 'Other', synonyms: ['spices'] },
  ];

  // Any ingredient phrase containing these words is considered optional/garnish.
  const OPTIONAL_MARKERS = [
    'garnish', 'twist', 'wedge', 'slice', 'rim', 'mint sprig', 'ice'
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
      .replace(/[’']/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  function loadInventory() {
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

  function saveInventory(set) {
    const arr = Array.from(set || []);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function isOptionalPhrase(phrase) {
    const p = norm(phrase);
    return OPTIONAL_MARKERS.some(m => p.includes(m));
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
    const ids = new Set();

    // Exact synonym match first
    const exact = synonymToId.get(norm(phraseLower));
    if (exact) {
      ids.add(exact);
      return [...ids];
    }

    // Contains match (for phrases like "fresh espresso")
    for (const [syn, id] of synonymToId.entries()) {
      if (syn.length < 3) continue;
      if (norm(phraseLower).includes(syn)) ids.add(id);
    }

    // Filter out false positives: if phrase is just "lime" and we also matched lime-juice, keep both? not needed.
    return [...ids];
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

  function isMakeable(cocktail, inventorySet) {
    const inv = inventorySet || loadInventory();
    const groups = requirementGroups(cocktail?.en?.ingredients);
    if (!groups.length) {
      // If we can't infer requirements, be permissive (don’t hide the drink silently).
      return true;
    }
    return groups.every(group => group.some(id => inv.has(id)));
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
    byId,
    categories,
    loadInventory,
    saveInventory,
    requirementGroups,
    isMakeable,
  };
})(window);

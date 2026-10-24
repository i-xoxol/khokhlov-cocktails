# Khokhlov’s Bar · Spirits After Dark

A neon speakeasy cocktail menu, refreshed for Halloween 2026. Static HTML, CSS and JavaScript served by the existing nginx deployment at https://cocktails.khokhlov.org/.

- 38 illustrated recipes, including the Añejo Old Fashioned and Tequila Manhattan.
- English, Ukrainian, Slovak and Polish for the interface and recipes.
- Search by name or ingredient, spirit and mood filters, and a midnight collection.
- Saved favorites, language and unit preferences stored on the visitor’s device.
- Recipe links, metric/ounce conversion and quantities for 1–8 servings.
- Live ingredient availability from the existing `/_a/bar/inventory` API.
- Responsive layouts, keyboard accessible recipe dialog and reduced motion support.

## Local preview and checks

Requires Node.js 20+ and Python 3. Production needs neither; nginx serves static files.

```bash
npm ci
npx playwright install chromium
python3 tests/serve.py
```

In a second terminal:

```bash
npm run check
npm test
```

The local preview uses a small example inventory sufficient for the Añejo cocktail. Turn off “In the bar” to browse all recipes. Production continues to use the live inventory API. Set `TEST_BASE_URL` to test another preview origin and `TEST_EVIDENCE_DIR` to save screenshots and the check report.

Browser checks cover all 38 dialogs in four languages, image decoding, filters, favorites and persistence, recipe links, serving arithmetic, five responsive widths, reduced motion, unavailable storage/inventory, and automated WCAG AA audits.

## Source files

- `index.html` — semantic layout and recipe dialog.
- `assets/menu-halloween-2026.js` — complete four-language recipe data.
- `assets/halloween-2026.js` — translations, filters, preferences and recipe controls.
- `assets/halloween-2026.css` — seasonal design and responsive layout.
- `images/menu-2026/` — optimized WebP illustrations; the full menu is about 1.2 MB.
- `images/cocktails/` — original PNG artwork, including the generated Añejo image.
- `assets/bar.js`, `manage/` — existing inventory integration and management page.

Añejo’s default measures preserve the supplied 2 oz tequila, 0.25 oz syrup and 2 dashes bitters. Metric measures use conventional bar rounding (60 ml and 7.5 ml). Tequila Manhattan preserves 2 oz tequila, 0.75 oz sweet vermouth and 2 dashes orange bitters, with 60 ml and 22.5 ml metric measures. Other metric recipes use 30 ml per ounce for the unit switch. The serving control scales measured ingredients; garnish and unmeasured mixers remain as written. Alcohol strength is an estimate.

## Deployment

The existing nginx container bind-mounts `/home/igorx/apps/cocktails`. Develop and test in the feature worktree. Deploy the new, uniquely named asset directories first, then atomically replace `index.html` after checks pass. Keep a copy of the previous HTML for rollback. Existing `/manage`, `/minions`, `/game-room` and `/_a` routes remain served by the existing configuration.

The existing deployed working copy is preserved in a separate local snapshot. The feature branch starts from the current main branch and contains the seasonal update. Main is not merged by this work.

MIT license.

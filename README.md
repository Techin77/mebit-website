# MEBIT website

React 18 + MUI 6 + framer-motion, built with Vite. Thai is the default language, with an English toggle.

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve dist/
npm run text:check   # compare code text with website-text/*.md (what the site shows)
npm run text:export  # add new code text lines to website-text/*.md, keeping edits
```

`?lang=en` or `?lang=th` in the URL sets the language (e.g. `/?lang=en#/wallet`).

## Structure

| Path | What |
| --- | --- |
| `src/theme.ts` | MEBIT design-system tokens mapped to an MUI theme; spring presets |
| `src/i18n.tsx` | TH/EN context, number formatting |
| `website-text/*.md` | **Site text, edited in Obsidian.** Overrides the copy in `src/content` at build time — see `website-text/README.md`. |
| `src/content/*.ts` | Default copy (TH and EN) and the structure the text files map onto. |
| `src/content/common.ts` | External links (form, loan site, GitHub, store links) |
| `src/content/collateral.ts` | `loanRules`: loan limits, rates, fees used by the calculator |
| `src/components/` | NavBar, Footer, OrbitSymbol (hero animation), PillarCard, PhoneMockup, LoanCalculator, Blocks |
| `src/pages/` | Home, Wallet, Multisig, Collateral |
| `src/assets/` | Official logo SVGs from the MEBIT Design System — do not edit |

## Notes

- Routing uses `HashRouter` so `dist/` runs on any static host. Switch to `BrowserRouter` if the server rewrites to `index.html` (better URLs/SEO).
- Motion respects `prefers-reduced-motion`.
- `csstype` is pinned to 3.1.3 (package.json `overrides`) to avoid a type clash between csstype 3.2 and framer-motion 11.
- Thai headlines: phrases are kept unbroken (`<Phrases>`); add `​` in a long Thai phrase to allow a break there.

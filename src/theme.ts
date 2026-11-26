import { createTheme, type Theme } from '@mui/material/styles';
import type { Lang } from './i18n';

/** Tokens from the MEBIT Design System (claude.ai/artifact/EPEV8F2aDBr4aqjRUi9HdX). */
export const tokens = {
  navy: '#002B49', // Orbit Navy — structure, headings, hero grounds
  gold: '#FFBD59', // Mercury Gold — one primary action per view; never text on white
  slate: '#394E6C', // labels, data
  softGrey: '#EBEBEE', // quiet panels, dividers, muted text on navy
  charcoal: '#4D4D4D', // secondary text on white
  goldWash: '#FFF4E0', // light Mercury Gold ground (Bitcoin Collateral page sections)
  white: '#FFFFFF',
  space: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
  radius: { sm: 4, md: 8, lg: 16 },
  pageMax: 1200,
  measure: '65ch',
  /** Subtle, navy-tinted elevation. Used only where depth carries meaning. */
  shadow: {
    rest: '0 1px 2px rgba(0,43,73,0.06), 0 2px 8px -2px rgba(0,43,73,0.06)',
    raised: '0 2px 4px rgba(0,43,73,0.06), 0 18px 40px -16px rgba(0,43,73,0.22)',
    device: '0 30px 70px -30px rgba(0,43,73,0.45), 0 8px 20px -10px rgba(0,43,73,0.25)',
  },
} as const;

/** Spring presets for framer-motion. Calm, slightly damped — no bounce theatrics. */
export const springs = {
  soft: { type: 'spring', stiffness: 170, damping: 26, mass: 1 },
  snappy: { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 },
  drift: { type: 'spring', stiffness: 40, damping: 18, mass: 1.2 },
} as const;

const latin = 'Montserrat, "Noto Sans Thai", Inter, system-ui, sans-serif';
const thai = '"Noto Sans Thai", Montserrat, system-ui, sans-serif';

export function buildTheme(lang: Lang): Theme {
  const isTh = lang === 'th';
  // Thai needs taller leading for tone marks; Montserrat has no Thai glyphs so Noto Sans Thai leads.
  const body = isTh ? thai : latin;
  const lh = (latinLh: number, thaiLh: number) => (isTh ? thaiLh : latinLh);

  const base = createTheme({
    palette: {
      mode: 'light',
      primary: { main: tokens.navy, contrastText: tokens.white },
      secondary: { main: tokens.gold, contrastText: tokens.navy },
      text: { primary: tokens.navy, secondary: tokens.charcoal },
      background: { default: tokens.white, paper: tokens.white },
      divider: tokens.softGrey,
      grey: { 100: tokens.softGrey },
    },
    shape: { borderRadius: tokens.radius.md },
    spacing: 8,
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
    typography: {
      fontFamily: body,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: { fontFamily: latin, fontWeight: 700, fontSize: '3.5rem', lineHeight: lh(1.1, 1.35), letterSpacing: '-0.01em' },
      h2: { fontFamily: latin, fontWeight: 700, fontSize: '2.25rem', lineHeight: lh(1.22, 1.45) },
      h3: { fontFamily: latin, fontWeight: 600, fontSize: '1.375rem', lineHeight: lh(1.36, 1.55) },
      h4: { fontFamily: latin, fontWeight: 600, fontSize: '1.125rem', lineHeight: lh(1.4, 1.6) },
      subtitle1: { fontSize: '1.125rem', lineHeight: lh(1.67, 1.75), fontWeight: 400 },
      body1: { fontSize: '1rem', lineHeight: lh(1.625, 1.75) },
      body2: { fontSize: '0.875rem', lineHeight: lh(1.57, 1.7), fontWeight: 500 },
      overline: { fontFamily: latin, fontSize: '0.75rem', lineHeight: 1.4, fontWeight: 600, letterSpacing: '0.12em' },
      button: { fontFamily: latin, fontWeight: 600, letterSpacing: '0.04em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: { WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' },
          'h1, h2, h3': { textWrap: 'balance' },
          '::selection': { background: tokens.gold, color: tokens.navy },
          ':focus-visible': { outline: `2px solid ${tokens.navy}`, outlineOffset: 2 },
          '.on-brand :focus-visible': { outlineColor: tokens.gold },
          '.num': { fontVariantNumeric: 'tabular-nums' },
          '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.sm,
            paddingInline: 24,
            minHeight: 48,
            textTransform: 'none',
            fontSize: '0.9375rem',
          },
          containedSecondary: {
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            '&:hover': { backgroundColor: '#FFC873' },
          },
          outlined: { borderColor: tokens.slate, '&:hover': { borderColor: tokens.navy, background: 'rgba(0,43,73,0.04)' } },
        },
      },
      MuiPaper: { defaultProps: { elevation: 0 } },
      MuiSlider: {
        styleOverrides: {
          root: { height: 4 },
          thumb: { width: 20, height: 20, boxShadow: tokens.shadow.rest },
          rail: { opacity: 1, backgroundColor: tokens.softGrey },
        },
      },
      MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: tokens.navy, fontSize: 13 } } },
    },
  });

  // Responsive sizes per the design-system notes (display 36px / section 28px on phones).
  base.typography.h1 = { ...base.typography.h1, [base.breakpoints.down('sm')]: { fontSize: '2.25rem' } };
  base.typography.h2 = { ...base.typography.h2, [base.breakpoints.down('sm')]: { fontSize: '1.75rem' } };
  return base;
}

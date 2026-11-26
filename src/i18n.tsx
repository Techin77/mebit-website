import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'th' | 'en';
/** Every piece of copy is written in both languages side by side. Thai is the default. */
export type Bilingual<T> = { th: T; en: T };

const STORAGE_KEY = 'mebit.lang';

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const Ctx = createContext<LangCtx | null>(null);

function initialLang(): Lang {
  // ?lang=en / ?lang=th in the URL wins, so language-specific links can be shared.
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'th' || q === 'en') return q;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'th' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'th';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, toggle: () => setLang((l) => (l === 'th' ? 'en' : 'th')) }),
    [lang],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}

/** Pick the current language's half of a bilingual content object. */
export function useCopy<T>(content: Bilingual<T>): T {
  return content[useLang().lang];
}

const nf = (lang: Lang, opts?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', opts);

export const fmt = {
  thb: (lang: Lang, n: number) => `฿${nf(lang, { maximumFractionDigits: 0 }).format(Math.round(n))}`,
  int: (lang: Lang, n: number) => nf(lang, { maximumFractionDigits: 0 }).format(n),
  btc: (lang: Lang, n: number) =>
    `${nf(lang, { minimumFractionDigits: 8, maximumFractionDigits: 8 }).format(n)} BTC`,
  pct: (lang: Lang, n: number, digits = 1) =>
    `${nf(lang, { maximumFractionDigits: digits }).format(n)}%`,
};

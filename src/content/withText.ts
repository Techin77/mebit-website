import text from 'virtual:website-text';
import type { Bilingual } from '../i18n';

const CODE_FIELDS = ['key', 'tone'];

/**
 * Apply the text edited in Obsidian (mebit-website/website-text/*.md) over the text written in code.
 * Only existing text lines can be replaced: unknown headings are ignored, and numbers, links and
 * formulas stay in code. If a file or line is missing, the text in code is used.
 */
export function withText<T>(page: string, base: Bilingual<T>): Bilingual<T> {
  const edits = (text as Record<string, { th?: Record<string, string>; en?: Record<string, string> }>)[page];
  if (!edits) return base;
  const out = clone(base);
  for (const lang of ['th', 'en'] as const) {
    for (const [key, value] of Object.entries(edits[lang] ?? {})) {
      const parts = key.split('.');
      let cur: unknown = out[lang];
      for (const p of parts.slice(0, -1)) cur = cur && typeof cur === 'object' ? (cur as Record<string, unknown>)[p] : undefined;
      const last = parts[parts.length - 1];
      if (CODE_FIELDS.includes(last)) continue; // ids and style names stay in code
      if (cur && typeof cur === 'object' && typeof (cur as Record<string, unknown>)[last] === 'string') {
        (cur as Record<string, unknown>)[last] = value;
      }
    }
  }
  return out;
}

/** Deep copy of plain data; functions are kept by reference. */
function clone<V>(v: V): V {
  if (Array.isArray(v)) return v.map(clone) as V;
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, clone(x)])) as V;
  }
  return v;
}

// Website text <-> Obsidian Markdown.
//
// One .md file per page. Each piece of text is a "## " heading (where it goes on the site)
// followed by a TH: line and an EN: line. Example:
//
//   ## heroTitle
//   TH: การเป็นเจ้าของ<wbr>บิตคอยน์ ที่ทุกคนเข้าใจได้
//   EN: Bitcoin ownership, made understandable.
//
// Heading paths use " › " between levels and count list items from 1 ("pillars › 2 › title").
// <wbr> stands for an invisible "may break here" mark used in long Thai titles.
import fs from 'node:fs';
import path from 'node:path';

const SEP = ' › ';
const WBR = '​';

/** Page id -> file name in the text folder. */
export const PAGES = {
  home: 'Home.md',
  wallet: 'MEBIT Wallet.md',
  collateral: 'Bitcoin Collateral.md',
  multisig: 'Multisig Set-up.md',
  common: 'Shared - menu and footer.md',
};

const TITLES = {
  home: 'Home',
  wallet: 'MEBIT Wallet',
  collateral: 'Bitcoin Collateral',
  multisig: 'Multisig Set-up',
  common: 'Shared: menu, footer and labels used on every page',
};

const toMd = (s) => s.replaceAll(WBR, '<wbr>');
const fromMd = (s) => s.replaceAll('<wbr>', WBR);

/** Internal key "pillars.0.title" <-> heading "pillars › 1 › title". */
const keyToHeading = (k) => k.split('.').map((p) => (/^\d+$/.test(p) ? String(Number(p) + 1) : p)).join(SEP);
const headingToKey = (h) =>
  h
    .split(SEP)
    .map((p) => p.trim())
    .map((p) => (/^\d+$/.test(p) ? String(Number(p) - 1) : p))
    .join('.');

/** Fields that hold code values (ids, style names), not words: never exported for editing. */
export const CODE_FIELDS = ['key', 'tone'];

/** Every string leaf of an object, as { "a.0.b": "text" }. Functions, numbers and code fields are skipped. */
export function flatten(obj, prefix = '', out = {}) {
  if (CODE_FIELDS.includes(prefix.split('.').pop())) return out;
  if (typeof obj === 'string') {
    out[prefix] = obj;
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

/** Parse one page file -> { page, th: {key: text}, en: {key: text} }. */
export function parse(md) {
  const page = (md.match(/^---[\s\S]*?\npage:\s*([\w-]+)[\s\S]*?\n---/) || [])[1];
  const th = {};
  const en = {};
  let key = null;
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      key = headingToKey(h[1].trim());
      continue;
    }
    if (/^#\s/.test(line)) {
      key = null;
      continue;
    }
    const v = line.match(/^(TH|EN):\s?(.*)$/);
    if (v && key) (v[1] === 'TH' ? th : en)[key] = fromMd(v[2]);
  }
  return { page, th, en };
}

/** Write one page file from the code's own text, keeping anything already edited in an existing file. */
export function serialize(page, base, existing) {
  const th = flatten(base.th);
  const en = flatten(base.en);
  const keys = [...new Set([...Object.keys(th), ...Object.keys(en)])];
  const lines = [
    '---',
    `page: ${page}`,
    '---',
    '',
    `> **${TITLES[page]}** — website text. Change only what comes after \`TH:\` and \`EN:\`.`,
    '> Keep the `##` headings as they are: they tell the website where each line goes.',
    '> `<wbr>` is an invisible mark that lets a long Thai line break there. Saving updates the open preview.',
  ];
  // a "# group" heading only where several lines belong together (lists, nested blocks)
  const perTop = {};
  for (const k of keys) perTop[k.split('.')[0]] = (perTop[k.split('.')[0]] || 0) + 1;
  let section = null;
  for (const k of keys) {
    const top = k.split('.')[0];
    if (top !== section) {
      section = top;
      if (perTop[top] > 1) lines.push('', `# ${top}`);
    }
    const t = existing?.th[k] ?? th[k];
    const e = existing?.en[k] ?? en[k];
    lines.push('', `## ${keyToHeading(k)}`);
    if (t !== undefined) lines.push(`TH: ${toMd(t)}`);
    if (e !== undefined) lines.push(`EN: ${toMd(e)}`);
  }
  return lines.join('\n') + '\n';
}

/** Read the whole text folder -> { [page]: { th, en } }. Missing folder or files are fine. */
export function readAll(dir) {
  const out = {};
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const parsed = parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (parsed.page) out[parsed.page] = { th: parsed.th, en: parsed.en };
  }
  return out;
}

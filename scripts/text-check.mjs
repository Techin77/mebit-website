// Compares the text written in code (src/content) with the text edited in Obsidian (website-text/*.md).
// The website shows the Obsidian text; the code's text is only the fallback for a missing line.
//   npm run text:check            list every line where the two differ
//   npm run text:check -- --short counts only
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { PAGES, flatten, readAll } from './text-lib.mjs';

const short = process.argv.includes('--short');
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.resolve(root, 'website-text');

// Bundle the content modules with the text hook switched off, so we read the code's own text.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mebit-text-'));
const out = path.join(tmp, 'content.mjs');
await build({
  stdin: {
    contents: Object.keys(PAGES).map((p) => `export { ${p} } from './src/content/${p}';`).join('\n'),
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'error',
  plugins: [
    {
      name: 'no-text',
      setup(b) {
        b.onResolve({ filter: /^virtual:website-text$/ }, () => ({ path: 'x', namespace: 'no-text' }));
        b.onLoad({ filter: /.*/, namespace: 'no-text' }, () => ({ contents: 'export default {}', loader: 'js' }));
      },
    },
  ],
});
const mods = await import(pathToFileURL(out).href);
fs.rmSync(tmp, { recursive: true, force: true });

const md = readAll(dir);
const show = (s) => (s === '' ? '(empty)' : s);
const total = { differ: 0, codeOnly: 0, ignored: 0 };

for (const [page, file] of Object.entries(PAGES)) {
  const lines = [];
  for (const lang of ['th', 'en']) {
    const code = flatten(mods[page][lang]);
    const edited = md[page]?.[lang] ?? {};
    for (const [k, v] of Object.entries(code)) {
      if (!(k in edited)) {
        total.codeOnly++;
        lines.push(`  ${lang.toUpperCase()}  ${k}  — not in Obsidian, site uses code text:\n        ${show(v)}`);
      } else if (edited[k] !== v) {
        total.differ++;
        lines.push(`  ${lang.toUpperCase()}  ${k}\n        code:     ${show(v)}\n        obsidian: ${show(edited[k])}  ← shown`);
      }
    }
    for (const k of Object.keys(edited)) {
      if (!(k in code)) {
        total.ignored++;
        lines.push(`  ${lang.toUpperCase()}  ${k}  — heading not found in code, IGNORED by the site`);
      }
    }
  }
  if (!short && lines.length) console.log(`\n${file}\n${lines.join('\n')}`);
}

console.log(
  `\n${total.differ} lines differ (site shows the Obsidian text), ` +
    `${total.codeOnly} only in code, ${total.ignored} Obsidian headings ignored.`,
);
if (total.ignored) process.exitCode = 1;

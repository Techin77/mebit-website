// Creates (or tops up) the Obsidian text files from the text currently in src/content.
// Text already edited in Obsidian is kept; only missing lines are added.
//   npm run text:export
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { PAGES, parse, serialize } from './text-lib.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.resolve(root, 'website-text');
fs.mkdirSync(dir, { recursive: true });

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

for (const [page, file] of Object.entries(PAGES)) {
  const target = path.join(dir, file);
  const existing = fs.existsSync(target) ? parse(fs.readFileSync(target, 'utf8')) : null;
  fs.writeFileSync(target, serialize(page, mods[page], existing));
  console.log(`${existing ? 'updated' : 'created'}  website-text/${file}`);
}
fs.rmSync(tmp, { recursive: true, force: true });

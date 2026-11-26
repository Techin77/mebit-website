import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error plain JS helper shared with scripts/text-export.mjs
import { readAll } from './scripts/text-lib.mjs';

/** Website text lives in website-text/*.md (edit in Obsidian). Saving a file reloads the preview. */
const TEXT_DIR = path.resolve(__dirname, 'website-text');

function websiteText(): Plugin {
  const id = 'virtual:website-text';
  const resolved = '\0' + id;
  return {
    name: 'website-text',
    resolveId: (s) => (s === id ? resolved : undefined),
    load: (i) => (i === resolved ? `export default ${JSON.stringify(readAll(TEXT_DIR))};` : undefined),
    configureServer(server) {
      server.watcher.add(TEXT_DIR);
      const onFile = (file: string) => {
        if (!file.startsWith(TEXT_DIR) || !file.endsWith('.md')) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('change', onFile);
      server.watcher.on('add', onFile);
      server.watcher.on('unlink', onFile);
    },
  };
}

export default defineConfig({
  plugins: [react(), websiteText()],
  base: './',
});

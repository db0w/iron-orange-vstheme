// Generates themes/*.json from src/palettes.mjs + src/template.mjs.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { palettes } from '../src/palettes.mjs';
import { buildTheme } from '../src/template.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'themes');
mkdirSync(outDir, { recursive: true });

for (const palette of palettes) {
  const slug = palette.name.toLowerCase().replace(/\s+/g, '-');
  const file = join(outDir, `${slug}-color-theme.json`);
  const theme = buildTheme(palette);
  writeFileSync(file, `${JSON.stringify(theme, null, 2)}\n`);
  console.log(`✔ ${palette.name}: ${Object.keys(theme.colors).length} workbench colors, ${theme.tokenColors.length} token rules -> themes/${slug}-color-theme.json`);
}

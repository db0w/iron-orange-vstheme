// Renders images/icon.svg to the 128x128 PNG the Marketplace requires.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'images', 'icon.svg'), 'utf8');
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 128 } }).render().asPng();
writeFileSync(join(root, 'images', 'icon.png'), png);
console.log(`✔ images/icon.png (${png.length} bytes)`);

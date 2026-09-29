// Renders a mock VS Code window for each generated theme to preview/*.png,
// so palette tweaks can be judged without launching VS Code.
// With --readme it renders the README screenshots instead: images/screenshots/{dark,light}.png at 2x.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { palettes } from '../src/palettes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const forReadme = process.argv.includes('--readme');
const outDir = forReadme ? join(root, 'images', 'screenshots') : join(root, 'preview');
mkdirSync(outDir, { recursive: true });

const W = 1280;
const H = 800;
const TITLE_H = 32;
const STATUS_H = 24;
const ACT_W = 48;
const SIDE_W = 260;
const TABS_H = 36;
const CRUMB_H = 22;
const PANEL_H = 190;
const LINE_H = 22;
const FONT = 14;
const CHAR_W = FONT * 0.5498; // Consolas advance width
const GUTTER_W = 56;

const MONO = 'Consolas, monospace';
const UI = 'Segoe UI, sans-serif';

// Sample code as [role, text] segments. Roles map to palette.syntax keys;
// "this" gets the italic keyword style, like the real theme.
const CODE = [
  [['keyword', 'import'], ['punctuation', ' { '], ['variable', 'readFile'], ['punctuation', ' } '], ['keyword', 'from'], ['string', " 'node:fs/promises'"], ['punctuation', ';']],
  [],
  [['comment', '// Forge a metal alloy from raw ingredients']],
  [['decorator', '@sealed']],
  [['keyword', 'export class '], ['type', 'Alloy'], ['punctuation', '<'], ['type', 'T'], ['keyword', ' extends '], ['type', 'Metal'], ['punctuation', '>'], ['keyword', ' implements '], ['type', 'Forgeable'], ['punctuation', ' {']],
  [['variable', '  '], ['keyword', 'private readonly '], ['property', 'ratio'], ['punctuation', ': '], ['type', 'number'], ['operator', ' = '], ['number', '0.72'], ['punctuation', ';']],
  [],
  [['variable', '  '], ['keyword', 'constructor'], ['punctuation', '('], ['keyword', 'public '], ['parameter', 'name'], ['punctuation', ': '], ['type', 'string'], ['punctuation', ', '], ['parameter', 'parts'], ['punctuation', ': '], ['type', 'T'], ['punctuation', '[]) {']],
  [['variable', '    '], ['this', 'this'], ['punctuation', '.'], ['property', 'parts'], ['operator', ' = '], ['parameter', 'parts'], ['punctuation', '.'], ['func', 'filter'], ['punctuation', '(('], ['parameter', 'p'], ['punctuation', ') '], ['keyword', '=>'], ['variable', ' p'], ['punctuation', '.'], ['property', 'purity'], ['operator', ' > '], ['number', '0.9'], ['punctuation', ');']],
  [['variable', '  '], ['punctuation', '}']],
  [],
  [['variable', '  '], ['keyword', 'async '], ['func', 'forge'], ['punctuation', '('], ['parameter', 'temp'], ['operator', ' = '], ['number', '1538'], ['punctuation', '): '], ['type', 'Promise'], ['punctuation', '<'], ['type', 'Ingot'], ['punctuation', '> {']],
  [['variable', '    '], ['keyword', 'if'], ['punctuation', ' ('], ['parameter', 'temp'], ['operator', ' < '], ['variable', 'MELTING_POINT'], ['punctuation', ') '], ['keyword', 'throw new '], ['type', 'Error'], ['punctuation', '('], ['string', '`Too cold: '], ['keyword', '${'], ['parameter', 'temp'], ['keyword', '}'], ['string', '°C`'], ['punctuation', ');']],
  [['variable', '    '], ['keyword', 'const '], ['variable', 'data'], ['operator', ' = '], ['keyword', 'await '], ['func', 'readFile'], ['punctuation', '('], ['string', "'./ores.json'"], ['punctuation', ', '], ['string', "'utf8'"], ['punctuation', ');']],
  [['variable', '    '], ['keyword', 'return'], ['punctuation', ' { '], ['property', 'name'], ['punctuation', ': '], ['this', 'this'], ['punctuation', '.'], ['property', 'name'], ['punctuation', ', '], ['property', 'weight'], ['punctuation', ': '], ['variable', 'data'], ['punctuation', '.'], ['property', 'length'], ['operator', ' * '], ['this', 'this'], ['punctuation', '.'], ['property', 'ratio'], ['punctuation', ', '], ['property', 'ok'], ['punctuation', ': '], ['constant', 'true'], ['punctuation', ' };']],
  [['variable', '  '], ['punctuation', '}']],
  [['punctuation', '}']],
];
const CURSOR = { line: 11, col: 13 }; // after "forge" in "async forge(...)"
// Multi-line selection over the comment, the decorator and the class line (0-based lines, columns).
const SELECTION = [[2, 0, 45], [3, 0, 8], [4, 0, 58]];
const FIND_MATCH = { line: 13, from: 23, to: 31 }; // "readFile" in the readFile(...) call
const FIND_HIGHLIGHT = { line: 0, from: 9, to: 17 }; // the other "readFile"

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '\u00A0');

/** resvg-friendly color: #RRGGBBAA -> rgba(). */
function col(hex) {
  if (hex.length !== 9) return hex;
  const n = (i) => parseInt(hex.slice(i, i + 2), 16);
  return `rgba(${n(1)},${n(3)},${n(5)},${(n(7) / 255).toFixed(3)})`;
}

function render(theme, palette) {
  const c = (key) => col(theme.colors[key]);
  const s = palette.syntax;
  const out = [];
  const rect = (x, y, w, h, fill, extra = '') => out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`);
  const text = (x, y, str, fill, { size = 13, family = UI, weight = 400, anchor = 'start', style = 'normal' } = {}) =>
    out.push(`<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" font-style="${style}" text-anchor="${anchor}">${esc(str)}</text>`);

  const editorX = ACT_W + SIDE_W;
  const editorY = TITLE_H + TABS_H + CRUMB_H;
  const panelY = H - STATUS_H - PANEL_H;

  // Title bar
  rect(0, 0, W, TITLE_H, c('titleBar.activeBackground'));
  rect(0, TITLE_H - 1, W, 1, c('titleBar.border'));
  rect(W / 2 - 180, 5, 360, 22, c('commandCenter.background'), `rx="6" stroke="${c('commandCenter.border')}"`);
  text(W / 2, 21, 'iron_orange', c('commandCenter.foreground'), { anchor: 'middle', size: 12 });
  [0, 1, 2].forEach((i) => out.push(`<circle cx="${W - 70 + i * 22}" cy="16" r="5" fill="${c('titleBar.activeForeground')}" fill-opacity="0.35"/>`));

  // Activity bar
  rect(0, TITLE_H, ACT_W, H - TITLE_H - STATUS_H, c('activityBar.background'));
  rect(ACT_W - 1, TITLE_H, 1, H - TITLE_H - STATUS_H, c('activityBar.border'));
  for (let i = 0; i < 5; i++) {
    const y = TITLE_H + 12 + i * 48;
    const active = i === 0;
    if (active) rect(0, y - 6, 2, 36, c('activityBar.activeBorder'));
    rect(14, y + 2, 20, 20, active ? c('activityBar.foreground') : c('activityBar.inactiveForeground'), 'rx="4" fill-opacity="0.9"');
  }
  out.push(`<circle cx="36" cy="${TITLE_H + 12 + 48 * 2 + 20}" r="8" fill="${c('activityBarBadge.background')}"/>`);
  text(36, TITLE_H + 12 + 48 * 2 + 24, '3', c('activityBarBadge.foreground'), { size: 10, anchor: 'middle', weight: 700 });

  // Side bar
  rect(ACT_W, TITLE_H, SIDE_W, H - TITLE_H - STATUS_H, c('sideBar.background'));
  rect(ACT_W + SIDE_W - 1, TITLE_H, 1, H - TITLE_H - STATUS_H, c('sideBar.border'));
  text(ACT_W + 20, TITLE_H + 24, 'EXPLORER', c('sideBarTitle.foreground'), { size: 11 });
  text(ACT_W + 12, TITLE_H + 52, 'IRON_ORANGE', c('sideBarSectionHeader.foreground'), { size: 11, weight: 700 });
  const files = [
    ['images', 'sideBar.foreground', 1],
    ['icon.png', 'sideBar.foreground', 2],
    ['src', 'sideBar.foreground', 1],
    ['palettes.mjs', 'gitDecoration.modifiedResourceForeground', 2, 'M'],
    ['template.mjs', 'sideBar.foreground', 2, '', true],
    ['themes', 'gitDecoration.untrackedResourceForeground', 1],
    ['iron-orange-dark-color-theme.json', 'gitDecoration.untrackedResourceForeground', 2, 'U'],
    ['CHANGELOG.md', 'gitDecoration.ignoredResourceForeground', 1],
    ['package.json', 'sideBar.foreground', 1],
    ['README.md', 'gitDecoration.addedResourceForeground', 1, 'A'],
  ];
  files.forEach(([name, key, depth, badge, selected], i) => {
    const y = TITLE_H + 64 + i * 24;
    if (selected) {
      rect(ACT_W, y, SIDE_W - 1, 24, c('list.activeSelectionBackground'));
      rect(ACT_W, y, SIDE_W - 1, 24, 'none', `stroke="${c('list.focusOutline')}"`);
    }
    text(ACT_W + 8 + depth * 14, y + 17, name, c(key));
    if (badge) text(ACT_W + SIDE_W - 20, y + 17, badge, c(key), { anchor: 'middle', size: 12 });
  });

  // Tabs
  rect(editorX, TITLE_H, W - editorX, TABS_H, c('editorGroupHeader.tabsBackground'));
  rect(editorX, TITLE_H + TABS_H - 1, W - editorX, 1, c('editorGroupHeader.tabsBorder'));
  const tabs = [['alloy.ts', true], ['palettes.mjs', false], ['README.md', false]];
  let tx = editorX;
  for (const [name, active] of tabs) {
    const w = 150;
    rect(tx, TITLE_H, w, TABS_H, active ? c('tab.activeBackground') : c('tab.inactiveBackground'));
    rect(tx + w - 1, TITLE_H, 1, TABS_H, c('tab.border'));
    if (active) rect(tx, TITLE_H, w, 2, c('tab.activeBorderTop'));
    text(tx + 16, TITLE_H + 23, name, active ? c('tab.activeForeground') : c('tab.inactiveForeground'));
    tx += w;
  }

  // Breadcrumbs + editor
  rect(editorX, TITLE_H + TABS_H, W - editorX, panelY - TITLE_H - TABS_H, c('editor.background'));
  text(editorX + 16, TITLE_H + TABS_H + 15, 'src  ›  alloy.ts  ›  Alloy  ›  forge', c('breadcrumb.foreground'), { size: 12 });

  const codeX = editorX + GUTTER_W + 12;
  CODE.forEach((segments, i) => {
    const y = editorY + 6 + i * LINE_H;
    if (i === CURSOR.line) rect(editorX, y, W - editorX, LINE_H, c('editor.lineHighlightBackground'));
    for (const [line, from, to] of SELECTION) {
      if (line === i) rect(codeX + from * CHAR_W, y, (to - from) * CHAR_W, LINE_H, c('editor.selectionBackground'));
    }
    if (i === FIND_HIGHLIGHT.line) rect(codeX + FIND_HIGHLIGHT.from * CHAR_W, y + 1, (FIND_HIGHLIGHT.to - FIND_HIGHLIGHT.from) * CHAR_W, LINE_H - 2, c('editor.findMatchHighlightBackground'), 'rx="2"');
    if (i === FIND_MATCH.line) rect(codeX + FIND_MATCH.from * CHAR_W, y + 1, (FIND_MATCH.to - FIND_MATCH.from) * CHAR_W, LINE_H - 2, c('editor.findMatchBackground'), `rx="2" stroke="${c('editor.findMatchBorder')}"`);
    text(editorX + GUTTER_W - 8, y + 16, String(i + 1), i === CURSOR.line ? c('editorLineNumber.activeForeground') : c('editorLineNumber.foreground'), { family: MONO, size: FONT, anchor: 'end' });
    const spans = segments
      .map(([role, str]) => {
        const italic = role === 'this' || role === 'comment' || role === 'parameter';
        const fill = role === 'this' ? s.keyword : s[role];
        return `<tspan fill="${fill}"${italic ? ' font-style="italic"' : ''}>${esc(str)}</tspan>`;
      })
      .join('');
    if (spans) out.push(`<text x="${codeX}" y="${y + 16}" font-family="${MONO}" font-size="${FONT}">${spans}</text>`);
    if (i === CURSOR.line) rect(codeX + CURSOR.col * CHAR_W, y + 2, 2, LINE_H - 4, c('editorCursor.foreground'));
  });
  // Indent guides
  for (const [from, to] of [[5, 16], [8, 9], [12, 15]]) {
    const depth = from === 5 ? 0 : 1;
    rect(codeX + (depth * 2) * CHAR_W + 1, editorY + 6 + from * LINE_H, 1, (to - from) * LINE_H, depth === 1 && from === 12 ? c('editorIndentGuide.activeBackground1') : c('editorIndentGuide.background1'));
  }

  // Hover widget
  const hx = codeX + 40 * CHAR_W; // anchored to "Error" on line 13
  const hy = editorY + 6 + 12 * LINE_H + 26;
  rect(hx, hy, 380, 56, c('editorHoverWidget.background'), `rx="4" stroke="${c('editorHoverWidget.border')}"`);
  out.push(`<text x="${hx + 12}" y="${hy + 22}" font-family="${MONO}" font-size="13"><tspan fill="${s.keyword}">var </tspan><tspan fill="${s.variable}">Error</tspan><tspan fill="${s.punctuation}">: </tspan><tspan fill="${s.type}">ErrorConstructor</tspan></text>`);
  text(hx + 12, hy + 44, 'Creates a new Error object.', c('editorHoverWidget.foreground'), { size: 12 });

  // Panel with terminal
  rect(editorX, panelY, W - editorX, PANEL_H, c('panel.background'));
  rect(editorX, panelY, W - editorX, 1, c('panel.border'));
  [['PROBLEMS', false], ['OUTPUT', false], ['TERMINAL', true]].forEach(([name, active], i) => {
    const x = editorX + 20 + i * 96;
    text(x, panelY + 24, name, active ? c('panelTitle.activeForeground') : c('panelTitle.inactiveForeground'), { size: 11 });
    if (active) rect(x, panelY + 31, 64, 1, c('panelTitle.activeBorder'));
  });
  const term = [
    [['ansiBrightBlack', 'PS D:\\iron_orange> '], ['foreground', 'npm run check']],
    [['ansiGreen', '  ✔ All contrast checks passed']],
    [['ansiYellow', '  ⚠ 2 warnings  '], ['ansiRed', '✘ 0 errors  '], ['ansiBlue', 'info '], ['ansiMagenta', 'debug '], ['ansiCyan', 'trace']],
    [['ansiBrightBlack', 'PS D:\\iron_orange> '], ['foreground', 'git status --short']],
    [['ansiRed', ' M src/palettes.mjs  '], ['ansiGreen', '?? themes/']],
  ];
  term.forEach((segments, i) => {
    const spans = segments
      .map(([key, str]) => `<tspan fill="${key === 'foreground' ? c('terminal.foreground') : c(`terminal.${key}`)}">${esc(str)}</tspan>`)
      .join('');
    out.push(`<text x="${editorX + 20}" y="${panelY + 60 + i * 22}" font-family="${MONO}" font-size="13">${spans}</text>`);
  });
  rect(editorX + 20 + 19 * 7.15, panelY + 60 + 4 * 22 + 8, 8, 16, c('terminalCursor.foreground'));

  // Status bar
  const sy = H - STATUS_H;
  rect(0, sy, W, STATUS_H, c('statusBar.background'));
  rect(0, sy, W, 1, c('statusBar.border'));
  rect(0, sy + 1, 36, STATUS_H - 1, c('statusBarItem.remoteBackground'));
  text(18, sy + 17, '><', c('statusBarItem.remoteForeground'), { anchor: 'middle', size: 12, weight: 700 });
  text(48, sy + 17, '⎇ main*    ⊗ 0  ⚠ 2', c('statusBar.foreground'), { size: 12 });
  text(W - 16, sy + 17, 'Ln 12, Col 14    Spaces: 2    UTF-8    TypeScript', c('statusBar.foreground'), { size: 12, anchor: 'end' });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${out.join('')}</svg>`;
}

for (const file of readdirSync(join(root, 'themes')).filter((f) => f.endsWith('.json'))) {
  const theme = JSON.parse(readFileSync(join(root, 'themes', file), 'utf8'));
  const palette = palettes.find((p) => p.name === theme.name);
  const svg = render(theme, palette);
  const png = new Resvg(svg, {
    font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' },
    ...(forReadme && { fitTo: { mode: 'zoom', value: 2 } }),
  }).render().asPng();
  const name = forReadme ? `${palette.type}.png` : file.replace('-color-theme.json', '.png');
  const out = join(outDir, name);
  writeFileSync(out, png);
  console.log(`✔ ${out}`);
}

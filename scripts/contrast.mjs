// Checks WCAG contrast ratios on the generated themes (themes/*.json).
// Exits with code 1 if any pair falls below its threshold.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const themesDir = join(root, 'themes');

const TEXT = 4.5; // WCAG AA for normal text
const MAIN_TEXT = 7; // WCAG AAA, used for primary text
const SUBDUED = 3; // line numbers, placeholders, inactive icons

function parse(hex) {
  const h = hex.replace('#', '');
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}

/** Composites a possibly translucent color over an opaque background. */
function over(fgHex, bgHex) {
  const f = parse(fgHex);
  const b = parse(bgHex);
  const mix = (x, y) => Math.round(x * f.a + y * (1 - f.a));
  const c = { r: mix(f.r, b.r), g: mix(f.g, b.g), b: mix(f.b, b.b) };
  return `#${[c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function luminance(hex) {
  const { r, g, b } = parse(hex);
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fgHex, bgHex) {
  const bg = over(bgHex, '#000000');
  const fg = over(fgHex, bg);
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [label, foreground key, background key, minimum]
const UI_PAIRS = [
  ['editor text', 'editor.foreground', 'editor.background', MAIN_TEXT],
  ['editor text on selection', 'editor.foreground', ['editor.selectionBackground', 'editor.background'], MAIN_TEXT],
  ['editor text on current line', 'editor.foreground', ['editor.lineHighlightBackground', 'editor.background'], MAIN_TEXT],
  ['editor text on inactive selection', 'editor.foreground', ['editor.inactiveSelectionBackground', 'editor.background'], MAIN_TEXT],
  ['editor text on find match', 'editor.foreground', ['editor.findMatchBackground', 'editor.background'], TEXT],
  ['terminal text on selection', 'terminal.foreground', ['terminal.selectionBackground', 'terminal.background'], MAIN_TEXT],
  ['line numbers', 'editorLineNumber.foreground', 'editor.background', SUBDUED],
  ['active line number', 'editorLineNumber.activeForeground', 'editor.background', TEXT],
  ['links', 'textLink.foreground', 'editor.background', TEXT],
  ['side bar text', 'sideBar.foreground', 'sideBar.background', MAIN_TEXT],
  ['side bar title', 'sideBarTitle.foreground', 'sideBar.background', TEXT],
  ['list match highlight', 'list.highlightForeground', 'sideBar.background', TEXT],
  ['list selection text', 'list.activeSelectionForeground', ['list.activeSelectionBackground', 'sideBar.background'], MAIN_TEXT],
  ['active tab', 'tab.activeForeground', 'tab.activeBackground', MAIN_TEXT],
  ['inactive tab', 'tab.inactiveForeground', 'tab.inactiveBackground', TEXT],
  ['breadcrumbs', 'breadcrumb.foreground', 'breadcrumb.background', TEXT],
  ['activity bar icons', 'activityBar.foreground', 'activityBar.background', TEXT],
  ['inactive activity icons', 'activityBar.inactiveForeground', 'activityBar.background', SUBDUED],
  ['activity badge', 'activityBarBadge.foreground', 'activityBarBadge.background', TEXT],
  ['badge', 'badge.foreground', 'badge.background', TEXT],
  ['button', 'button.foreground', 'button.background', TEXT],
  ['button hover', 'button.foreground', 'button.hoverBackground', TEXT],
  ['secondary button', 'button.secondaryForeground', 'button.secondaryBackground', TEXT],
  ['extension button', 'extensionButton.prominentForeground', 'extensionButton.prominentBackground', TEXT],
  ['input text', 'input.foreground', 'input.background', MAIN_TEXT],
  ['input placeholder', 'input.placeholderForeground', 'input.background', SUBDUED],
  ['widget text', 'editorWidget.foreground', 'editorWidget.background', MAIN_TEXT],
  ['suggest match', 'editorSuggestWidget.highlightForeground', 'editorSuggestWidget.background', TEXT],
  ['menu text', 'menu.foreground', 'menu.background', MAIN_TEXT],
  ['title bar', 'titleBar.activeForeground', 'titleBar.activeBackground', TEXT],
  ['inactive title bar', 'titleBar.inactiveForeground', 'titleBar.inactiveBackground', SUBDUED],
  ['command center', 'commandCenter.foreground', 'commandCenter.background', TEXT],
  ['status bar', 'statusBar.foreground', 'statusBar.background', TEXT],
  ['status bar remote', 'statusBarItem.remoteForeground', 'statusBarItem.remoteBackground', TEXT],
  ['status bar remote hover', 'statusBarItem.remoteHoverForeground', ['statusBarItem.remoteHoverBackground', 'statusBar.background'], TEXT],
  ['status bar item hover', 'statusBarItem.hoverForeground', ['statusBarItem.hoverBackground', 'statusBar.background'], TEXT],
  ['status bar debugging', 'statusBar.debuggingForeground', 'statusBar.debuggingBackground', TEXT],
  ['status bar error item', 'statusBarItem.errorForeground', 'statusBarItem.errorBackground', TEXT],
  ['status bar warning item', 'statusBarItem.warningForeground', 'statusBarItem.warningBackground', TEXT],
  ['banner', 'banner.foreground', 'banner.background', TEXT],
  ['panel title', 'panelTitle.activeForeground', 'panel.background', MAIN_TEXT],
  ['terminal text', 'terminal.foreground', 'terminal.background', MAIN_TEXT],
];

// ANSI black/white are allowed to be low contrast by design (they are the
// "background-ish" and "foreground-ish" ends of the terminal palette).
const ANSI_EXEMPT = new Set(['Black', 'BrightBlack', 'White', 'BrightWhite']);

let failures = 0;
const pad = (s, n) => String(s).padEnd(n);

function report(label, fg, bg, min) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failures++;
  console.log(`  ${ok ? '✔' : '✘'} ${pad(label, 34)} ${pad(fg, 10)} on ${pad(bg, 10)} ${r.toFixed(2).padStart(6)}:1  (min ${min})`);
}

for (const file of readdirSync(themesDir).filter((f) => f.endsWith('.json'))) {
  const theme = JSON.parse(readFileSync(join(themesDir, file), 'utf8'));
  const c = theme.colors;
  const resolve = (key) => (Array.isArray(key) ? over(c[key[0]], c[key[1]]) : c[key]);
  const editorBg = c['editor.background'];

  console.log(`\n${theme.name}`);
  console.log(' Workbench');
  for (const [label, fgKey, bgKey, min] of UI_PAIRS) {
    const fg = resolve(fgKey);
    const bg = resolve(bgKey);
    if (!fg || !bg) {
      failures++;
      console.log(`  ✘ ${label}: missing key ${!fg ? fgKey : bgKey}`);
      continue;
    }
    report(label, fg, bg, min);
  }

  // Syntax must stay readable both on the plain editor and on selected text.
  const surfaces = [
    ['on editor background', editorBg],
    ['on selection', over(c['editor.selectionBackground'], editorBg)],
  ];
  for (const [where, bg] of surfaces) {
    console.log(` Syntax (${where})`);
    const seen = new Set();
    for (const rule of theme.tokenColors) {
      const fg = rule.settings.foreground;
      if (!fg || seen.has(rule.name)) continue;
      seen.add(rule.name);
      report(rule.name, fg, bg, TEXT);
    }
    for (const [token, style] of Object.entries(theme.semanticTokenColors)) {
      const fg = typeof style === 'string' ? style : style.foreground;
      if (fg) report(`semantic: ${token}`, fg, bg, TEXT);
    }
  }

  console.log(' Terminal ANSI (on terminal background)');
  const termBg = c['terminal.background'];
  for (const [key, color] of Object.entries(c)) {
    const name = key.match(/^terminal\.ansi(\w+)$/)?.[1];
    if (!name || ANSI_EXEMPT.has(name)) continue;
    report(`ansi ${name}`, color, termBg, TEXT);
  }
}

if (failures) {
  console.error(`\n✘ ${failures} contrast check(s) below threshold`);
  process.exit(1);
}
console.log('\n✔ All contrast checks passed');

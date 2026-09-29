# Iron Orange

A metallic orange theme for Visual Studio Code: copper and mandarin surfaces, orange bars and high-contrast text.

Iron Orange comes in two variants:

- **Iron Orange Dark**: bright copper base framed by light orange title, activity and status bars, with warm cream text and a gunmetal selection.
- **Iron Orange Light**: soft mandarin base, orange title and activity bars, a copper status bar and near-black text.

Every syntax color meets WCAG AA contrast (at least 4.5:1) against the editor background and on selected text, and the main text reaches AAA (at least 7:1). A script checks this on every build.

## Install

1. Open the Extensions view (`Ctrl+Shift+X`).
2. Search for **Iron Orange** and click **Install**.
3. Open the theme picker (`Ctrl+K Ctrl+T`) and choose **Iron Orange Dark** or **Iron Orange Light**.

You can also install it from the Command Palette with `ext install db0w.iron-orange`.

### Sync across machines

With Settings Sync turned on (**Accounts → Backup and Sync Settings**, with *Extensions* and *Settings* selected), other machines install Iron Orange and switch to the selected theme automatically.

## Palette

The syntax colors are drawn from metals: copper, brass, amber and steel.

| Role | Dark | Light |
|---|---|---|
| Editor background | `#5C2E0E` | `#FFE8D1` |
| Title and activity bars | `#FF9B55` | `#E97A2A` / `#F59346` |
| Status bar | `#FF9B55` | `#9C4209` |
| Selection | `#121417` at 60% | `#D66014` at 20% |
| Text | `#FFF6EE` | `#241005` |
| Accent | `#FFA766` | `#D66014` |
| Keywords | `#FF9B55` | `#9E3800` |
| Functions | `#FFC894` | `#8A3A0A` |
| Strings | `#CFE8B4` | `#566010` |
| Types and classes | `#A6D3E8` | `#1F5F82` |
| Numbers | `#FFD66B` | `#7F5100` |
| Constants | `#F7AE9A` | `#A33129` |
| Comments | `#C19F87` | `#6C5546` |

## Customizing

You can override any color in your `settings.json`:

```jsonc
"workbench.colorCustomizations": {
  "[Iron Orange Dark]": {
    "statusBar.border": "#00000000"
  }
},
"editor.tokenColorCustomizations": {
  "[Iron Orange Dark]": {
    "comments": "#9AA1AC"
  }
}
```

## Development

The theme JSON files are generated. Edit `src/palettes.mjs` (colors) or `src/template.mjs` (color-to-key mapping), then run:

| Command | What it does |
|---|---|
| `npm run build` | Generates `themes/*.json` |
| `npm run check` | Checks WCAG contrast and fails if a color is below its threshold |
| `npm run preview` | Renders a mock editor for each variant to `preview/*.png` |
| `npm run icon` | Renders `images/icon.svg` to `images/icon.png` |
| `npm run package` | Builds, checks and packages the `.vsix` |

Press `F5` in VS Code to open an Extension Development Host with the `samples/` folder, so you can see the theme on real code.

## License

MIT

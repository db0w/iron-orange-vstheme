<p align="center">
  <img src="images/icon.png" width="128" alt="Iron Orange icon">
</p>

<h1 align="center">Iron Orange</h1>

<p align="center">
  A metallic orange theme for Visual Studio Code: copper and mandarin surfaces, orange bars,<br>
  and text that stays readable everywhere, including inside selections.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=db0w.iron-orange"><img src="https://vsmarketplacebadges.dev/version-short/db0w.iron-orange.svg?style=flat-square&color=B8531A&labelColor=5C2E0E" alt="Marketplace version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=db0w.iron-orange"><img src="https://vsmarketplacebadges.dev/installs-short/db0w.iron-orange.svg?style=flat-square&color=B8531A&labelColor=5C2E0E" alt="Installs"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=db0w.iron-orange&ssr=false#review-details"><img src="https://vsmarketplacebadges.dev/rating-star/db0w.iron-orange.svg?style=flat-square&color=B8531A&labelColor=5C2E0E" alt="Rating"></a>
  <a href="https://github.com/db0w/iron-orange-vstheme/stargazers"><img src="https://img.shields.io/github/stars/db0w/iron-orange-vstheme?style=flat-square&logo=github&color=B8531A&labelColor=5C2E0E" alt="GitHub stars"></a>
  <a href="https://github.com/db0w/iron-orange-vstheme/forks"><img src="https://img.shields.io/github/forks/db0w/iron-orange-vstheme?style=flat-square&logo=github&color=B8531A&labelColor=5C2E0E" alt="GitHub forks"></a>
  <a href="https://github.com/db0w/iron-orange-vstheme/blob/main/LICENSE"><img src="https://img.shields.io/github/license/db0w/iron-orange-vstheme?style=flat-square&color=B8531A&labelColor=5C2E0E" alt="License"></a>
</p>

## Iron Orange Dark

![Iron Orange Dark: a copper editor framed by light orange bars](images/screenshots/dark.png)

## Iron Orange Light

![Iron Orange Light: a soft mandarin editor with orange bars and a copper status bar](images/screenshots/light.png)

## Highlights

- **Two variants, one family.** *Dark* puts a bright copper editor inside light orange title, activity and status bars. *Light* pairs a soft mandarin editor with orange bars and a deep copper status bar.
- **Contrast you can rely on.** Every syntax color reaches at least 4.5:1 (WCAG AA) against the editor background, and the main text reaches at least 7:1 (WCAG AAA). 360 automated checks run on every build, so a palette change can't ship if it breaks readability.
- **Selections that stay readable.** Most themes lose contrast when you select code. Iron Orange checks every syntax color on top of the selection too. The dark variant uses a translucent gunmetal selection that makes selected text *more* legible, not less.
- **A metallic palette.** Keywords in orange, functions in light copper, strings in patina green, types in steel blue, numbers in amber, constants in rose copper.
- **Complete coverage.** 453 workbench colors per variant, the full 16-color terminal palette, bracket pair colorization and semantic highlighting.

## Installation

1. Open the **Extensions** view (`Ctrl+Shift+X` on Windows and Linux, `Cmd+Shift+X` on macOS).
2. Search for **Iron Orange** and select **Install**.

You can also use Quick Open (`Ctrl+P` / `Cmd+P`):

```
ext install db0w.iron-orange
```

Or the command line:

```bash
code --install-extension db0w.iron-orange
```

## Usage

Open the theme picker with `Ctrl+K Ctrl+T` (`Cmd+K Cmd+T` on macOS) and choose **Iron Orange Dark** or **Iron Orange Light**.

To follow your operating system's light or dark mode automatically, add this to your `settings.json`:

```jsonc
{
  "window.autoDetectColorScheme": true,
  "workbench.preferredDarkColorTheme": "Iron Orange Dark",
  "workbench.preferredLightColorTheme": "Iron Orange Light"
}
```

With [Settings Sync](https://code.visualstudio.com/docs/configure/settings-sync) turned on (with *Extensions* and *Settings* selected), your other machines install Iron Orange and switch to it automatically.

## Palette

| Role | Dark | Light |
|---|---|---|
| Editor background | ![5C2E0E](https://img.shields.io/badge/%20-5C2E0E?style=flat-square) `#5C2E0E` | ![FFE8D1](https://img.shields.io/badge/%20-FFE8D1?style=flat-square) `#FFE8D1` |
| Side bar and panel | ![4F270C](https://img.shields.io/badge/%20-4F270C?style=flat-square) `#4F270C` | ![FFDDBC](https://img.shields.io/badge/%20-FFDDBC?style=flat-square) `#FFDDBC` |
| Title and activity bars | ![FF9B55](https://img.shields.io/badge/%20-FF9B55?style=flat-square) `#FF9B55` | ![E97A2A](https://img.shields.io/badge/%20-E97A2A?style=flat-square) `#E97A2A` / `#F59346` |
| Status bar | ![FF9B55](https://img.shields.io/badge/%20-FF9B55?style=flat-square) `#FF9B55` | ![9C4209](https://img.shields.io/badge/%20-9C4209?style=flat-square) `#9C4209` |
| Selection | ![121417](https://img.shields.io/badge/%20-121417?style=flat-square) `#121417` at 60% | ![D66014](https://img.shields.io/badge/%20-D66014?style=flat-square) `#D66014` at 20% |
| Text | ![FFF6EE](https://img.shields.io/badge/%20-FFF6EE?style=flat-square) `#FFF6EE` | ![241005](https://img.shields.io/badge/%20-241005?style=flat-square) `#241005` |
| Keywords | ![FF9B55](https://img.shields.io/badge/%20-FF9B55?style=flat-square) `#FF9B55` | ![9E3800](https://img.shields.io/badge/%20-9E3800?style=flat-square) `#9E3800` |
| Functions | ![FFC894](https://img.shields.io/badge/%20-FFC894?style=flat-square) `#FFC894` | ![8A3A0A](https://img.shields.io/badge/%20-8A3A0A?style=flat-square) `#8A3A0A` |
| Strings | ![CFE8B4](https://img.shields.io/badge/%20-CFE8B4?style=flat-square) `#CFE8B4` | ![566010](https://img.shields.io/badge/%20-566010?style=flat-square) `#566010` |
| Types and classes | ![A6D3E8](https://img.shields.io/badge/%20-A6D3E8?style=flat-square) `#A6D3E8` | ![1F5F82](https://img.shields.io/badge/%20-1F5F82?style=flat-square) `#1F5F82` |
| Numbers | ![FFD66B](https://img.shields.io/badge/%20-FFD66B?style=flat-square) `#FFD66B` | ![7F5100](https://img.shields.io/badge/%20-7F5100?style=flat-square) `#7F5100` |
| Constants | ![F7AE9A](https://img.shields.io/badge/%20-F7AE9A?style=flat-square) `#F7AE9A` | ![A33129](https://img.shields.io/badge/%20-A33129?style=flat-square) `#A33129` |
| Comments | ![C19F87](https://img.shields.io/badge/%20-C19F87?style=flat-square) `#C19F87` | ![6C5546](https://img.shields.io/badge/%20-6C5546?style=flat-square) `#6C5546` |

### Measured contrast

| Measurement | Dark | Light |
|---|---|---|
| Main text on the editor | 10.6:1 | 15.4:1 |
| Main text on a selection | 14.9:1 | 12.4:1 |
| Lowest syntax color on the editor | 4.6:1 | 5.7:1 |
| Lowest syntax color on a selection | 6.5:1 | 4.6:1 |
| Title bar text | 9.2:1 | 6.7:1 |
| Status bar text | 9.2:1 | 6.6:1 |

## Customization

You can override any color for one variant in your `settings.json`:

```jsonc
{
  "workbench.colorCustomizations": {
    "[Iron Orange Dark]": {
      "statusBar.border": "#00000000"
    }
  },
  "editor.tokenColorCustomizations": {
    "[Iron Orange Dark]": {
      "comments": "#D2B49C"
    }
  }
}
```

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/db0w/iron-orange-vstheme/issues).

The theme files in `themes/` are generated, so don't edit them by hand. Colors live in `src/palettes.mjs`, and `src/template.mjs` maps them onto VS Code's theme keys.

```bash
git clone https://github.com/db0w/iron-orange-vstheme.git
cd iron-orange-vstheme
npm install
npm run build && npm run check
```

| Command | What it does |
|---|---|
| `npm run build` | Generates `themes/*.json` from the palettes |
| `npm run check` | Runs the contrast checks and fails if any color falls below its threshold |
| `npm run preview` | Renders a mock editor for each variant to `preview/` |
| `npm run screenshots` | Renders the README screenshots to `images/screenshots/` |
| `npm run package` | Builds, checks and packages the `.vsix` |

Press `F5` in VS Code to open an Extension Development Host with the `samples/` folder and see your changes on real code.

## Support

If Iron Orange makes your editor a nicer place, [star the repository](https://github.com/db0w/iron-orange-vstheme) or [leave a review on the Marketplace](https://marketplace.visualstudio.com/items?itemName=db0w.iron-orange&ssr=false#review-details). Both help other people find it.

## License

[MIT](LICENSE) © 2026 db0w

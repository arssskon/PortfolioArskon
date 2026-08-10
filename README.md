# Arseny K. — Portfolio

Personal portfolio site for Arseny K., a product / UX designer. A static site — no build step, no bundler, no npm install. Serve the folder with any static file server and it works.

**Live locally:**
```bash
python3 -m http.server 8934
```
then open `http://localhost:8934/index.html`.

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage — hero, selected work, about, about-me |
| `interior-decor.html` | Case study — adaptive e-commerce system for an 80,000-product interior goods retailer, with a gift-certificate configurator and a B2B module |
| `dariela.html` | Case study — redesign and platform expansion for a food manufacturer serving both B2C retail and B2B wholesale |
| `impos-trade.html` | Case study — dark-theme B2B site for a foreign-trade outsourcing company, with a bilingual (RU/CN) architecture |

## Features

- **Bilingual (RU / EN)** — a language toggle in the header switches every string on the page via a `data-i18n` / `data-i18n-html` dictionary (`i18n.js`). The choice persists across pages via `localStorage`.
- **Fully responsive** — hand-tuned breakpoints from 320px to 1920px+, not just a fluid scale.
- **Shared header/footer** — duplicated static markup across all 4 pages (not runtime-injected) for reliable `position: sticky` behavior and fast first paint; kept in sync by `layout.js`.
- **Scroll-reveal animations**, a live "Available" status indicator, and a one-click copy-to-clipboard email button.
- **Optimized images** — all screenshots and mockups are WebP with `loading="lazy"`.

## Stack

Plain HTML, CSS, and vanilla JavaScript. No React, no build tooling, no npm dependencies.

- **`styles.css`** — single stylesheet for all 4 pages, driven by CSS custom-property design tokens (color, spacing, radius, shadows) defined in `:root`.
- **`layout.js`** — shared header/footer behavior: scroll-spy nav, copy-email button, scroll-reveal.
- **`i18n.js`** — the RU/EN dictionary and translation engine.
- **Type**: [Inter](https://fonts.google.com/specimen/Inter) (sans), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (mono), [Newsreader](https://fonts.google.com/specimen/Newsreader) (serif accents).
- **Accent color**: `#9C57BD`.

`support.js` is a runtime from the design tool the site was originally prototyped in — it compiles the `<x-dc>` template markup (including `style-hover` attributes and `ref="{{ ... }}"` bindings used for scroll-reveal) into the live DOM on load, so the pages still depend on it. `image-slot.js` supports one of its custom elements. `layout.js` and `i18n.js` are written independently of that runtime and are defensive about it: they re-run on `load` and on a couple of `setTimeout` fallbacks, since the runtime replaces the page's markup after plain `<script>` tags at the end of `<body>` have already executed.

## Contact

- Email: [arskondesign@gmail.com](mailto:arskondesign@gmail.com)
- Telegram: [@ArskonDesign](https://t.me/ArskonDesign)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for Ștefan Neculicioiu, a youth coach (audience: people aged 18–28). All user-facing copy is in **Romanian** (`<html lang="ro">`) — keep diacritics (ă, â, î, ș, ț) correct and write new copy in Romanian. Product truth lives in `PRODUCT.md`; the visual system in `DESIGN.md` (world: "Contact Sheet").

## Development

No build step, package manager, or linter — plain HTML/CSS/JS. Preview locally with:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Copy is frozen during design work. After any markup change run:

```bash
python3 scripts/check_copy.py            # all 4 pages vs main
python3 scripts/check_copy.py index.html # one page; --ref <git-ref> to compare elsewhere
```

It compares the words of visible text + `alt`/`aria-label`/`title`/meta against the git ref and ignores `aria-hidden` subtrees and decorative glyphs.

## Architecture

- **4 pages**: `index.html`, `servicii.html`, `blog.html`, `contact.html`. Each one is a standalone document sharing `css/style.css` and `js/main.js`.
- **Header, mobile menu and footer are duplicated verbatim in every page** (between `<!-- ========== HEADER START/END ========== -->` and `FOOTER START/END` comments), as is the hidden `<svg class="svg-defs">` holding the `#grease` filter right after `<body>`. Any change to nav, contact details or the Calendly CTA must be applied to all four files.
- **External links repeated across pages**: Calendly `https://calendly.com/stefanneculicioiu`, email `stefanneculicioiu@gmail.com`, WhatsApp `https://wa.me/40744494721`. Change them everywhere at once (grep).
- **`css/style.css`** is a single file organised by the numbered table of contents at the top (tokens → base → type → layout → frames/strips → marks → buttons → chrome → motion → one section per page). Use the `:root` tokens (`--rebate`, `--mask`, `--print`, `--ink`, `--edge`, `--grease`, `--gutter`, …) rather than raw values. Font is Archivo only, varied by `font-stretch` (`.display` wide, `.edge` condensed uppercase). Mobile-first, `min-width` breakpoints at 640 / 900 / 1000 / 1100px.
- **Visual grammar** (see `DESIGN.md`): bands are `.band--rebate` (black) / `.band--mask` (orange) / `.band--print` (paper); `.strip` + `.strip__frames` + `.frame` are the only enclosures; section labels are `.slate.edge` captions *under* headings, never eyebrows above them. The red grease circle (`.mark-circle` + inline SVG with `filter="url(#grease)"`) goes only on free-session booking buttons, at most one per viewport.
- **`js/main.js`** is one vanilla IIFE with no dependencies; its first statement sets `window.mainReady`. An inline `<head>` script adds `html.js` and removes it after 3s if `main.js` never ran — all JS-only states (collapsed expanders, undeveloped photos, undrawn circles) are scoped under `.js`. Hooks:
  - `.js-reveal` → gets `.is-visible` via IntersectionObserver. Used only on `.develop` photo frames and `.mark-circle` (no generic fade-ins).
  - `.expand-toggle[data-target="<id>"]` with a `.expand-toggle__text` label → toggles `.is-expanded` on `#<id>`; the label switches to "Închide" and back. The target must wrap its content in `.expand-content__inner` (it animates `grid-template-rows`).
  - `.hamburger` / `.mobile-menu` / `.mobile-menu__link` → mobile nav (`.is-open`, locks body scroll, Escape closes).
  - `.nav__link` / `.mobile-menu__link` → `.is-active` is set automatically from the URL; don't hard-code it.
  - `.header` gets `.header--scrolled` after 50px of scroll.
- **Images**: pages use the resized copies in `assets/web/` (provenance in `assets/web/PROVENANCE.md`); originals stay in `assets/`.
- **Blog** (`blog.html`) holds only "În curând" placeholder frames; there are no article pages yet.

## Gotchas

- Mobile horizontal overflow has been a recurring bug: `html` has `overflow-x: hidden`, which can hide it — check `scrollWidth` at 375px. Zoomed crops use `transform` inside an `overflow: hidden` `.frame__window`.
- `prefers-reduced-motion` is handled at the end of section 8 (Motion); new animations must be disabled there too.
- Playwright's headless browser has a 15px scrollbar; hide it (`::-webkit-scrollbar{display:none}`) before full-page captures or they come out 15px narrow.

After any UI change, open the page with Playwright, take screenshots at desktop and mobile width, and fix visual problems before saying you're done.

# Contact Sheet redesign — design spec

Date: 2026-09-26 · Branch: `redesign` · Direction chosen via impeccable direction round (seed `a1ee1d87`, assigned card).

## Goal

Replace the current "editorial v2" look (generic layout, crowded, no personality) with a premium, warm, distinctive world built from the dusk photo shoot. Audience: Romanian 18–28-year-olds new to coaching; Ștefan is a new coach. Product truth lives in `PRODUCT.md`.

## Hard constraints

- **Copy is frozen.** Every visible word on all 4 pages stays identical (including `alt`, `aria-label`, `<title>`, meta description). Only decorative glyph markers (✓ ✦ ✕ ↓ → +) may be replaced by the new mark vocabulary.
- Same 4 pages, same URLs, same external links (Calendly, email, WhatsApp).
- Plain HTML/CSS/JS, no build step. `js/main.js` behaviours keep working: mobile menu, `.js-reveal`, active nav, `.expand-toggle`, scrolled header.
- No invented claims, testimonials, or imagery. Only the two existing photos (CSS crops allowed).

## Visual system

### Colour (tokens in `:root`)

| Token | Value | Role |
|---|---|---|
| `--rebate` | `#17110C` | Film-base black: hero, header, footer, CTA bands, filmstrip |
| `--rebate-2` | `#241B14` | Frame gutters / separators on black |
| `--mask` | `#C8692E` | C-41 negative orange: full-bleed fields, primary buttons |
| `--print` | `#F0EEE9` | Silver print white: reading sections |
| `--ink` | `#1C1612` | Text on print and on mask |
| `--grease` | `#D2372B` | Red grease-pencil marks only (never text) |
| `--edge` | `#E8A33D` | Edge-print numbers/labels on black |

Text contrast must meet WCAG AA: body text only as `--ink` on `--print`/`--mask`, or `--print` on `--rebate`.

### Type

Archivo (Google Fonts, variable `wdth` 62–125, `wght` 100–900, latin-ext for ș ț ă â î):
- Display: `wdth` ~115–125, weight 800, poster scale (hero clamp up to ~7rem).
- Edge print: `wdth` 62–75, uppercase, tracked, small — labels, nav, frame numbers, credentials.
- Body: `wdth` 100, weight 400, 1.05–1.15rem, line-height ~1.6, measure ≤ 62ch.

### Components

- **Frame** — the only enclosure. Holds one photo or one sentence; thin rebate border; frame number beneath in edge print (`14 ▸ 14A`), numbers `aria-hidden`.
- **Filmstrip spine** — vertical sprocket strip at the left of every page on ≥900px (CSS-only pattern), thin rail on mobile. Decorative, `aria-hidden`.
- **Strip band** — horizontal black band with sprocket rows top/bottom holding a row of frames (pain points, results). Stacks vertically on mobile.
- **Grease marks** — inline SVG strokes: red circle = chosen (primary CTA, one per viewport); black cross = rejected ("Nu este…"). Circle draws itself once on reveal (stroke-dashoffset); fully drawn under `prefers-reduced-motion`.
- **Buttons** — primary: square `--mask` block, `--ink` text, condensed uppercase; secondary: underlined link with ▸. Focus ring visible.
- **Nav** — edge-print uppercase links; active = `--edge` underline.
- **Expanders / FAQ** — keep existing `.expand-toggle` and `<details>` semantics; restyled as numbered rows.

Raises carried from declined challengers: nothing is carded (cracktro); red appears once per viewport (nixie); hierarchy by committed scale (dance poster); still at rest, motion once on arrival (plankton); one vertical spine per page (deep dive).

## Pages

- **index** — Hero on rebate: `poza_about_me` as enlarged selected frame (left), label + H1 at poster scale + subtitle + circled primary CTA + secondary link (right). "Citește asta" on full-bleed mask with the 4 statements as frames 01A–04A in a strip band, CTA after. "De ce eu" on print: contact-sheet row of 3–4 CSS crops of the shoot with one circled, story text, expander, quote as large statement, credentials as one edge-print line, CTA. Final CTA band on rebate. Footer on rebate.
- **servicii** — page hero on rebate; "Ce este coaching-ul?" on print with the three "Nu este…" crossed in black grease, expander; results as frames 01–04 on mask; pricing as two prints (package larger, its CTA circled, "Recomandat" kept); closing CTA band.
- **blog** — page hero + intro; 6 articles as a contact sheet of fogged-orange blank frames (category, date, "În curând" as edge print); email-notify CTA.
- **contact** — page hero; Calendly block as the circled frame; email/WhatsApp as rows; FAQ as numbered `<details>` rows.

## Assets

Web-sized copies of both photos (long edge ≤1600px, JPEG ~q80) generated with `sips`; originals kept. Provenance: resized from the original shoot files.

## Verification

1. **Copy diff:** script extracts visible text + `alt`/`aria-label`/`title`/meta from `main` (old commit vs new) per page, normalises whitespace and decorative glyphs, and must report zero differences.
2. Playwright full-page screenshots at 1440 and 390 wide into `.impeccable/review/`, reviewed and fixed in at most two rounds; no horizontal overflow at 375px.
3. `impeccable detect --json` on changed files; fix mechanical findings.
4. `impeccable-finish-reviewer` agent review; act on disposition.
5. `impeccable-documenter` writes `DESIGN.md` + `.impeccable/design.json`.

## Out of scope

Copy changes, new pages, blog article pages, analytics, deployment, merging to `main`.

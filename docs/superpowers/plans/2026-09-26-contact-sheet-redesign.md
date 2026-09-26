# Contact Sheet Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the look of all 4 pages in the "Contact Sheet" world while keeping every word of copy identical.

**Architecture:** Plain static site. `css/style.css` is rewritten from scratch around the tokens and components in the spec; each page's `<main>` markup is rebuilt around the same text; shared header/footer stay duplicated per page. A Python copy-check script compares visible text against `main` and gates every page task.

**Tech Stack:** HTML, CSS (custom properties, grid, `clamp()`), vanilla JS, Archivo variable font from Google Fonts, Python 3 (stdlib only) for checks, `sips` for images, Playwright MCP for screenshots.

**Spec:** `docs/superpowers/specs/2026-09-26-contact-sheet-redesign-design.md` (direction contract: `.impeccable/surfaces/index-html.md`)

## Global Constraints

- Copy frozen: every visible word, `alt`, `aria-label`, `<title>`, meta description identical to `main`. Only glyph markers ✓ ✦ ✕ ↓ → + may change.
- Tokens: `--rebate #17110C`, `--rebate-2 #241B14`, `--mask #C8692E`, `--print #F0EEE9`, `--ink #1C1612`, `--grease #D2372B`, `--edge #E8A33D`.
- Font: Archivo only (`wdth` 62–125, `wght` 100–900). No Cormorant, no Inter.
- Grease red never used for text; at most one red circle per viewport, on the primary booking action.
- Frames are the only enclosures: no cards, pills, badges, rounded boxes.
- Keep `js/main.js` hooks: `.header`, `.hamburger`, `.mobile-menu`, `.mobile-menu__link`, `.nav__link`, `.js-reveal`, `.js-reveal-delay-N`, `.expand-toggle[data-target]` + `.expand-toggle__text`.
- No horizontal overflow at 375px; `prefers-reduced-motion` disables all motion.
- Decorative additions (frame numbers, sprockets, marks) are `aria-hidden="true"`.

## Review Focus

1. Copy drift during markup rebuild (a dropped `<strong>`, a lost sentence, changed `alt`) → copy check must fail; pinned by Task 1's self-test.
2. Long Romanian words / diacritics at poster scale on 375px (e.g. "incertitudine") → no overflow; pinned by Task 8's overflow check.
3. Expander content hidden with JS disabled or before JS runs → content in `.expand-content` must still be reachable; the toggle keeps `aria-expanded`; checked in Task 4.
4. Red circle SVG covering or stealing clicks from the button → `pointer-events: none`; checked in Task 3.
5. Keyboard users: visible focus on orange buttons over orange fields, and Escape closes the menu → checked in Task 8.

---

### Task 1: Copy-check script

**Files:**
- Create: `scripts/check_copy.py`

**Interfaces:**
- Produces: `python3 scripts/check_copy.py [--ref main] [pages...]` → exit 0 and `OK <page>` per page when copy matches; exit 1 with `+`/`-` word lists otherwise.

- [ ] **Step 1: Write the script**

```python
#!/usr/bin/env python3
"""Fail if visible copy differs from a git ref (default: main).

Compares the multiset of words in visible text + alt/aria-label/title/meta,
ignoring aria-hidden subtrees, <script>/<style>/<svg>, and decorative glyphs.
"""
import subprocess, sys, re
from collections import Counter
from html.parser import HTMLParser

PAGES = ["index.html", "servicii.html", "blog.html", "contact.html"]
GLYPHS = "✓✦✕↓→↑←+▸×·–—|"
SKIP = {"script", "style", "svg"}
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"}

class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.out = [], []
    def hidden(self):
        return any(h for _, h in self.stack)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        hide = tag in SKIP or a.get("aria-hidden") == "true" or self.hidden()
        if not hide:
            for k in ("alt", "aria-label", "title", "placeholder"):
                if a.get(k): self.out.append(a[k])
            if tag == "meta" and a.get("name") == "description" or a.get("property", "").startswith("og:"):
                self.out.append(a.get("content", ""))
        if tag not in VOID:
            self.stack.append((tag, hide))
    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]; break
    def handle_data(self, data):
        if not self.hidden(): self.out.append(data)

def words(html):
    p = Extract(); p.feed(html)
    text = " ".join(p.out)
    text = text.translate({ord(c): " " for c in GLYPHS})
    return Counter(re.findall(r"[^\s]+", text))

def main(argv):
    ref = "main"
    if argv[:1] == ["--ref"]:
        ref, argv = argv[1], argv[2:]
    pages, bad = argv or PAGES, 0
    for page in pages:
        old = subprocess.run(["git", "show", f"{ref}:{page}"], capture_output=True, text=True, check=True).stdout
        new = open(page, encoding="utf-8").read()
        o, n = words(old), words(new)
        if o == n:
            print(f"OK {page}")
        else:
            bad = 1
            print(f"DIFF {page}")
            print("  - missing:", dict(o - n))
            print("  + added:  ", dict(n - o))
    return bad

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 2: Run on the untouched pages — expect all OK**

Run: `python3 scripts/check_copy.py`
Expected: `OK index.html`, `OK servicii.html`, `OK blog.html`, `OK contact.html` (blog.html's uncommitted change is only comments).

- [ ] **Step 3: Prove it catches drift**

Run: `sed 's/Citește asta/Citeste asta/' index.html > /tmp/i.html && cp index.html /tmp/keep.html && cp /tmp/i.html index.html; python3 scripts/check_copy.py index.html; cp /tmp/keep.html index.html`
Expected: `DIFF index.html` listing `Citește` missing and `Citeste` added; exit 1. Afterwards `git diff --stat index.html` shows nothing.

- [ ] **Step 4: Commit**

```bash
git add scripts/check_copy.py
git commit -m "Add copy-check script guarding frozen site copy"
```

### Task 2: Web-sized photos

**Files:**
- Create: `assets/web/portret-1600.jpg`, `assets/web/portret-900.jpg`, `assets/web/profil-800.jpg`, `assets/web/PROVENANCE.md`

- [ ] **Step 1: Generate**

```bash
mkdir -p assets/web
sips -Z 1600 -s formatOptions 80 assets/poza_about_me.jpg --out assets/web/portret-1600.jpg
sips -Z 900  -s formatOptions 78 assets/poza_about_me.jpg --out assets/web/portret-900.jpg
sips -Z 800  -s formatOptions 80 assets/poza_profil.jpg   --out assets/web/profil-800.jpg
```

- [ ] **Step 2: Verify sizes** — Run: `ls -la assets/web` · Expected: each file < 450KB.

- [ ] **Step 3: Provenance** — write `assets/web/PROVENANCE.md`:

```markdown
# Provenance
All files are resized copies (sips, JPEG q78–80) of the original shoot photos in `assets/`:
- portret-1600.jpg, portret-900.jpg ← assets/poza_about_me.jpg
- profil-800.jpg ← assets/poza_profil.jpg
No generated or stock imagery.
```

- [ ] **Step 4: Commit** — `git add assets/web && git commit -m "Add web-sized copies of the shoot photos"`

### Task 3: Design system, shared chrome, grease-circle motion

**Files:**
- Rewrite: `css/style.css` (sections 0–7 of the new TOC: tokens, reset/base, type, layout, filmstrip spine, frame, strip band, grease marks, buttons, header/nav/mobile menu, footer, reveal motion, reduced motion)
- Modify: `<head>` font link and header/mobile-menu/footer markup in all 4 pages
- Modify: `js/main.js` (add section F)

**Interfaces:**
- Produces CSS classes used by Tasks 4–7: `.sheet` (page wrapper with spine), `.band`, `.band--rebate`, `.band--mask`, `.band--print`, `.wrap` (max-width container), `.edge` (edge-print text), `.display` / `.display--xl`, `.frame`, `.frame__img`, `.frame__no`, `.strip` (black band with sprockets) + `.strip__frames`, `.btn`, `.btn--primary`, `.link-arrow`, `.mark-circle` wrapper (inline SVG `.mark-circle__svg` with `<path class="mark-circle__path">`), `.mark-cross`.
- Produces JS: elements `.mark-circle.js-reveal` get `.is-visible`, which triggers the draw (CSS only; JS section C already adds `.is-visible`).

- [ ] **Step 1: Replace the font link in all 4 pages**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap">
```

- [ ] **Step 2: Write tokens + base (top of new `css/style.css`)**

```css
:root {
  --rebate: #17110C; --rebate-2: #241B14; --mask: #C8692E; --print: #F0EEE9;
  --ink: #1C1612; --ink-soft: #4A3F37; --grease: #D2372B; --edge: #E8A33D;
  --font: 'Archivo', system-ui, sans-serif;
  --gutter: clamp(1rem, 4vw, 3rem);
  --spine: 0px;
  --measure: 62ch;
  --ease-draw: cubic-bezier(.65,0,.35,1);
}
@media (min-width: 900px) { :root { --spine: 44px; } }
html { overflow-x: hidden; scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--rebate); color: var(--print); font: 400 1.0625rem/1.6 var(--font); font-stretch: 100%; }
.edge { font-stretch: 68%; font-weight: 600; text-transform: uppercase; letter-spacing: .14em; font-size: .75rem; color: var(--edge); }
.display { font-stretch: 118%; font-weight: 800; line-height: .95; letter-spacing: -.01em; text-wrap: balance; }
.display--xl { font-size: clamp(2.6rem, 8.5vw, 7rem); }
```

- [ ] **Step 3: Write components** — `.sheet` (padding-left: var(--spine); fixed left spine `::before` with sprocket pattern `repeating-linear-gradient(to bottom, transparent 0 10px, var(--print) 10px 22px)` masked to 14px-wide rounded holes, `opacity:.18`), `.band*` backgrounds/colours, `.frame` (border 1px var(--rebate-2) on black / var(--ink) on print; `.frame__no` below in `.edge`), `.strip` (black band, sprocket rows via `::before/::after` background-image on top and bottom 18px), `.btn--primary` (background var(--mask); color var(--ink); square corners; `font-stretch:75%`; uppercase; padding 1rem 1.6rem; `:focus-visible { outline: 3px solid var(--print); outline-offset: 3px }` and on `.band--mask` outline colour var(--ink)), `.link-arrow` (underline, `::after{content:" ▸"}`).

Grease circle:

```css
.mark-circle { position: relative; display: inline-block; }
.mark-circle__svg { position: absolute; inset: -22% -9%; width: 118%; height: 144%; pointer-events: none; overflow: visible; }
.mark-circle__path { fill: none; stroke: var(--grease); stroke-width: 3.2; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
.mark-circle.is-visible .mark-circle__path { transition: stroke-dashoffset 1.1s var(--ease-draw) .35s; stroke-dashoffset: 0; }
@media (prefers-reduced-motion: reduce) { .mark-circle__path { stroke-dashoffset: 0; transition: none !important; } }
```

Circle markup (copy verbatim wherever a primary CTA is circled):

```html
<span class="mark-circle js-reveal">
  <a href="https://calendly.com/stefanneculicioiu" target="_blank" rel="noopener" class="btn btn--primary">…existing label…</a>
  <svg class="mark-circle__svg" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path class="mark-circle__path" pathLength="1" d="M18 44 C 14 18, 70 6, 118 8 C 168 10, 196 26, 190 46 C 184 68, 120 76, 72 72 C 30 69, 6 58, 12 38 C 16 26, 40 16, 64 14"/></svg>
</span>
```

Black cross: same pattern, class `.mark-cross` with path `M8 8 L92 72 M90 6 L10 74`, stroke var(--ink), always drawn.

- [ ] **Step 4: Rebuild header, mobile menu, footer markup in all 4 pages** — keep every text and link; header on `--rebate`: logo = `poza_profil` swapped to `assets/web/profil-800.jpg` in a small square frame + name + `.edge` "Youth Coach"; nav links `.nav__link.edge`; header CTA as `.btn--primary` (not circled — circle belongs to the hero CTA in that viewport). Footer on `--rebate` with the same texts, email/WhatsApp as `.edge` labels. Wrap `<main>` content in `<div class="sheet">` together with footer.

- [ ] **Step 5: Reveal motion CSS**

```css
.js-reveal { opacity: 0; transform: translateY(14px); transition: opacity .7s ease, transform .7s ease; }
.js-reveal.is-visible { opacity: 1; transform: none; }
.js-reveal-delay-1 { transition-delay: .08s } .js-reveal-delay-2 { transition-delay: .16s } .js-reveal-delay-3 { transition-delay: .24s }
@media (prefers-reduced-motion: reduce) { .js-reveal { opacity: 1; transform: none; transition: none; } html { scroll-behavior: auto; } }
```
Note `.mark-circle.js-reveal` must not fade: add `.mark-circle.js-reveal { opacity: 1; transform: none; }`.

- [ ] **Step 6: Check** — Run: `python3 scripts/check_copy.py` → all OK. Open `index.html` via `python3 -m http.server 8000` in Playwright at 1440 and 390: header, menu (open/close + Escape), footer render; clicking the circled button opens Calendly (circle doesn't block).

- [ ] **Step 7: Commit** — `git add -A css js *.html && git commit -m "Contact Sheet design system and shared chrome"`

### Task 4: Acasă (index.html)

**Files:** Modify `index.html` `<main>`; append section "8. Acasă" to `css/style.css`.

- [ ] **Step 1: Rebuild `<main>`** in this order, texts verbatim from `main`:
  1. `section.hero.band--rebate`: grid `5fr 7fr` ≥900px. Left: `figure.frame.frame--selected` with `<img src="assets/web/portret-1600.jpg" srcset="assets/web/portret-900.jpg 900w, assets/web/portret-1600.jpg 1600w" sizes="(min-width:900px) 40vw, 100vw" alt="" aria-hidden="true">` (decorative here: the old hero had no image, and the About image keeps the one `alt="Ștefan Neculicioiu"`) plus `.frame__no` "14 ▸ 14A" (aria-hidden). Right: `.edge` label, `h1.display.display--xl` with `<em>CLARITY</em>` coloured `--mask`, subtitle, circled primary CTA, `.link-arrow` "Află mai multe". Scroll hint kept (aria-hidden) as `.edge`.
  2. `section.band--mask` "Citește asta": label + H2 `.display` in `--ink`; `.strip` with 4 `.frame` items each `p` statement in `--print` + `.frame__no` 01A–04A; then CTA text + button (no circle: the hero circle is the viewport's red; this is a new viewport, so circle it — one per viewport holds).
  3. `section.band--print` "De ce eu": `.contact-row` of 4 frames using `portret-900.jpg` with `object-position` crops (face 50% 12%, hands 50% 72%, full 50% 50%, trees 8% 30%), the full one wearing a static red circle; story text column: label, H2, first paragraph, `.expand-content#stefan-story` (unchanged content), `.expand-toggle`, credentials as one `p.edge` line with `▸` separators (✓ removed), CTA `.btn--primary`.
  4. `section.band--rebate` final CTA with circled button.

- [ ] **Step 2: CSS for section 8** — hero min-height `min(100svh, 980px)`; strip frames grid `repeat(4,1fr)` ≥900px, 1 column below; contact-row grid `repeat(4,1fr)` with 3:4 aspect frames ≥640px, 2×2 below; blockquote as `.display` 1.8–2.6rem `--ink`; `.expand-content` keeps existing JS contract (`max-height:0; overflow:hidden` → `.is-expanded { max-height: 2000px }`).

- [ ] **Step 3: Check copy** — `python3 scripts/check_copy.py index.html` → `OK index.html`.

- [ ] **Step 4: Screenshot** index at 1440 and 390 (Playwright), confirm first viewport matches the FIRST VIEWPORT contract block and no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`).

- [ ] **Step 5: Commit** — `git commit -am "Redesign Acasă in the Contact Sheet world"`

### Task 5: Servicii (servicii.html)

**Files:** Modify `servicii.html` `<main>`; append "9. Servicii" CSS.

- [ ] **Step 1: Rebuild `<main>`**: page hero `band--rebate` (label, H1 `.display`, subtitle, beside it a small `.frame` crop of `portret-900.jpg` aria-hidden); "Ce este coaching-ul?" `band--print`: definition as large `p.display` (~2rem), the three "Nu este …" as frames each overlaid by `.mark-cross` SVG (✕ removed), follow-up in `.expand-content`; "La ce să te aștepți în timp" `band--mask` with `.strip` of frames 01–04 and its expander; pricing `band--print`: two `.frame.print` columns (package column wider `1.35fr`, "Recomandat" as `.edge` on red-free tag above), price as `.display`, features as `ul` rows with `▸`, package CTA circled, single-session CTA plain; notes line; closing CTA `band--rebate`.

- [ ] **Step 2: CSS section 9.**
- [ ] **Step 3:** `python3 scripts/check_copy.py servicii.html` → OK.
- [ ] **Step 4:** Screenshots 1440/390, overflow check.
- [ ] **Step 5:** `git commit -am "Redesign Servicii in the Contact Sheet world"`

### Task 6: Blog (blog.html)

**Files:** Modify `blog.html` `<main>`; append "10. Blog" CSS.

- [ ] **Step 1: Rebuild `<main>`**: page hero `band--rebate`; intro paragraphs on `band--print`; articles as `.contact-sheet` grid (3 cols ≥900, 2 ≥640, 1 below) of `article.frame` each with a fogged thumb `div.fog` (radial gradient from `--mask` to `--rebate`, aria-hidden), `.edge` row category · date · "În curând", H2 title, excerpt. Keep `aria-labelledby` ids. Notify CTA `band--rebate` with circled button.
- [ ] **Step 2: CSS section 10.**
- [ ] **Step 3:** `python3 scripts/check_copy.py blog.html` → OK.
- [ ] **Step 4:** Screenshots 1440/390, overflow check.
- [ ] **Step 5:** `git commit -am "Redesign Blog in the Contact Sheet world"`

### Task 7: Contact (contact.html)

**Files:** Modify `contact.html` `<main>`; append "11. Contact" CSS.

- [ ] **Step 1: Rebuild `<main>`**: page hero `band--rebate`; `band--print` two columns: booking column (label, H2, text) with the Calendly block as a `.frame.frame--selected` (title, note, circled CTA), then "Sau dacă preferi…" and email/WhatsApp as rows (`.edge` label, value link) with existing icon SVGs kept aria-hidden; FAQ `band--rebate` or print with `<details>` rows numbered `.edge` 01–05, `summary` text unchanged, `+` marker replaced by CSS rotating cross.
- [ ] **Step 2: CSS section 11.**
- [ ] **Step 3:** `python3 scripts/check_copy.py contact.html` → OK.
- [ ] **Step 4:** Screenshots 1440/390, overflow check.
- [ ] **Step 5:** `git commit -am "Redesign Contact in the Contact Sheet world"`

### Task 8: Finish — inspection, detector, review, documentation

- [ ] **Step 1:** Delete now-unused CSS/classes; run `python3 scripts/check_copy.py` → 4× OK.
- [ ] **Step 2:** Playwright round: full-page `desktop.png` (1440) and `mobile.png` (390) per page into `.impeccable/review/` (`index-desktop.png`, …) with reveals settled (scroll through or add `.is-visible` to all); keyboard check (Tab shows focus on buttons on mask and rebate; Escape closes menu); overflow check at 375 on every page. Fix everything in one batch, recapture once.
- [ ] **Step 3:** `impeccable detect --json index.html servicii.html blog.html contact.html css/style.css`; fix mechanical findings.
- [ ] **Step 4:** Spawn `impeccable:impeccable-finish-reviewer` with: request, answers, artifact paths, screenshot paths, direction contract path, detector findings, a note that the build is code-led with no comp (the Contact Sheet world has no catalog QUALITY BAR board), craft-floor path. Act on disposition (max two rounds).
- [ ] **Step 5:** Spawn `impeccable:impeccable-documenter` → `DESIGN.md` + `.impeccable/design.json`; run `impeccable embed-prompt --scan assets/web`.
- [ ] **Step 6:** Update `CLAUDE.md` Architecture section to the new class hooks and tokens; commit; push branch `redesign` to origin.

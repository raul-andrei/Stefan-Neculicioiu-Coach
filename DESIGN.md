---
name: Ștefan Neculicioiu · Youth Coach
description: The contact sheet of one dusk shoot, with one frame circled in red as the next step.
colors:
  rebate: "#17110C"
  rebate-2: "#241B14"
  rebate-3: "#3A2D22"
  mask: "#C8692E"
  mask-hi: "#D8793C"
  print: "#F0EEE9"
  print-2: "#E4E1DA"
  ink: "#1C1612"
  ink-soft: "#4A3F37"
  fog: "#B9B2A8"
  grease: "#D2372B"
  edge: "#E8A33D"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 8.2vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 5.4vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  lede:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.16em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 68"
  button:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 78"
rounded:
  none: "0px"
spacing:
  spine-mobile: "12px"
  spine: "44px"
  gutter: "clamp(1.25rem, 4.5vw, 3.5rem)"
  band-y: "clamp(4.5rem, 10vw, 9rem)"
  frame-gap: "clamp(.75rem, 1.4vw, 1.1rem)"
  wrap: "1240px"
  measure: "64ch"
components:
  button-primary:
    backgroundColor: "{colors.mask}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: ".9rem 1.5rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.mask-hi}"
    textColor: "{colors.ink}"
  button-primary-on-mask:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.print}"
    rounded: "{rounded.none}"
  button-primary-sm:
    backgroundColor: "{colors.mask}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: ".55rem 1rem"
    height: "40px"
  link-arrow:
    textColor: "{colors.print}"
    typography: "{typography.button}"
  strip:
    backgroundColor: "{colors.rebate}"
    textColor: "{colors.print}"
    padding: "2.25rem clamp(.75rem, 2vw, 1.25rem)"
  frame-text:
    backgroundColor: "{colors.rebate-2}"
    textColor: "{colors.print}"
    rounded: "{rounded.none}"
    padding: "clamp(1.25rem, 2.2vw, 1.75rem)"
  frame-number:
    textColor: "{colors.edge}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.print}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.edge}"
---

# Design System: Ștefan Neculicioiu · Youth Coach

## Overview

**Creative North Star: "The Contact Sheet"**

The site is the contact sheet of one dusk shoot. Pages are laid out like a lab sheet of 35mm film: black film base, orange negative-mask fields, silver-print white paper for long reading, and amber edge-print numbers under every frame. Each frame holds one photo or one sentence. On every view, one thing is circled in red grease pencil: the next step, which is booking the free session. Rejected ideas get a black cross.

The density is editorial, not app-like. Full-bleed bands switch between black, orange, and paper. Frames are the only containers and they sit inside strips of film that have sprocket rows. A sprocket rail runs down the left edge of every page. There is one typeface, Archivo, used at three widths: wide for poster display, condensed for edge print and buttons, and normal for body text. Motion is limited to one authored moment. Prints develop from overexposed to normal, then the pencil circle draws itself once. Everything else stays still.

The world was chosen to reject the cream-serif-terracotta coaching landing page (a hero, then cards, then testimonials).

**Key Characteristics:**
- Three surfaces (film black, mask orange, print white) as full-bleed bands; no other backgrounds.
- Frames on film strips are the only enclosure; square corners everywhere.
- One typeface (Archivo) at three widths; edge print is condensed, uppercase, amber, tabular.
- Red grease-pencil circle marks the single chosen action per view; black cross marks what coaching is not.
- Stillness, broken once: prints develop and the circle draws on arrival.

## Colors

A warm, low-chroma film palette of browned blacks and silver whites, with one saturated orange field and two tiny accents (amber and red) that only ever act as marks on the film.

### Primary
- **C-41 Mask Orange** (mask): a full-bleed band field (for example the "Citește asta" doubts band), the primary button fill, the emphasised display word (CLARITY), the featured price, the FAQ plus sign, and the contact channel icons. It is a field color or a single emphasis, never a tint.
- **Mask Highlight** (mask-hi): hover state of the primary button only.

### Secondary
- **Edge-Print Amber** (edge): frame numbers, edge-print labels on black, active and hovered nav links, the focus ring on dark surfaces, and footer icons. It is the color of the information printed on the film, not of the content.

### Tertiary
- **Grease-Pencil Red** (grease): only the hand-drawn circle stroke around the chosen action. It is never used for text, fills, borders, or UI states.

### Neutral
- **Film Base** (rebate): page background, header, footer, black bands, and strip backing.
- **Frame Gutter** (rebate-2): frame backgrounds, text frames, price plates and blog frames on black; hairline borders on the header and footer.
- **Sprocket Brown** (rebate-3): sprocket holes, FAQ dividers, and the scrollbar thumb.
- **Silver Print** (print): reading text on black, and the background of paper bands.
- **Print Hairline** (print-2): dividers on paper and the hover fill of a contact channel row.
- **Print Ink** (ink): text on paper and orange, and the inverted button on orange.
- **Faded Ink** (ink-soft): secondary text, slates and frame numbers on paper.
- **Fog** (fog): secondary text on black (subtitles, ledes, FAQ answers, footer).

### Named Rules
**The Marks-Only Rule.** Grease red draws a mark (the circle) and nothing else. If red appears as text, a fill, or a border, it is wrong.

**The Three Fields Rule.** Every band is black, orange, or paper. On orange, content is ink and the primary button inverts to ink with print-colored text. On paper, secondary text uses ink-soft and focus rings switch to ink. Black surfaces nested inside a light band keep the amber focus ring.

## Typography

**Display Font:** Archivo (variable width 62–125, weight 100–900), with system-ui fallback
**Body Font:** Archivo at 100% width
**Label/Mono Font:** Archivo condensed (68–82% width), tabular numerals

**Character:** One family stretched across widths does the work of three faces. It is wide and heavy like a poster at the top, and narrow and spaced like the edge print on film at the bottom. It reads as one voice at different volumes.

### Hierarchy
- **Display** (800, 112% width, clamp(2rem, 8.2vw, 4.75rem), 0.96): the home hero line only. It is set in capitals and balanced. `em` inside a display heading turns mask orange without going italic.
- **Headline** (800, 112% width, clamp(2rem, 5.4vw, 4.25rem), 0.96): section and inner-page H1/H2.
- **Title** (800, 112% width, clamp(1.6rem, 3.4vw, 2.6rem), 1.1): secondary headings, the booking plate title, and price titles.
- **Statement** (500–750, 104–108% width, about 1.3–1.9rem, 1.1–1.35): large reading sentences, for example the coaching definition, the "not" list, the about quote, and the blog intro. It sits between headline and lede.
- **Lede** (400, clamp(1.15rem, 1.6vw, 1.35rem), 1.5, max 40ch): subtitles under headlines.
- **Body** (400, 1.0625rem, 1.6, max 64ch): prose. `strong` is weight 700.
- **Label / Edge print** (600, 68% width, 0.78rem, 0.16em tracking, uppercase, tabular): frame numbers, slates, nav, and badges. The sentence-case variant uses 82% width, 0.9rem, and 0.03em tracking.
- **Button** (700, 78% width, 0.95rem, 0.08em tracking, uppercase): buttons, arrow links, and expand toggles.

### Named Rules
**The Width Is The Voice Rule.** Change hierarchy with `font-stretch` as well as size. Headlines are wide (104–112%), body is normal (100%), and anything printed on the film is condensed (68–82%). Don't introduce a second family.

**The Slate Rule.** A section's label is set in edge print as a caption *under* its heading, like the exposure data under a frame. It is never stacked above the heading as an eyebrow.

## Layout

Each page is a vertical stack of full-bleed **bands** (black, orange, or paper) with block padding of clamp(4.5rem, 10vw, 9rem). Content sits in a centered wrap with a maximum width of 1240px and a fluid gutter of clamp(1.25rem, 4.5vw, 3.5rem). The body is offset from the left by the **film spine**, a fixed sprocket rail 44px wide on desktop and 12px wide below 900px. The sticky header is 72px tall on desktop and 64px on mobile.

Two-column splits use asymmetric fractional grids (5fr/7fr, 5fr/6fr, 1fr/1.3fr) and collapse to one column below 900–1000px. The heading column often becomes sticky on desktop (about, FAQ). Film strips of frames step from 1 to 2 to 4 columns at 640px and 1100px. Below 1240px they bleed through the gutter to the viewport edge, and above it they sit inside the wrap. Frame gaps are clamp(.75rem, 1.4vw, 1.1rem). Actions sit in a wrapping row with gaps of 1.75rem vertical and 2.25rem horizontal. Reading measures are capped at 64ch for prose, 40ch for ledes, and 14–22ch for headlines.

Breakpoints observed: 520, 640, 760, 900, 960 (desktop nav), 1000, 1100, 1240px.

## Elevation & Depth

The system is flat. Depth comes from tonal layering of film materials: rebate (the base), then rebate-2 (the frame), with rebate-3 (sprocket holes) cut into the edge. On paper, depth comes from 1px ink or print-2 hairlines. The only shadow is the one the sticky header casts once the page has scrolled.

### Shadow Vocabulary
- **Header lift** (`box-shadow: 0 10px 30px -12px rgba(0, 0, 0, .7)`): applied to the sticky header only after scroll, to separate it from the content passing under it.

### Named Rules
**The Film Has No Shadow Rule.** Frames, strips, plates and buttons never cast shadows. If something needs separation, put it on a darker film layer or draw a hairline.

## Shapes

Every corner is square (0px). The recurring geometry is taken from film:
- the **frame**: a rectangle holding a photo (3:4 portrait, 4:5 hero, 3:2 blog, 1:1 closing) or a sentence, with a caption strip underneath that has a number on the right and a label on the left;
- the **strip**: black backing with rows of sprocket holes along the top and bottom, drawn with a repeating gradient of 12px holes on a 21px pitch;
- the **spine**: the same holes running vertically down the page edge;
- **hand marks**: an irregular SVG path distorted by a turbulence filter (#grease) so it reads as pencil on paper rather than a vector.

Lines are 1px hairlines. Frame padding is 12px on the hero print, and clamp(1.25rem, 2.2vw, 1.75rem) on text frames.

## Components

### Buttons
Square, condensed, uppercase, and confident, like a lab stamp.
- **Shape:** square (0px), minimum height 52px (40px for the small header variant).
- **Primary:** mask orange fill with ink text, padding .9rem 1.5rem, condensed 700 uppercase with 0.08em tracking.
- **Hover / Focus:** fill shifts to mask-hi over .25s with ease-out; `:active` nudges down 1px; focus is a 2px amber outline at 3px offset (ink on paper and orange bands).
- **On orange:** the primary button inverts to an ink fill with print-colored text.
- **Arrow link (secondary):** the same condensed uppercase type, underlined at a .4em offset that opens to .55em on hover, followed by a masked SVG arrow in currentColor.

### Grease Circle (signature)
A hand-drawn red loop around the one chosen action in a view. It is an absolutely positioned SVG that overflows the button by about 16–18px. It has a 3.8 stroke with round caps, plus a 55%-opacity ghost stroke offset 1.6/1.2 to suggest the wax dragging. Each instance uses a slightly different path. It draws once via `stroke-dashoffset` over 1.1s with ease-draw after a .45s delay, when it scrolls into view. With reduced motion it appears already drawn.

### Black Cross
An ink square outline (1.5 stroke) crossed by two hand-drawn strokes (3.2, round caps). It marks the options that are rejected, as in "not therapy, not consulting, not mentoring." It is the counterpart of the circle: red means chosen, black means rejected.

### Frames & Strips
- **Corner Style:** square (0px).
- **Background:** rebate-2 inside a rebate strip, including when the strip sits on an orange or paper band.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none; the sprocket rows do the framing.
- **Internal Padding:** text frames clamp(1.25rem, 2.2vw, 1.75rem); strips 2.25rem vertical.
- **Caption:** every frame carries an edge-print number line underneath (01A, 14 ▸ 14A). The number is amber on black and ink-soft on paper.
- **Develop:** photo frames start overexposed (`brightness(1.75) contrast(.55) saturate(.2)`) and develop to normal over 1.8s with ease-out on arrival.

### Print (pricing)
A frame with the title and price on a rebate-2 plate. The featured frame is wider (1.3fr) and its amount is in mask orange, with an edge-print badge in the top-right corner. Details sit *below* the frame on the paper as lab-order notes. They are hairline-ruled rows with a 1px ink rule on top.

### Contact Channels
Hairline-ruled rows on paper with this layout: mask-orange icon | edge-print label | wide 700 value. Hover fills the row with print-2.

### Navigation
- **Desktop (≥960px):** edge-print links in print color. Hover and active states turn amber, and the active link gets a 1px amber underline. The small primary button sits at the right.
- **Brand:** 38px square portrait with a 1px rebate-3 outline, name at 700 weight, and "Youth Coach" in edge print.
- **Mobile:** a 44px hamburger opens a full-height black panel to the right of the spine. Links are set in wide display type (clamp(2rem, 9vw, 2.75rem), 800) and divided by rebate-2 hairlines, with the active link in mask orange and a full-width primary button at the bottom.

### FAQ
Uses native `details` on black, with rebate-3 hairlines between items. Questions are wide 700 at clamp(1.1rem, 1.7vw, 1.3rem) and turn amber on hover. The icon is a mask-orange plus that rotates into a minus. Answers are fog-colored with a maximum width of 62ch.

## Do's and Don'ts

### Do:
- **Do** build every section as a full-bleed band in rebate, mask, or print, and swap text and focus colors to match the field.
- **Do** put content that needs enclosing in a frame on a sprocketed strip, with an edge-print number underneath.
- **Do** circle exactly one action per view in grease red, and draw it once.
- **Do** set labels, numbers and captions as condensed, uppercase, amber edge print with tabular figures, placed under the heading or frame they describe.
- **Do** separate layers with film tones (rebate / rebate-2 / rebate-3) or 1px hairlines.
- **Do** keep photos from the one dusk shoot; crop them into new frames rather than introducing other imagery.

### Don't:
- **Don't** use grease red for text, fills, borders, or hover states.
- **Don't** round any corner or add a shadow to frames, plates or buttons.
- **Don't** stack an edge-print label above a heading as an eyebrow.
- **Don't** introduce cards, testimonial blocks, or a second typeface; the cream-serif-terracotta coach landing page is the rejected reference.
- **Don't** add ambient or scroll-linked motion beyond develop and draw; the stillness is what makes the circle land.

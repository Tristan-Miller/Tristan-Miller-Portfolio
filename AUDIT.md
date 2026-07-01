# Portfolio site — audit & plan

Audit of the hand-written static site (plain HTML/CSS/JS, deployed to GitHub Pages
from `New-Branch`, custom domain `tristanmiller.xyz`). All work for this audit is on
the `cleanup` branch; `New-Branch` is untouched.

**Files reviewed:** `index.html` (home + work grid + about, as show/hide divs),
`work.html`, `projectOne.html … projectEight.html`, and `resources/` (`sketch.js`,
`work.js`, `colour.js`, `cursor.js`, `style.css`, `P5/`, images, audio, Lottie JSON at
repo root).

Legend: **[S]** small/obviously-safe fix · **[M]** medium refactor (needs sign-off) ·
**[L]** large/behavioural or asset change (needs sign-off, may show before/after).

---

## 1. Correctness / bugs

1. **`work.js` crashes on every non-home page. [M]** It runs element lookups at the
   top level: `showreelContainer.clientHeight` (line 31) dereferences `null` on
   `projectN.html`/`work.html`, throwing immediately. Everything below that line —
   including the click handlers and `initializeMovingDivs()` — never executes. Project
   pages only work because `goBack()` is a *hoisted function declaration*, so the inline
   `onclick="goBack()"` still resolves. This is exactly the "load-order fragility" risk:
   the site depends on where the exception lands, not on correct scoping.
2. **Implicit cross-file globals + load-order coupling. [M]** `textColor` /
   `backgroundColor` live in `colour.js`; `drawingEnable` in `sketch.js`; both are read
   by `work.js`. Nothing is namespaced or modular, so the four scripts must load in a
   specific order and each leaks globals into the others.
3. **Duplicate event listener.** `workContainerThree`'s click→navigate handler is
   registered twice (`work.js` 368–374). Harmless but dead.
4. **16 copy-pasted image-swap functions.** `changeImage`…`changeImage8` +
   `resetImage`…`resetImage8` differ only by an id and a filename — all of which are
   already implied by the DOM. **[M]**
5. **Bitwise `&` used where logical `&&` was meant.** `sketch.js` `draw()` lines 120/122:
   `workPageVis == true & drawingEnable == false`. Works by luck with booleans; wrong
   operator. **[S]**
6. **Invalid CSS.** `#imageOne { background-color: textColor }` and
   `background-color: backgroundColor` (`style.css` 463/472) aren't valid colour values;
   the browser drops them. JS sets these at runtime, so it's dead/misleading CSS. **[S]**
7. **`funButton.borderColor = textColor`** (`colour.js` 315/329) sets a non-existent DOM
   property — should be `funButton.style.borderColor`. Silent no-op. **[S]**
8. **Misleading comment.** `index.html` 276: `}, 2000); // Delay ... (5000ms = 5s)` — the
   delay is 2000 ms, not 5000. **[S]**
9. **Dead references / elements.** `Switchy` (`work.js` 22, element never exists),
   `loading-screen` handler (`work.js` 514–518, no such element), `#fadeToBlack` (only in
   orphaned `work.html`), and CSS for `.welcomeMessage` / `#welcomeMessageGif` /
   `.mute-button` / `#menu` / `#colourButton` / `#closeButton` with no matching markup. **[S]**
10. **Orphaned page `work.html`.** Not linked from anywhere (home uses JS show/hide; project
    pages `goBack()` → `index.html`). It loads `sketch.js`/`work.js` that immediately throw
    on it, and references stale projects (Youi, Peanut Packaging) and images
    (`peanuts.png`, `hera.png`, `optus.png`) that don't match the live grid. Dead. **[M]**
11. **Empty / leftover markup.** `<div class="container"></div>` (index 30–31),
    commented-out project-title block (index 86–88), commented `p5.sound` include.

## 2. Accessibility

1. **`<html lang="">` is empty** on all 10 pages. **[S]**
2. **Social "links" are `<p>` with `click` handlers** (`Instagram`/`Email`/`LinkedIn`).
   Not focusable, not announced as links, no keyboard activation. Must be `<a href>`. **[M]**
3. **Logo / back / colour-swatch / showreel are `<div onclick>`.** The logo
   (`changeColors` on home, `goBack` on project pages), the showreel bubble
   (`movingWorkOne`), and the dark overlay (`showreelVis` → `closeShowreel`) can't be
   reached or triggered by keyboard. **[M]**
4. **Broken heading hierarchy.** Each work item uses **two `<h1>`** (project name *and*
   date); the home view has no real `<h1>`; project pages put the title in a `<p>`. Needs a
   single, sane hierarchy per view. **[M]**
5. **Awards are parallel `<p>` columns joined with `<br>`.** Screen readers read each
   column top-to-bottom, destroying row relationships. There's also a duplicated
   desktop/mobile column pair (`#awardClient` vs `#awardClientMobile`) kept in sync by
   hand — and `#awardClientMobile`'s first row says "Distinction" where it should say a
   client. Rebuild as one semantic responsive structure (table or `<dl>`). **[M]**
6. **Custom cursor hides the native pointer globally** (`* { cursor: none }`). It degrades
   on small screens (hidden, `cursor:auto`) but there's no `prefers-reduced-motion`
   consideration, no visible keyboard **focus styling** on buttons, and pointer-device
   users who rely on the OS cursor lose it. **[M]**
7. **`user-select: none` on `body`** blocks selecting/copying text (only the email caption
   is re-enabled). **[S]**
8. **Brush swatches are `<div><img></div>` acting as buttons** with no role/label. **[M]**
9. **No landmarks beyond `main`/`header`, no skip link.** Button state is conveyed by
   colour only. **[M]**
10. **Auto-looping audio** (`FruitSalad.mp3`, `<audio loop>`) — currently only starts on the
    Fun button (a user action, good) but keeps looping with no obvious stop; `ouchSound`
    fires on headshot click. Should never autoplay and should respect reduced-motion. **[M]**

## 3. Performance

1. **Render-blocking scripts in `<head>`.** `p5.min.js` (~1 MB) and `lottie.min.js` load
   without `defer` on `index.html` (lines 8 & 14), blocking parse/render. **[S/M]**
2. **p5 `draw()` loops forever at 60 fps** even when idle, when the work/about view is up,
   or when the tab is hidden (it calls `clear()` every frame). No `noLoop`, `frameRate`
   throttle, off-screen pause, or `prefers-reduced-motion` / low-power gate. **[M]**
3. **Duplicated + unused web fonts (render-blocking).** DM Sans is imported **twice**
   (`style.css` `@import` line 1 *and* `index.html` line 17). **Material Icons** and
   **Material Symbols Outlined** are both loaded but there is **no icon markup anywhere**.
   **Adobe Typekit** (`adn5sjd.css`) is loaded but no CSS references its families. Local
   `HELVETICANEUE*.woff2` are committed with no `@font-face`. Only DM Sans is actually
   used. **[M]**
4. **Heavy media.** `ME_3D.gif` **3.0 MB**, `TristanLogoExplode.gif` **1.3 MB** (not
   referenced anywhere — dead), `REELGIF.gif` 322 KB, plus per-project motion GIFs swapped
   in on hover. GIF is the worst format for this; muted `<video>`/WebP is far smaller. **[L]**
5. **Very large videos.** Showreel `Reel-2025.mp4` **74 MB**; project videos up to **83 MB**
   (`CPI_HypeReel`), **68 MB** (Rolus), **65 MB** (Values). Project pages `autoplay loop`
   several multi-MB videos at once. No `preload`/lazy strategy. **[L]**
6. **No `width`/`height` or lazy-loading on images/videos** → layout shift and eager
   downloads. **[M]**
7. **Repo bloat.** Working tree **1.7 GB**, `.git` **976 MB** (large media committed across
   history). `resources/P5/p5.js` (4.3 MB unminified) and `p5.sound*` addons are committed
   but never served. History rewrite is out of scope/destructive, but the unused P5 files
   can be dropped. **[M]** (history rewrite: flag only)

## 4. Code quality / maintainability

1. **Massive repetition** in `work.js`: the ~15-line block that recolours every button /
   SVG is copy-pasted across the Work toggle, About toggle, and again in `colour.js`. **[M]**
2. **16 image-swap fns + 40 inline `on*` handlers** in the HTML (see §1.4). **[M]**
3. **Inline `<script>` blocks in HTML** (Lottie logo init in every page, intro-animation
   init, per-page bodymovin calls) instead of `resources/`. **[M]**
4. **Inconsistent naming / style:** `workPaged`, `aboutPage2`, `Switchy`, `movingWorkOne`;
   mixed `var`/`let`/`const`; `==` vs `===`. **[M]**
5. **CSS smells:** two separate `* { }` universal blocks, many commented-out `border:` debug
   rules, invalid declarations (§1.6), rules for non-existent elements (§2/§1.9). **[S/M]**
6. **No `.gitignore`; 10 committed `.DS_Store` files.** **[S]**

## 5. UX

1. **No URL routing.** Work and About are opacity/z-index toggles on `index.html` — no deep
   link, no Back/Forward, refresh drops you home, nothing is shareable. (Projects *are*
   separate pages, which is good; the grid that links to them is trapped inside the toggle.)
   Add lightweight hash or History-API routing while keeping the transition feel. **[L]**
2. **Discoverability:** clicking the logo to randomise colours, and the Fun button's draw
   mode, are undiscoverable and unlabeled. **[M]**
3. **Layout shift** as fonts/GIFs load; showreel bubble physics only re-init on
   `orientationchange`. **[M]**
4. **Same `<title>` "Tristan Miller"** on every page including all project pages. **[S]**

## 6. SEO / meta

1. **No meta description, no Open Graph / Twitter card, no canonical, empty `lang`** → poor
   link previews and indexing. **[S]**
2. **Non-descriptive, identical `<title>`** across pages (see §5.4). **[S]**
3. **Missing `alt` text** on most images (project previews, `alt=""` on REELGIF, `ME_3D.gif`,
   all project-page media). Overlaps a11y + SEO. **[M]**
4. No `apple-touch-icon` / `theme-color`; no `sitemap`/`robots` (minor for a portfolio). **[S]**

---

## Proposed plan (prioritised, high-impact + low-risk first)

**Phase 0 — safe fixes, no look/feel change (doing these now, one commit each):**
- Add `.gitignore`; stop tracking `.DS_Store` (§4.6).
- Set `<html lang="en">` on all 10 pages (§2.1).
- Add per-page `<title>`, meta description, Open Graph + Twitter card, `theme-color`,
  `apple-touch-icon` (§6). *(OG image: I'll wire it to an existing asset and flag it so you
  can drop in a purpose-made 1200×630 image.)*
- Fix the misleading `5000ms` comment and the `& → &&` / `funButton.borderColor` /
  invalid-CSS nits (§1.5–1.8).

**Phase 1 — accessibility & semantics (needs sign-off; low visual risk):**
- Real `<a>` for social links; make logo/back/colour/showreel keyboard-operable `<button>`
  or `<a>` with focus styles; add `:focus-visible` styling (§2.2, 2.3, 2.6, 2.9).
- Fix heading hierarchy to one `<h1>` per view (§2.4).
- Rebuild awards as one semantic, responsive structure — **before/after shown** (§2.5).
- Add `alt` text everywhere (§6.3).

**Phase 2 — de-duplication / maintainability (needs sign-off; no visual change):**
- Replace the 16 image-swap fns + inline handlers with one data-attribute-driven handler
  and JS listeners (§1.4, §4.2).
- Extract inline `<script>` blocks into `resources/`; guard each script so it no-ops on
  pages missing its elements (kills the crash in §1.1 and the load-order fragility §1.2).
- Factor the repeated recolour block into one function (§4.1). Remove dead code/CSS &
  decide on `work.html` (§1.9–1.11, §4.5).

**Phase 3 — motion / cursor / audio behaviour (needs sign-off; behavioural):**
- Honour `prefers-reduced-motion`: gate p5 autoloop, Lottie autoplay/loop, GIF motion, and
  showreel autoplay; ensure audio only ever plays on explicit action (§2.6, 2.10, §3.2).
- Throttle/pause the p5 canvas when a view is open, off-screen, or the tab is hidden (§3.2).
- Cursor: degrade gracefully (already hidden on touch) + keep native cursor for reduced-
  motion / when JS off; keyboard focus unaffected (§2.6).

**Phase 4 — performance / assets (needs sign-off; some are asset changes):**
- Trim fonts to just DM Sans (drop Material Icons, Material Symbols, Typekit, unused
  Helvetica), de-dupe the DM Sans import, `defer` p5/lottie, add `width/height` +
  `loading="lazy"` (§3.1, 3.3, 3.6).
- Convert heavy GIFs to muted looping `<video>`/WebP; add `preload`/lazy for project videos;
  remove unused `TristanLogoExplode.gif` and the unminified `p5.js`/`p5.sound` (§3.4, 3.5, 3.7).
  *(Re-encoding your videos affects fidelity — I'll propose settings and show a sample first.)*

**Phase 5 — client-side routing (needs sign-off; biggest change):**
- Add hash or History-API routing so Home/Work/About (and ideally each project) are
  linkable with working Back/Forward, preserving the current transitions (§5.1).

**Out of scope unless you ask:** rewriting git history to shrink `.git` (destructive).

After each phase I'll verify the site still renders and navigation works, and commit in
small, single-purpose steps so you can review/revert.

---

## Status — done on the `cleanup` branch

All five phases were implemented and verified in a real browser (home + project
pages, keyboard focus order, desktop + mobile). Highlights:

- **Phase 0** — `.gitignore` + untracked `.DS_Store`; `lang="en"`; per-page titles + meta
  description + OG/Twitter; comment + `&&` fixes.
- **Phase 1** — social links, logo, back and showreel are now real `<a>`/`<button>`;
  single-`<h1>` hierarchy + section headings; awards rebuilt as one responsive `<table>`
  (fixes the duplicate mobile column and its wrong first row); `:focus-visible`, skip link,
  alt text.
- **Phase 2** — 16 image-swap functions + inline handlers → one data-attribute handler;
  inline Lottie extracted to `resources/lottie-init.js`; `work.js` guarded so it no longer
  crashes on project pages; dead code + `work.html` removed; `work.js` dropped from project
  pages (they only needed `goBack`).
- **Phase 3** — `prefers-reduced-motion` calms Lottie (final frame), the floating bubble
  (parked), and auto-playing videos (paused); load-fade/showreel transitions disabled; p5
  loop pauses when the tab is hidden. Auto audio already required the Fun button.
- **Phase 4** — fonts trimmed to DM Sans only (dropped Material Icons/Symbols, Typekit,
  unused Helvetica) and de-duped; `defer` on p5/lottie; lazy-loading on images; project
  videos play only while on-screen (IntersectionObserver); `ME_3D.gif` (2.9 MB) and the
  showreel bubble GIF converted to muted `<video>`.
- **Phase 5** — hash routing (`#work` / `#about`) with working Back/Forward and deep links;
  returning from a project restores the work view.

### Deferred — needs your call (see the final summary)

1. **Project-preview motion GIFs** (12 files, ~24 MB total, loaded only on card hover) →
   convert to on-hover muted `<video>`. Big savings (~68–88%) but needs a small hover-swap
   rework and re-encodes your motion previews, so it's opt-in.
2. **Large existing project MP4s** (74–83 MB each) → recompress. Sample: the 74 MB showreel
   re-encodes to ~34 MB at high-quality H.264 CRF 23; more aggressive settings go lower.
   Not applied — awaiting your quality sign-off.
3. **`.git` is ~976 MB** from large media committed across history. Shrinking it means a
   history rewrite (destructive) — left out of scope.

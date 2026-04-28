# DevPortfolio — CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **React 19** — functional components, hooks
- **Vite** — build tool with HMR; `base: '/p176/'` for GitHub Pages
- **React Bootstrap 5** — UI component library (Navbar, Card, Badge, Button, Form, ProgressBar, Collapse, OverlayTrigger, Tooltip)
- **React Router v7** — `HashRouter` for GitHub Pages compatibility (no server-side rewrites)
- **react-icons** — icon library; sets in use: `fa`, `io5`, `lu`, `si`, `bs`. (Simple Icons removed LinkedIn at LinkedIn's request, hence the `bs` `BsLinkedin` fallback.)
- **lucide-react** — thin-stroke outline icons (`Send`, `Trash2`, `Mail`)
- **react-type-animation** — Hero heading typing effect; rendered with `cursor={false}` (a CSS `::after` caret on `.hero-heading` replaces the library's `|`)
- **IntersectionObserver** — scroll-triggered fade-in in `TimelineEntry.jsx`
- **gh-pages** — deploys `dist/` to the `gh-pages` branch
- **Formspree** — `ContactForm.jsx` POSTs to `https://formspree.io/f/mbdqpgzb`. No other backend; votes and guestbook persist per-browser via `localStorage`.

## Project Structure

```
p176/
├── public/                    # Static assets (images, resume PDF) — served at base + path
├── src/
│   ├── assets/                # Build-time assets
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky navbar + dark mode toggle + smooth scroll links
│   │   ├── Hero.jsx           # Full-viewport intro (defines id="hero" anchor)
│   │   ├── AuroraBackground.jsx # Page-level aurora backdrop, mounted on every routed page
│   │   ├── ProjectCard.jsx    # Card with tags, deep-dive link, upvote
│   │   ├── FilterPopover.jsx  # Multi-select skill chips popover for project filtering
│   │   ├── SkillBadge.jsx     # Color-coded tag badge with category tooltip
│   │   ├── SkillGrid.jsx      # Skills section progress bars grouped by category
│   │   ├── ContactForm.jsx    # Formspree-backed contact form
│   │   ├── Guestbook.jsx      # Visitor name+note feed (localStorage)
│   │   ├── TimelineEntry.jsx  # One timeline card; IntersectionObserver fade-in
│   │   ├── ResumeTimeline.jsx # Shared block (orientation="vertical"|"horizontal")
│   │   ├── MeteorShower.jsx   # Wave-based meteor overlay (mounted in App.jsx)
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx              # Long scroll: Hero + Projects + Skills + Resume + Contact
│   │   ├── ProjectDetail.jsx     # /project/:id deep dive
│   │   ├── ExperienceDetail.jsx  # /experience/:id deep dive
│   │   └── Resume.jsx            # /resume horizontal timeline
│   ├── data/
│   │   ├── projects.js           # Project objects (single source of truth)
│   │   ├── experience.js         # Professional-experience objects
│   │   ├── skillColors.js        # Skill categories + colors + getTagStyle/getTagCategory
│   │   ├── skillsSection.js      # Data for SkillGrid (Skills section)
│   │   └── timeline.js           # Timeline entries + types + horizontal-axis helpers
│   ├── App.jsx                   # HashRouter, Routes, dark mode useState, ScrollManager
│   ├── App.css                   # Global styles, dark mode overrides, animations
│   ├── index.css                 # Base styles
│   └── main.jsx                  # Entry point
├── index.html
├── vite.config.js                # base: '/p176/'
├── eslint.config.js              # Flat config, varsIgnorePattern: '^[A-Z_]'
├── package.json
└── README.md
```

## Commands

- `npm run dev` — Vite dev server with HMR (localhost:5173, base path applies)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run deploy` — runs `predeploy` (build) then publishes `dist/` to `gh-pages`

No test runner configured.

## Build & Deploy

1. Local dev: `npm run dev`, open `http://localhost:5173/p176/` (base path applies in dev too).
2. Production: `npm run build`, then `npm run deploy` to publish to the `gh-pages` branch. Live at `https://cs571-s26.github.io/p176/`.
3. Push source to `main` separately: `git add . && git commit && git push`.
4. Smoke test: navigate to `/project/:id`, refresh — `HashRouter` should handle it.

## Deployment-Coupled Configuration

Three pieces must stay in sync:

1. **`vite.config.js`** sets `base: '/p176/'` — change if the publish path changes.
2. **`src/App.jsx`** uses `HashRouter` (not `BrowserRouter`) — required for GitHub Pages deep links without server rewrites. Don't swap without solving SPA fallback.
3. **`src/data/projects.js`** — image paths are stored as `/foo.png` (root-relative). Never hardcode `/p176/`; see "Asset URL gotcha" for the JSX rendering pattern.

## Architecture

### Routing

Four routes in `src/App.jsx`:

- `/` → `pages/Home.jsx` — scroll page with section IDs `hero`, `projects`, `skills`, `resume`, `contact`. (`#resume` still exists; the navbar Resume link routes to `/resume` instead of scrolling.)
- `/project/:id` → `pages/ProjectDetail.jsx` — lookup by numeric `id` from `projects.js`
- `/experience/:id` → `pages/ExperienceDetail.jsx` — lookup by numeric `id` from `experience.js`
- `/resume` → `pages/Resume.jsx` — horizontal timeline page

`Navbar.jsx` scrolls within Home via `getElementById(id).scrollIntoView` for hero/projects/skills/contact; Resume uses `<Link to="/resume">`. The four scroll IDs are a **contract between Navbar and Home** — renaming requires both. Note: `id="hero"` is defined inside `Hero.jsx`, not in `Home.jsx`.

**Cross-route scrolling:** when off-Home, scroll links call `navigate('/', { state: { scrollTo: id } })`; `Home.jsx` reads `location.state.scrollTo` in a `useEffect` and scrolls on the next animation frame.

### Shared Resume Timeline

`components/ResumeTimeline.jsx` owns filter state + Resume PDF button + timeline list, rendered by both `Home.jsx` and `Resume.jsx`. Each mount has its own filter state (Home and `/resume` don't share filters).

`orientation="vertical" | "horizontal"` (default vertical):
- **Vertical** (Home `#resume`): alternating left/right cards in a `max-height: 650px; overflow-y: auto` box; gradient center line with icon badges. Inner container is the `IntersectionObserver` `root`.
- **Horizontal** (`/resume`): `overflow-x: auto` flex row of 320px cards (280px mobile), positioned absolutely by `endYear`+`endMonth+0.5` mapped through `datePercent()` against `TIMELINE_START` → `TIMELINE_END` (Jul 2025 → Aug 2026). Cards alternate top/bottom lanes; year ticks (`timelineYears`) sit above a gradient line.

Adding a new timeline type requires updating BOTH `timelineTypes` in `timeline.js` AND the `iconMap` in `TimelineEntry.jsx` (icons stored as string names so the data file stays React-free).

### Aurora Background

`components/AuroraBackground.jsx` renders a fixed page-level animated aurora (`<div class="aurora-bg"><div class="aurora-inner" /></div>`). Mounted at the root of every routed page (`Home`, `Resume`, `ProjectDetail`, `ExperienceDetail`). 1:1 port of Aceternity's Aurora to vanilla CSS; all visuals live in `src/App.css` (search `.aurora-bg` / `.aurora-inner`).

Invariants:
- DOM nesting matters: `.aurora-inner` carries the static layer + `mask` + `filter`; its `::after` is the animated overlay with `mix-blend-mode: difference`. Splitting these breaks the `invert + difference` color recovery (you get inverted-orange instead of pastel).
- Light mode adds `filter: invert(1)` to recover Aceternity's hues; dark mode drops it (`diff(black, color) = color` already gives the natural hue).
- Timing: light `aurora 60s linear infinite`; dark overrides only `animation-duration: 90s` on `.dark-mode .aurora-inner::after`. `prefers-reduced-motion` freezes both.
- Stacking: `.aurora-bg` is `z-index: 0; pointer-events: none`. Sections (`#hero, #projects, #skills, #resume, #contact`), `<footer>`, `.resume-page`, and `.detail-page` are lifted to `z-index: 1`. Sections must NOT carry `bg-light` or any solid background — it covers the aurora; use `transparent` if needed.
- Mobile: blur reduced from `10px` to `5px` under `@media (max-width: 768px)`.

When adding a new top-level page that should sit over the aurora, mount `<AuroraBackground />` as the first child of its returned fragment and give the root container `position: relative; z-index: 1` (use `.detail-page` for deep-dive pages).

### Meteor Shower

`components/MeteorShower.jsx` renders a wave-based meteor overlay. Mounted ONCE in `App.jsx` (sibling to `<Footer>`), so it survives navigation. Active in both light and dark mode — only the palette differs. CSS in `src/App.css` (search `.meteor`, `@keyframes meteor-fly`, `meteor-trail`, `meteor-tip`).

Spawn cycle (wave-based, NOT independent meteors):
- Initial delay: random 1000–5000ms.
- Each wave: 1–4 meteors sharing direction (angle + entry edge picked once via `pickWaveDirection()`); within a wave each meteor has its own start position, duration, and trail length — they fly parallel, not stacked.
- Next wave is scheduled `longestMeteorDuration + 1400–4500ms` after the current wave starts, so the screen clears before the next wave fires. (No mixed-direction overlapping waves — explicit design feedback.)
- Per-meteor: 1500–2200ms flight, 80–150px trail, 25°–55° downward diagonal, edge picked top/right/left at 40/30/30%.

Mode toggle mid-flight: `darkMode` is read via a `useRef` (a separate effect updates it) so toggling does NOT restart the spawn loop. Each meteor bakes its `dark` flag at spawn time, so in-flight meteors keep their original color; only the next wave reads the new mode.

DOM rig (per meteor):
- `.meteor__head` — 0×0 anchor that flies start → end and rotates to travel angle. Owns the starburst tip via `::before` and carries `--dark`/`--light` modifier vars.
- `.meteor__streak` — trail anchored to the head's right edge (`right: 0`, `transform-origin: 100% 50%`); animates `transform: scaleX` from `0 → 1 → 1 → 0` (`meteor-trail`) so the trail extends from a point at the head, holds, then collapses.
- The starburst lives on the head, NOT the streak (otherwise `scaleX` squashes it).

Stacking: `.meteor` wrapper is `position: fixed; pointer-events: none; z-index: 0` — same as aurora but DOM-ordered after, so it paints on top. Sections at `z-index: 1` paint above. `prefers-reduced-motion` short-circuits the component to render `null`.

### Brand Visual System & Glow Effects

Opt-in CSS classes in `src/App.css` carry the "brand-portfolio" gradient (blue → indigo → violet light / emerald → teal → mint dark). Reuse rather than re-implementing inline.

- **`.brand-portfolio`** — gradient text fill via `background-clip: text`. Used by navbar wordmark, Hero "View Projects" label, project card "Click for deep dive →".
- **`.aurora-form .form-control`** — transparent input + 1.5px gradient-tinted border + layered three-stop box-shadow glow. Single source of truth for ContactForm, Guestbook input, and the Projects search box (wrap with `<div className="aurora-form">`). Modify here, all six inputs update.
- **`.neon-card` + `.guestbook-card`** — animated 2px gradient ring border via the `mask-composite: exclude` trick + halo. Wraps the Guestbook comments list (`.guestbook-list` carries `overflow-y: auto + max-height: 210px`); ring on the non-scroll wrapper keeps the border anchored while comments scroll.
- **`.hero-projects-btn`** — same `mask-composite: exclude` ring trick on `::before`; `border: 0` on the button so the ring becomes the visible border. Bootstrap variant `outline-light` only to suppress the default primary fill.
- **`.border-beam`** — animated radial-gradient orb traveling around each project card via `offset-path: rect(0 auto auto 0 round 14px)` + `offset-distance` keyframe. **Set `offset-rotate: 0deg`** (default `auto` snaps at corners — explicitly fixed). The orb is a circle (rotation-invariant); wrapper's `mask-composite: exclude` (with `padding: 3.5px`) clips visibility to the border ring.
- **`.project-card.card`** — Bootstrap Card overrides via CSS variables (`--bs-card-bg: transparent`, etc.). `.card-footer` has `border-top: 0` (Bootstrap divider explicitly removed). Dark-mode title/description forced to white for contrast on the transparent background.
- **Upvote arrow gradient** — `<FaArrowUp />` SVG path fill is `url(#upvote-gradient-light)` / `-dark`. The `<linearGradient>` defs live in a hidden 0×0 `<svg>` inside `App.jsx` (above `<NavigationBar>`); they MUST be in the global DOM for `fill: url(#…)` to resolve.
- **`.title-external-link` + hover preview popover** — when a project has `live` (in `projects.js`) or a timeline entry has `liveUrl` (in `timeline.js`), the title is wrapped in an `<a target="_blank">` inside a Bootstrap `OverlayTrigger` + `<Popover>` (class `link-preview-popover`) that shows the `image`/`previewImage` thumbnail on hover.
- **Hero social icon brand colors** — inline rules in `App.css` for `.hero-actions a[aria-label="GitHub|LinkedIn|Email"]`: GitHub `#181717` light / white dark, LinkedIn corporate `#0A66C2`, Email indigo `#6366f1` light / teal `#14b8a6` dark.

### Asset URL gotcha (Vite + base path)

`vite.config.js` sets `base: '/p176/'`. Vite auto-prefixes the base for static HTML/CSS asset references but **NOT for JS string literals**. So `image: "/og-image.png"` in `projects.js` rendered as `<img src={project.image}>` 404s.

Pattern for data-driven asset paths in JSX:

```jsx
<img src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} />
```

`import.meta.env.BASE_URL` resolves to `/p176/` in dev and prod. The `.replace(/^\//, '')` strips the leading slash. Used in `ProjectCard.jsx` and `TimelineEntry.jsx` popovers; apply the same pattern anywhere else.

### State Management

- **Dark mode** — `useState` in `App.jsx`, prop-drilled to `Navbar` and `MeteorShower`. Toggles `.dark-mode` on root wrapper. Persisted to `localStorage['p176:dark-mode']` (string `'true'` / `'false'`); first-time visitors default to light (any non-`'true'` value, including `null`, is treated as light).
- **Project votes** — `useState` in `Home.jsx`, passed to `ProjectCard` via `onVote`. Persisted to `localStorage['p176:project-votes']` as `{ [id]: votes }`. Only the map is stored, not project content, so stale project metadata can't get frozen in visitors' browsers.
- **Filters/search** — `useState` in `Home.jsx` for `selectedTags` (multi-select), `showFilters` (popover open/close), `search`. `FilterPopover` uses Bootstrap `Overlay`+`Popover` with `rootClose` + ESC listener. Search matches `title`, `description`, AND `tags`. Timeline `filter` lives in `ResumeTimeline.jsx` (per-mount, so Home and `/resume` don't share).
- **Contact form** — `useState` in `ContactForm.jsx` (`form` + `status` idle/sending/success/error). POSTs JSON to Formspree; success clears the form and shows a Bootstrap `Alert`; errors show a mailto fallback.
- **Guestbook** — `useState` in `Guestbook.jsx`, persisted to `localStorage['p176:guestbook-v2']` (the `-v2` suffix invalidates pre-format-change entries; bump to `-v3` if the seed shape changes again). Form-created entries are tagged `{ id, mine: true }` and render a Trash2 delete button; the seed entry has none.
- **Timeline visibility** — `useState` + `useRef` + `IntersectionObserver` in `TimelineEntry.jsx` toggles `.visible` on viewport entry (threshold 0.2).
- **Scroll restoration** — `ScrollManager` in `App.jsx` writes `scrollY` to `sessionStorage['scroll:${pathname}']`; on POP or routes carrying `state.restoreScroll`, it restores.

Votes/guestbook persist per-browser (localStorage); scroll positions per-tab (sessionStorage). All other state is ephemeral.

### Data Model (Single Source of Truth)

**`src/data/projects.js`** — Array of project objects: `id`, `title`, `tagline`, `description`, `image`, `tags`, `highlights`, `challenges`, `outcome`, `github`, `live`, `votes`. Imported by both `Home` (list/filter/search) and `ProjectDetail` (lookup by `id`). Append a new entry with a unique numeric `id` to add a project.

**`src/data/skillColors.js`** — Skill categories with consistent color coding:
- **Languages** (blue `#4fc3f7`)
- **Frameworks** (green `#81c784`)
- **DevOps & Cloud** (orange `#ffb74d`)
- **AI & LLM** (dark teal `#1a5b72`)
- **Observability** (red `#ef5350`)
- **Databases** (purple `#ce93d8`)
- **Other Tools** (grey `#90a4ae`)

Exports `getTagStyle(tag)` (returns `{backgroundColor, color, border}`) and `getTagCategory(tag)` (returns category name for tooltip).

**Critical:** A tag used in `projects.js` must appear in a `skills` array in `skillColors.js`, otherwise it falls through to generic grey.

**`src/data/experience.js`** — Professional-experience objects (`id`, `title`, `company`, `location`, `period`, `tagline`, `overview`, `team`, `tags`, `impact`, `highlights`, `technicalDecisions[{title, detail}]`, `links`). Consumed by `pages/ExperienceDetail.jsx`. Intentionally separate from `projects.js` so the UX distinguishes "internship/full-time role" from "personal project".

**`src/data/timeline.js`** — Array of timeline entries (`id`, `type`, `title`, `subtitle`, `period`, `startYear`, `startMonth`, `endYear`, `endMonth`, `description`, optional `highlights`, `link`, `expanded`, `liveUrl`, `previewImage`) + a `timelineTypes` map (education/experience/project, each with color/bg/label/icon). Type colors are reused from `skillColors.js` to keep the palette coherent.

- `endYear`/`endMonth` drive horizontal-mode positioning and sort order. `endMonth` accepts fractional values (e.g., `10.5`) — cards are nudged off their real end date to avoid overlapping each other or the year ticks. The `period` string always shows the true date.
- `entry.expanded = { label, items[] }` renders a "Show {label}" chevron toggle (Bootstrap `Collapse`); used for Education coursework.
- `entry.liveUrl` + `previewImage` triggers the same hover-preview-popover pattern as `ProjectCard`.

Exports: `getTypeStyle`, `getTypeLabel`, `timelineTypes`, `timelineYears`, `TIMELINE_START`/`TIMELINE_END`, `datePercent(year, month)` (clamps to `[0, 100]`).

**`src/data/skillsSection.js`** — Data for `SkillGrid` rendered in Home's Skills section (categories + ProgressBar values).

### Component Conventions
- Pages in `src/pages/`, reusable pieces in `src/components/`.
- Bootstrap classes + react-bootstrap components; custom CSS in `App.css`/`index.css`.
- `main.jsx` imports `bootstrap/dist/css/bootstrap.min.css` once globally.
- Icons: `react-icons/fa` for utility glyphs; `react-icons/si` + `bs` for brand marks; `lucide-react` for thin-stroke outlines.
- `SkillBadge` is the single reusable component for color-coded tags with tooltips.
- Data-driven asset paths in JSX must use `import.meta.env.BASE_URL` (see "Asset URL gotcha").

### Lint Rule Quirks
`eslint.config.js` sets `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'` — unused identifiers starting with uppercase or underscore are allowed (component imports, constants). Don't add suppressions for those cases.

## Roadmap (in progress)

- 🔲 **Accent color customizer** — preset accent colors that update buttons/links/progress bars site-wide.
- 🔲 **Mobile responsive polish** — touch-friendly interactions + timeline single-column on mobile.
- 🔲 Backend for persistent guestbook entries (currently localStorage-only).
- 🔲 User analytics, real project images/screenshots, embedded PDF resume viewer, custom domain.

_Completed: resume interactive timeline, Hero + timeline scroll animations, animated aurora background, wave-based meteor shower, Formspree contact form._

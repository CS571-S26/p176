# DevPortfolio — CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **React 19** — functional components, hooks (useState, useEffect, useRef, useParams, useNavigate)
- **Vite** — build tool with HMR, configured with `base: '/p176/'` for GitHub Pages
- **React Bootstrap 5** — UI component library (Navbar, Card, Badge, Button, Form, ProgressBar, Collapse, OverlayTrigger, Tooltip)
- **React Router v7** — HashRouter for GitHub Pages compatibility (no server-side rewrites)
- **react-icons** — icon library. From `fa`: FaArrowUp, FaChevronDown, FaChevronUp, FaTimes, FaArrowLeft, FaExternalLinkAlt, FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaMoon, FaSun. From `io5`: IoFilter (projects filter button). From `lu`: LuLayers, LuGraduationCap, LuBriefcase, LuCodeXml (resume filter chips). From `si`: SiGithub (Hero — Simple Icons official brand mark; Simple Icons removed LinkedIn at LinkedIn's request, hence Bootstrap Icons fallback below). From `bs`: BsLinkedin (Hero brand mark).
- **lucide-react** — additional icon set: `Send` (contact form submit), `Trash2` (guestbook delete), `Mail` (Hero email icon — `strokeWidth={1.5}` matches FA Light's stroke since FA Light/Pro isn't available in the free `react-icons/fa` package)
- **react-type-animation** — drives the Hero heading typing effect. Rendered with `cursor={false}`; a thin CSS `::after` caret on `.hero-heading` replaces the library's built-in "|" glyph
- **IntersectionObserver** — browser API used in `TimelineEntry.jsx` for scroll-triggered fade-in (no library dependency)
- **gh-pages** — deployment to GitHub Pages gh-pages branch
- **Formspree** — `ContactForm.jsx` POSTs to `https://formspree.io/f/mbdqpgzb`; no other backend. Votes and guestbook entries persist per-browser via `localStorage`; all other state is ephemeral.

## Project Structure

```
p176/
├── public/                    # Static assets (images, resume PDF)
│                              # Files here are served at root; Vite prefixes with base at build
├── src/
│   ├── assets/                # Build-time assets (hero.png, react.svg, vite.svg)
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Sticky navbar, smooth scroll links, dark mode toggle
│   │   ├── Hero.jsx           # Full-viewport intro (defines id="hero" anchor); react-type-animation on heading + thin CSS ::after caret + staggered reveal of subtitle/tagline/buttons; typingDone flipped by setTimeout (library has no onComplete); respects prefers-reduced-motion
│   │   ├── AuroraBackground.jsx # Page-level aurora gradient backdrop mounted at the root of every routed page (Home, /resume, /project/:id, /experience/:id); renders <div class="aurora-bg"><div class="aurora-inner" /></div>. All visuals are CSS in App.css — Aceternity Aurora ported to vanilla
│   │   ├── ProjectCard.jsx    # Card with tagline, tags (max 6 visible + "+N more" toggle), description, "Click for deep dive" link, upvote button
│   │   ├── FilterPopover.jsx  # Bootstrap Overlay/Popover anchored to Home's filter button; multi-select skill chips grouped by category; ESC + rootClose to dismiss
│   │   ├── SkillBadge.jsx     # Reusable tag badge with OverlayTrigger tooltip showing category
│   │   ├── SkillGrid.jsx      # Progress bars grouped by category from skillColors.js
│   │   ├── ContactForm.jsx    # Name/email/message form; POSTs to Formspree (status states: idle/sending/success/error)
│   │   ├── Guestbook.jsx      # Visitor name+note feed; persisted to localStorage; authored entries show a Trash2 delete button
│   │   ├── TimelineEntry.jsx  # One card in the resume timeline; icon badge rides on the line; IntersectionObserver fade-in; supports horizontal mode with top/bottom lanes + leftPercent positioning
│   │   ├── ResumeTimeline.jsx # Shared block: heading + Resume PDF button + Lucide-icon filter chips + timeline; orientation="vertical"|"horizontal"
│   │   └── Footer.jsx         # Simple footer with copyright
│   ├── pages/
│   │   ├── Home.jsx             # Main scroll page: AuroraBackground (page-level backdrop) + Hero + Projects + Skills + Resume + Contact. Skills and Contact sections intentionally have NO bg-light class so the aurora flows through unbroken
│   │   ├── ProjectDetail.jsx    # /project/:id deep-dive route
│   │   ├── ExperienceDetail.jsx # /experience/:id deep-dive route (professional roles)
│   │   └── Resume.jsx           # /resume — standalone page wrapping ResumeTimeline for direct linking
│   ├── data/
│   │   ├── projects.js          # Array of project objects (single source of truth)
│   │   ├── experience.js        # Array of professional-experience objects for /experience/:id
│   │   ├── skillColors.js       # Skill categories, colors, getTagStyle(), getTagCategory()
│   │   └── timeline.js          # Timeline entries + timelineTypes/getTypeStyle() for /resume
│   ├── App.jsx                # Root: HashRouter, Routes, dark mode useState, wraps Navbar+Footer
│   ├── App.css                # Global styles, dark mode overrides, hover effects
│   ├── index.css              # Base styles
│   └── main.jsx               # Entry point: imports bootstrap CSS, renders App into #root
├── index.html                 # HTML shell, loads /src/main.jsx
├── vite.config.js             # base: '/p176/' for GitHub Pages
├── eslint.config.js           # Flat config, varsIgnorePattern: '^[A-Z_]'
├── CLAUDE.md                  # This file
├── package.json               # Scripts, dependencies
└── README.md
```

## Commands

- `npm run dev` — start Vite dev server with HMR (localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — run ESLint (flat config in `eslint.config.js`)
- `npm run deploy` — runs `predeploy` (build) then publishes `dist/` to `gh-pages` branch

There is no test runner configured.

## Build & Validation Flow

### Local Development
1. `npm run dev` — start dev server
2. Open `http://localhost:5173/p176/` (base path applies locally too)
3. Verify all five sections render: Hero, Projects, Skills, Resume, Contact

### Interaction Testing Checklist
- [ ] **Dark mode**: toggle in navbar, verify all sections adapt (text-muted, bg-light, etc.)
- [ ] **Hero typing**: reload, verify "Hi! I'm Jatin" types in char-by-char, then subtitle/tagline/buttons fade+rise
- [ ] **Reduced motion**: enable OS "Reduce Motion", verify hero renders instantly without animation
- [ ] **Aurora light mode**: pastel blue/cyan/violet stripes drift across the upper-right of the viewport behind every Home section (Hero through Contact), with the radial mask fading toward the lower-left
- [ ] **Aurora dark mode**: toggle to dark — green/teal stripes drift across the same upper-right region, noticeably slower than light mode (90s vs 60s)
- [ ] **Aurora coverage**: every routed page (`/`, `/resume`, `/project/:id`, `/experience/:id`) renders the aurora behind its content. Light mode = pastel blue/violet drift, dark mode = green/teal northern lights, both visible on every page
- [ ] **Aurora reduced motion**: enable OS "Reduce Motion" — aurora freezes (no drift) in both color modes
- [ ] **Aurora z-order**: confirm all Home content (cards, buttons, links, contact form, guestbook) renders ABOVE the aurora and remains clickable
- [ ] **Project filter popover**: click Filter button, verify popover opens anchored to the button; ESC or click-outside closes it
- [ ] **Multi-tag selection**: select chips from multiple categories, verify cards filter (OR logic — a card matches if it has ANY selected tag)
- [ ] **Filter badge**: verify the filter button shows a red count badge equal to selected tags
- [ ] **Clear all in popover**: verify "Clear all" resets selections; button disabled when none selected
- [ ] **Search**: type in search bar, verify cards filter by title/description
- [ ] **Search + filter combo**: apply tag filters AND search text together, verify both apply
- [ ] **No results**: search for gibberish, verify empty state shows "Clear filters" button
- [ ] **Tag truncation**: open a project card with >6 tags, verify "+N more" toggle reveals the rest; "Show less" collapses back
- [ ] **Upvotes**: click arrow-up on project cards, verify count increments and persists across reload
- [ ] **Upvote doesn't navigate**: clicking upvote should NOT open project detail page
- [ ] **Deep dive link**: click "Click for deep dive →" on a card, verify navigates to /project/:id
- [ ] **Project detail route**: click a card → navigates to /project/:id, back button returns to home
- [ ] **Back-button source tracking**: visit /project/:id from a timeline entry (`state.from='resume'`), verify back button reads "Back to resume" and scrolls to #resume; coming from cards reads "Back to all projects"
- [ ] **Invalid project ID**: visit /project/999, verify "Project not found" renders gracefully
- [ ] **Experience detail route**: click a timeline experience entry's "See details →", verify /experience/:id renders
- [ ] **Skill tooltips**: hover any tag badge, verify tooltip shows category name
- [ ] **Contact form via Formspree**: fill and submit, verify sending spinner → success alert + form clears; simulate failure to verify error alert with mailto fallback
- [ ] **Guestbook validation**: submit with empty fields, verify required fields block submission
- [ ] **Guestbook**: submit entry, verify it appears at top of feed and persists across reload
- [ ] **Guestbook delete**: authored entries show a Trash2 button that removes only that entry; seed entry has no delete button
- [ ] **Navbar scroll**: click Home/Projects/Skills/Contact, verify smooth scroll to correct section
- [ ] **Navbar Resume link**: click Resume, verify route change to /resume (not a scroll on Home)
- [ ] **Navbar brand link**: click "Jatin | DevPortfolio" logo, verify navigates to home route
- [ ] **External links**: GitHub, LinkedIn, email icons in Hero open correct URLs in new tabs
- [ ] **Download Resume**: verify button opens /p176/resume.pdf in a new tab
- [ ] **Scroll hint**: verify the chevron at the bottom of #resume scrolls to #contact when clicked
- [ ] **Timeline vertical fade**: scroll inside Home's resume box, verify cards fade in as they enter the scroll container
- [ ] **Timeline horizontal fade**: on /resume, scroll horizontally, verify cards fade in as they enter the horizontal container
- [ ] **Timeline filters**: apply Education/Experience/Projects filter, verify entries filter and re-sort on both orientations
- [ ] **Coursework expand**: on Education timeline entry, verify "Show relevant coursework" reveals the collapsible list
- [ ] **Responsive**: resize to mobile width, verify hamburger menu works
- [ ] **Responsive nav**: open hamburger menu, click a section link, verify menu closes and scrolls
- [ ] **GitHub Pages refresh**: refresh on /project/:id route, verify HashRouter handles it

### Production Deploy
1. `npm run build` — catches import errors, missing deps, build failures
2. `npm run deploy` — pushes `dist/` to `gh-pages` branch
3. Verify live at `https://cs571-s26.github.io/p176/`
4. Test routing: navigate to a project detail page, refresh — HashRouter should handle it
5. `git add . && git commit -m "message" && git push` — push source to `main` branch

## Deployment-Coupled Configuration

Three pieces of config must stay in sync:

1. **`vite.config.js`** sets `base: '/p176/'` — if the repo/publish path changes, update this
2. **`src/App.jsx`** uses `HashRouter` (not `BrowserRouter`) — deep links work on GitHub Pages without server-side rewrites. Don't swap without solving the SPA fallback problem
3. **`src/data/projects.js`** — image paths like `/prometheon.png` resolve from `public/`; Vite prefixes them with `base` at build time, so never hardcode `/p176/` into image paths

## Architecture

### Routing and Page Layout
Four routes defined in `src/App.jsx`:

- `/` → `pages/Home.jsx` — long scrolling page with section anchor IDs: `hero`, `projects`, `skills`, `resume`, `contact`. Note that while the `#resume` section still exists in the Home flow (vertical timeline), the navbar "Resume" link no longer scrolls to it — it navigates to the `/resume` route instead.
- `/project/:id` → `pages/ProjectDetail.jsx` — project detail view, lookup by numeric `id` from `src/data/projects.js`
- `/experience/:id` → `pages/ExperienceDetail.jsx` — professional-experience detail view, lookup by numeric `id` from `src/data/experience.js`
- `/resume` → `pages/Resume.jsx` — standalone page rendering the horizontal variant of `ResumeTimeline`. Reached via the navbar "Resume" link and direct URLs.

`components/Navbar.jsx` navigates within Home via `document.getElementById(id).scrollIntoView` for Home/Projects/Skills/Contact. The Resume link uses `<Link to="/resume">` instead — it's the only navbar item that's a route change, not a scroll target. The four scroll IDs (`hero`, `projects`, `skills`, `contact`) are a **contract between Navbar and Home**. Renaming one requires renaming both. The `#resume` section ID still exists on Home but is no longer referenced by the navbar.

**Shared timeline block:** `components/ResumeTimeline.jsx` owns the filter state + PDF button + timeline list. Both `Home.jsx` and `Resume.jsx` render it, so there is only one source of the filter logic. Each mount has its own filter state — a filter set on Home does not carry over to `/resume`.

`ResumeTimeline` takes an `orientation="vertical" | "horizontal"` prop (default `vertical`) that switches the layout:
- **Vertical** (Home `#resume`): alternating left/right cards inside a `max-height: 650px; overflow-y: auto` box. Gradient center line with circular icon badges sitting on the line. The inner container is the `IntersectionObserver` `root`, so cards fade in as the user scrolls *inside* the section rather than as the outer page scrolls.
- **Horizontal** (`/resume`): `overflow-x: auto` flex row with 320px fixed-width cards (280px on mobile). Cards are positioned absolutely by `endYear`+`endMonth+0.5` mapped to a percentage of the `TIMELINE_START` → `TIMELINE_END` span (Jul 2025 → Aug 2026) via `datePercent()`; entries are also sorted by end date for DOM order. Cards alternate top/bottom lanes. Year ticks (`timelineYears`) sit above a gradient horizontal line; each tick's left position is computed from `datePercent(year, 1)`. The horizontal container is the observer `root`.

Entries live in `src/data/timeline.js`; `TimelineEntry.jsx` is the shared card. Adding a new timeline type requires updating `timelineTypes` in `timeline.js` AND the `iconMap` in `TimelineEntry.jsx`.

**Cross-route scrolling:** when a scroll-based nav link is clicked off-Home, `Navbar.jsx` calls `navigate('/', { state: { scrollTo: id } })` instead of `getElementById`. `Home.jsx` has a `useEffect` on `location` that reads `location.state.scrollTo` and scrolls to that section on the next animation frame, so clicking Home/Projects/Skills/Contact from `/project/:id`, `/experience/:id`, or `/resume` routes back to Home and lands at the right section.

**Note:** `id="hero"` is defined inside `components/Hero.jsx`, not in `Home.jsx` where the other `<section id="...">` blocks live.

### Aurora Background

`components/AuroraBackground.jsx` renders a page-level animated aurora behind every routed page. It is mounted at the root of `Home.jsx`, `Resume.jsx`, `ProjectDetail.jsx`, and `ExperienceDetail.jsx` (always before the page's content fragment), so the effect spans every Home section (Hero → Projects → Skills → Resume → Contact), the horizontal timeline page, and the project/experience deep-dive pages. The aurora is anchored to the viewport (`position: fixed`) and re-mounts on each route change.

**DOM structure:** `<div class="aurora-bg"><div class="aurora-inner" /></div>` — a 1:1 port of Aceternity's Aurora Background component (originally Tailwind + Framer Motion). The nesting matters: `.aurora-inner` owns the static aurora background-image AND the `filter` AND the `mask`, while its `::after` pseudo-element owns the animated overlay with `mix-blend-mode: difference`. Splitting the static layer to a sibling pseudo-element breaks the `invert + difference` color recovery and produces an inverted-orange look instead of the intended pastel.

**Visual technique:** two `repeating-linear-gradient`s layered on top of each other — a masking gradient (white in light mode / black in dark) and a colored aurora gradient (Tailwind blue/violet/cyan in light mode / emerald/teal/green in dark). The `::after` carries the same gradients at a different `background-size` and is animated by panning `background-position` from `50%` → `350%` over a single `aurora` keyframe. `mix-blend-mode: difference` between the static layer and the animated layer + `filter: blur(10px)` produces the shimmering drift. **Light mode adds `invert(1)`** to recover the original aurora hues (Aceternity's `dark:invert-0` trick); dark mode drops the invert because `diff(black, color) = color` already gives the natural hue.

**Animation timing:** light mode `aurora 60s linear infinite`; dark mode overrides only `animation-duration: 90s` on `.dark-mode .aurora-inner::after` for a calmer northern-lights drift. `prefers-reduced-motion` freezes the animation in both modes.

**Stacking:** `.aurora-bg` is `position: fixed; inset: 0; z-index: 0; pointer-events: none`. Home's sections (`#hero, #projects, #skills, #resume, #contact`), the `<footer>`, the standalone Resume page's container (`.resume-page`), and the deep-dive page containers (`.detail-page`, used by `ProjectDetail.jsx` and `ExperienceDetail.jsx`) are all lifted above the aurora with `position: relative; z-index: 1`. The Bootstrap sticky navbar already has `z-index: 1020` so it sits above by default. **Critical:** `bg-light` was removed from `#skills` and `#contact` because a solid section background would cover the fixed aurora; if you add a new section that needs a distinct background, set it to `transparent` (or accept the aurora not showing through). When adding a new top-level page that should sit over the aurora, mount `<AuroraBackground />` as the first child of its returned fragment and give its root container a class that's added to that z-index lift list (`.detail-page` is the conventional one for deep-dive pages).

**Mobile:** blur is reduced from `10px` to `5px` under `@media (max-width: 768px)` for both modes, since `mix-blend-mode + blur + animation` is the most expensive part of the effect.

All aurora CSS lives in `src/App.css` (search for `.aurora-bg` / `.aurora-inner`). Tailwind palette literals are used directly: blues `#3b82f6, #a5b4fc, #93c5fd, #ddd6fe, #60a5fa`; greens `#10b981, #5eead4, #6ee7b7, #bbf7d0, #34d399`.

### Brand Visual System & Glow Effects

A small set of opt-in CSS classes in `src/App.css` carry the "brand-portfolio" gradient (blue → indigo → violet light / emerald → teal → mint dark) across the UI. Reuse these classes rather than re-implementing the gradient inline.

- **`.brand-portfolio`** (`App.css:323`) — gradient text fill via `background-clip: text` + `-webkit-text-fill-color: transparent`. Used by the navbar "DevPortfolio" wordmark, the Hero "View Projects" label inside `<span className="brand-portfolio">`, and the project card "Click for deep dive →" link.
- **`.aurora-form .form-control`** (`App.css:~45–95`) — transparent input + 1.5px gradient-tinted border + layered three-stop box-shadow glow (blue/indigo/violet light, teal/teal/teal-300 dark). Focus state widens the glow. Single source of truth for **ContactForm** inputs (`<Form className="aurora-form">`), **Guestbook** input (`<Form className="aurora-form mb-3">`), and the **Projects search box** (`<div className="aurora-form flex-grow-1">` wrapping the `<Form.Control>` in `Home.jsx`). Modify these rules once and all six inputs update.
- **`.neon-card` + `.guestbook-card`** — animated 2px gradient ring border via the `mask-composite: exclude` trick. `.neon-card` is the ring; `.guestbook-card` adds a wide layered box-shadow halo. Currently used **only** on the Guestbook comments-list wrapper (`<div className="neon-card guestbook-card">` wraps a `<ListGroup className="guestbook-list">`). The wrapper carries the ring and halo; the inner `.guestbook-list` owns `overflow-y: auto + max-height: 210px` (caps at ~3 visible comments). Splitting the ring onto a non-scroll wrapper is what keeps the border anchored while comments scroll inside.
- **`.hero-projects-btn` + `.projects-search-wrap` (legacy class, now removed)** — the Hero "View Projects" button uses the same `mask-composite: exclude` ring trick on its `::before`, with `border: 0` on the button so the ring becomes the visible border. The Bootstrap variant is `outline-light` purely so Bootstrap doesn't paint a primary blue background.
- **`.border-beam` + `.border-beam::before`** — animated radial-gradient orb that travels around each project card's perimeter via CSS `offset-path: rect(0 auto auto 0 round 14px)` + `offset-distance` keyframe animation. Set `offset-rotate: 0deg` (NOT the default `auto`) — auto-rotation snaps at corners and produces the choppy effect we explicitly fixed. The orb is a circle (rotation-invariant), with stacked `drop-shadow(...)` layers in the brand palette for the surrounding halo. The wrapper's `mask-composite: exclude` (with `padding: 3.5px`) clips visibility to the border ring so the orb only shows along the edge. Mounted as `<span className="border-beam" aria-hidden="true" />` inside each `<Card className="project-card">`.
- **`.project-card.card`** — Bootstrap Card overrides via CSS variables: `--bs-card-bg: transparent`, `--bs-card-cap-bg: transparent`, `--bs-card-border-radius: 14px`, `--bs-card-inner-border-radius: 13px`. Border color uses `rgba(0,0,0,0.12)` light / `rgba(255,255,255,0.12)` dark for a thin static outline. `.card-footer` has `border-top: 0` (the Bootstrap divider line was explicitly removed). Title/description colors in dark mode are explicitly overridden to white (subtitle to slate-300) since the transparent background needs higher contrast.
- **Upvote arrow gradient** — the project card upvote `<FaArrowUp />` SVG has its `path { fill }` set via `url(#upvote-gradient-light)` (and `-dark`). Those `<linearGradient>` defs live in a hidden 0×0 `<svg>` block inside `App.jsx` (right above `<NavigationBar>`). They must be in the global DOM for `fill: url(#…)` to resolve. The arrow is metallic dark-blue→indigo→light-violet (light) / dark-teal→teal→mint (dark), base-to-tip, with a small white drop-shadow for sheen.
- **`.title-external-link` + hover preview popover** — when a project has `live` (in `projects.js`) or a timeline entry has `liveUrl` (in `timeline.js`), its `Card.Title` is wrapped in an `<a target="_blank">` with this class (color: inherit, text-decoration: underline). The link is further wrapped in a Bootstrap `<OverlayTrigger>` + `<Popover>` (class `link-preview-popover`) that shows a thumbnail on hover. Currently active on **Prometheon** in both the project card AND its timeline entry, both linking to `https://prometheon.run/`.
- **Hero social icon brand colors** — inline rules in `App.css` for `.hero-actions a[aria-label="GitHub|LinkedIn|Email"]` set GitHub to `#181717` light / white dark, LinkedIn to corporate `#0A66C2`, Email to indigo `#6366f1` light / teal `#14b8a6` dark (middle stops of `.brand-portfolio`).

### Asset URL gotcha (Vite + base path)

`vite.config.js` sets `base: '/p176/'`. Static asset paths in `public/` (e.g., `og-image.png`) are served at `/p176/og-image.png` in both dev and prod. **Vite auto-prefixes the base only for static HTML/CSS asset references — it does NOT transform JS string literals.** So when you store `image: "/og-image.png"` in `projects.js` and render `<img src={project.image}>`, the browser interprets `/og-image.png` as root-relative and 404s.

**Pattern to follow when rendering data-driven asset paths in JSX:**

```jsx
<img src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} />
```

`import.meta.env.BASE_URL` resolves to `/p176/` in both dev and prod. The `.replace(/^\//, '')` strips the leading slash from the data string so we don't end up with `//og-image.png`. Used in `ProjectCard.jsx` (popover image) and `TimelineEntry.jsx` (popover image). Apply this same pattern anywhere else you render `project.image` or similar.

### State Management
- **Dark mode**: `useState` in `App.jsx`, prop drilled to `NavigationBar` and `ShootingStar`. Toggles `.dark-mode` class on root wrapper, styled in `App.css`. Persisted per-browser to `localStorage['p176:dark-mode']` as the string `'true'` / `'false'` — lazy init reads it on mount; a `useEffect` writes on every change. First-time visitors with no stored preference default to light mode (the lazy init treats any non-`'true'` value, including `null`, as light).
- **Project votes**: `useState` in `Home.jsx`, passed to `ProjectCard` via `onVote` callback. Persisted per-browser to `localStorage['p176:project-votes']` as a `{ [id]: votes }` map — lazy init reads and merges onto static `projectsData`; `handleVote` writes the whole map after each increment. Only the map is stored, not project content, so stale project metadata can't get frozen in visitors' browsers.
- **Filters/search**: `useState` in `Home.jsx` for project `selectedTags` (array, multi-select), `showFilters` (popover open/close), `search`; `FilterPopover` is an anchored Bootstrap `Overlay`+`Popover` using `rootClose` + an ESC key listener. The search query matches against `title`, `description`, AND `tags` (so typing `"react"` or `"docker"` surfaces projects with that skill, not just the literal word in the description). `useState` for timeline `filter` in `ResumeTimeline.jsx` (each mount has its own state, so the Home section and `/resume` page do not share a filter)
- **Contact form**: local `useState` in `ContactForm.jsx` — `form` (name/email/message) + `status` (idle/sending/success/error). On submit, POSTs JSON to Formspree; success clears the form and shows a dismissible Bootstrap `Alert`; network failures show an error Alert with a mailto fallback.
- **Guestbook**: local `useState` in `Guestbook.jsx` seeded with one entry; persisted per-browser to `localStorage['p176:guestbook-v2']` (the `-v2` suffix was bumped from `p176:guestbook` to invalidate stale data after the seed entry's date format changed; if you change the seed shape again, bump to `-v3`). Lazy init reads storage; a `useEffect` writes the full `entries` array on every change. Entries created via the form are tagged with `{ id, mine: true }` — only those render a small Trash2 delete button, so a visitor can remove their own notes but not the seed entry or (in the future) entries they didn't author.
- **Timeline visibility**: local `useState` + `useRef` + `IntersectionObserver` in `TimelineEntry.jsx` — toggles a `.visible` class when the entry enters the viewport (threshold 0.2). Observer disconnects on unmount.
- **Scroll restoration**: `ScrollManager` in `App.jsx` continuously writes `scrollY` to `sessionStorage['scroll:${pathname}']`; on POP or on routes carrying `state.restoreScroll`, it restores that Y.
- Votes and guestbook entries persist per-browser (localStorage); scroll positions persist per-tab (sessionStorage). All other state (dark mode, filters, form inputs, timeline filter) is ephemeral and resets on reload. Cross-device persistence for votes/guestbook requires the Future Roadmap backend.

### Data Model (Single Source of Truth)

**`src/data/projects.js`**
Array of project objects: `id`, `title`, `tagline`, `description`, `image`, `tags`, `highlights`, `challenges`, `outcome`, `github`, `live`, `votes`. Both `Home` (list/filter/search) and `ProjectDetail` (lookup by `id`) import this same module. To add a project, append an object with a unique numeric `id`.

**`src/data/skillColors.js`**
Defines skill categories with consistent color coding:
- **Languages** (blue `#4fc3f7`): Python, Java, JavaScript, Go, TypeScript
- **Frameworks** (green `#81c784`): React, FastAPI, Spring Boot, Flask
- **DevOps & Cloud** (orange `#ffb74d`): Docker, Kubernetes, AWS
- **AI & LLM** (dark teal `#1a5b72`): scikit-learn, Gemini API, OpenAI API, NLP
- **Observability** (red `#ef5350`): Prometheus, Grafana, OpenTelemetry, Jaeger
- **Databases** (purple `#ce93d8`): PostgreSQL, MongoDB, Supabase, Flyway, Redis
- **Other Tools** (grey `#90a4ae`): Git, Google Maps API, JWT, Scrum

Exports:
- `getTagStyle(tag)` — returns `{ backgroundColor, color, border }` for white text on category color
- `getTagCategory(tag)` — returns category name string for tooltip display

**Critical:** A tag used in `projects.js` must appear in a `skills` array in `skillColors.js`, otherwise it falls through to generic grey styling.

**`src/data/experience.js`**
Array of professional-experience objects (`id`, `title`, `company`, `location`, `period`, `tagline`, `overview`, `team`, `tags`, `impact`, `highlights`, `technicalDecisions[{title, detail}]`, `links`). Consumed by `pages/ExperienceDetail.jsx` (`/experience/:id`). Timeline entries of type `experience` link here (e.g., SmartCert timeline entry points to `/#/experience/1`). Intentionally separate from `projects.js` so the UX distinguishes "internship / full-time role" from "personal project" — a distinction that matters for SWE recruiters.

**`src/data/timeline.js`**
Array of timeline entries (`id`, `type`, `title`, `subtitle`, `period`, `startYear`, `startMonth`, `endYear`, `endMonth`, `description`, optional `highlights`, optional `link`, optional `expanded`, optional `liveUrl`, optional `previewImage`) + a `timelineTypes` map defining color/bg/label/icon for each of the three types: `education` (blue), `experience` (green), `project` (orange). Colors are reused from `skillColors.js` categories to keep the palette coherent.

When `liveUrl` is set on an entry, `TimelineEntry.jsx` wraps the title in an `<a>` (class `.title-external-link`) inside a Bootstrap `OverlayTrigger` that shows the `previewImage` thumbnail on hover. Currently used on the Prometheon entry pointing to `https://prometheon.run/`. Same pattern lives in `ProjectCard.jsx` keyed off `project.live` + `project.image` (defined in `projects.js`).

`entry.expanded` is an optional `{ label, items[] }` block. When present, `TimelineEntry` renders a chevron "Show {label}" toggle beneath the highlights; clicking reveals the items inside a Bootstrap `Collapse`. Used on the Education entry to hide the full coursework list by default.

`endYear`/`endMonth` drive horizontal-mode positioning and sort order. `endMonth` accepts fractional values (e.g., `10.5`, `1.26`) — individual cards are nudged off their real end date to avoid overlapping each other or the year ticks on the horizontal axis. The `period` string on the card always shows the true date. Vertical mode ignores these and keeps the file order.

Exports:
- `getTypeStyle(type)` — returns `{ color, bg }`, grey fallback for unknown types
- `getTypeLabel(type)` — returns display label ('Education' / 'Experience' / 'Project')
- `timelineTypes` — the full map, used by `TimelineEntry.jsx` to look up icon names
- `timelineYears` — array of years (`[2025, 2026]`) rendered as year ticks on the horizontal timeline's axis
- `TIMELINE_START` / `TIMELINE_END` — inclusive date range for the horizontal axis (`Jul 2025` → `Aug 2026`). Changing these rescales all horizontal card positions
- `datePercent(year, month)` — maps a `(year, month)` to a 0–100 percentage along the horizontal axis; clamps to `[0, 100]`. `ResumeTimeline` calls this with `endYear`+`endMonth+0.5` to position cards

Icons are stored as **string names** in `timelineTypes` (e.g., `'FaGraduationCap'`); `TimelineEntry.jsx` holds a local `iconMap` that resolves the string to the actual `react-icons/fa` component. This keeps the data file free of React imports. Adding a new type requires extending both `timelineTypes` in `timeline.js` and `iconMap` in `TimelineEntry.jsx`.

### Component Conventions
- Pages in `src/pages/`, reusable pieces in `src/components/`
- Styling: Bootstrap classes + react-bootstrap components; custom CSS in `App.css` and `index.css`
- `main.jsx` imports `bootstrap/dist/css/bootstrap.min.css` once globally
- Icons primarily from `react-icons/fa` for utility glyphs; `react-icons/si` (Simple Icons) and `react-icons/bs` (Bootstrap Icons) for brand marks (GitHub, LinkedIn); `lucide-react` for thin-stroke outline icons (Mail, Send, Trash2)
- `SkillBadge` is the single reusable component for rendering color-coded tags with tooltips — used in `ProjectCard`, `ProjectDetail`, and anywhere tags appear
- For data-driven asset paths in JSX, always prefix with `import.meta.env.BASE_URL` (see "Asset URL gotcha" above)

### Lint Rule Quirks
`eslint.config.js` sets `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'` — unused identifiers starting with uppercase or underscore are allowed (component imports, constants). Don't add suppressions for those cases.

## Remaining Roadmap

### Priority (for CS 571 final submission)
- ✅ **Resume interactive timeline** — shared `ResumeTimeline` block with an `orientation` prop. Home's `#resume` section renders the **vertical** variant: alternating left/right cards inside a fixed-height scroll box (650px) with a gradient center line and circular icon badges on the line. `/resume` renders the **horizontal** variant: 320px cards in an `overflow-x: auto` flex row, positioned by end-date percentage along a `Jul 2025 → Aug 2026` axis with alternating top/bottom lanes. Filter chips (Lucide icons) + Resume PDF button are shared across both. IntersectionObserver is scoped to each container so fade-in fires as the user scrolls *inside* the timeline. Data in `src/data/timeline.js`.
- ✅ **Scroll animations** — Hero heading types character-by-character, then subtitle/tagline/buttons stagger-reveal (respects `prefers-reduced-motion`). Timeline cards fade in via IntersectionObserver as they enter the timeline container.
- ✅ **Animated aurora background** — Aceternity's Aurora Background ported to vanilla CSS. Page-level fixed backdrop on Home, blue/violet stripes in light mode (60s drift), green/teal northern lights in dark mode (90s drift). Scoped to `/` only; respects `prefers-reduced-motion`; lighter blur on mobile. See the "Aurora Background" architecture section above.
- 🔲 **Accent color customizer** — let visitors pick from 3-4 preset accent colors, updates buttons/links/progress bars site-wide
- 🔲 **Mobile responsive polish** — hamburger menu done; still need touch-friendly interactions + timeline single-column on mobile

### Future (post-class, backend extension)
- ✅ **Contact form backend** — `ContactForm.jsx` POSTs to Formspree (`https://formspree.io/f/mbdqpgzb`) with sending/success/error states and a mailto fallback
- 🔲 Backend for persistent guestbook entries (still localStorage-only)
- 🔲 User analytics (page views, project click tracking)
- 🔲 Real project images/screenshots in `public/`
- 🔲 PDF resume viewer embedded inline
- 🔲 Custom domain setup
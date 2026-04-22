# DevPortfolio — CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **React 19** — functional components, hooks (useState, useEffect, useRef, useParams, useNavigate)
- **Vite** — build tool with HMR, configured with `base: '/p176/'` for GitHub Pages
- **React Bootstrap 5** — UI component library (Navbar, Card, Badge, Button, Form, ProgressBar, Collapse, OverlayTrigger, Tooltip)
- **React Router v6** — HashRouter for GitHub Pages compatibility (no server-side rewrites)
- **react-icons** — icon library (FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaArrowUp, FaChevronDown, FaChevronUp, FaTimes, FaArrowLeft, FaExternalLinkAlt, FaDownload, FaGraduationCap, FaBriefcase, FaCode)
- **IntersectionObserver** — browser API used in `TimelineEntry.jsx` for scroll-triggered fade-in (no library dependency)
- **gh-pages** — deployment to GitHub Pages gh-pages branch
- **No backend** — all data is hardcoded, all state is ephemeral (resets on reload)

## Project Structure

```
p176/
├── public/                    # Static assets (images, resume PDF)
│                              # Files here are served at root; Vite prefixes with base at build
├── src/
│   ├── assets/                # Build-time assets (hero.png, react.svg, vite.svg)
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Sticky navbar, smooth scroll links, dark mode toggle
│   │   ├── Hero.jsx           # Full-viewport intro (defines id="hero" anchor)
│   │   ├── ProjectCard.jsx    # Card with tags, description, upvote button
│   │   ├── SkillBadge.jsx     # Reusable tag badge with OverlayTrigger tooltip showing category
│   │   ├── SkillGrid.jsx      # Progress bars grouped by category from skillColors.js
│   │   ├── ContactForm.jsx    # Name/email/message form (state-only, no backend)
│   │   ├── Guestbook.jsx      # Visitor name+note feed (state-only, no backend)
│   │   ├── TimelineEntry.jsx  # One card in the resume timeline; icon badge rides on the line; IntersectionObserver fade-in
│   │   ├── ResumeTimeline.jsx # Shared block: heading + PDF button + filter + timeline; orientation="vertical"|"horizontal"
│   │   └── Footer.jsx         # Simple footer with copyright
│   ├── pages/
│   │   ├── Home.jsx             # Main scroll page: Hero + Projects + Skills + Resume + Contact
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
- [ ] **Project filtering**: click category buttons (Languages, Frameworks, etc.), verify cards filter
- [ ] **Expanded skill panel**: click "All Skills" chevron, verify individual tags appear grouped by category
- [ ] **Clear filter**: click "X Clear Filter" button, verify reset to All
- [ ] **Search**: type in search bar, verify cards filter by title/description
- [ ] **Search + filter combo**: apply a category filter AND search text together, verify both apply
- [ ] **No results**: search for gibberish, verify empty state doesn't break layout
- [ ] **Upvotes**: click arrow-up on project cards, verify count increments
- [ ] **Upvote doesn't navigate**: clicking upvote should NOT open project detail page
- [ ] **Project detail route**: click a card → navigates to /project/:id, back button returns to home
- [ ] **Invalid project ID**: visit /project/999, verify "Project not found" renders gracefully
- [ ] **Skill tooltips**: hover any tag badge, verify tooltip shows category name
- [ ] **Contact form validation**: submit with empty fields, verify required fields block submission
- [ ] **Contact form**: fill and submit, verify success alert appears and form clears
- [ ] **Guestbook validation**: submit with empty fields, verify required fields block submission
- [ ] **Guestbook**: submit entry, verify it appears at top of feed
- [ ] **Navbar scroll**: click each nav link, verify smooth scroll to correct section
- [ ] **Navbar brand link**: click "Jatin | DevPortfolio" logo, verify navigates to home route
- [ ] **External links**: GitHub, LinkedIn, email icons in Hero open correct URLs in new tabs
- [ ] **Download Resume**: verify button opens/downloads PDF (or placeholder works gracefully)
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
- **Horizontal** (`/resume`): `overflow-x: auto` flex row with 320px fixed-width cards (280px on mobile), sorted chronologically by `startYear`/`startMonth`. A year-axis row (2022–2026) sits above a gradient horizontal line, with icon badges positioned on the line above each card. The horizontal container is the observer `root`.

Entries live in `src/data/timeline.js`; `TimelineEntry.jsx` is the shared card. Adding a new timeline type requires updating `timelineTypes` in `timeline.js` AND the `iconMap` in `TimelineEntry.jsx`.

**Known gap:** scroll-based nav links silently no-op when clicked from `/project/:id` or `/resume` (`getElementById` returns null off-Home). Fix would require teaching the navbar to `navigate('/')` then scroll.

**Note:** `id="hero"` is defined inside `components/Hero.jsx`, not in `Home.jsx` where the other `<section id="...">` blocks live.

### State Management
- **Dark mode**: `useState` in `App.jsx`, prop drilled to `NavigationBar`. Toggles `.dark-mode` class on root wrapper, styled in `App.css`
- **Project votes**: `useState` in `Home.jsx`, passed to `ProjectCard` via `onVote` callback
- **Filters/search**: `useState` in `Home.jsx` for project `filter`, `search`, `showAllTags`; `useState` for timeline `filter` in `ResumeTimeline.jsx` (each mount has its own state, so the Home section and `/resume` page do not share a filter)
- **Contact form**: local `useState` in `ContactForm.jsx`
- **Guestbook**: local `useState` in `Guestbook.jsx` with seeded initial entry
- **Timeline visibility**: local `useState` + `useRef` + `IntersectionObserver` in `TimelineEntry.jsx` — toggles a `.visible` class when the entry enters the viewport (threshold 0.2). Observer disconnects on unmount.
- All state is ephemeral — resets on page reload. No localStorage, no backend.

### Data Model (Single Source of Truth)

**`src/data/projects.js`**
Array of project objects: `id`, `title`, `tagline`, `description`, `image`, `tags`, `highlights`, `challenges`, `outcome`, `github`, `live`, `votes`. Both `Home` (list/filter/search) and `ProjectDetail` (lookup by `id`) import this same module. To add a project, append an object with a unique numeric `id`.

**`src/data/skillColors.js`**
Defines skill categories with consistent color coding:
- **Languages** (blue `#4fc3f7`): Python, Java, JavaScript, Go, TypeScript
- **Frameworks** (green `#81c784`): React, FastAPI, Spring Boot
- **DevOps & Cloud** (orange `#ffb74d`): Docker, Kubernetes, AWS
- **Observability** (red `#ef5350`): Prometheus, Grafana, OpenTelemetry, Jaeger
- **Databases** (purple `#ce93d8`): PostgreSQL, MongoDB
- **Other Tools** (grey `#90a4ae`): Git, Flyway, Supabase, Google Maps API, Gemini API

Exports:
- `getTagStyle(tag)` — returns `{ backgroundColor, color, border }` for white text on category color
- `getTagCategory(tag)` — returns category name string for tooltip display

**Critical:** A tag used in `projects.js` must appear in a `skills` array in `skillColors.js`, otherwise it falls through to generic grey styling.

**`src/data/experience.js`**
Array of professional-experience objects (`id`, `title`, `company`, `location`, `period`, `tagline`, `overview`, `team`, `tags`, `impact`, `highlights`, `technicalDecisions[{title, detail}]`, `links`). Consumed by `pages/ExperienceDetail.jsx` (`/experience/:id`). Timeline entries of type `experience` link here (e.g., SmartCert timeline entry points to `/#/experience/1`). Intentionally separate from `projects.js` so the UX distinguishes "internship / full-time role" from "personal project" — a distinction that matters for SWE recruiters.

**`src/data/timeline.js`**
Array of timeline entries (`id`, `type`, `title`, `subtitle`, `period`, `startYear`, `startMonth`, `description`, optional `highlights`, optional `link`, optional `expanded`) + a `timelineTypes` map defining color/bg/label/icon for each of the three types: `education` (blue), `experience` (green), `project` (orange). Colors are reused from `skillColors.js` categories to keep the palette coherent.

`entry.expanded` is an optional `{ label, items[] }` block. When present, `TimelineEntry` renders a chevron "Show {label}" toggle beneath the highlights; clicking reveals the items inside a Bootstrap `Collapse`. Used on the Education entry to hide the full coursework list by default.

`startYear`/`startMonth` are used by `ResumeTimeline` in horizontal mode to sort entries chronologically (ascending). Vertical mode ignores them and keeps the file order.

Exports:
- `getTypeStyle(type)` — returns `{ color, bg }`, grey fallback for unknown types
- `getTypeLabel(type)` — returns display label ('Education' / 'Experience' / 'Project')
- `timelineTypes` — the full map, used by `TimelineEntry.jsx` to look up icon names
- `timelineYears` — array of years (`[2022, 2023, 2024, 2025, 2026]`) rendered as the year-axis above the horizontal timeline

Icons are stored as **string names** in `timelineTypes` (e.g., `'FaGraduationCap'`); `TimelineEntry.jsx` holds a local `iconMap` that resolves the string to the actual `react-icons/fa` component. This keeps the data file free of React imports. Adding a new type requires extending both `timelineTypes` in `timeline.js` and `iconMap` in `TimelineEntry.jsx`.

### Component Conventions
- Pages in `src/pages/`, reusable pieces in `src/components/`
- Styling: Bootstrap classes + react-bootstrap components; custom CSS in `App.css` and `index.css`
- `main.jsx` imports `bootstrap/dist/css/bootstrap.min.css` once globally
- Icons from `react-icons/fa`
- `SkillBadge` is the single reusable component for rendering color-coded tags with tooltips — used in `ProjectCard`, `ProjectDetail`, and anywhere tags appear

### Lint Rule Quirks
`eslint.config.js` sets `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'` — unused identifiers starting with uppercase or underscore are allowed (component imports, constants). Don't add suppressions for those cases.

## Remaining Roadmap

### Priority (for CS 571 final submission)
- ✅ **Resume interactive timeline** — shared `ResumeTimeline` block with an `orientation` prop. Home's `#resume` section renders the **vertical** variant: alternating left/right cards inside a fixed-height scroll box (650px) with a gradient center line and circular icon badges on the line. `/resume` renders the **horizontal** variant: chronologically-sorted 320px cards in an `overflow-x: auto` flex row with a year-axis (2022–2026) above a gradient horizontal line. Filter buttons + PDF download are shared across both. IntersectionObserver is scoped to each container so fade-in fires as the user scrolls *inside* the timeline. Data in `src/data/timeline.js`.
- 🔲 **Scroll animations** — fade-in / slide-in as sections enter viewport (IntersectionObserver or a library like framer-motion / AOS)
- 🔲 **Accent color customizer** — let visitors pick from 3-4 preset accent colors, updates buttons/links/progress bars site-wide
- 🔲 **Mobile responsive polish** — hamburger menu, touch-friendly interactions, timeline single-column on mobile

### Future (post-class, backend extension)
- 🔲 Backend for persistent guestbook entries and contact form (FastAPI or Express)
- 🔲 User analytics (page views, project click tracking)
- 🔲 Real project images/screenshots in `public/`
- 🔲 PDF resume viewer embedded inline
- 🔲 Custom domain setup
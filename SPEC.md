## Project Specification: Business Details Next.js App

### Overview

Build a Next.js application (TypeScript) that displays details about a business. The app will initially be blank pages (placeholders) and later extended with Google authentication and Vercel deployment. A minimal Python backend will be added as a placeholder for future APIs.

### Goals

- Create a clear spec before implementation.
- Provide a TypeScript Next.js skeleton with three pages: homepage, people, contact.
- Include a Python placeholder and `req.txt` for Python dependencies.
- Keep pages blank for now, with code excerpts showing expected structure.

### Tech Stack

- Frontend: Next.js (TypeScript)
- Backend (placeholder): Python (FastAPI planned)
- Deployment target: Vercel (frontend) and optional API host (Vercel Serverless / separate host)

### File Structure (initial)

```
/
├── SPEC.md
├── req.txt
├── package.json
├── tsconfig.json
├── next-env.d.ts
├── pages/
│   ├── _app.tsx
│   ├── index.tsx         # Homepage (blank)
│   ├── people.tsx        # People page (blank)
│   └── contact.tsx       # Contact page (blank)
├── backend/
│   └── app.py            # Python placeholder (FastAPI)
└── README.md
```

### Pages and Routing

- `/` (Homepage): business summary, hero, basic links (placeholder)
- `/people` (People): list of key people, roles (placeholder)
- `/contact` (Contact): contact details, form placeholder

Code excerpt for a page (TypeScript, blank starter):

```tsx
// pages/index.tsx
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main>
      {/* Blank placeholder for homepage content */}
    </main>
  )
}

export default Home
```

### Python backend (placeholder)

We include a minimal FastAPI placeholder to be expanded later.

```py
# backend/app.py
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def root():
    return {"status": "placeholder"}
```

Python dependencies (root `req.txt`):

```
fastapi
uvicorn
```

### Google Authentication (future)

- Plan to use `next-auth` or `@auth/core` on Next.js with Google provider, or implement OAuth2 via a backend.
- Keep Auth interface abstract in the frontend to allow either client-side provider integration or backend-secured sessions.

### Vercel Deployment (future)

- Frontend will deploy to Vercel with default Next.js settings.
- If backend remains Python FastAPI, consider deploying it as a separate service (e.g., Vercel Serverless, Render, or Heroku), or convert API routes into Next.js serverless functions.

### Development & Install Instructions (excerpts)

Node / Frontend:

```bash
npm install
npm run dev
```

Python (placeholder):

```bash
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r req.txt
uvicorn backend.app:app --reload
```

### Notes & Next Steps

- This initial commit will include blank pages and placeholder backend. After review, proceed to implement components, data models, Google authentication, and CI/CD to Vercel.

Testing & Repo:

- A simple smoke test is included at `tests/test_fakeData.js` that validates the fake data shape. Run with `npm test`.
- Add a git repository and commit; `.gitignore` is present to exclude node modules, build artifacts, and virtualenvs.

## New Feature: Real Madrid Data & UI Redesign (SPEC)

### Overview

Replace the generic business example data and UI with a Real Madrid-focused site skeleton. Data will be placeholders (empty fields) for now — you will populate them later. Update the frontend UI to a new design and color palette: purple, green, yellow with selectable light/dark themes.

### Goals

- Provide a clear spec first (this document), then implement step-by-step.
- Replace `data` module with Real Madrid-specific structures: top ten players (stats placeholders) and a `history` object (season-by-season placeholder entries).
- Redesign UI components and pages to emphasize player cards, stats, and club history sections.
- Add theme support with accent choices: `purple`, `green`, `yellow`, plus `light` and `dark` base themes.
- Keep pages functional and accessible; maintain automated contrast checks and smoke tests.

### File / Data Model

New or updated files:

```
data/
  players.ts        # top-ten players, each with placeholder stats
  history.ts        # Real Madrid historical seasons/events (placeholders)
components/
  PlayerCard.tsx    # visual card for a player's stats
  HistoryItem.tsx   # component for a history entry
  ThemeContext.tsx  # updated theme provider (accents: purple/green/yellow)
pages/
  index.tsx         # landing: club overview + featured players
  players.tsx       # list/top-ten players
  history.tsx       # club history timeline
SPEC.md
README.md
```

Data model excerpts (TypeScript):

```ts
// data/players.ts
export type Player = {
  id: string
  name?: string
  position?: string
  number?: number | null
  nationality?: string
  appearances?: number | null
  goals?: number | null
  assists?: number | null
  seasons?: Array<string> | null
}

export const topPlayers: Player[] = Array.from({length:10}).map((_,i)=>({
  id: String(i+1),
  name: '', // empty placeholder for now
  position: '',
  number: null,
  nationality: '',
  appearances: null,
  goals: null,
  assists: null,
  seasons: null,
}))
```

```ts
// data/history.ts
export type HistoryItem = {
  id: string
  season?: string
  summary?: string
  trophies?: string[] | null
}

export const history: HistoryItem[] = [] // fill later
```

### UI & Theming

- Design: clean, modern cards with club accent color accents; a left or top navigation and a content area.
- Replace current color accents with `purple`, `green`, `yellow`. Provide `--accent`, `--accent-600`, `--accent-400`, and `--accent-rgb` variables for each accent.
- Light/dark toggles keep backgrounds and text colors swapped; accents must be adjusted per theme to maintain contrast.
- Place theme controls as a horizontal row of icon buttons in the top-right (no dropdown). Buttons: purple, green, yellow, plus a toggler for Light/Dark.

CSS variable example:

```css
:root{ --bg:#fff; --fg:#0f172a; --muted:#6b7280; }
[data-theme="dark"]{ --bg:#071022; --fg:#e6eef8; }
[data-accent="purple"]{ --accent:#7c3aed; --accent-rgb:124,58,237 }
[data-accent="green"]{ --accent:#16a34a; --accent-rgb:22,163,74 }
[data-accent="yellow"]{ --accent:#f59e0b; --accent-rgb:245,158,11 }
```

Accessibility & contrast:

- Continue to run the `tools/check_contrast.js` script after changes and tune per-theme accents to meet WCAG AA for normal text where practical.
- Keep controls keyboard-focusable and provide `aria-label` attributes.

Animations:

- Subtle pulse/transform on accent button click and when accent changes; smooth transitions for color/background changes.

### Pages

- `index`: Club name, short placeholder summary, top 3 featured players (cards), quick links to `players` and `history` pages.
- `players`: grid of top-ten player cards (placeholders for stats).
- `history`: timeline/list of `history` entries (initially empty).

PlayerCard code excerpt:

```tsx
// components/PlayerCard.tsx
import { Player } from '../data/players'

export default function PlayerCard({p}:{p:Player}){
  return (
    <article className="player-card card">
      <h3>{p.name || '—'}</h3>
      <small>{p.position || '—'}</small>
      <div className="stats">
        <div>Apps: {p.appearances ?? '—'}</div>
        <div>Goals: {p.goals ?? '—'}</div>
        <div>Assists: {p.assists ?? '—'}</div>
      </div>
    </article>
  )
}
```

### Implementation Steps (this iteration)
1. Replace `data/fakeData.ts` with `data/players.ts` and `data/history.ts` placeholders (empty fields).
2. Add `components/PlayerCard.tsx` and `components/HistoryItem.tsx`.
3. Update `pages/index.tsx`, `pages/players.tsx`, and `pages/history.tsx` to use new components and data placeholders.
4. Update `components/ThemeContext.tsx` to include new accents `purple`, `green`, `yellow` and ensure `localStorage` keys continue to work.
5. Update `styles/globals.css` theme variables, accents, focus styles, and animations.
6. Run the contrast checker and smoke tests; fix any issues.
7. Commit and push the feature branch.

### Notes

- Data remains intentionally empty for you to fill later; UI will render placeholders (`—`) where values are missing.
- After this spec is approved, I'll implement the changes step-by-step and verify locally before pushing.



### UI Improvements, Fake Data & Theming (new)

Scope:
- Improve the minimal UI with a clean layout, cards for people, and richer placeholders for business and contact information.
- Add a small fake data module to drive the UI during development.
- Implement a theme system with `light`/`dark` modes and accent color choices: `blue`, `green`, `red`.

Components to add:
- `ThemeProvider` (context) — stores `theme` and `accent`, persists to `localStorage`, applies `data-theme` and `data-accent` attributes on `document.documentElement`.
- `ThemeSelector` — UI control placed top-right in the header to toggle theme and pick accent color.
- `Card` — reusable card for people entries.

Data model (fake data):

```ts
// data/fakeData.ts
export const business = {
  name: 'Acme Consulting',
  summary: 'We provide expert consulting services to help businesses scale.',
  address: '123 Main St, City, Country',
  phone: '+1 (555) 555-5555',
  email: 'hello@acme.example'
}

export const people = [
  { id: '1', name: 'Alice Johnson', role: 'CEO', bio: 'Founder and CEO.' },
  { id: '2', name: 'Bob Lee', role: 'CTO', bio: 'Runs engineering.' },
  // ...more sample entries
]
```

Styling approach:
- Use CSS variables for `--bg`, `--fg`, `--muted`, `--accent`.
- Add attribute selectors to swap palettes: `[data-theme="dark"] { --bg: #0b1220; --fg: #e6eef8; }` and accent color overrides for `[data-accent="green"]` etc.

Implementation steps (this iteration):
1. Add `data/fakeData.ts` with business, people, and contact structures.
2. Add `components/ThemeContext.tsx` and `components/ThemeSelector.tsx`.
3. Add `components/Card.tsx` and update `styles/globals.css` with card and theme styles.
4. Update `components/Layout.tsx` header to include the `ThemeSelector` at top-right.
5. Wire `pages/index.tsx`, `pages/people.tsx`, `pages/contact.tsx` to import and render the fake data.
6. Restart the dev server and verify UI.

Notes:
- Keep all pages functional with placeholder content. The fake data will be easy to replace with API responses later.
- Accessibility: Theme selector will be keyboard-focusable and have `aria-label`.

### Accessibility, Contrast & Animated Icons (new)

Requirements:
- Ensure all text remains clearly visible against background for every theme combination (light/dark × accents). Target WCAG AA contrast where practical for normal text.
- Provide fallback fonts and ensure font sizes use rem units for scalability.
- Accent color choices (`blue`, `green`, `red`) must visibly apply to interactive elements (focus rings, active icons, links) and be testable.
- Add subtle animations to the theme controls (e.g., a pulsing or rotating icon) when the theme or accent changes to make the change perceivable.

Design notes:
- Use CSS variables for core semantic colors: `--bg`, `--fg`, `--muted`, `--accent`, `--border`.
- Provide darker/lighter accent shades if needed: `--accent-600`, `--accent-400`.
- Apply `transition: color .2s, background-color .2s, box-shadow .2s, transform .18s` to smoothly animate between themes.

Acceptance criteria for this iteration:
1. Changing theme to `dark` toggles `data-theme="dark"` and makes text legible (light text on dark background).
2. Changing accent to `green`/`red`/`blue` updates `--accent` and interactive elements reflect this color.
3. The `ThemeSelector` button shows an animated icon on change and remains keyboard accessible.
4. No regressions to existing page layouts; cards and text keep appropriate contrast.



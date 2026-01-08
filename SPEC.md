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



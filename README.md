# Business Details Next.js App

Initial skeleton with TypeScript Next.js frontend and a Python (FastAPI) placeholder backend.

Install & run (frontend):

```bash
npm install
npm run dev
```

Install & run (python placeholder):

```bash
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r req.txt
uvicorn backend.app:app --reload
```

See SPEC.md for full project specification and next steps.

Tests:

```bash
npm test
```

This runs a small smoke test validating the fake data used by the app.

.gitignore:
- A `.gitignore` file exists at the project root; add any local files you want to ignore there.

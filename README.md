# Laravel Study Lab

A self-contained, single-page study app for learning Laravel from scratch — no PHP background required. Lessons, code examples, exercises with solutions, and quizzes. Progress is saved in the browser via `localStorage`.

## Contents

- **Module 1 — PHP Foundations** (8 lessons): types, arrays, control flow, functions, OOP, inheritance/interfaces/traits, namespaces, Composer
- **Module 2 — Web & DB Basics** (3 lessons): HTTP, MVC, SQL
- **Module 3 — Laravel Core** (10 lessons): install, routing, controllers, Blade, migrations, Eloquent, relationships, validation, auth, middleware
- **Module 4 — Debug Challenges** (4 lessons): broken route, broken query, mass-assignment, broken Blade

## Run it locally

No build step, no dependencies. Open `index.html` in any browser.

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npx vercel
```

Follow the prompts. Pick "Other" when asked about a framework.

### Option B — GitHub + Vercel dashboard

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), import the repo.
3. Framework preset: **Other**. Root directory: default. Deploy.

Future `git push` calls redeploy automatically.

## File layout

```
laravel-study/
├── index.html      # page shell
├── styles.css      # dark theme
├── lessons.js      # all lesson content as JS data
├── app.js          # navigation, quiz, progress logic
├── vercel.json     # static-host config (cache headers, clean URLs)
├── .gitignore
└── README.md
```

## Adding lessons

Each lesson is an object inside `MODULES` in `lessons.js`:

```js
{
  id: '3.11',
  title: 'Your new lesson',
  concept: `<p>HTML for the concept...</p>`,
  example: `<?php /* code */ ?>`,
  exercise: `<p>What to do.</p>`,
  solution: `<?php /* answer */ ?>`,
  quiz: [
    { q: 'Question?', options: ['a','b','c','d'], correct: 1, explain: 'Why' }
  ]
}
```

Append it to the right module's `lessons` array, save, refresh.

## Progress storage

Stored in the browser only (`localStorage`, key `laravel-study-lab:progress`). To wipe it, click "Reset progress" in the sidebar, or clear site data in dev tools.

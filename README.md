# Laravel Study Lab

A self-contained, single-page study app for learning Laravel from scratch — no PHP background required. Lessons, code examples, exercises with solutions, and quizzes. Content targets **Laravel 13** (PHP 8.3+). Progress is saved in the browser via `localStorage`.

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
study-laravel/
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

### Exercise answer checking

The **Check my answer** button analyzes the learner's input and reveals the reference solution. Each lesson has an entry in `EXERCISE_CHECKS` (bottom of `lessons.js`), keyed by lesson id:

```js
'3.11': [
  { re: /Route::get/i, hint: 'Define the route with Route::get(...).' },
  { re: /function\s*\(\s*\$name/i, hint: 'The closure must accept the {name} parameter.' },
],
```

An answer is "correct" when **every** `re` matches — these check that the answer *addresses the problem* (key constructs/values), not that it matches the solution verbatim, so many valid styles pass. A failed `re` shows its `hint` as a fix-it note. If a lesson has no entry, the checker just reveals the solution for self-comparison.

### Quizzes

Quizzes live on their own **Quizzes** page (sidebar) as one **exam paper per module**. Pick a module to see all its questions on a single page, grouped under topic headings; answer them and press **Submit** to grade — the score, correct answers, and per-question explanations are revealed at once. Question order (within a topic) and answer order are shuffled each attempt. Best score per module is saved in `localStorage`.

All questions live in a single `QUIZZES` map near the bottom of `lessons.js`, keyed by lesson id. A small loop attaches each set to its lesson as `lesson.quiz`, so the `MODULES` block stays free of quiz data. To add or edit questions, find the lesson's id in `QUIZZES`:

```js
'3.4': [
  { q: 'Question?', options: ['a', 'b', 'c', 'd'], correct: 1, explain: 'Why' },
  // ...
],
```

## Progress storage

Stored in the browser only: lesson progress under `laravel-study-lab:progress` and quiz best-scores under `laravel-study-lab:scores`. To wipe both, click "Reset progress" in the sidebar, or clear site data in dev tools.

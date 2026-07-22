# portfolio-site

A simple personal portfolio built with Next.js + Tailwind CSS. Four pages: Home, Apps, Data Projects, and Productivity.

## Editing content

Everything you'll want to change lives in one file: [`lib/content.ts`](./lib/content.ts).

- `site.name` / `site.tagline` — your name and one-line intro
- `site.about` — why you're getting into AI, analytics, and development
- `site.bio` — your military background and recovery story
- `site.photos` — points at image files in `public/photos/`
- `apps`, `dataProjects`, `productivityProjects` — the project cards on each tab (title, description, link, tags)

## Adding photos

Drop image files into `public/photos/` (e.g. `photo-1.jpg`, `photo-2.jpg`) and reference them in `site.photos` in `lib/content.ts`.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

This is a standard Next.js app — deploys to [Vercel](https://vercel.com/new) with zero config. Import the repo, and it will build and deploy automatically on every push.

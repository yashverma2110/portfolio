# AGENTS.md

Notes for agents working on Yash Verma's portfolio (https://www.itsyashverma.com).

## Stack

- Next.js 15 App Router, React 19, TypeScript, Tailwind 3. Hosted on Vercel.
- Node 24 only (`"engines": { "node": "24.x" }`). Vercel cannot build with Node 26, so do not bump it.
  On the shared box, system Node is 20; use `/tmp/node24/bin/node`, `/tmp/node24/bin/npm`, `/tmp/node24/bin/npx`.
- Blog: Markdown files rendered at build time with `marked` + `highlight.js` (the same stack as `/editor`)
  and `gray-matter` for frontmatter. Do not add a second Markdown stack (MDX, remark, shiki).
- Sitemap and robots: `src/app/sitemap.ts` and `src/app/robots.ts` (Next metadata routes). No next-sitemap.

## Commands

```sh
/tmp/node24/bin/npm ci
/tmp/node24/bin/npx next build      # app build only
/tmp/node24/bin/npm run build       # same as next build
/tmp/node24/bin/npm run test:editor # editor library tests
/tmp/node24/bin/npx next start -p 3100
```

- Never add `public/sitemap*.xml` or `public/robots.txt` (gitignored). A static file there would shadow the
  `/sitemap.xml` and `/robots.txt` routes.
- Run the build before you open a PR. Lint errors fail the build.

## Where things live

- Copy: `src/app/config/*` (experience, projects, contact, profile). Edit copy there, not in components.
  The homepage intro lives in `INTRO` in `src/app/config/profile.ts` (with location, education, and
  "open to" lines). The homepage and the llms.txt routes both read it.
- Positioning is senior, not staff (Yash's call). The browser title, the homepage eyebrow, and the home card
  text live in `POSITIONING` in `profile.ts`. Change them there, not in `layout.tsx` or `page.tsx`.
- Role summaries (team size, what the team owns) go in the optional `summary` field of a job in
  `experience.ts`. Do not edit metric text: the impact pills parse it (`labelsFor()` in `page.tsx`).
- Homepage: `src/app/page.tsx`. Blog: `src/app/blog/`, `src/app/lib/blog.ts`, `src/app/lib/markdown.ts`.
- Posts: `content/blog/<slug>.md` (see `content/blog/README.md`).
- Link preview cards: `src/app/lib/og.tsx` plus `opengraph-image.tsx` / `twitter-image.tsx` per route.
  The homepage card is generated too (`src/app/opengraph-image.tsx`). `public/og-image.png` is no longer
  referenced; it stays in `public/` only so old shares keep working.
- Structured data: the Person (`https://www.itsyashverma.com/#person`) and WebSite (`#website`) JSON-LD live on
  the homepage (`personJsonLd()` in `page.tsx`, built from config). Blog posts reference the author and
  publisher by that `@id`. Do not add a second Person entity elsewhere.
- Static assets: `public/` (project screenshots in `public/projects/<slug>/`).
- Sitemap: `src/app/sitemap.ts`. Robots: `src/app/robots.ts`. It allows all crawlers, lists the AI crawlers
  by name (all `Allow: /`), points to the one sitemap, and has no `Host:` line.

## SEO rules

- All copy stays server-rendered. Do not move text into client components or load it after hydration.
  Client components are only for interaction (carousel, video, editor).
- Every new route or page type must ship:
  - its own `opengraph-image.tsx` and `twitter-image.tsx` (use `ogImage()` from `src/app/lib/og.tsx`),
  - metadata with title, description, and a canonical URL (`alternates.canonical`),
  - a self-referencing canonical set in that page's own metadata,
  - an entry in `src/app/sitemap.ts` if it should be indexed (check `/sitemap.xml` after `next start`).
- Do not hard-code `/og-image.png` anywhere. Every route, the homepage included, has a generated card.
- Keep the homepage's First Load JS flat. Prefer plain `<a>` over `next/link` on the homepage.

## Homepage header

- A top bar (Yash Verma on the left, Blog and Editor on the right), then sticky section chips. The chip
  for the current section is highlighted. There is no Back to top button.
- Four chips only (Experience, Projects, Stack, Contact). Education sits between Stack and Contact with no
  chip: Stack stays highlighted through it, and Contact highlights at the bottom of the page.
- Jump targets need `scroll-margin-top` for the sticky bar (about 68px, `--jump-offset` in `globals.css`).
  Add new anchor targets to that rule. `ViewportHighlight` subtracts the bar height when it scrolls.

## llms.txt

- `/llms.txt` and `/llms-full.txt` (https://llmstxt.org) are static route handlers built from config and
  published posts (`src/app/lib/llms.ts`, `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`).
  A change to experience, projects, contact, the intro, or a new post updates them on the next build.
- Never hand-edit or add a static llms file in `public/`.
- When you add a new page type or tool route, add it to the generator.
- Keep it factual: copy from config only, no invented metrics or claims. Never link a private repo.
- Keep `/llms.txt` under about 6 KB. Both files are excluded from the sitemap.

## Writing style

- Short, plain sentences that sound like a person. Say what the thing does.
- No manual or Simplified Technical English voice, no marketing fluff, no hype words.
- Yash's own writing (blog posts) gets a light copy-edit only: typos, grammar, product names.
  Do not change his claims, headings, links, or voice. List every fix in the PR body.

## Design system

- Dark `#0e1116` background with the fixed math grid (`.math-grid`, 48px lines).
- Glass hover on cards: faint white background, light border, backdrop blur.
- Headings in Georgia (serif). Body in Geist Sans.
- Yellow `#ffe9a0` is for text highlights only (active items, hover text). Never a yellow background.
- No nested scroll containers. They break wheel scrolling on desktop. Let the page scroll; tables and
  code blocks may scroll sideways only.
- Check mobile at 390px: no horizontal overflow.
- Never use `100vw` for widths: it includes the scrollbar and overflows on desktop. Use `width: 100%` of a
  full-width parent. Before shipping, check `scrollWidth == clientWidth` at 1024 to 1920px (with a classic scrollbar too).

## Publishing a blog post

1. Yash writes in `/editor` and sends Markdown. Save it as `content/blog/<slug>.md`
   (lowercase, hyphens; the file name is the URL).
2. Frontmatter: `title`, `date` (YYYY-MM-DD), `description`, `tags` (list) are required.
   Optional: `project` (project slug like `codesloth`, links the post under that project on the homepage),
   `cover` (path under `public/`), `ogImage` (a 1200x630 PNG that replaces the generated card),
   `updated` (YYYY-MM-DD, used as sitemap lastmod), `draft: true` (dev only, left out of production).
   Invalid frontmatter fails the build with the file name and field.
3. Images go in `public/` and are linked with absolute paths. An image on its own line becomes a figure;
   the alt text (or title) is the caption.
4. The post's title is the page's only h1. Body headings are shifted down one level automatically.
5. Build, check `/blog`, the post, its tag pages, `/blog/rss.xml`, and the sitemap.

## Privacy and links

- Never link a private repo. CodeSloth's repo is private: link the demo video and privacy policy only.
- `/editor` is client-only and private. Documents stay in the browser's localStorage. Do not add uploads,
  analytics, or a backend to it.

## Site URL and indexing

- www is the primary domain: `https://www.itsyashverma.com` (Vercel redirects the bare domain to www).
- One source: `SITE_URL` in `src/app/config/site.ts`. Canonicals (via `metadataBase`), Open Graph, JSON-LD,
  RSS, the sitemap, robots.txt, and llms.txt all read it. Never hard-code the domain anywhere else.
- No trailing slash on URLs (Vercel serves paths without one).
- Every page sets its own canonical (`alternates.canonical`) and `openGraph.url`. The root layout sets
  neither, because a layout's canonical leaks to every child page that does not override it.
- Tag pages with fewer than `MIN_POSTS_TO_INDEX_TAG` (3) posts are `noindex, follow` and left out of the
  sitemap (`isTagIndexable()` in `src/app/lib/blog.ts`).
- Sitemap lastmod is always a real content date, never the build time: a post uses `updated`, else `date`;
  `/blog` uses the newest post; the homepage uses the last git commit touching `src/app/config` or
  `src/app/page.tsx` (omitted if git history is missing at build). `/editor` has no lastmod. No changefreq
  or priority. Drafts are never listed.

## PR workflow

- Branch from `origin/main`. One PR per change.
- No force-push. Do not rewrite pushed history.
- Yash merges. Do not merge unless he asks you to publish.
- Wait for the Vercel preview check and report its state.

# Blog posts

Every `.md` or `.mdx` file in this folder (except this README) is a post. The file name is the URL:
`content/blog/my-post.md` becomes `https://www.itsyashverma.com/blog/my-post`. Use lowercase letters,
numbers, and hyphens only.

## Add a post

1. Write it in the [editor](https://www.itsyashverma.com/editor). Its blog template fills in the frontmatter.
2. Save the Markdown as `content/blog/<slug>.md`.
3. Put images under `public/blog/<slug>/` (or reuse ones in `public/`) and link them with absolute paths,
   e.g. `![Alt text](/blog/my-post/diagram.png)`.
4. Run `npm run build` and open a pull request. The build fails with a clear message if the frontmatter
   is wrong.

## Frontmatter

```yaml
---
title: My post title                  # required
date: 2026-10-11                      # required, YYYY-MM-DD
description: One sentence for the index, search results, and link previews.   # required
tags: [software, code-review]         # required, a list (tag pages use lowercase-with-hyphens)
project: codesloth                    # optional, links the post to a project on the homepage
cover: /projects/codesloth/01-hero.png  # optional, path under public/, used for link previews
updated: 2026-10-20                   # optional, shown on the post and used as the sitemap lastmod
draft: true                           # optional, drafts only show in `npm run dev`
---
```

`project` must match a project title from `src/app/config/projects.ts`, lowercased with hyphens
(`CodeSloth` -> `codesloth`). Linked posts show under that project on the homepage.

## Writing

- GitHub-flavored Markdown works: tables, task lists, ~~strikethrough~~, autolinks, fenced code with a
  language (` ```ts `), which is highlighted at build time.
- The title from the frontmatter is the page's only `h1`. You can still start with `# Heading`: every
  heading in the body moves down one level (`#` renders as `h2`, `##` as `h3`) and gets an anchor id.
- An image on its own line becomes a figure. Its caption is the image title if set
  (`![alt](/a.png "Caption")`), otherwise the alt text. A raw `<figure>` with `<figcaption>` also works.
- A paragraph that is only a YouTube link, or one that starts with `**Demo link:**` and contains a
  YouTube link, gets an embedded player above it (muted autoplay when it scrolls into view). The text
  link stays.
- Raw `<script>` tags and inline event handlers are removed.

Posts appear on `/blog`, `/blog/tags/<tag>`, `/blog/rss.xml`, the homepage "Writing" section, and the
sitemap automatically. Drafts are left out of all of them in production.

// Small text helpers: slugs for filenames, document stats, starter content.

export function slugify(input: string, fallback = "untitled"): string {
  const slug = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['"’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
  return slug || fallback;
}

export type DocStats = { words: number; characters: number; minutes: number };

export function docStats(text: string, wpm = 200): DocStats {
  const body = text.replace(/^\uFEFF?---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, "");
  const words = body
    .replace(/```[^\n]*\n?/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return { words, characters: text.length, minutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / wpm)) };
}

export function todayISO(d = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function starterDoc(date: string): string {
  return `---
title: Untitled post
date: ${date}
description: One sentence about the post.
tags: [software]
---

# Untitled post

Start writing here.

## Formatting examples

Use **bold**, _italic_, ~~strikethrough~~, \`inline code\`, and [links](https://example.com).

- A bulleted item
- Another item

1. A numbered item
2. Another item

- [x] A finished task
- [ ] An open task

> A quote.

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}\`;
}
\`\`\`

| Column | Column |
| --- | --- |
| Cell | Cell |
`;
}

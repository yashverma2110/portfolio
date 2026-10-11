// Build-time Markdown for blog posts: marked (GFM) + highlight.js, the same stack the /editor uses.
// Posts are trusted repo files, so nothing is sanitized, but raw <script>, inline event handlers,
// and javascript: URLs are dropped anyway.
import fs from "node:fs";
import path from "node:path";
import { Marked, type Token, type Tokens, type TokensList } from "marked";
import hljs from "highlight.js/lib/common";

export type Segment = { type: "html"; html: string } | { type: "youtube"; id: string; title: string };

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function safeUrl(href: string) {
  return /^\s*(javascript|vbscript|data):/i.test(href) && !/^\s*data:image\//i.test(href) ? "#" : href;
}

function stripUnsafeHtml(html: string) {
  return html
    .replace(/<script\b[\s\S]*?(<\/script\s*>|$)/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}

/** GitHub-style heading ids: lowercase, punctuation dropped, spaces to hyphens, deduped with -1, -2... */
export function createSlugger() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base =
      text
        .toLowerCase()
        .trim()
        .replace(/<[^>]+>/g, "")
        .replace(/[^\p{L}\p{N}\s_-]/gu, "")
        .replace(/\s/g, "-") || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

// Width and height for local images, so the browser can reserve space (PNG, GIF, JPEG).
const sizeCache = new Map<string, { width: number; height: number } | null>();
function localImageSize(src: string) {
  if (!src.startsWith("/") || src.startsWith("//")) return null;
  if (sizeCache.has(src)) return sizeCache.get(src)!;
  let size: { width: number; height: number } | null = null;
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", decodeURIComponent(src.split(/[?#]/)[0])));
    if (buf.readUInt32BE(0) === 0x89504e47) size = { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    else if (buf.toString("ascii", 0, 3) === "GIF") size = { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
    else if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        const marker = buf[i + 1];
        const len = buf.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          size = { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
          break;
        }
        i += 2 + len;
      }
    }
  } catch {
    throw new Error(`[blog] Image ${src} does not exist under public/.`);
  }
  sizeCache.set(src, size);
  return size;
}

function imgTag(href: string, alt: string) {
  const size = localImageSize(href);
  const dims = size ? ` width="${size.width}" height="${size.height}"` : "";
  return `<img src="${escapeHtml(safeUrl(href))}" alt="${escapeHtml(alt)}"${dims} loading="lazy" decoding="async">`;
}

function figure(token: Tokens.Image) {
  const caption = token.title || token.text;
  return `<figure>${imgTag(token.href, token.text)}${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}</figure>\n`;
}

const YOUTUBE_RE = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/)([\w-]{11})/;

/** A paragraph that is only a YouTube link, or starts with "**Demo link:**" and has one, gets a player above it. */
function youtubeFor(token: Tokens.Paragraph): { id: string; title: string } | null {
  const inline = token.tokens.filter((t) => !(t.type === "text" && !t.raw.trim()) && t.type !== "br");
  const links = inline.filter((t): t is Tokens.Link => t.type === "link" && YOUTUBE_RE.test(t.href));
  if (links.length === 0) return null;
  const onlyLink = inline.length === 1;
  const demo = inline[0]?.type === "strong" && /^demo( link)?:?$/i.test((inline[0] as Tokens.Strong).text.trim());
  if (!onlyLink && !demo) return null;
  const link = links[0];
  return { id: link.href.match(YOUTUBE_RE)![1], title: link.text && !/^https?:/.test(link.text) ? link.text : "YouTube video" };
}

function createMarked() {
  const slug = createSlugger();
  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      // The page renders the frontmatter title as the only h1, so content headings shift down one level.
      heading({ tokens, depth, text }: Tokens.Heading) {
        const level = Math.min(depth + 1, 6);
        const id = slug(text.replace(/[*_`~]|\[([^\]]*)\]\([^)]*\)/g, "$1"));
        const inner = this.parser.parseInline(tokens);
        return `<h${level} id="${id}">${inner}<a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a></h${level}>\n`;
      },
      code({ text, lang }: Tokens.Code) {
        const language = (lang || "").trim().split(/\s+/)[0].toLowerCase();
        if (language && hljs.getLanguage(language)) {
          const out = hljs.highlight(text, { language, ignoreIllegals: true }).value;
          return `<pre><code class="hljs language-${escapeHtml(language)}">${out}</code></pre>\n`;
        }
        return `<pre><code class="hljs">${escapeHtml(text)}</code></pre>\n`;
      },
      paragraph(token: Tokens.Paragraph) {
        const inline = token.tokens.filter((t) => !(t.type === "text" && !t.raw.trim()));
        if (inline.length === 1 && inline[0].type === "image") return figure(inline[0] as Tokens.Image);
        return false;
      },
      image(token: Tokens.Image) {
        return imgTag(token.href, token.text);
      },
      link({ href, title, tokens }: Tokens.Link) {
        const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?itsyashverma\.com/i.test(href);
        const attrs = `${title ? ` title="${escapeHtml(title)}"` : ""}${external ? ' rel="noopener noreferrer"' : ""}`;
        return `<a href="${escapeHtml(safeUrl(href))}"${attrs}>${this.parser.parseInline(tokens)}</a>`;
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return stripUnsafeHtml(text);
      },
    },
  });
  return marked;
}

/** Markdown body (no frontmatter) to HTML chunks, with YouTube players as separate segments. */
export function renderPost(markdown: string): Segment[] {
  const marked = createMarked();
  const tokens = marked.lexer(markdown);
  const segments: Segment[] = [];
  let buffer: Token[] = [];
  const flush = () => {
    if (buffer.length === 0) return;
    const list = Object.assign(buffer, { links: tokens.links }) as TokensList;
    segments.push({ type: "html", html: marked.parser(list) });
    buffer = [];
  };
  for (const token of tokens) {
    const video = token.type === "paragraph" ? youtubeFor(token as Tokens.Paragraph) : null;
    if (video) {
      flush();
      segments.push({ type: "youtube", ...video });
    }
    buffer.push(token);
  }
  flush();
  return segments;
}

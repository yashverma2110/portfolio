// Builds a standalone HTML file from already-sanitized content.
import type { Frontmatter } from "./frontmatter";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function metaCardHtml(meta: Frontmatter | null): string {
  if (!meta) return "";
  const str = (k: string) => (typeof meta[k] === "string" ? (meta[k] as string) : "");
  const tags = Array.isArray(meta.tags) ? meta.tags : str("tags") ? [str("tags")] : [];
  const parts: string[] = [];
  if (str("date")) parts.push(`<p class="fm-date">${esc(str("date"))}</p>`);
  if (str("title")) parts.push(`<p class="fm-title">${esc(str("title"))}</p>`);
  if (str("description")) parts.push(`<p class="fm-desc">${esc(str("description"))}</p>`);
  if (tags.length) parts.push(`<p class="fm-tags">${tags.map((t) => `<span>${esc(t)}</span>`).join(" ")}</p>`);
  return parts.length ? `<header class="fm-card">${parts.join("")}</header>` : "";
}

const CSS = `
:root{color-scheme:light}
body{margin:0;background:#fff;color:#1d232b;font:17px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
main{max-width:720px;margin:0 auto;padding:40px 20px 80px}
h1,h2,h3,h4{font-family:Georgia,"Times New Roman",serif;line-height:1.25;margin:1.6em 0 .5em}
h1{font-size:2.1em}h2{font-size:1.6em}h3{font-size:1.25em}
a{color:#1f5fbf}img{max-width:100%;height:auto}
blockquote{margin:1.2em 0;padding:.2em 1em;border-left:3px solid #c9d1db;color:#4a5562}
code{font:.9em ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#f1f3f6;padding:.1em .35em;border-radius:4px}
pre{background:#f6f8fa;border:1px solid #e3e7ec;border-radius:8px;padding:14px 16px;overflow:auto}
pre code{background:none;padding:0;font-size:.85em;line-height:1.55}
table{border-collapse:collapse;display:block;overflow-x:auto;margin:1.2em 0}
th,td{border:1px solid #d5dbe2;padding:6px 12px;text-align:left}th{background:#f3f5f8}
hr{border:0;border-top:1px solid #d5dbe2;margin:2em 0}
li>input[type=checkbox]{margin-right:.45em}
ul:has(>li>input[type=checkbox]){list-style:none;padding-left:1.1em}
.fm-card{border:1px solid #e3e7ec;border-radius:10px;padding:14px 16px;margin-bottom:28px}
.fm-card p{margin:0}.fm-date{font-size:13px;color:#5d6875}.fm-title{font:600 22px/1.3 Georgia,serif;margin-top:4px!important}
.fm-desc{color:#4a5562;margin-top:6px!important}.fm-tags{margin-top:10px!important}
.fm-tags span{display:inline-block;font-size:12px;border:1px solid #d5dbe2;border-radius:999px;padding:2px 10px}
.hljs-comment,.hljs-quote{color:#6a737d}.hljs-keyword,.hljs-selector-tag,.hljs-literal{color:#cf222e}
.hljs-string,.hljs-attr,.hljs-regexp{color:#0a3069}.hljs-number,.hljs-built_in,.hljs-type{color:#0550ae}
.hljs-title,.hljs-section{color:#8250df}.hljs-addition{color:#116329;background:#dafbe1}.hljs-deletion{color:#82071e;background:#ffebe9}
`;

export function standaloneHtml(title: string, bodyHtml: string, meta: Frontmatter | null): string {
  const desc = meta && typeof meta.description === "string" ? meta.description : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${desc ? `<meta name="description" content="${esc(desc)}">\n` : ""}<style>${CSS}</style>
</head>
<body>
<main>
${metaCardHtml(meta)}
${bodyHtml}
</main>
</body>
</html>
`;
}

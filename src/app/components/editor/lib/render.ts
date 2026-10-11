// Markdown -> sanitized HTML. Client-only: DOMPurify needs a DOM.
import { Marked, type Tokens } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import go from "highlight.js/lib/languages/go";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";
import css from "highlight.js/lib/languages/css";
import diff from "highlight.js/lib/languages/diff";
import { parseFrontmatter, type Frontmatter } from "./frontmatter";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("go", go);
hljs.registerLanguage("python", python);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("diff", diff);
// JSX and TSX highlight well enough with the JS and TS grammars.
hljs.registerAliases(["jsx", "mjs", "cjs"], { languageName: "javascript" });
hljs.registerAliases(["tsx", "mts"], { languageName: "typescript" });
hljs.registerAliases(["html", "svg"], { languageName: "xml" });
hljs.registerAliases(["sh", "shell", "zsh", "console"], { languageName: "bash" });
hljs.registerAliases(["golang"], { languageName: "go" });
hljs.registerAliases(["py"], { languageName: "python" });
hljs.registerAliases(["yml"], { languageName: "yaml" });

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const marked = new Marked({ gfm: true, breaks: false });
marked.use({
  renderer: {
    code({ text, lang }: Tokens.Code) {
      const language = (lang || "").trim().split(/\s+/)[0].toLowerCase();
      if (language && hljs.getLanguage(language)) {
        const out = hljs.highlight(text, { language, ignoreIllegals: true }).value;
        return `<pre><code class="hljs language-${escapeHtml(language)}">${out}</code></pre>\n`;
      }
      return `<pre><code class="hljs">${escapeHtml(text)}</code></pre>\n`;
    },
  },
});

let hooked = false;
function purify(html: string): string {
  if (!hooked) {
    DOMPurify.addHook("afterSanitizeAttributes", (node) => {
      if (node.tagName === "A" && /^https?:/i.test(node.getAttribute("href") || "")) {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      }
      if (node.tagName === "INPUT") {
        // Only task-list checkboxes survive, and they are read-only.
        if (node.getAttribute("type") !== "checkbox") node.remove();
        else node.setAttribute("disabled", "");
      }
    });
    hooked = true;
  }
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "textarea", "select", "button"],
    FORBID_ATTR: ["style"],
    ADD_ATTR: ["target"],
  });
}

export type Rendered = { html: string; meta: Frontmatter | null };

export function renderMarkdown(text: string): Rendered {
  const { data, body } = parseFrontmatter(text);
  const raw = marked.parse(body, { async: false }) as string;
  return { html: purify(raw), meta: data };
}

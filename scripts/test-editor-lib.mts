// Run with: node scripts/test-editor-lib.mts  (Node 24, native type stripping)
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  toggleInline,
  toggleLinePrefix,
  codeBlock,
  insertLink,
  insertImage,
  insertTable,
  insertRule,
  indent,
  inListOrCode,
  continueList,
} from "../src/app/components/editor/lib/transforms.ts";
import { parseFrontmatter } from "../src/app/components/editor/lib/frontmatter.ts";
import { slugify, docStats, starterDoc } from "../src/app/components/editor/lib/text.ts";
import { lineDiff, summarize, collapse, toSideBySide } from "../src/app/components/editor/lib/diff.ts";

const sel = (value: string, a: string) => {
  const start = value.indexOf(a);
  return { value, start, end: start + a.length };
};

test("bold wraps and unwraps a selection", () => {
  const s1 = toggleInline(sel("hello world", "world"), "bold");
  assert.equal(s1.value, "hello **world**");
  assert.equal(s1.value.slice(s1.start, s1.end), "world");
  const s2 = toggleInline(s1, "bold");
  assert.equal(s2.value, "hello world");
  assert.equal(s2.value.slice(s2.start, s2.end), "world");
  const s3 = toggleInline(sel("a **b** c", "**b**"), "bold");
  assert.equal(s3.value, "a b c");
});

test("inline keeps whitespace outside markers and inserts placeholders", () => {
  assert.equal(toggleInline(sel("say hi there", "hi "), "italic").value, "say _hi_ there");
  const e = toggleInline({ value: "ab", start: 1, end: 1 }, "code");
  assert.equal(e.value, "a`code`b");
  assert.equal(e.value.slice(e.start, e.end), "code");
  assert.equal(toggleInline(sel("x y", "y"), "strike").value, "x ~~y~~");
});

test("line prefixes toggle", () => {
  const h = toggleLinePrefix({ value: "Title", start: 2, end: 2 }, "h2");
  assert.equal(h.value, "## Title");
  assert.equal(h.start, 5);
  assert.equal(toggleLinePrefix({ value: "## Title", start: 4, end: 4 }, "h1").value, "# Title");
  assert.equal(toggleLinePrefix({ value: "# Title", start: 4, end: 4 }, "h1").value, "Title");
  const ul = toggleLinePrefix({ value: "a\nb", start: 0, end: 3 }, "ul");
  assert.equal(ul.value, "- a\n- b");
  assert.equal(toggleLinePrefix(ul, "ul").value, "a\nb");
  assert.equal(toggleLinePrefix({ value: "a\nb", start: 0, end: 3 }, "ol").value, "1. a\n2. b");
  assert.equal(toggleLinePrefix({ value: "- a", start: 0, end: 3 }, "task").value, "- [ ] a");
  assert.equal(toggleLinePrefix({ value: "a", start: 0, end: 1 }, "quote").value, "> a");
});

test("blocks", () => {
  const c = codeBlock(sel("before\nx = 1\nafter", "x = 1"));
  assert.equal(c.value, "before\n\n```\nx = 1\n```\n\nafter");
  assert.equal(c.value.slice(c.start, c.end), "x = 1");
  const t = insertTable({ value: "", start: 0, end: 0 });
  assert.ok(t.value.startsWith("| Column | Column |"));
  assert.equal(t.value.slice(t.start, t.end), "Column");
  assert.equal(insertRule({ value: "a", start: 1, end: 1 }).value, "a\n\n---\n");
});

test("links and images", () => {
  const l = insertLink(sel("see docs", "docs"));
  assert.equal(l.value, "see [docs](https://)");
  assert.equal(l.value.slice(l.start, l.end), "https://");
  const e = insertLink({ value: "", start: 0, end: 0 });
  assert.equal(e.value.slice(e.start, e.end), "link text");
  assert.equal(insertImage({ value: "", start: 0, end: 0 }, "https://x.test/a.png").value, "![image](https://x.test/a.png)");
});

test("indent and list continuation", () => {
  assert.equal(indent({ value: "- a", start: 3, end: 3 }).value, "- a  ");
  assert.equal(indent({ value: "- a\n- b", start: 0, end: 7 }).value, "  - a\n  - b");
  assert.equal(indent({ value: "  - a", start: 5, end: 5 }, true).value, "- a");
  assert.equal(inListOrCode("- a", 3), true);
  assert.equal(inListOrCode("```\nx", 5), true);
  assert.equal(inListOrCode("plain", 2), false);
  assert.equal(continueList({ value: "- a", start: 3, end: 3 })?.value, "- a\n- ");
  assert.equal(continueList({ value: "1. a", start: 4, end: 4 })?.value, "1. a\n2. ");
  assert.equal(continueList({ value: "- [x] a", start: 7, end: 7 })?.value, "- [x] a\n- [ ] ");
  assert.equal(continueList({ value: "- a\n- ", start: 6, end: 6 })?.value, "- a\n");
  assert.equal(continueList({ value: "text", start: 4, end: 4 }), null);
});

test("frontmatter", () => {
  const p = parseFrontmatter("---\ntitle: \"Hello\"\ndate: 2026-10-11\ntags: [a, 'b']\nlist:\n  - x\n  - y\n---\n# Body");
  assert.deepEqual(p.data, { title: "Hello", date: "2026-10-11", tags: ["a", "b"], list: ["x", "y"] });
  assert.equal(p.body, "# Body");
  const none = parseFrontmatter("# No frontmatter\n---\n");
  assert.equal(none.data, null);
  assert.equal(none.body, "# No frontmatter\n---\n");
  assert.ok(parseFrontmatter(starterDoc("2026-10-11")).data?.title === "Untitled post");
});

test("slugify and stats", () => {
  assert.equal(slugify("Héllo, World! It’s 2026"), "hello-world-its-2026");
  assert.equal(slugify("   "), "untitled");
  const s = docStats("---\ntitle: x\n---\none two three");
  assert.equal(s.words, 3);
  assert.equal(s.minutes, 1);
  assert.equal(docStats("").minutes, 0);
  assert.equal(docStats("word ".repeat(401)).minutes, 3);
});

test("diff summary, collapse and side by side", () => {
  const a = Array.from({ length: 20 }, (_, i) => `line ${i}`).join("\n");
  const b = a.replace("line 10", "line ten").concat("\nextra");
  const lines = lineDiff(a, b);
  assert.deepEqual(summarize(lines), { added: 2, removed: 1, unchanged: 19 });
  const changed = lines.find((l) => l.kind === "add" && l.text === "line ten");
  assert.ok(changed?.parts?.some((p) => p.changed && p.value === "ten"));
  const blocks = collapse(lines);
  assert.ok(blocks.some((b) => b.type === "gap" && b.lines.length === 7));
  const rows = toSideBySide(lines);
  assert.ok(rows.some((r) => r.left?.text === "line 10" && r.right?.text === "line ten"));
  assert.deepEqual(summarize(lineDiff("same", "same\n")), { added: 0, removed: 0, unchanged: 1 });
});

import { uploadProblem, looksBinary, normalizeNewlines, titleFromFile } from "../src/app/components/editor/lib/upload.ts";

test("upload validation and naming", () => {
  assert.equal(uploadProblem({ name: "post.md", type: "", size: 10 }), null);
  assert.equal(uploadProblem({ name: "notes.mdx", type: "", size: 10 }), null);
  assert.equal(uploadProblem({ name: "readme", type: "text/plain", size: 10 }), null);
  assert.match(uploadProblem({ name: "big.md", type: "text/markdown", size: 2 * 1024 * 1024 + 1 }) ?? "", /larger than 2 MB/);
  assert.match(uploadProblem({ name: "photo.png", type: "image/png", size: 10 }) ?? "", /not a Markdown/);
  assert.equal(looksBinary("a\u0000b"), true);
  assert.equal(normalizeNewlines("\uFEFFa\r\nb\rc\n"), "a\nb\nc\n");
  assert.equal(titleFromFile("my-post.md", "Real title"), "Real title");
  assert.equal(titleFromFile("my-post.draft.md", undefined), "my-post.draft");
  assert.equal(titleFromFile(".md", ""), "Untitled");
});

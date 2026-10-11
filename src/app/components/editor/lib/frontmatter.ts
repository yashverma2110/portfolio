// Minimal YAML frontmatter parser for blog posts. It understands
// "key: value", quoted values, inline lists ([a, b]) and block lists
// ("- a" lines under a key). Anything else is kept as a raw string.

export type FrontmatterValue = string | string[];
export type Frontmatter = Record<string, FrontmatterValue>;
export type ParsedDoc = { data: Frontmatter | null; body: string; raw: string };

const FM_RE = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/;

function unquote(v: string): string {
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

function parseValue(v: string): FrontmatterValue {
  const t = v.trim();
  if (t.startsWith("[") && t.endsWith("]")) {
    return t
      .slice(1, -1)
      .split(",")
      .map((s) => unquote(s))
      .filter((s) => s !== "");
  }
  return unquote(t.replace(/\s+#.*$/, ""));
}

export function parseFrontmatter(text: string): ParsedDoc {
  const m = text.match(FM_RE);
  if (!m) return { data: null, body: text, raw: "" };
  const data: Frontmatter = {};
  let listKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s+-\s+(.*)$/) ?? line.match(/^-\s+(.*)$/);
    if (item && listKey) {
      const prev = data[listKey];
      const arr = Array.isArray(prev) ? prev : prev ? [prev] : [];
      arr.push(unquote(item[1]));
      data[listKey] = arr;
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    if (kv[2].trim() === "") {
      data[key] = "";
      listKey = key;
    } else {
      data[key] = parseValue(kv[2]);
      listKey = null;
    }
  }
  return { data, body: text.slice(m[0].length), raw: m[0] };
}

export function blogFrontmatter(date: string, title = "Untitled post"): string {
  return `---\ntitle: ${title}\ndate: ${date}\ndescription: One sentence about the post.\ntags: [software]\n---\n`;
}

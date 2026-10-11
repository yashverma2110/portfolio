// Pure text transforms used by the editor toolbar and keyboard shortcuts.
// Every function takes the current text and selection and returns the next
// text and selection, so they can be tested without a browser.

export type EditState = { value: string; start: number; end: number };

export type InlineAction = "bold" | "italic" | "strike" | "code";
export type LineAction = "h1" | "h2" | "h3" | "quote" | "ul" | "ol" | "task";

const INLINE_MARKERS: Record<InlineAction, { marker: string; placeholder: string }> = {
  bold: { marker: "**", placeholder: "bold text" },
  italic: { marker: "_", placeholder: "italic text" },
  strike: { marker: "~~", placeholder: "struck text" },
  code: { marker: "`", placeholder: "code" },
};

/** Wrap the selection in a marker, or unwrap it when it is already wrapped. */
export function toggleInline(state: EditState, action: InlineAction): EditState {
  const { marker, placeholder } = INLINE_MARKERS[action];
  const { value, start, end } = state;
  const selected = value.slice(start, end);
  const m = marker.length;

  // Markers sit just outside the selection: **[bold]**
  if (
    start >= m &&
    value.slice(start - m, start) === marker &&
    value.slice(end, end + m) === marker
  ) {
    return {
      value: value.slice(0, start - m) + selected + value.slice(end + m),
      start: start - m,
      end: end - m,
    };
  }

  // Markers are inside the selection: [**bold**]
  if (selected.length >= m * 2 && selected.startsWith(marker) && selected.endsWith(marker)) {
    const inner = selected.slice(m, selected.length - m);
    return { value: value.slice(0, start) + inner + value.slice(end), start, end: start + inner.length };
  }

  if (start === end) {
    const next = value.slice(0, start) + marker + placeholder + marker + value.slice(end);
    return { value: next, start: start + m, end: start + m + placeholder.length };
  }

  // Keep surrounding whitespace outside the markers: " word " -> " **word** "
  const lead = selected.match(/^\s*/)?.[0] ?? "";
  const trail = selected.match(/\s*$/)?.[0] ?? "";
  const core = selected.slice(lead.length, selected.length - trail.length);
  if (!core) {
    const next = value.slice(0, end) + marker + placeholder + marker + value.slice(end);
    return { value: next, start: end + m, end: end + m + placeholder.length };
  }
  const wrapped = lead + marker + core + marker + trail;
  const s = start + lead.length + m;
  return { value: value.slice(0, start) + wrapped + value.slice(end), start: s, end: s + core.length };
}

/** Start and end offsets of the full lines touched by the selection. */
export function lineRange(value: string, start: number, end: number): { from: number; to: number } {
  const from = value.lastIndexOf("\n", start - 1) + 1;
  let lastEnd = end;
  // A selection ending at the very start of a line does not include that line.
  if (end > start && value[end - 1] === "\n") lastEnd = end - 1;
  const nl = value.indexOf("\n", lastEnd);
  return { from, to: nl === -1 ? value.length : nl };
}

const HEADING_RE = /^(#{1,6})\s+/;
const QUOTE_RE = /^>\s?/;
const TASK_RE = /^(\s*)[-*+]\s+\[[ xX]\]\s+/;
const UL_RE = /^(\s*)[-*+]\s+/;
const OL_RE = /^(\s*)\d+[.)]\s+/;

function stripListPrefix(line: string): string {
  return line.replace(TASK_RE, "$1").replace(UL_RE, "$1").replace(OL_RE, "$1");
}

/** Add or remove a line prefix (heading, quote, list) on every selected line. */
export function toggleLinePrefix(state: EditState, action: LineAction): EditState {
  const { value, start, end } = state;
  const { from, to } = lineRange(value, start, end);
  const lines = value.slice(from, to).split("\n");
  const contentLines = lines.filter((l) => l.trim() !== "");
  const check = (l: string): boolean => {
    switch (action) {
      case "h1":
        return /^#\s+/.test(l);
      case "h2":
        return /^##\s+/.test(l);
      case "h3":
        return /^###\s+/.test(l);
      case "quote":
        return QUOTE_RE.test(l);
      case "task":
        return TASK_RE.test(l);
      case "ul":
        return UL_RE.test(l) && !TASK_RE.test(l);
      case "ol":
        return OL_RE.test(l);
    }
  };
  const allHave = contentLines.length > 0 && contentLines.every(check);
  let n = 0;
  const next = lines.map((line) => {
    if (line.trim() === "" && lines.length > 1) return line;
    if (allHave) {
      switch (action) {
        case "h1":
        case "h2":
        case "h3":
          return line.replace(HEADING_RE, "");
        case "quote":
          return line.replace(QUOTE_RE, "");
        default:
          return stripListPrefix(line);
      }
    }
    switch (action) {
      case "h1":
        return "# " + line.replace(HEADING_RE, "");
      case "h2":
        return "## " + line.replace(HEADING_RE, "");
      case "h3":
        return "### " + line.replace(HEADING_RE, "");
      case "quote":
        return "> " + line;
      case "ul": {
        const base = stripListPrefix(line);
        const indent = base.match(/^\s*/)?.[0] ?? "";
        return indent + "- " + base.slice(indent.length);
      }
      case "task": {
        const base = stripListPrefix(line);
        const indent = base.match(/^\s*/)?.[0] ?? "";
        return indent + "- [ ] " + base.slice(indent.length);
      }
      case "ol": {
        const base = stripListPrefix(line);
        const indent = base.match(/^\s*/)?.[0] ?? "";
        n += 1;
        return indent + n + ". " + base.slice(indent.length);
      }
    }
  });
  const replaced = next.join("\n");
  const out = value.slice(0, from) + replaced + value.slice(to);
  if (start === end && lines.length === 1) {
    // Keep the caret at the same spot in the line text.
    const delta = replaced.length - (to - from);
    const caret = Math.max(from, Math.min(from + replaced.length, start + delta));
    return { value: out, start: caret, end: caret };
  }
  return { value: out, start: from, end: from + replaced.length };
}

/** Insert a block on its own lines, separated from surrounding text by blank lines. */
export function insertBlock(state: EditState, block: string, select?: { offset: number; length: number }): EditState {
  const { value, start, end } = state;
  const before = value.slice(0, start);
  const after = value.slice(end);
  const pre = before === "" ? "" : before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
  const post = after === "" ? "\n" : after.startsWith("\n\n") ? "" : after.startsWith("\n") ? "\n" : "\n\n";
  const s = before.length + pre.length;
  const out = before + pre + block + post + after;
  if (select) return { value: out, start: s + select.offset, end: s + select.offset + select.length };
  const caret = s + block.length;
  return { value: out, start: caret, end: caret };
}

export function codeBlock(state: EditState, lang = ""): EditState {
  const { value, start, end } = state;
  const selected = value.slice(start, end);
  const fence = "```";
  if (selected) {
    const body = selected.replace(/\n$/, "");
    const block = fence + lang + "\n" + body + "\n" + fence;
    return insertBlock(state, block, { offset: fence.length + lang.length + 1, length: body.length });
  }
  const placeholder = "code";
  const block = fence + lang + "\n" + placeholder + "\n" + fence;
  return insertBlock(state, block, { offset: fence.length + lang.length + 1, length: placeholder.length });
}

export function insertLink(state: EditState, url = "https://"): EditState {
  const { value, start, end } = state;
  const selected = value.slice(start, end);
  if (/^https?:\/\/\S+$/.test(selected.trim())) {
    const text = "link text";
    const link = `[${text}](${selected.trim()})`;
    return { value: value.slice(0, start) + link + value.slice(end), start: start + 1, end: start + 1 + text.length };
  }
  const text = selected || "link text";
  const link = `[${text}](${url})`;
  const out = value.slice(0, start) + link + value.slice(end);
  if (selected) {
    const urlStart = start + text.length + 3;
    return { value: out, start: urlStart, end: urlStart + url.length };
  }
  return { value: out, start: start + 1, end: start + 1 + text.length };
}

export function insertImage(state: EditState, url: string, alt = ""): EditState {
  const { value, start, end } = state;
  const text = alt || value.slice(start, end) || "image";
  const image = `![${text}](${url})`;
  const out = value.slice(0, start) + image + value.slice(end);
  return { value: out, start: start + 2, end: start + 2 + text.length };
}

export const TABLE_TEMPLATE = "| Column | Column |\n| --- | --- |\n| Cell | Cell |";

// Tables and rules go after the selection instead of replacing it.
export function insertTable(state: EditState): EditState {
  return insertBlock({ ...state, start: state.end }, TABLE_TEMPLATE, { offset: 2, length: "Column".length });
}

export function insertRule(state: EditState): EditState {
  return insertBlock({ ...state, start: state.end }, "---");
}

/** True when the caret line is a list item or sits inside a fenced code block. */
export function inListOrCode(value: string, pos: number): boolean {
  const lineStart = value.lastIndexOf("\n", pos - 1) + 1;
  const lineEndIdx = value.indexOf("\n", pos);
  const line = value.slice(lineStart, lineEndIdx === -1 ? value.length : lineEndIdx);
  if (UL_RE.test(line) || OL_RE.test(line)) return true;
  const fences = value.slice(0, lineStart).match(/^\s*(```|~~~)/gm);
  return !!fences && fences.length % 2 === 1;
}

/** Indent (or outdent) by two spaces. */
export function indent(state: EditState, outdent = false): EditState {
  const { value, start, end } = state;
  if (!outdent && start === end) {
    const out = value.slice(0, start) + "  " + value.slice(end);
    return { value: out, start: start + 2, end: start + 2 };
  }
  const { from, to } = lineRange(value, start, end);
  const lines = value.slice(from, to).split("\n");
  let firstDelta = 0;
  let total = 0;
  const next = lines.map((line, i) => {
    if (outdent) {
      const remove = line.startsWith("  ") ? 2 : line.startsWith(" ") ? 1 : 0;
      if (i === 0) firstDelta = -remove;
      total -= remove;
      return line.slice(remove);
    }
    if (i === 0) firstDelta = 2;
    total += 2;
    return "  " + line;
  });
  const out = value.slice(0, from) + next.join("\n") + value.slice(to);
  if (start === end) {
    const caret = Math.max(from, start + firstDelta);
    return { value: out, start: caret, end: caret };
  }
  return { value: out, start: Math.max(from, start + firstDelta), end: end + total };
}

/**
 * Continue a list when Enter is pressed at the end of a list item.
 * Returns null when the default Enter behaviour should run.
 */
export function continueList(state: EditState): EditState | null {
  const { value, start, end } = state;
  if (start !== end) return null;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const line = value.slice(lineStart, start);
  const m = line.match(/^(\s*)([-*+]\s+\[[ xX]\]\s+|[-*+]\s+|(\d+)([.)])\s+)/);
  if (!m) return null;
  const rest = value.slice(start);
  const restOfLine = rest.split("\n")[0];
  if (restOfLine.trim() !== "") return null;
  const prefix = m[0];
  if (line.trim() === prefix.trim()) {
    // Empty item: end the list.
    const out = value.slice(0, lineStart) + value.slice(start);
    return { value: out, start: lineStart, end: lineStart };
  }
  let nextPrefix = prefix;
  if (m[3]) nextPrefix = m[1] + (parseInt(m[3], 10) + 1) + m[4] + " ";
  else if (/\[[ xX]\]/.test(prefix)) nextPrefix = m[1] + prefix.trim()[0] + " [ ] ";
  const insert = "\n" + nextPrefix;
  const out = value.slice(0, start) + insert + value.slice(end);
  return { value: out, start: start + insert.length, end: start + insert.length };
}

// Line diff with word-level highlights, built on jsdiff.
import { diffLines, diffWordsWithSpace } from "diff";

export type Part = { value: string; changed: boolean };
export type DiffLine = {
  kind: "same" | "add" | "del";
  text: string;
  oldNo?: number;
  newNo?: number;
  parts?: Part[];
};
export type DiffBlock = { type: "lines"; lines: DiffLine[] } | { type: "gap"; id: string; lines: DiffLine[] };
export type SideRow = { left?: DiffLine; right?: DiffLine };

function normalize(text: string): string {
  const t = text.replace(/\r\n?/g, "\n");
  return t === "" || t.endsWith("\n") ? t : t + "\n";
}

function splitLines(value: string): string[] {
  const v = value.endsWith("\n") ? value.slice(0, -1) : value;
  return v.split("\n");
}

function wordParts(oldText: string, newText: string): { del: Part[]; add: Part[] } {
  const del: Part[] = [];
  const add: Part[] = [];
  for (const c of diffWordsWithSpace(oldText, newText)) {
    if (c.added) add.push({ value: c.value, changed: true });
    else if (c.removed) del.push({ value: c.value, changed: true });
    else {
      del.push({ value: c.value, changed: false });
      add.push({ value: c.value, changed: false });
    }
  }
  return { del, add };
}

export function lineDiff(oldText: string, newText: string): DiffLine[] {
  const changes = diffLines(normalize(oldText), normalize(newText));
  const out: DiffLine[] = [];
  let oldNo = 1;
  let newNo = 1;
  for (let i = 0; i < changes.length; i++) {
    const c = changes[i];
    if (!c.added && !c.removed) {
      for (const text of splitLines(c.value)) out.push({ kind: "same", text, oldNo: oldNo++, newNo: newNo++ });
      continue;
    }
    if (c.removed) {
      const dels = splitLines(c.value);
      const next = changes[i + 1];
      const adds = next && next.added ? splitLines(next.value) : [];
      if (adds.length) i++;
      const delLines: DiffLine[] = dels.map((text) => ({ kind: "del", text, oldNo: oldNo++ }));
      const addLines: DiffLine[] = adds.map((text) => ({ kind: "add", text, newNo: newNo++ }));
      // Pair changed lines one-to-one for word highlights.
      const pairs = Math.min(delLines.length, addLines.length);
      for (let p = 0; p < pairs; p++) {
        const { del, add } = wordParts(delLines[p].text, addLines[p].text);
        delLines[p].parts = del;
        addLines[p].parts = add;
      }
      out.push(...delLines, ...addLines);
      continue;
    }
    for (const text of splitLines(c.value)) out.push({ kind: "add", text, newNo: newNo++ });
  }
  return out;
}

export function summarize(lines: DiffLine[]): { added: number; removed: number; unchanged: number } {
  let added = 0;
  let removed = 0;
  let unchanged = 0;
  for (const l of lines) {
    if (l.kind === "add") added++;
    else if (l.kind === "del") removed++;
    else unchanged++;
  }
  return { added, removed, unchanged };
}

/** Collapse long runs of unchanged lines, keeping `context` lines around changes. */
export function collapse(lines: DiffLine[], context = 3, minHidden = 4): DiffBlock[] {
  const blocks: DiffBlock[] = [];
  let buf: DiffLine[] = [];
  const flush = () => {
    if (buf.length) blocks.push({ type: "lines", lines: buf });
    buf = [];
  };
  let i = 0;
  while (i < lines.length) {
    if (lines[i].kind !== "same") {
      buf.push(lines[i++]);
      continue;
    }
    let j = i;
    while (j < lines.length && lines[j].kind === "same") j++;
    const run = lines.slice(i, j);
    const atStart = i === 0;
    const atEnd = j === lines.length;
    const keepHead = atStart ? 0 : context;
    const keepTail = atEnd ? 0 : context;
    const hidden = run.length - keepHead - keepTail;
    if (hidden >= minHidden) {
      buf.push(...run.slice(0, keepHead));
      flush();
      blocks.push({ type: "gap", id: `gap-${run[keepHead].oldNo}`, lines: run.slice(keepHead, run.length - keepTail) });
      buf.push(...run.slice(run.length - keepTail));
    } else {
      buf.push(...run);
    }
    i = j;
  }
  flush();
  return blocks;
}

/** Pair lines into left (old) and right (new) columns. */
export function toSideBySide(lines: DiffLine[]): SideRow[] {
  const rows: SideRow[] = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (l.kind === "same") {
      rows.push({ left: l, right: l });
      i++;
      continue;
    }
    const dels: DiffLine[] = [];
    const adds: DiffLine[] = [];
    while (i < lines.length && lines[i].kind === "del") dels.push(lines[i++]);
    while (i < lines.length && lines[i].kind === "add") adds.push(lines[i++]);
    const n = Math.max(dels.length, adds.length);
    for (let k = 0; k < n; k++) rows.push({ left: dels[k], right: adds[k] });
  }
  return rows;
}

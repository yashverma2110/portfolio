"use client";

import { memo } from "react";

export type ToolbarAction =
  | "bold"
  | "italic"
  | "strike"
  | "h1"
  | "h2"
  | "h3"
  | "link"
  | "code"
  | "codeblock"
  | "quote"
  | "ul"
  | "ol"
  | "task"
  | "table"
  | "image"
  | "hr"
  | "undo"
  | "redo";

type Item = { action: ToolbarAction; label: string; title: string; glyph: React.ReactNode; className?: string };

function Svg({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const mod = isMac ? "⌘" : "Ctrl+";

const ITEMS: (Item | "sep")[] = [
  { action: "undo", label: "Undo", title: `Undo (${mod}Z)`, glyph: "↶" },
  { action: "redo", label: "Redo", title: `Redo (${isMac ? "⇧⌘Z" : "Ctrl+Y"})`, glyph: "↷" },
  "sep",
  { action: "bold", label: "Bold", title: `Bold (${mod}B)`, glyph: <b>B</b> },
  { action: "italic", label: "Italic", title: `Italic (${mod}I)`, glyph: <i style={{ fontFamily: "Georgia, serif" }}>I</i> },
  { action: "strike", label: "Strikethrough", title: "Strikethrough", glyph: <s>S</s> },
  "sep",
  { action: "h1", label: "Heading 1", title: "Heading 1", glyph: "H1" },
  { action: "h2", label: "Heading 2", title: "Heading 2", glyph: "H2" },
  { action: "h3", label: "Heading 3", title: "Heading 3", glyph: "H3" },
  "sep",
  { action: "link", label: "Link", title: `Link (${mod}K)`, glyph: <Svg d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /> },
  { action: "image", label: "Image", title: "Image from a URL", glyph: <Svg d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM21 15l-5-5L5 21" /> },
  { action: "code", label: "Inline code", title: "Inline code", glyph: <code>{"<>"}</code> },
  { action: "codeblock", label: "Code block", title: "Code block", glyph: <code>{"{ }"}</code> },
  { action: "quote", label: "Quote", title: "Quote", glyph: "❝" },
  "sep",
  { action: "ul", label: "Bulleted list", title: "Bulleted list", glyph: "•≡" },
  { action: "ol", label: "Numbered list", title: "Numbered list", glyph: "1≡" },
  { action: "task", label: "Task list", title: "Task list", glyph: "☑" },
  { action: "table", label: "Table", title: "Table", glyph: "▦" },
  { action: "hr", label: "Horizontal rule", title: "Horizontal rule", glyph: "―" },
];

function Toolbar({
  onAction,
  canUndo,
  canRedo,
}: {
  onAction: (a: ToolbarAction) => void;
  canUndo: boolean;
  canRedo: boolean;
}) {
  return (
    <div className="mde-toolbar" role="toolbar" aria-label="Formatting">
      {ITEMS.map((item, i) =>
        item === "sep" ? (
          <span key={`sep-${i}`} className="mde-tsep" aria-hidden="true" />
        ) : (
          <button
            key={item.action}
            type="button"
            className="mde-tbtn"
            aria-label={item.label}
            title={item.title}
            data-action={item.action}
            disabled={(item.action === "undo" && !canUndo) || (item.action === "redo" && !canRedo)}
            // Keep focus (and the mobile keyboard) in the textarea.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onAction(item.action)}
          >
            <span aria-hidden="true">{item.glyph}</span>
          </button>
        ),
      )}
    </div>
  );
}

export default memo(Toolbar);

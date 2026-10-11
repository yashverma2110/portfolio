"use client";

import { Fragment, memo, useMemo, useState } from "react";
import { collapse, lineDiff, summarize, toSideBySide, type DiffLine, type Part } from "./lib/diff";

function Parts({ line }: { line: DiffLine }) {
  if (!line.parts) return <>{line.text || "\u00a0"}</>;
  return (
    <>
      {line.parts.map((p: Part, i) =>
        p.changed ? (
          <mark key={i} className="dw">
            {p.value}
          </mark>
        ) : (
          <Fragment key={i}>{p.value}</Fragment>
        ),
      )}
      {line.text === "" && "\u00a0"}
    </>
  );
}

const SIGN = { add: "+", del: "-", same: " " } as const;
const SR = { add: "Added: ", del: "Removed: ", same: "" } as const;

function UnifiedLine({ line }: { line: DiffLine }) {
  return (
    <div className={`dl dl-${line.kind}`}>
      <span className="dl-no" aria-hidden="true">{line.oldNo ?? ""}</span>
      <span className="dl-no" aria-hidden="true">{line.newNo ?? ""}</span>
      <span className="dl-sign" aria-hidden="true">{SIGN[line.kind]}</span>
      <span className="dl-text">
        {SR[line.kind] && <span className="sr-only">{SR[line.kind]}</span>}
        <Parts line={line} />
      </span>
    </div>
  );
}

function SideCell({ line, side }: { line?: DiffLine; side: "left" | "right" }) {
  if (!line) return <div className="ds-cell ds-empty" aria-hidden="true" />;
  const no = side === "left" ? line.oldNo : line.newNo;
  return (
    <div className={`ds-cell dl-${line.kind}`}>
      <span className="dl-no" aria-hidden="true">{no ?? ""}</span>
      <span className="dl-sign" aria-hidden="true">{SIGN[line.kind]}</span>
      <span className="dl-text">
        {SR[line.kind] && <span className="sr-only">{SR[line.kind]}</span>}
        <Parts line={line} />
      </span>
    </div>
  );
}

function SideRows({ lines }: { lines: DiffLine[] }) {
  return (
    <>
      {toSideBySide(lines).map((r, i) => (
        <div className="ds-row" key={i}>
          <SideCell line={r.left} side="left" />
          <SideCell line={r.right} side="right" />
        </div>
      ))}
    </>
  );
}

function DiffView({
  oldText,
  newText,
  mode,
  oldLabel,
}: {
  oldText: string;
  newText: string;
  mode: "unified" | "split";
  oldLabel: string;
}) {
  const lines = useMemo(() => lineDiff(oldText, newText), [oldText, newText]);
  const stats = useMemo(() => summarize(lines), [lines]);
  const blocks = useMemo(() => collapse(lines), [lines]);
  const [expanded, setExpanded] = useState<{ key: string; ids: Set<string> }>({ key: "", ids: new Set() });
  const key = oldText.length + ":" + newText.length + ":" + lines.length;
  const open = expanded.key === key ? expanded.ids : new Set<string>();
  const expand = (id: string) => setExpanded({ key, ids: new Set(open).add(id) });

  const noChanges = stats.added === 0 && stats.removed === 0;

  return (
    <div className="mde-diff">
      <p className="mde-diff-stats">
        <span className="ds-add">+{stats.added} added</span>
        <span className="ds-del">−{stats.removed} removed</span>
        <span className="mde-muted">vs {oldLabel}</span>
      </p>
      {noChanges ? (
        <p className="mde-empty">No changes. The current text matches {oldLabel}.</p>
      ) : (
        <div className={mode === "split" ? "ds-table" : "dl-table"} role="region" aria-label="Changes">
          {mode === "split" && (
            <div className="ds-row ds-head" aria-hidden="true">
              <div className="ds-cell">{oldLabel}</div>
              <div className="ds-cell">Current</div>
            </div>
          )}
          {blocks.map((b, i) => {
            if (b.type === "gap" && !open.has(b.id)) {
              return (
                <button key={b.id} type="button" className="dl-gap" onClick={() => expand(b.id)}>
                  Show {b.lines.length} unchanged lines
                </button>
              );
            }
            return mode === "split" ? (
              <SideRows key={i} lines={b.lines} />
            ) : (
              <Fragment key={i}>
                {b.lines.map((l, j) => (
                  <UnifiedLine key={j} line={l} />
                ))}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(DiffView);

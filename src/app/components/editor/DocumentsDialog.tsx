"use client";

import Sheet from "./Sheet";
import type { DocMeta } from "./lib/storage";

export default function DocumentsDialog({
  open,
  onClose,
  docs,
  currentId,
  onOpen,
  onRename,
  onDelete,
  onNew,
  formatTime,
}: {
  open: boolean;
  onClose: () => void;
  docs: DocMeta[];
  currentId: string;
  onOpen: (id: string) => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  formatTime: (ts: number) => string;
}) {
  return (
    <Sheet open={open} onClose={onClose} title="Documents">
      <ul className="mde-doclist">
        {docs.map((d) => (
          <li key={d.id} aria-current={d.id === currentId ? "true" : undefined}>
            <button type="button" className="mde-docopen" onClick={() => onOpen(d.id)}>
              <span className="mde-doctitle">{d.title || "Untitled"}</span>
              <span className="mde-muted">
                {d.id === currentId ? "Open now · " : ""}
                Edited {formatTime(d.updatedAt)}
              </span>
            </button>
            <div className="mde-docactions">
              <button type="button" className="mde-btn" onClick={() => onRename(d.id)} aria-label={`Rename ${d.title || "Untitled"}`}>
                Rename
              </button>
              <button type="button" className="mde-btn mde-danger" onClick={() => onDelete(d.id)} aria-label={`Delete ${d.title || "Untitled"}`}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="mde-btn mde-primary mde-wide" onClick={onNew}>
        New document
      </button>
    </Sheet>
  );
}

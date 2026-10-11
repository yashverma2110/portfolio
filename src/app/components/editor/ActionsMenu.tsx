"use client";

import Sheet from "./Sheet";

type ExportKind = "md" | "html" | "copy-md" | "copy-html" | "print" | "share";

export default function ActionsMenu({
  open,
  onClose,
  canShare,
  onNewDoc,
  onNewPost,
  onInsertFrontmatter,
  onOpenFile,
  onDocuments,
  onSaveVersion,
  onExport,
  filename,
}: {
  open: boolean;
  onClose: () => void;
  canShare: boolean;
  onNewDoc: () => void;
  onNewPost: () => void;
  onInsertFrontmatter: () => void;
  onOpenFile: () => void;
  onDocuments: () => void;
  onSaveVersion: () => void;
  onExport: (k: ExportKind) => void;
  filename: string;
}) {
  return (
    <Sheet open={open} onClose={onClose} title="Menu">
      <div className="mde-menu">
        <p className="mde-menu-group">Document</p>
        <button type="button" onClick={onNewDoc}>New document</button>
        <button type="button" onClick={onNewPost}>New blog post</button>
        <button type="button" onClick={onInsertFrontmatter}>Insert blog frontmatter</button>
        <button type="button" onClick={onOpenFile}>Open file…</button>
        <button type="button" onClick={onDocuments}>All documents…</button>
        <button type="button" onClick={onSaveVersion}>Save version…</button>

        <p className="mde-menu-group">Export</p>
        <button type="button" data-export="md" onClick={() => onExport("md")}>
          Download .md <span className="mde-muted">{filename}.md</span>
        </button>
        <button type="button" data-export="html" onClick={() => onExport("html")}>
          Download .html <span className="mde-muted">{filename}.html</span>
        </button>
        <button type="button" data-export="copy-md" onClick={() => onExport("copy-md")}>Copy Markdown</button>
        <button type="button" data-export="copy-html" onClick={() => onExport("copy-html")}>Copy HTML</button>
        <button type="button" data-export="print" onClick={() => onExport("print")}>Print / Save as PDF</button>
        {canShare && (
          <button type="button" data-export="share" onClick={() => onExport("share")}>Share .md file…</button>
        )}
        <p className="mde-menu-note">Documents stay in this browser’s storage. Nothing is uploaded.</p>
      </div>
    </Sheet>
  );
}

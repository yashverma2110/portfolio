"use client";

import { forwardRef, memo } from "react";
import type { Frontmatter } from "./lib/frontmatter";

function str(meta: Frontmatter, key: string): string {
  const v = meta[key];
  return typeof v === "string" ? v : "";
}

export function MetaCard({ meta }: { meta: Frontmatter | null }) {
  if (!meta) return null;
  const tags = Array.isArray(meta.tags) ? meta.tags : str(meta, "tags") ? [str(meta, "tags")] : [];
  const title = str(meta, "title");
  const date = str(meta, "date");
  const description = str(meta, "description");
  if (!title && !date && !description && !tags.length) return null;
  return (
    <header className="fm-card" aria-label="Post details">
      {date && <p className="fm-date">{date}</p>}
      {title && <p className="fm-title">{title}</p>}
      {description && <p className="fm-desc">{description}</p>}
      {tags.length > 0 && (
        <ul className="fm-tags" aria-label="Tags">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </header>
  );
}

const Preview = forwardRef<HTMLDivElement, { html: string; meta: Frontmatter | null; className?: string }>(
  function Preview({ html, meta, className }, ref) {
    return (
      <div ref={ref} className={`mde-preview ${className ?? ""}`} tabIndex={0} aria-label="Preview">
        <article className="md-body">
          <MetaCard meta={meta} />
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {!html.trim() && !meta && <p className="mde-muted">Nothing to preview yet.</p>}
        </article>
      </div>
    );
  },
);

export default memo(Preview);

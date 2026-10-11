"use client";

import { useState } from "react";
import Sheet from "./Sheet";

export default function CompareDialog({
  open,
  onClose,
  onCompare,
}: {
  open: boolean;
  onClose: () => void;
  onCompare: (label: string, text: string) => void;
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  return (
    <Sheet open={open} onClose={onClose} title="Compare with…">
      <form
        className="mde-compare"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return setError("Paste some text or choose a file first.");
          onCompare("Pasted text", text);
        }}
      >
        <label htmlFor="mde-compare-text">Paste the text to compare against the current document</label>
        <textarea
          id="mde-compare-text"
          className="mde-textarea mde-compare-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          rows={8}
        />
        <label className="mde-btn mde-file">
          Or choose a file…
          <input
            type="file"
            accept=".md,.markdown,.mdown,.mkd,.txt,text/markdown,text/plain"
            className="sr-only"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              if (f.size > 5 * 1024 * 1024) return setError("That file is larger than 5 MB.");
              onCompare(f.name, await f.text());
            }}
          />
        </label>
        {error && <p className="mde-error" role="alert">{error}</p>}
        <button type="submit" className="mde-btn mde-primary">Compare</button>
      </form>
    </Sheet>
  );
}

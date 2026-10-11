"use client";

import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("./MarkdownEditor"), {
  ssr: false,
  loading: () => (
    <div className="mde-app mde-loading" aria-busy="true">
      <p>Loading the editor…</p>
    </div>
  ),
});

export default function EditorLoader() {
  return <MarkdownEditor />;
}

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import EditorLoader from "@/app/components/editor/EditorLoader";
import "./editor.css";

const title = "Markdown editor | Yash Verma";
const description =
  "A free, private Markdown editor that runs in your browser. Write, preview, compare changes, and export to Markdown, HTML, or PDF.";
const image = "https://itsyashverma.com/og-image.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/editor" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itsyashverma.com/editor",
    title,
    description,
    siteName: "Yash Verma",
    images: [{ url: image, width: 1200, height: 630, alt: "Yash Verma", type: "image/png" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e1116",
};

const FEATURES = [
  "GitHub-flavored Markdown: tables, task lists, strikethrough, autolinks, and highlighted code",
  "Blog frontmatter shown as a post card in the preview",
  "Save versions and see a line-by-line diff of what changed",
  "Export to .md, standalone .html, or PDF, or share the file from your phone",
  "Autosaves in your browser. No account, no upload, no tracking",
];

export default function EditorPage() {
  return (
    <main className="blog-page editor-page">
      <div className="math-grid" aria-hidden="true" />
      <div className="editor-shell">
        <header className="editor-intro">
          <div className="editor-intro-row">
            <h1>Markdown editor</h1>
            <Link className="editor-home" href="/">
              ← Yash Verma
            </Link>
          </div>
          <p>
            A free, private Markdown editor that runs in your browser. Write, preview, compare changes, and export to
            Markdown, HTML, or PDF.
          </p>
        </header>

        <EditorLoader />
        <noscript>
          <p className="editor-noscript">The editor needs JavaScript. Your text never leaves this browser.</p>
        </noscript>

        <section className="editor-features" aria-labelledby="editor-features-title">
          <h2 id="editor-features-title">What it does</h2>
          <ul>
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="editor-shortcuts">
            Shortcuts: Ctrl/⌘+B bold, Ctrl/⌘+I italic, Ctrl/⌘+K link, Ctrl/⌘+S save a version, Tab to indent lists and
            code.
          </p>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import CONTACT from "../config/contact";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="blog-page">
      <div className="math-grid" aria-hidden="true" />
      <div className="blog-wrap blog-shell">
        <header className="site-bar">
          <Link href="/" className="site-home">
            Yash Verma
          </Link>
          <nav aria-label="Site">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#projects">Projects</Link>
            <a href="/blog/rss.xml">RSS</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <nav aria-label="Profiles">
            <a href={CONTACT.linkedin}>LinkedIn</a>
            <a href={CONTACT.github}>GitHub</a>
            <a href={CONTACT.twitter}>X</a>
            <a href="/blog/rss.xml">RSS</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}

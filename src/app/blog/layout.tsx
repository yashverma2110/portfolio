import Link from "next/link";
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
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PostList from "@/app/components/blog/PostList";
import { SITE_URL, getPostMetas, getTags } from "@/app/lib/blog";
import { rssAlternate } from "./seo";

const title = "Blog | Yash Verma";
const description = "Posts by Yash Verma, a software and product engineer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog", types: rssAlternate },
  openGraph: { type: "website", url: `${SITE_URL}/blog`, title, description, siteName: "Yash Verma" },
  twitter: { card: "summary_large_image", title, description, creator: "@we_chat_tech" },
};

export default function BlogIndex() {
  const posts = getPostMetas();
  const tags = getTags();
  return (
    <>
      <header className="blog-header">
        <p className="eyebrow">Writing</p>
        <h1>Blog</h1>
      </header>
      {tags.length > 0 && (
        <nav className="tag-filter" aria-label="Tags">
          {tags.map((tag) => (
            <Link key={tag.slug} className="pill" href={`/blog/tags/${tag.slug}`}>
              #{tag.name} <span aria-label={`${tag.count} posts`}>({tag.count})</span>
            </Link>
          ))}
        </nav>
      )}
      <PostList posts={posts} />
    </>
  );
}

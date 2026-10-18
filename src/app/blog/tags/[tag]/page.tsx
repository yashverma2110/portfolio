import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/app/components/blog/PostList";
import { SITE_URL } from "@/app/config/site";
import { getPostsByTag, getTags } from "@/app/lib/blog";
import { rssAlternate } from "../../seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.slug }));
}

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getTags().find((item) => item.slug === slug);
  if (!tag) return {};
  const title = `Posts tagged #${tag.name} | Yash Verma`;
  const description = `Posts by Yash Verma tagged #${tag.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/tags/${tag.slug}`, types: rssAlternate },
    openGraph: { type: "website", url: `${SITE_URL}/blog/tags/${tag.slug}`, title, description, siteName: "Yash Verma" },
    twitter: { card: "summary_large_image", title, description, creator: "@we_chat_tech" },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: slug } = await params;
  const tag = getTags().find((item) => item.slug === slug);
  if (!tag) notFound();
  return (
    <>
      <header className="blog-header">
        <p className="eyebrow">
          <Link href="/blog">Blog</Link> / Tag
        </p>
        <h1>#{tag.name}</h1>
      </header>
      <PostList posts={getPostsByTag(tag.slug)} />
      <p className="all-posts">
        <Link href="/blog">All posts</Link>
      </p>
    </>
  );
}

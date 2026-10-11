import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "@/app/components/blog/PostBody";
import { PostMetaLine, TagLinks } from "@/app/components/blog/PostList";
import PROJECTS from "@/app/config/projects";
import { SITE_URL, coverSize, getPost, getPosts, projectAnchor, projectSlug } from "@/app/lib/blog";
import { rssAlternate } from "../seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

// The generated link preview card (opengraph-image.tsx in this folder).
function cardUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}/opengraph-image`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title} | Yash Verma`;
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Yash Verma", url: SITE_URL }],
    alternates: { canonical: `/blog/${post.slug}`, types: rssAlternate },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      siteName: "Yash Verma",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
      authors: [SITE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      creator: "@we_chat_tech",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;
  const project = post.project ? PROJECTS.find((item) => projectSlug(item.title) === post.project) : undefined;
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@type": "Person", name: "Yash Verma", url: SITE_URL },
        publisher: { "@type": "Person", name: "Yash Verma", url: SITE_URL },
        keywords: post.tags.join(", "),
        image: post.cover ? [cardUrl(post.slug), `${SITE_URL}${post.cover}`] : cardUrl(post.slug),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <article className="blog-post">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>
      <header className="blog-header post-header">
        <h1>{post.title}</h1>
        <PostMetaLine post={post} />
        <TagLinks tags={post.tags} />
        {post.project && (
          <p className="post-project">
            Project:{" "}
            <Link href={project ? `/#${projectAnchor(post.project)}` : "/#projects"}>{project?.title ?? post.project}</Link>
          </p>
        )}
      </header>
      {post.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="post-cover" src={post.cover} alt="" {...(coverSize(post.cover) ?? {})} fetchPriority="high" />
      )}
      <PostBody source={post.content} />
      {(newer || older) && (
        <nav className="post-pager" aria-label="More posts">
          {older ? (
            <Link href={`/blog/${older.slug}`} rel="prev" className="post">
              <span className="kicker">Previous</span>
              <span>{older.title}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link href={`/blog/${newer.slug}`} rel="next" className="post">
              <span className="kicker">Next</span>
              <span>{newer.title}</span>
            </Link>
          ) : <span />}
        </nav>
      )}
      <p className="all-posts">
        <Link href="/blog">All posts</Link>
      </p>
    </article>
  );
}

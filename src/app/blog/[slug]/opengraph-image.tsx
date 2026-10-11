import fs from "node:fs/promises";
import path from "node:path";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/app/lib/og";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/app/lib/blog";

// Static text: per-route alt needs generateImageMetadata, which stops Next from prerendering the image.
export const alt = "A post on Yash Verma's blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

type Params = { slug: string };

export default async function Image({ params }: { params: Params | Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  // Frontmatter `ogImage` (a 1200x630 PNG under public/) replaces the generated card.
  if (post.ogImage) {
    const file = await fs.readFile(path.join(process.cwd(), "public", post.ogImage));
    return new Response(new Uint8Array(file), { headers: { "Content-Type": OG_CONTENT_TYPE } });
  }
  return ogImage({
    title: post.title,
    subtitle: post.description,
    footer: [formatDate(post.date), post.tags.map((tag) => `#${tag}`).join(" "), "Yash Verma"].join("  ·  "),
  });
}

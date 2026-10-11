import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/app/lib/og";
import { notFound } from "next/navigation";
import { getTags } from "@/app/lib/blog";

// Static text: per-route alt needs generateImageMetadata, which stops Next from prerendering the image.
export const alt = "A tag page on Yash Verma's blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.slug }));
}

type Params = { tag: string };

export default async function Image({ params }: { params: Params | Promise<Params> }) {
  const { tag: slug } = await params;
  const tag = getTags().find((item) => item.slug === slug);
  if (!tag) notFound();
  const count = tag.count;
  return ogImage({
    title: `Posts tagged ${tag.name}`,
    subtitle: `${count} ${count === 1 ? "post" : "posts"} by Yash Verma.`,
  });
}

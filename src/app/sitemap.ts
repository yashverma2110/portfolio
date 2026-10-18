import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/config/site";
import { getPostMetas, getTags, isTagIndexable, tagSlug } from "@/app/lib/blog";

// Built once at build time. lastmod is always a real content date, never the build time:
// posts use `updated`, else `date`; /blog uses the newest post; the homepage uses the last commit
// that touched its copy or page (left out when git history is not available, e.g. on some CI).
// No changefreq or priority: Google ignores them.

function homepageLastModified(): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", "src/app/config", "src/app/page.tsx"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPostMetas();
  const postDate = (post: (typeof posts)[number]) => post.updated ?? post.date;
  const newest = posts.map(postDate).sort().at(-1);
  const postsByTag = new Map<string, string[]>();
  for (const post of posts) {
    for (const slug of new Set(post.tags.map(tagSlug))) {
      postsByTag.set(slug, [...(postsByTag.get(slug) ?? []), postDate(post)]);
    }
  }

  const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] =>
    lastModified ? { url: `${SITE_URL}${path}`, lastModified } : { url: `${SITE_URL}${path}` };

  return [
    entry("", homepageLastModified()),
    entry("/blog", newest),
    ...posts.map((post) => entry(`/blog/${post.slug}`, postDate(post))),
    ...getTags()
      .filter(isTagIndexable)
      .map((tag) => entry(`/blog/tags/${tag.slug}`, postsByTag.get(tag.slug)?.sort().at(-1))),
    // /editor is indexable (it is a public tool page). Its content has no date of its own.
    entry("/editor"),
  ];
}

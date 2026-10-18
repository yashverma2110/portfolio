import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import PROJECTS from "@/app/config/projects";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  description: string;
  tags: string[];
  project?: string;
  cover?: string;
  /** PNG under public/ that replaces the generated link preview card. */
  ogImage?: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

export type Tag = { slug: string; name: string; count: number };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Drafts show up in `next dev` only. Production builds leave them out everywhere. */
export const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export function tagSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

function fail(file: string, message: string): never {
  throw new Error(`[blog] Invalid frontmatter in content/blog/${file}: ${message}`);
}

// YAML turns an unquoted 2026-10-11 into a Date, and silently rolls 2026-13-01 over to 2027-01-01.
// So read the value as written in the frontmatter, and return YYYY-MM-DD.
function toDate(file: string, field: string, value: unknown, rawFrontmatter: string): string {
  let text: string;
  if (value instanceof Date) {
    const written = rawFrontmatter.match(new RegExp(`^${field}\\s*:\\s*["']?([^"'\\s#]+)`, "m"));
    text = written ? written[1] : value.toISOString().slice(0, 10);
  } else if (typeof value === "string") {
    text = value.trim();
  } else {
    fail(file, `"${field}" must be a date in YYYY-MM-DD format.`);
  }
  if (!DATE_RE.test(text)) fail(file, `"${field}" must be YYYY-MM-DD, got "${text}".`);
  const parsed = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== text) {
    fail(file, `"${field}" is not a real date: "${text}".`);
  }
  return text;
}

function requireString(file: string, data: Record<string, unknown>, field: string): string {
  const value = data[field];
  if (value === undefined || value === null || value === "") fail(file, `missing required field "${field}".`);
  if (typeof value !== "string") fail(file, `"${field}" must be a string.`);
  return value.trim();
}

function optionalString(file: string, data: Record<string, unknown>, field: string): string | undefined {
  const value = data[field];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") fail(file, `"${field}" must be a string.`);
  return value.trim();
}

function readingMinutes(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFile(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content, matter: rawFrontmatter } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(file, "the file name is the URL slug, so use lowercase letters, numbers, and hyphens only.");
  }

  const title = requireString(file, data, "title");
  const description = requireString(file, data, "description");
  if (data.date === undefined || data.date === null || data.date === "") fail(file, `missing required field "date".`);
  const date = toDate(file, "date", data.date, rawFrontmatter);
  const updated = data.updated ? toDate(file, "updated", data.updated, rawFrontmatter) : undefined;

  if (data.tags === undefined) fail(file, `missing required field "tags".`);
  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    fail(file, `"tags" must be a list of strings, e.g. tags: ["nextjs", "performance"].`);
  }
  const tags = (data.tags as string[]).map((tag) => tag.trim());

  const cover = optionalString(file, data, "cover");
  if (cover && !cover.startsWith("/")) fail(file, `"cover" must be a path under /public, e.g. /blog/my-post/cover.png.`);
  if (cover && !fs.existsSync(path.join(process.cwd(), "public", cover))) {
    fail(file, `"cover" points to public${cover}, which does not exist.`);
  }

  const project = optionalString(file, data, "project");
  const projectSlugs = PROJECTS.map((item) => projectSlug(item.title));
  if (project && !projectSlugs.includes(project)) {
    fail(file, `"project" must be one of ${projectSlugs.join(", ")}, got "${project}".`);
  }

  const known = new Set(["title", "date", "updated", "description", "tags", "project", "cover", "ogImage", "draft"]);
  const unknown = Object.keys(data).filter((key) => !known.has(key));
  if (unknown.length) fail(file, `unknown field(s) ${unknown.map((key) => `"${key}"`).join(", ")}. Allowed: ${[...known].join(", ")}.`);

  const ogImage = optionalString(file, data, "ogImage");
  if (ogImage && (!ogImage.startsWith("/") || !/\.png$/i.test(ogImage))) {
    fail(file, `"ogImage" must be a PNG path under /public, e.g. /blog/my-post/og.png (1200x630).`);
  }
  if (ogImage && !fs.existsSync(path.join(process.cwd(), "public", ogImage))) {
    fail(file, `"ogImage" points to public${ogImage}, which does not exist.`);
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") fail(file, `"draft" must be true or false.`);

  return {
    slug,
    title,
    date,
    updated,
    description,
    tags,
    project,
    cover,
    ogImage,
    draft: data.draft === true,
    readingMinutes: readingMinutes(content),
    content,
  };
}

let cache: Post[] | undefined;

function loadAll(): Post[] {
  if (cache && !SHOW_DRAFTS) return cache;
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((file) => /\.mdx?$/.test(file) && file.toLowerCase() !== "readme.md")
    : [];
  const posts = files
    .map(parseFile)
    .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? 1 : -1));
  cache = posts;
  return posts;
}

/** Posts that should render, newest first. Drafts are included only in `next dev`. */
export function getPosts(): Post[] {
  return loadAll().filter((post) => SHOW_DRAFTS || !post.draft);
}

export function getPostMetas(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getPosts().map(({ content, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getTags(): Tag[] {
  const tags = new Map<string, Tag>();
  for (const post of getPosts()) {
    for (const name of post.tags) {
      const slug = tagSlug(name);
      const tag = tags.get(slug);
      if (tag) tag.count += 1;
      else tags.set(slug, { slug, name, count: 1 });
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

export function getPostsByTag(slug: string): PostMeta[] {
  return getPostMetas().filter((post) => post.tags.some((tag) => tagSlug(tag) === slug));
}

export function getPostsByProject(project: string): PostMeta[] {
  return getPostMetas().filter((post) => post.project === project);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function projectSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function projectAnchor(slug: string) {
  return `project-${slug}`;
}

/** Pixel size of a PNG under public/, so the cover reserves its space. */
export function coverSize(cover: string): { width: number; height: number } | undefined {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", cover));
    if (buf.readUInt32BE(0) !== 0x89504e47) return undefined;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return undefined;
  }
}

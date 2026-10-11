const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const BLOG_DIR = path.join(__dirname, "content", "blog");

// YAML reads an unquoted 2026-10-11 as a Date. Keep the YYYY-MM-DD the post was written with.
function day(value) {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();
}

const tagSlug = (tag) => String(tag).trim().toLowerCase().replace(/\s+/g, "-");

// Published posts only. The app (src/app/lib/blog.ts) validates the frontmatter during `next build`,
// which runs before this file is read.
function publishedPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file) && file.toLowerCase() !== "readme.md")
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      return {
        slug: file.replace(/\.mdx?$/, ""),
        lastmod: day(data.updated) || day(data.date),
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: data.draft === true,
      };
    })
    .filter((post) => !post.draft);
}

function blogLastmods() {
  const posts = publishedPosts();
  const map = new Map();
  const newest = (dates) => dates.filter(Boolean).sort().at(-1);
  for (const post of posts) map.set(`/blog/${post.slug}`, post.lastmod);
  if (posts.length) map.set("/blog", newest(posts.map((post) => post.lastmod)));
  const tags = new Map();
  for (const post of posts) {
    for (const tag of post.tags) tags.set(tagSlug(tag), [...(tags.get(tagSlug(tag)) || []), post.lastmod]);
  }
  for (const [slug, dates] of tags) map.set(`/blog/tags/${slug}`, newest(dates));
  return map;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://itsyashverma.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/blog/rss.xml", "*/opengraph-image*", "*/twitter-image*", "/opengraph-image*", "/twitter-image*"],
  transform: async (config, loc) => {
    const lastmods = blogLastmods();
    return {
      loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: lastmods.has(loc) ? lastmods.get(loc) : config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // Static pages are discovered from the build output. This makes sure every published post and
  // tag page is listed even if the build manifest misses one.
  additionalPaths: async (config) => {
    const lastmods = blogLastmods();
    const out = [];
    for (const loc of lastmods.keys()) out.push(await config.transform(config, loc));
    return out;
  },
};

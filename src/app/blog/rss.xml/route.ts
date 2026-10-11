import { SITE_URL, getPostMetas } from "@/app/lib/blog";

export const dynamic = "force-static";

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function GET() {
  const posts = getPostMetas();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${escape(post.description)}</description>`,
        ...post.tags.map((tag) => `      <category>${escape(tag)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");
  const lastBuild = posts[0]
    ? `\n    <lastBuildDate>${rfc822(posts.map((post) => post.updated ?? post.date).sort().at(-1)!)}</lastBuildDate>`
    : "";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yash Verma</title>
    <link>${SITE_URL}/blog</link>
    <description>Posts by Yash Verma, a software and product engineer.</description>
    <language>en-us</language>${lastBuild}
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

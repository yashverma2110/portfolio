import Link from "next/link";
import { formatDate, tagSlug, type PostMeta } from "@/app/lib/blog";

export function TagLinks({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-list" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Link className="pill" href={`/blog/tags/${tagSlug(tag)}`}>
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PostMetaLine({ post }: { post: PostMeta }) {
  return (
    <p className="kicker">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.updated && post.updated !== post.date && (
        <>
          {" · Updated "}
          <time dateTime={post.updated}>{formatDate(post.updated)}</time>
        </>
      )}
      {` · ${post.readingMinutes} min read`}
      {post.draft && " · Draft"}
    </p>
  );
}

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return <p className="empty-state">No posts yet.</p>;
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <article key={post.slug} className="post">
          <PostMetaLine post={post} />
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="post-description">{post.description}</p>
          <TagLinks tags={post.tags} />
        </article>
      ))}
    </div>
  );
}

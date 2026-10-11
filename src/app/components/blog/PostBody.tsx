import YouTubeAutoplay from "@/app/components/YouTubeAutoplay";
import { renderPost } from "@/app/lib/markdown";

/** Server component: Markdown is rendered at build time; only the YouTube player ships client JS. */
export default function PostBody({ source }: { source: string }) {
  const segments = renderPost(source);
  return (
    <div className="prose">
      {segments.map((segment, index) =>
        segment.type === "youtube" ? (
          <YouTubeAutoplay key={index} id={segment.id} title={segment.title} showLink={false} />
        ) : (
          <div key={index} className="prose-chunk" dangerouslySetInnerHTML={{ __html: segment.html }} />
        )
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  title: string;
};

const ORIGIN = "https://www.youtube-nocookie.com";

export default function YouTubeAutoplay({ id, title }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const mountedRef = useRef(false);
  const visibleRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  const command = (func: "playVideo" | "pauseVideo") => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: "" }), ORIGIN);
  };

  const mount = () => {
    mountedRef.current = true;
    setMounted(true);
  };

  useEffect(() => {
    const box = boxRef.current;
    if (!box || typeof IntersectionObserver === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!mountedRef.current) {
            if (!reduceMotion) mount();
          } else {
            command("playVideo");
          }
        } else if (mountedRef.current) {
          command("pauseVideo");
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const src =
    `${ORIGIN}/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}` +
    `&rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <div className="video">
      <div ref={boxRef} className="video-frame">
        {mounted ? (
          <iframe
            ref={frameRef}
            src={src}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => {
              // If it scrolled away while loading, do not keep playing off screen.
              if (!visibleRef.current) command("pauseVideo");
            }}
          />
        ) : (
          <button type="button" className="video-play" onClick={mount} aria-label={`Play ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
            <span className="video-icon" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="video-link">
        <a href={`https://www.youtube.com/watch?v=${id}`}>Watch the demo on YouTube</a>
      </p>
    </div>
  );
}

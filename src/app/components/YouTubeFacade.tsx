"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
};

export default function YouTubeFacade({ id, title }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-play" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
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

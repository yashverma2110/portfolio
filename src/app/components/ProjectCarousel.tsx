"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { IProjectImage } from "@/app/types/projects";

type Props = {
  label: string;
  images: IProjectImage[];
};

export default function ProjectCarousel({ label, images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, Math.min(images.length - 1, index));
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    },
    [images.length]
  );

  // Only listen for scroll to update the dots. No wheel handler, so vertical
  // wheel and trackpad scrolling always reach the page.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const width = track.clientWidth || 1;
      setCurrent(Math.round(track.scrollLeft / width));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(current - 1);
    }
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="carousel-track"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${label}. Use the left and right arrow keys to move between slides.`}
      >
        {images.map((image, index) => (
          <figure
            key={image.src}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
          >
            <div className="carousel-frame">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 820px) 100vw, 772px"
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                draggable={false}
              />
            </div>
            <figcaption>{image.alt}</figcaption>
          </figure>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow"
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          ‹
        </button>
        <div className="carousel-dots">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="carousel-dot"
              aria-label={`Go to slide ${index + 1}: ${image.alt}`}
              aria-current={index === current ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow"
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
          disabled={current === images.length - 1}
        >
          ›
        </button>
      </div>
    </div>
  );
}

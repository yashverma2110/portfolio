"use client";

import { useEffect } from "react";

const SELECTOR = ".duty, #projects article.post, #stack, #contact";

export default function ViewportHighlight() {
  useEffect(() => {
    const root = document.querySelector(".blog-page");
    if (!root) return;

    let frame = 0;
    const update = () => {
      const rootRect = root.getBoundingClientRect();
      const focusY = rootRect.top + rootRect.height * 0.35;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
      let best: HTMLElement | null = null;
      let bestScore = Number.POSITIVE_INFINITY;

      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, rootRect.top);
        const visibleBottom = Math.min(rect.bottom, rootRect.bottom);
        if (visibleBottom - visibleTop < 8) continue;
        const containsFocus = rect.top <= focusY && rect.bottom >= focusY;
        const score = containsFocus ? 0 : Math.min(Math.abs(rect.top - focusY), Math.abs(rect.bottom - focusY));
        if (score < bestScore) {
          bestScore = score;
          best = node;
        }
      }

      for (const node of nodes) node.classList.toggle("in-view", node === best);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}

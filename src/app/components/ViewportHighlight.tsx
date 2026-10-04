"use client";

import { useEffect } from "react";

const SELECTOR = ".duty, #projects article.post, #stack, #contact";

function scrollToSection(section: HTMLElement, root: HTMLElement) {
  const top = root.scrollTop + section.getBoundingClientRect().top - root.getBoundingClientRect().top - 16;
  root.scrollTo({ top, behavior: "smooth" });
}

export default function ViewportHighlight() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".blog-page");
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

    const markMetric = (metricId: string | null) => {
      root.querySelectorAll(".metric.hit").forEach((node) => node.classList.remove("hit"));
      if (!metricId) return;
      document.getElementById(metricId)?.classList.add("hit");
    };

    const onPillClick = (event: Event) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a.pill");
      if (!link) return;
      const sectionId = link.getAttribute("href")?.slice(1);
      if (!sectionId) return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      event.preventDefault();
      history.pushState(null, "", `#${sectionId}`);
      markMetric(link.dataset.metric ?? null);
      scrollToSection(section, root);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("click", onPillClick);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("click", onPillClick);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}

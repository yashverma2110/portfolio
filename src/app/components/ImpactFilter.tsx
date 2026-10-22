"use client";

import { useLayoutEffect } from "react";

const ALLOWED = new Set(["frontend", "backend", "data", "ai", "infra", "leadership"]);

function charterFromHash() {
  const match = /^#impact=([a-z]+)$/i.exec(window.location.hash);
  if (!match) return "all";
  const slug = match[1].toLowerCase();
  return ALLOWED.has(slug) ? slug : "all";
}

function apply(slug: string) {
  const root = document.documentElement;
  if (slug === "all") root.removeAttribute("data-impact");
  else root.setAttribute("data-impact", slug);

  document.querySelectorAll<HTMLElement>("[data-impact-root] [role='radio']").forEach((node) => {
    node.setAttribute("aria-checked", node.getAttribute("data-charter") === slug ? "true" : "false");
  });

  const status = document.getElementById("impact-status");
  const chip = document.querySelector<HTMLElement>(`[data-impact-root] .charter-chip[data-charter="${slug}"]`);
  if (status) {
    status.textContent = slug === "all"
      ? "Showing all impact results."
      : `Showing ${chip?.textContent?.replace(/\s+/g, " ").trim() ?? slug}.`;
  }
}

function select(slug: string) {
  const current = charterFromHash();
  const next = slug === "all" || slug === current ? "all" : slug;
  if (next === current) return;
  const url = new URL(window.location.href);
  const hash = next === "all" ? "" : `#impact=${next}`;
  window.history.pushState(null, "", url.pathname + url.search + hash);
  apply(next);
}

export default function ImpactFilter() {
  useLayoutEffect(() => {
    apply(charterFromHash());

    const onNavigate = () => apply(charterFromHash());

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest("[data-impact-root]")) {
        if (target?.closest("a.chip, a[href^='#']")) setTimeout(onNavigate, 0);
        return;
      }

      const toggle = target.closest<HTMLButtonElement>(".coverage-toggle");
      if (toggle) {
        const panel = document.getElementById(toggle.getAttribute("aria-controls") ?? "");
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (panel) panel.hidden = !open;
        return;
      }

      const choice = target.closest<HTMLButtonElement>("button[data-charter]");
      if (!choice) return;
      event.preventDefault();
      select(choice.getAttribute("data-charter") || "all");
    };

    window.addEventListener("hashchange", onNavigate);
    window.addEventListener("popstate", onNavigate);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onNavigate);
      window.removeEventListener("popstate", onNavigate);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

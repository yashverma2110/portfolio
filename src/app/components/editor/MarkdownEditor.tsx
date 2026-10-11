"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Toolbar, { type ToolbarAction } from "./Toolbar";
import Preview from "./Preview";
import DiffView from "./DiffView";
import ActionsMenu from "./ActionsMenu";
import DocumentsDialog from "./DocumentsDialog";
import CompareDialog from "./CompareDialog";
import { renderMarkdown } from "./lib/render";
import { standaloneHtml } from "./lib/exportHtml";
import { blogFrontmatter, parseFrontmatter } from "./lib/frontmatter";
import { docStats, slugify, starterDoc, todayISO } from "./lib/text";
import { looksBinary, normalizeNewlines, titleFromFile, UPLOAD_ACCEPT, uploadProblem } from "./lib/upload";
import {
  codeBlock,
  continueList,
  indent,
  inListOrCode,
  insertImage,
  insertLink,
  insertRule,
  insertTable,
  toggleInline,
  toggleLinePrefix,
  type EditState,
} from "./lib/transforms";
import {
  deleteDoc,
  loadDoc,
  loadIndex,
  loadVersions,
  MAX_VERSIONS,
  newId,
  saveDoc,
  saveVersions,
  setCurrent,
  type Doc,
  type DocMeta,
  type Version,
} from "./lib/storage";

type View = "write" | "preview" | "diff" | "split";
type SaveState = "saved" | "saving" | "error";
type Compare = { kind: "version"; id: string } | { kind: "text"; label: string; text: string } | null;

const WIDE_QUERY = "(min-width: 900px)";
const HISTORY_LIMIT = 200;

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

function useWide(): boolean {
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(WIDE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function freshDoc(content: string, title: string): Doc {
  return { id: newId(), title, content, updatedAt: Date.now() };
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

function mdFile(name: string, content: string, type: string): File {
  return new File([content], name, { type });
}

export default function MarkdownEditor() {
  const wide = useWide();
  const [ready, setReady] = useState(false);
  const [doc, setDoc] = useState<Doc>(() => freshDoc("", "Untitled post"));
  const [docs, setDocs] = useState<DocMeta[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [view, setView] = useState<View>(() =>
    typeof window !== "undefined" && window.matchMedia(WIDE_QUERY).matches ? "split" : "write",
  );
  const [diffMode, setDiffMode] = useState<"unified" | "split">(() =>
    typeof window !== "undefined" && window.matchMedia(WIDE_QUERY).matches ? "split" : "unified",
  );
  const [compare, setCompare] = useState<Compare>(null);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [canShare, setCanShare] = useState<false | string>(false);
  const [dragging, setDragging] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [printHtml, setPrintHtml] = useState<{ html: string; meta: ReturnType<typeof renderMarkdown>["meta"] } | null>(null);
  const [syncScroll, setSyncScroll] = useState(true);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const pendingSel = useRef<{ start: number; end: number } | null>(null);
  const past = useRef<EditState[]>([]);
  const future = useRef<EditState[]>([]);
  const lastState = useRef<EditState>({ value: "", start: 0, end: 0 });
  const lastTypeAt = useRef(0);
  const [, setHistoryTick] = useState(0);
  const docRef = useRef(doc);
  docRef.current = doc;
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeView: View = !wide && view === "split" ? "write" : view;

  const say = useCallback((msg: string) => {
    setNotice(msg);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 3500);
  }, []);

  const resetHistory = (value: string) => {
    past.current = [];
    future.current = [];
    lastState.current = { value, start: 0, end: 0 };
    setHistoryTick((t) => t + 1);
  };

  // ---------- Load ----------
  useEffect(() => {
    const idx = loadIndex();
    let d: Doc | null = idx.currentId ? loadDoc(idx.currentId) : null;
    if (!d && idx.docs[0]) d = loadDoc(idx.docs[0].id);
    if (!d) d = freshDoc(starterDoc(todayISO()), "Untitled post");
    setDoc(d);
    setDocs(idx.docs);
    setVersions(loadVersions(d.id));
    resetHistory(d.content);
    setReady(true);
    try {
      const probe = mdFile("probe.md", "x", "text/markdown");
      const probeTxt = mdFile("probe.md", "x", "text/plain");
      if (typeof navigator.canShare === "function") {
        if (navigator.canShare({ files: [probe] })) setCanShare("text/markdown");
        else if (navigator.canShare({ files: [probeTxt] })) setCanShare("text/plain");
      }
    } catch {
      setCanShare(false);
    }
  }, []);

  // ---------- Autosave (debounced) ----------
  const persist = useCallback((d: Doc) => {
    const ok = saveDoc({ ...d, updatedAt: Date.now() });
    setSaveState(ok ? "saved" : "error");
    if (ok) setDocs(loadIndex().docs);
    return ok;
  }, []);

  useEffect(() => {
    if (!ready) return;
    setSaveState("saving");
    const t = setTimeout(() => persist(doc), 500);
    return () => clearTimeout(t);
  }, [doc.content, doc.title, doc.id, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const flush = () => {
      if (ready) saveDoc({ ...docRef.current, updatedAt: Date.now() });
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [ready]);

  // ---------- Selection restore after programmatic edits ----------
  useLayoutEffect(() => {
    const sel = pendingSel.current;
    const ta = taRef.current;
    if (sel && ta) {
      pendingSel.current = null;
      ta.focus({ preventScroll: true });
      ta.setSelectionRange(sel.start, sel.end);
    }
  });

  // ---------- Mobile keyboard: size the app to the visual viewport ----------
  useEffect(() => {
    const vv = window.visualViewport;
    const app = appRef.current;
    if (!vv || !app) return;
    const on = () => {
      if (window.matchMedia(WIDE_QUERY).matches) {
        app.style.removeProperty("--app-h");
        return;
      }
      // Only shrink when the on-screen keyboard takes space.
      const keyboard = window.innerHeight - vv.height > 120;
      if (keyboard) app.style.setProperty("--app-h", `${Math.round(vv.height)}px`);
      else app.style.removeProperty("--app-h");
    };
    vv.addEventListener("resize", on);
    on();
    return () => vv.removeEventListener("resize", on);
  }, [ready]);

  // ---------- Editing ----------
  const setContent = useCallback((value: string) => {
    setDoc((d) => (d.content === value ? d : { ...d, content: value }));
  }, []);

  const applyEdit = useCallback(
    (next: EditState) => {
      const ta = taRef.current;
      const prev: EditState = ta
        ? { value: ta.value, start: ta.selectionStart, end: ta.selectionEnd }
        : lastState.current;
      if (next.value === prev.value && next.start === prev.start && next.end === prev.end) return;
      past.current.push(prev);
      if (past.current.length > HISTORY_LIMIT) past.current.shift();
      future.current = [];
      lastState.current = next;
      lastTypeAt.current = 0;
      pendingSel.current = { start: next.start, end: next.end };
      setContent(next.value);
      setHistoryTick((t) => t + 1);
    },
    [setContent],
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const ta = e.target;
    const now = Date.now();
    const next: EditState = { value: ta.value, start: ta.selectionStart, end: ta.selectionEnd };
    // Group fast typing into one undo step.
    const typedNewline = ta.value[ta.selectionStart - 1] === "\n";
    if (now - lastTypeAt.current > 800 || typedNewline) {
      past.current.push(lastState.current);
      if (past.current.length > HISTORY_LIMIT) past.current.shift();
      future.current = [];
      setHistoryTick((t) => t + 1);
    }
    lastTypeAt.current = now;
    lastState.current = next;
    setContent(ta.value);
  };

  const onSelect = () => {
    const ta = taRef.current;
    if (ta) lastState.current = { value: ta.value, start: ta.selectionStart, end: ta.selectionEnd };
  };

  const undo = useCallback(() => {
    const prev = past.current.pop();
    if (!prev) return;
    const ta = taRef.current;
    future.current.push(ta ? { value: ta.value, start: ta.selectionStart, end: ta.selectionEnd } : lastState.current);
    lastState.current = prev;
    lastTypeAt.current = 0;
    pendingSel.current = { start: prev.start, end: prev.end };
    setContent(prev.value);
    setHistoryTick((t) => t + 1);
  }, [setContent]);

  const redo = useCallback(() => {
    const next = future.current.pop();
    if (!next) return;
    const ta = taRef.current;
    past.current.push(ta ? { value: ta.value, start: ta.selectionStart, end: ta.selectionEnd } : lastState.current);
    lastState.current = next;
    lastTypeAt.current = 0;
    pendingSel.current = { start: next.start, end: next.end };
    setContent(next.value);
    setHistoryTick((t) => t + 1);
  }, [setContent]);

  const current = (): EditState => {
    const ta = taRef.current;
    if (!ta) return { value: docRef.current.content, start: docRef.current.content.length, end: docRef.current.content.length };
    return { value: ta.value, start: ta.selectionStart, end: ta.selectionEnd };
  };

  const onAction = useCallback(
    (a: ToolbarAction) => {
      const s = current();
      switch (a) {
        case "undo":
          return undo();
        case "redo":
          return redo();
        case "bold":
        case "italic":
        case "strike":
        case "code":
          return applyEdit(toggleInline(s, a));
        case "h1":
        case "h2":
        case "h3":
        case "quote":
        case "ul":
        case "ol":
        case "task":
          return applyEdit(toggleLinePrefix(s, a));
        case "link":
          return applyEdit(insertLink(s));
        case "codeblock":
          return applyEdit(codeBlock(s));
        case "table":
          return applyEdit(insertTable(s));
        case "hr":
          return applyEdit(insertRule(s));
        case "image": {
          const url = window.prompt("Image URL", "https://");
          if (!url || url === "https://") {
            taRef.current?.focus();
            return;
          }
          if (!/^(https?:\/\/|\/|\.\/)/i.test(url.trim())) {
            say("Use an http(s) image URL.");
            return;
          }
          return applyEdit(insertImage(s, url.trim()));
        }
      }
    },
    [applyEdit, undo, redo, say],
  );

  // ---------- Versions ----------
  const saveVersion = useCallback(
    (name?: string) => {
      const content = docRef.current.content;
      if (versions[0] && versions[0].content === content) {
        say(`No changes since “${versions[0].name}”.`);
        return;
      }
      const v: Version = {
        id: newId(),
        name: name?.trim() || `Version ${versions.length + 1}`,
        createdAt: Date.now(),
        content,
      };
      const next = [v, ...versions].slice(0, MAX_VERSIONS);
      setVersions(next);
      const ok = saveVersions(docRef.current.id, next);
      persist(docRef.current);
      setCompare(null);
      say(ok ? `Saved “${v.name}”.` : "Could not save the version: browser storage is full.");
    },
    [versions, say, persist],
  );

  const saveVersionNamed = () => {
    const name = window.prompt("Version name", `Version ${versions.length + 1}`);
    if (name === null) return;
    saveVersion(name);
  };

  const compareVersion = compare?.kind === "version" ? versions.find((v) => v.id === compare.id) : undefined;
  const target: { label: string; text: string; version?: Version } | null =
    compare?.kind === "text"
      ? { label: compare.label, text: compare.text }
      : compareVersion
        ? { label: compareVersion.name, text: compareVersion.content, version: compareVersion }
        : versions[0]
          ? { label: versions[0].name, text: versions[0].content, version: versions[0] }
          : null;

  const restoreVersion = (v: Version) => {
    if (!window.confirm(`Replace the current text with “${v.name}”? You can undo this.`)) return;
    applyEdit({ value: v.content, start: 0, end: 0 });
    say(`Restored “${v.name}”.`);
  };

  const deleteVersion = (v: Version) => {
    if (!window.confirm(`Delete “${v.name}”? This cannot be undone.`)) return;
    const next = versions.filter((x) => x.id !== v.id);
    setVersions(next);
    saveVersions(docRef.current.id, next);
    if (compare?.kind === "version" && compare.id === v.id) setCompare(null);
    say(`Deleted “${v.name}”.`);
  };

  // ---------- Keyboard ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveVersion();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveVersion]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    const modKey = e.metaKey || e.ctrlKey;
    const k = e.key.toLowerCase();
    if (modKey && !e.altKey) {
      if (k === "b") {
        e.preventDefault();
        return onAction("bold");
      }
      if (k === "i") {
        e.preventDefault();
        return onAction("italic");
      }
      if (k === "k") {
        e.preventDefault();
        return onAction("link");
      }
      if (k === "z" && !e.shiftKey) {
        e.preventDefault();
        return undo();
      }
      if ((k === "z" && e.shiftKey) || k === "y") {
        e.preventDefault();
        return redo();
      }
    }
    const s = current();
    if (e.key === "Tab" && !modKey && !e.altKey && inListOrCode(s.value, s.start)) {
      e.preventDefault();
      return applyEdit(indent(s, e.shiftKey));
    }
    if (e.key === "Enter" && !modKey && !e.shiftKey && !e.altKey) {
      const next = continueList(s);
      if (next) {
        e.preventDefault();
        applyEdit(next);
      }
    }
  };

  // ---------- Documents ----------
  const switchTo = (d: Doc) => {
    persist(docRef.current);
    setDoc(d);
    setVersions(loadVersions(d.id));
    setCompare(null);
    resetHistory(d.content);
    setCurrent(d.id);
  };

  const createDoc = (content: string, title: string) => {
    const d = freshDoc(content, title);
    persist(docRef.current);
    saveDoc(d);
    setDocs(loadIndex().docs);
    switchTo(d);
    if (!wide) setView("write");
    say(`Created “${title}”.`);
  };

  const openDoc = (id: string) => {
    const d = loadDoc(id);
    if (!d) return say("That document could not be loaded.");
    switchTo(d);
    setDocsOpen(false);
  };

  const renameDoc = (id: string) => {
    const meta = docs.find((d) => d.id === id);
    const name = window.prompt("Document title", meta?.title ?? "");
    if (!name || !name.trim()) return;
    if (id === doc.id) setDoc((d) => ({ ...d, title: name.trim() }));
    else {
      const d = loadDoc(id);
      if (d) saveDoc({ ...d, title: name.trim() });
      setCurrent(doc.id);
      setDocs(loadIndex().docs);
    }
  };

  const removeDoc = (id: string) => {
    const meta = docs.find((d) => d.id === id);
    if (!window.confirm(`Delete “${meta?.title || "Untitled"}” and its saved versions? This cannot be undone.`)) return;
    const idx = deleteDoc(id);
    setDocs(idx.docs);
    if (id === doc.id) {
      const next = idx.currentId ? loadDoc(idx.currentId) : null;
      const d = next ?? freshDoc("", "Untitled");
      setDoc(d);
      setVersions(loadVersions(d.id));
      setCompare(null);
      resetHistory(d.content);
    }
    say("Document deleted.");
  };

  // Each file opens as a new document; the last one becomes active.
  const importFiles = async (list: FileList | File[]) => {
    const files = Array.from(list);
    if (!files.length) return;
    const problems: string[] = [];
    const created: Doc[] = [];
    const names: string[] = [];
    persist(docRef.current);
    for (const file of files) {
      const problem = uploadProblem(file);
      if (problem) {
        problems.push(problem);
        continue;
      }
      let text: string;
      try {
        text = normalizeNewlines(await file.text());
      } catch {
        problems.push(`${file.name} could not be read.`);
        continue;
      }
      if (looksBinary(text)) {
        problems.push(`${file.name} is not a text file.`);
        continue;
      }
      const d = freshDoc(text, titleFromFile(file.name, parseFrontmatter(text).data?.title));
      if (!saveDoc(d)) {
        problems.push(`${file.name} could not be saved: browser storage is full.`);
        break;
      }
      created.push(d);
      names.push(file.name);
    }
    setUploadErrors(problems);
    if (created.length) {
      const last = created[created.length - 1];
      setDocs(loadIndex().docs);
      switchTo(last);
      if (!wide) setView("write");
      say(created.length === 1 ? `Uploaded ${names[0]}` : `Uploaded ${created.length} files`);
    } else if (problems.length) {
      say("Upload failed.");
    }
  };

  const insertFrontmatter = () => {
    const s = current();
    if (parseFrontmatter(s.value).data) return say("This document already has frontmatter.");
    const fm = blogFrontmatter(todayISO(), doc.title || "Untitled post") + "\n";
    applyEdit({ value: fm + s.value, start: 0, end: fm.length });
    setMenuOpen(false);
  };

  // ---------- Export ----------
  const filename = slugify(doc.title || "untitled");
  const fresh = () => renderMarkdown(docRef.current.content);

  const exportAction = async (what: "md" | "html" | "copy-md" | "copy-html" | "print" | "share") => {
    setMenuOpen(false);
    const content = docRef.current.content;
    switch (what) {
      case "md":
        download(`${filename}.md`, content, "text/markdown;charset=utf-8");
        return say(`Downloaded ${filename}.md`);
      case "html": {
        const r = fresh();
        download(`${filename}.html`, standaloneHtml(doc.title || "Untitled", r.html, r.meta), "text/html;charset=utf-8");
        return say(`Downloaded ${filename}.html`);
      }
      case "copy-md":
        return say((await copyText(content)) ? "Copied Markdown." : "Copy failed.");
      case "copy-html":
        return say((await copyText(fresh().html)) ? "Copied HTML." : "Copy failed.");
      case "print": {
        setPrintHtml(fresh());
        const prevTitle = document.title;
        document.title = doc.title || "Untitled";
        const restore = () => {
          document.title = prevTitle;
          window.removeEventListener("afterprint", restore);
        };
        window.addEventListener("afterprint", restore);
        requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
        return;
      }
      case "share": {
        if (!canShare) return;
        const file = mdFile(`${filename}.md`, content, canShare);
        try {
          await navigator.share({ files: [file], title: doc.title || "Untitled" });
        } catch (err) {
          if ((err as DOMException)?.name !== "AbortError") say("Sharing failed.");
        }
        return;
      }
    }
  };

  // ---------- Derived ----------
  const debounced = useDebounced(doc.content, 150);
  const rendered = useMemo(() => renderMarkdown(debounced), [debounced]);
  const stats = useMemo(() => docStats(debounced), [debounced]);
  const diffNew = activeView === "diff" ? debounced : "";

  const onEditorScroll = () => {
    if (!syncScroll || activeView !== "split") return;
    const ta = taRef.current;
    const pv = previewRef.current;
    if (!ta || !pv) return;
    const max = ta.scrollHeight - ta.clientHeight;
    const ratio = max > 0 ? ta.scrollTop / max : 0;
    pv.scrollTop = ratio * (pv.scrollHeight - pv.clientHeight);
  };

  const tabs: { id: View; label: string }[] = wide
    ? [
        { id: "split", label: "Split" },
        { id: "write", label: "Write" },
        { id: "preview", label: "Preview" },
        { id: "diff", label: "Diff" },
      ]
    : [
        { id: "write", label: "Write" },
        { id: "preview", label: "Preview" },
        { id: "diff", label: "Diff" },
      ];

  const statusText =
    saveState === "saving" ? "Saving..." : saveState === "error" ? "Not saved: storage unavailable" : "Saved";

  const showWrite = activeView === "write" || activeView === "split";
  const showPreview = activeView === "preview" || activeView === "split";

  return (
    <div
      ref={appRef}
      className={`mde-app${dragging ? " is-dragging" : ""}`}
      data-view={activeView}
      onDragOver={(e) => {
        if (Array.from(e.dataTransfer.types).includes("Files")) {
          e.preventDefault();
          setDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragging(false);
      }}
      onDrop={(e) => {
        const files = e.dataTransfer.files;
        if (!files?.length) return;
        e.preventDefault();
        setDragging(false);
        void importFiles(files);
      }}
    >
      <div className="mde-topbar">
        <label className="sr-only" htmlFor="mde-title">
          Document title
        </label>
        <input
          id="mde-title"
          className="mde-title"
          value={doc.title}
          onChange={(e) => setDoc((d) => ({ ...d, title: e.target.value }))}
          onBlur={() => {
            if (!doc.title.trim()) setDoc((d) => ({ ...d, title: "Untitled" }));
          }}
          placeholder="Untitled"
          maxLength={120}
          autoComplete="off"
          spellCheck={false}
        />
        <span className={`mde-status mde-status-${saveState}`} role="status" aria-live="polite">
          {notice || statusText}
        </span>
        <button
          type="button"
          className="mde-btn mde-upload-btn"
          aria-label="Upload Markdown file"
          title="Upload Markdown file (.md, .markdown, .mdx, .txt)"
          onClick={() => fileRef.current?.click()}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
          </svg>
          <span className="mde-btn-label">Upload</span>
        </button>
        <button
          type="button"
          className="mde-btn mde-menu-btn"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span aria-hidden="true">⋯</span>
          <span className="mde-menu-label">Menu</span>
        </button>
      </div>

      {uploadErrors.length > 0 && (
        <div className="mde-alert" role="alert">
          <ul>
            {uploadErrors.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
          <button type="button" className="mde-btn mde-icon-btn" aria-label="Dismiss" onClick={() => setUploadErrors([])}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}

      <div className="mde-tabs" role="group" aria-label="View">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className="mde-tab"
            aria-pressed={activeView === t.id}
            data-tab={t.id}
            onClick={() => setView(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mde-panes">
        {showWrite && (
          <section className="mde-write" aria-label="Write">
            <label htmlFor="mde-textarea" className="sr-only">
              Markdown
            </label>
            <textarea
              id="mde-textarea"
              ref={taRef}
              className="mde-textarea"
              value={doc.content}
              onChange={onChange}
              onSelect={onSelect}
              onKeyDown={onKeyDown}
              onScroll={onEditorScroll}
              spellCheck
              autoCapitalize="sentences"
              placeholder="Write Markdown here…"
            />
            <Toolbar onAction={onAction} canUndo={past.current.length > 0} canRedo={future.current.length > 0} />
          </section>
        )}
        {showPreview && <Preview ref={previewRef} html={rendered.html} meta={rendered.meta} />}
        {activeView === "diff" && (
          <section className="mde-diffpane" aria-label="Diff">
            <div className="mde-diffbar">
              <label className="mde-field">
                <span>Compare with</span>
                <select
                  value={compare?.kind === "text" ? "__text" : target?.version?.id ?? ""}
                  onChange={(e) => {
                    if (e.target.value === "__text") setCompareOpen(true);
                    else setCompare({ kind: "version", id: e.target.value });
                  }}
                >
                  {versions.length === 0 && compare?.kind !== "text" && <option value="">No saved versions</option>}
                  {versions.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} · {formatTime(v.createdAt)}
                    </option>
                  ))}
                  {compare?.kind === "text" && <option value="__text">{compare.label}</option>}
                  <option value="__text">Pasted or imported text…</option>
                </select>
              </label>
              <div className="mde-seg" role="group" aria-label="Diff layout">
                <button type="button" aria-pressed={diffMode === "unified"} onClick={() => setDiffMode("unified")}>
                  Unified
                </button>
                <button type="button" aria-pressed={diffMode === "split"} onClick={() => setDiffMode("split")}>
                  Side by side
                </button>
              </div>
              <div className="mde-diffactions">
                <button type="button" className="mde-btn" onClick={() => saveVersion()}>
                  Save version
                </button>
                <button type="button" className="mde-btn" onClick={() => setCompareOpen(true)}>
                  Compare with…
                </button>
                {target?.version && (
                  <>
                    <button type="button" className="mde-btn" onClick={() => restoreVersion(target.version!)}>
                      Restore this version
                    </button>
                    <button type="button" className="mde-btn mde-danger" onClick={() => deleteVersion(target.version!)}>
                      Delete version
                    </button>
                  </>
                )}
              </div>
            </div>
            {target ? (
              <DiffView oldText={target.text} newText={diffNew} mode={diffMode} oldLabel={target.label} />
            ) : (
              <div className="mde-empty">
                <p>Save a version to see what changed since then, or compare with text you paste or import.</p>
                <p className="mde-muted">Tip: press {typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘S" : "Ctrl+S"} to save a version.</p>
              </div>
            )}
          </section>
        )}
      </div>

      <footer className="mde-footer">
        <span>{stats.words.toLocaleString()} words</span>
        <span>{stats.characters.toLocaleString()} characters</span>
        <span>{stats.minutes} min read</span>
        {activeView === "split" && (
          <label className="mde-check">
            <input type="checkbox" checked={syncScroll} onChange={(e) => setSyncScroll(e.target.checked)} />
            Sync scroll
          </label>
        )}
      </footer>

      {dragging && (
        <div className="mde-drop" aria-hidden="true">
          Drop a Markdown file to open it
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept={UPLOAD_ACCEPT}
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        data-upload-input
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          e.target.value = "";
          void importFiles(files);
        }}
      />

      <ActionsMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        canShare={!!canShare}
        onNewDoc={() => {
          setMenuOpen(false);
          createDoc("", "Untitled");
        }}
        onNewPost={() => {
          setMenuOpen(false);
          createDoc(blogFrontmatter(todayISO()) + "\n# Untitled post\n\n", "Untitled post");
        }}
        onInsertFrontmatter={insertFrontmatter}
        onOpenFile={() => {
          setMenuOpen(false);
          fileRef.current?.click();
        }}
        onDocuments={() => {
          setMenuOpen(false);
          setDocsOpen(true);
        }}
        onSaveVersion={() => {
          setMenuOpen(false);
          saveVersionNamed();
        }}
        onExport={exportAction}
        filename={filename}
      />

      <DocumentsDialog
        open={docsOpen}
        onClose={() => setDocsOpen(false)}
        docs={docs.length ? docs : [{ id: doc.id, title: doc.title, updatedAt: doc.updatedAt }]}
        currentId={doc.id}
        onOpen={openDoc}
        onRename={renameDoc}
        onDelete={removeDoc}
        onNew={() => {
          setDocsOpen(false);
          createDoc("", "Untitled");
        }}
        formatTime={formatTime}
      />

      <CompareDialog
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        onCompare={(label, text) => {
          setCompare({ kind: "text", label, text });
          setCompareOpen(false);
          setView("diff");
        }}
      />

      {printHtml && (
        <div className="mde-print" aria-hidden="true">
          <Preview html={printHtml.html} meta={printHtml.meta} className="mde-print-preview" />
        </div>
      )}
    </div>
  );
}

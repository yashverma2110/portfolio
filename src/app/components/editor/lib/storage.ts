// localStorage persistence for documents and saved versions.

export type DocMeta = { id: string; title: string; updatedAt: number };
export type Doc = DocMeta & { content: string };
export type Version = { id: string; name: string; createdAt: number; content: string };

const PREFIX = "mdeditor:v1:";
const INDEX_KEY = PREFIX + "index";
export const MAX_VERSIONS = 20;

type Index = { docs: DocMeta[]; currentId: string | null };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Returns false when the browser refused the write (quota or privacy mode). */
function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function loadIndex(): Index {
  const idx = read<Index>("index", { docs: [], currentId: null });
  return { docs: Array.isArray(idx.docs) ? idx.docs : [], currentId: idx.currentId ?? null };
}

export function saveIndex(idx: Index): boolean {
  return write("index", idx);
}

export function loadDoc(id: string): Doc | null {
  return read<Doc | null>("doc:" + id, null);
}

export function saveDoc(doc: Doc): boolean {
  if (!write("doc:" + doc.id, doc)) return false;
  const idx = loadIndex();
  const meta: DocMeta = { id: doc.id, title: doc.title, updatedAt: doc.updatedAt };
  const docs = [meta, ...idx.docs.filter((d) => d.id !== doc.id)];
  return saveIndex({ docs, currentId: doc.id });
}

export function setCurrent(id: string): void {
  const idx = loadIndex();
  saveIndex({ ...idx, currentId: id });
}

export function deleteDoc(id: string): Index {
  try {
    localStorage.removeItem(PREFIX + "doc:" + id);
    localStorage.removeItem(PREFIX + "versions:" + id);
  } catch {
    /* ignore */
  }
  const idx = loadIndex();
  const docs = idx.docs.filter((d) => d.id !== id);
  const next = { docs, currentId: idx.currentId === id ? docs[0]?.id ?? null : idx.currentId };
  saveIndex(next);
  return next;
}

export function loadVersions(docId: string): Version[] {
  const v = read<Version[]>("versions:" + docId, []);
  return Array.isArray(v) ? v : [];
}

export function saveVersions(docId: string, versions: Version[]): boolean {
  return write("versions:" + docId, versions.slice(0, MAX_VERSIONS));
}

export { INDEX_KEY };

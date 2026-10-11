// Validation and naming for uploaded Markdown files.

export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
export const UPLOAD_ACCEPT = ".md,.markdown,.mdx,.txt,text/markdown,text/plain";

const TEXT_EXT = /\.(md|markdown|mdx|mdown|mkd|txt)$/i;

/** Returns an error message, or null when the file can be read as Markdown. */
export function uploadProblem(file: { name: string; type: string; size: number }): string | null {
  const textLike = TEXT_EXT.test(file.name) || /^text\//.test(file.type);
  if (!textLike) return `${file.name} is not a Markdown or text file.`;
  if (file.size > MAX_UPLOAD_BYTES) return `${file.name} is larger than 2 MB.`;
  return null;
}

/** NUL characters mean the file is binary even if the name says otherwise. */
export function looksBinary(text: string): boolean {
  return text.includes("\u0000");
}

export function normalizeNewlines(text: string): string {
  return text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
}

export function titleFromFile(name: string, frontmatterTitle: unknown): string {
  if (typeof frontmatterTitle === "string" && frontmatterTitle.trim()) return frontmatterTitle.trim();
  return name.replace(/\.[^.]+$/, "").trim() || "Untitled";
}

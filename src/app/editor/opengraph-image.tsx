import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/app/lib/og";

export const alt = "Markdown editor by Yash Verma. Write, preview, diff, and export. Runs in your browser.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "Markdown editor", subtitle: "Write, preview, diff, and export. Runs in your browser." });
}

import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/app/lib/og";

export const alt = "Blog. Yash Verma on software and his projects.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "Blog", subtitle: "Yash Verma on software and his projects." });
}

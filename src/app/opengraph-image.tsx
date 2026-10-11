import { POSITIONING, PROFILE } from "@/app/config/profile";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/app/lib/og";

// Homepage link preview card. public/og-image.png stays in the repo for old shares only.
export const alt = POSITIONING.card.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: PROFILE.name, subtitle: POSITIONING.card.headline, body: POSITIONING.card.openTo });
}

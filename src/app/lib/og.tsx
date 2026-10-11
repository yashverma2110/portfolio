// Link preview cards (Open Graph + Twitter) rendered with next/og at build time.
// Same look as public/og-image.png: dark #0e1116, faint math grid, serif title, yellow subtitle.
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Bundled TTFs (satori cannot read woff2 or variable fonts). Licenses sit next to them.
const fontCache = new Map<string, Promise<Buffer>>();
function font(file: string) {
  if (!fontCache.has(file)) fontCache.set(file, fs.readFile(path.join(process.cwd(), "src/app/fonts/og", file)));
  return fontCache.get(file)!;
}

function titleSize(title: string) {
  if (title.length <= 18) return 104;
  if (title.length <= 32) return 84;
  if (title.length <= 52) return 68;
  if (title.length <= 80) return 56;
  return 46;
}

function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export type OgCard = { title: string; subtitle?: string; footer?: string };

export async function ogImage({ title, subtitle, footer }: OgCard) {
  const shortTitle = clip(title, 110);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 84px",
          backgroundColor: "#0e1116",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#f4f1ea",
          fontFamily: "Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Serif",
            fontSize: titleSize(shortTitle),
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            maxWidth: 1032,
          }}
        >
          {shortTitle}
        </div>
        {subtitle && (
          <div style={{ display: "flex", marginTop: 32, fontSize: 36, lineHeight: 1.35, color: "#ffe9a0", maxWidth: 1000 }}>
            {clip(subtitle, 140)}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 56, fontSize: 28, lineHeight: 1.4, color: "#8aa0b8" }}>
          {footer && <div style={{ display: "flex" }}>{clip(footer, 80)}</div>}
          <div style={{ display: "flex" }}>itsyashverma.com</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Serif", data: await font("DejaVuSerif-Bold.ttf"), weight: 700, style: "normal" },
        { name: "Sans", data: await font("LiberationSans-Regular.ttf"), weight: 400, style: "normal" },
      ],
    }
  );
}

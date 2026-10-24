import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { CLOUDFLARE_BEACON, CLOUDFLARE_BEACON_SRC } from "./config/analytics";
import { HOME_DESCRIPTION as description, HOME_TITLE as title } from "./config/home-meta";
import { SITE_URL } from "./config/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Pages set their own full title ("<page> | Yash Verma"), so there is no title template.
// No canonical or og:url here: they would leak to every child page. Each page sets its own.
export const metadata: Metadata = {
  title,
  description,
  keywords: "yash verma, software engineer, product engineer, backend engineer, frontend engineer, full-stack engineer, full stack, react, next.js, node.js, typescript, golang, aws",
  metadataBase: new URL(SITE_URL),
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/blog/rss.xml", title: "Yash Verma's blog" }],
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title,
    description,
    siteName: "Yash Verma",
    // The card comes from opengraph-image.tsx / twitter-image.tsx in this folder.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@we_chat_tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000] text-white selection:bg-blue-500/30`}
      >
        {children}
        {CLOUDFLARE_BEACON ? (
          // afterInteractive is the non-blocking equivalent of Cloudflare's type=module
          // snippet. Leave type unset: Next preloads this URL as a classic script, and
          // type="module" makes the browser download the beacon a second time.
          <Script
            src={CLOUDFLARE_BEACON_SRC}
            strategy="afterInteractive"
            data-cf-beacon={CLOUDFLARE_BEACON}
          />
        ) : null}
      </body>
    </html>
  );
}

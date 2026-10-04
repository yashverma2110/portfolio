import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getTotalYears } from "./utils/experienceUtils";

const years = getTotalYears();

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

const title = "Yash Verma | Software and Product Engineer";
const description = `Software engineer with ${years} of full-time experience. I ship product features, help plan the roadmap, and build the analytics, page speed, and infrastructure behind them. Open to software, product, backend, and frontend roles.`;
const image = "https://itsyashverma.com/og-image.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: "yash verma, software engineer, product engineer, backend engineer, frontend engineer, full stack, react, next.js, node.js, typescript, golang, aws",
  metadataBase: new URL("https://itsyashverma.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itsyashverma.com",
    title,
    description,
    siteName: "Yash Verma",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Yash Verma, software and product engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@we_chat_tech",
    images: [image],
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
      </body>
    </html>
  );
}

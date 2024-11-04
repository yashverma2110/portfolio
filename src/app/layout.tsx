import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Yash Verma | Software Engineer",
  description: "I am a full stack software engineer with a passion for building products, solving problems and implementing creative solutions at scale.",
  keywords: "yash verma, software engineer, full stack, react, next.js, node.js, typescript, javascript, python, sql, nosql, mongodb, postgres, mysql, redis, docker, aws, cloud, devops, infrastructure, creativity, design, user experience, user interface, accessibility, security, testing, CI/CD",
  metadataBase: new URL("https://itsyashverma.com"),
  openGraph: {
    type: 'website',
    locale: "en_US",
    url: "https://itsyashverma.com",
    title: "Yash Verma | Software Engineer",
    description: "Full Stack Software Engineer with expertise in React, Node.js, and Cloud Technologies",
    siteName: "Yash Verma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Verma - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Verma | Software Engineer",
    description: "Full Stack Software Engineer with expertise in React, Vue, Next, Nuxt, Node, Golang, Redis, MongoDB, PostgreSQL, MySQL, Docker, AWS",
    creator: "@we_chat_tech",
    images: ["/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-slate-900 to-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}

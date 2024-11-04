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
  description: "I am a full stack software engineer with a passion for building products that help people.",
  keywords: "yash verma, software engineer, full stack, react, next.js, node.js, typescript, javascript, python, sql, nosql, mongodb, postgres, mysql, redis, docker, aws, cloud, devops, infrastructure, creativity, design, user experience, user interface, accessibility, security, testing, CI/CD",
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

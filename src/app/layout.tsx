import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/lib/scroll-context";
import SceneBackgroundClient from "@/components/3d/SceneBackgroundClient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Hadi | Python & Full Stack Engineer",
  description:
    "Senior Python & Full Stack Engineer specialising in Django, FastAPI, React, Next.js and AI-integrated products. Available for freelance and full-time opportunities.",
  keywords: [
    "Python Developer",
    "Full Stack Engineer",
    "Django",
    "FastAPI",
    "React",
    "Next.js",
    "Backend Developer",
    "AI Integration",
    "Abdul Hadi",
  ],
  authors: [{ name: "Abdul Hadi" }],
  creator: "Abdul Hadi",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Abdul Hadi | Python & Full Stack Engineer",
    description:
      "Senior Python & Full Stack Engineer specialising in Django, FastAPI, React, Next.js and AI-integrated products.",
    siteName: "Abdul Hadi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Hadi | Python & Full Stack Engineer",
    description:
      "Senior Python & Full Stack Engineer specialising in Django, FastAPI, React, Next.js and AI-integrated products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased font-sans">
        <ScrollProvider>
          {/* 3D background — client-only, lazy, behind everything */}
          <SceneBackgroundClient />
          {/* Page content on top */}
          <div className="relative z-10">
            {children}
          </div>
        </ScrollProvider>
      </body>
    </html>
  );
}

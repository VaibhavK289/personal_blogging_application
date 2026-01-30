import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NoiseOverlay } from "@/components/effects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Personal Blog | Thoughts & Ideas",
    template: "%s | Personal Blog"
  },
  description: "A personal blogging platform for writing entries, sharing insights, and summarizing articles. Focused on content creation, organization, and reader engagement.",
  keywords: ["blog", "personal blog", "writing", "articles", "essays", "technology"],
  authors: [{ name: "Blog Author" }],
  creator: "Personal Blog Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Personal Blog | Thoughts & Ideas",
    description: "A personal blogging platform for writing entries, sharing insights, and summarizing articles.",
    siteName: "Personal Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Blog | Thoughts & Ideas",
    description: "A personal blogging platform for writing entries, sharing insights, and summarizing articles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <NoiseOverlay opacity={0.02} />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

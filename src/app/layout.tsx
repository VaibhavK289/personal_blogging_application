import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NoiseOverlay } from "@/components/effects";
import { SmoothScrollProvider } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
    default: "VK Blog | Thoughts & Ideas",
    template: "%s | VK Blog"
  },
  description: "A personal blog by Vaibhav Kumar Kandhway - exploring technology, design, and creative ideas.",
  keywords: ["blog", "personal blog", "technology", "design", "web development", "Vaibhav Kandhway"],
  authors: [{ name: "Vaibhav Kumar Kandhway" }],
  creator: "Vaibhav Kumar Kandhway",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "VK Blog | Thoughts & Ideas",
    description: "A personal blog by Vaibhav Kumar Kandhway - exploring technology, design, and creative ideas.",
    siteName: "VK Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "VK Blog | Thoughts & Ideas",
    description: "A personal blog by Vaibhav Kumar Kandhway - exploring technology, design, and creative ideas.",
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
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-background`}
      >
        <SmoothScrollProvider>
          <NoiseOverlay opacity={0.015} />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}

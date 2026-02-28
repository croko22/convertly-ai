import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Convertly AI",
    default: "Convertly AI - Generate High-Converting Landing Pages",
  },
  description:
    "Convertly AI automatically generates high-converting, professional landing pages for your courses and infoproducts in seconds using YouTube videos or text descriptions.",
  keywords: [
    "landing page generator",
    "AI landing pages",
    "course sales page",
    "infoproduct creator",
    "marketing automation",
    "Convertly AI",
  ],
  authors: [{ name: "Convertly AI Team" }],
  creator: "Convertly AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://convertly.ai",
    title: "Convertly AI - Generate High-Converting Landing Pages",
    description:
      "Generate beautiful, high-converting landing pages for your courses in seconds. Just paste a YouTube link or a description.",
    siteName: "Convertly AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertly AI - AI Landing Page Generator",
    description:
      "Generate beautiful, high-converting landing pages for your courses in seconds using AI.",
    creator: "@convertlyai",
  },
};

import { ClerkProvider } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const isSubdomain = !!headersList.get("x-subdomain");
  const pathname = headersList.get("x-invoke-path") || headersList.get("x-url") || "";
  const isDashboardRoute = pathname.startsWith("/landings") || pathname.startsWith("/trash") || pathname.startsWith("/settings");

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/30 dark:selection:text-blue-200`}
        >
          {(!isSubdomain && !isDashboardRoute) ? <Header /> : null}
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

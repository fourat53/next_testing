import type { Metadata } from "next";

import { Geist, Geist_Mono, Oxanium } from "next/font/google";

import ThemeButton from "@/components/buttons/theme-button";
import ThemeProvider from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

import "./globals.css";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Testing",
  description: "Test Next.js new features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        oxanium.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        <ThemeProvider>
          {children}
          <div className="fixed top-5 right-5">
            <ThemeButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import ThemeToggle from "@/components/buttons/theme-toggle";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
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
      <body className="min-h-full flex flex-col bg-background text-foreground p-5">
        <ThemeProvider>
          {children}
          <div className="fixed top-3.5 right-3.5">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

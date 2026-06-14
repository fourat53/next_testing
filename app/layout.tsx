import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { KindeProvider } from "@/providers/kinde-provider";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import Background from "@/components/ui/background";

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
        "h-screen w-screen overflow-hidden overscroll-none",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        oxanium.variable,
      )}
    >
      <body className="h-screen w-screen overflow-hidden overscroll-none text-foreground">
        <KindeProvider>
          <ThemeProvider>
            <Background>{children}</Background>
            <div className="fixed top-3.5 right-3.5 z-50">
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </KindeProvider>
      </body>
    </html>
  );
}

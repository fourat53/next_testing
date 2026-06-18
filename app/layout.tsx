import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import { KindeProvider } from "@/providers/kinde-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AutoTitle } from "@/components/title/AutoTitle";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        oxanium.variable,
      )}
    >
      <body className="min-h-screen text-foreground bg-sidebar">
        <KindeProvider>
          <ThemeProvider>
            <TooltipProvider>
              <AutoTitle />
              <SidebarLayout>{children}</SidebarLayout>
            </TooltipProvider>
          </ThemeProvider>
        </KindeProvider>
      </body>
    </html>
  );
}

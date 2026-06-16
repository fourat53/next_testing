import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { KindeProvider } from "@/providers/kinde-provider";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import Background from "@/components/background/background";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/sidebar/AdminSidebar";

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
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        oxanium.variable,
      )}
    >
      <body className="min-h-screen text-foreground">
        <KindeProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Background />
              <div className="p-(--p-layout)">
                <SidebarProvider>
                  <SidebarInset className="relative rounded-4xl bg-mist-100 dark:bg-mist-900">
                    <AdminSidebar />
                    {children}
                  </SidebarInset>
                </SidebarProvider>
              </div>
              <div className="fixed z-50 top-3.75 right-3.75">
                <ThemeToggle />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </KindeProvider>
      </body>
    </html>
  );
}

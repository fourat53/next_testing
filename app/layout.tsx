import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { KindeProvider } from "@/providers/kinde-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
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
              <SidebarProvider>
                <AdminSidebar />
                <SidebarInset
                  className="bg-[linear-gradient(45deg,var(--chart-1)_10%,var(--sidebar)_100%)] 
                dark:bg-[linear-gradient(-135deg,var(--sidebar)_10%,var(--sidebar-accent)_100%)] 
                p-(--p-layout) border-l border-l-mist-300 dark:border-l-mist-900 rounded-l-4xl"
                >
                  <div className="h-[calc(100vh-(var(--p-layout)*2))] bg-sidebar rounded-4xl">
                    {children}
                  </div>
                </SidebarInset>
              </SidebarProvider>
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

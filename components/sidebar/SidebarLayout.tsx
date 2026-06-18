import AdminSidebar from "@/components/sidebar/AdminSidebar";
import { DocumentTitle } from "@/components/title/DocumentTitle";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ThemeToggle from "../buttons/theme-toggle";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="p-2 rounded-l-4xl bg-sidebar">
        <div className="w-full p-(--p-layout) border border-mist-300 dark:border-mist-700 rounded-4xl bg-chart-1 dark:bg-sidebar-accent">
          <div className="h-[calc(100vh-(var(--p-layout)*2)-1.25rem)] bg-sidebar rounded-3xl border border-mist-300 dark:border-mist-700">
            <div className="p-2.5 flex items-center justify-between">
              <div className="text-xl font-semibold text-chart-2 flex items-center gap-2">
                <SidebarTrigger size="lg" className="size-7.5 rounded-xl" />
                <DocumentTitle />
              </div>
              <ThemeToggle />
            </div>
            <div className="border-b border-mist-200 dark:border-mist-700" />
            <div className="h-188 p-4 overflow-y-auto">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

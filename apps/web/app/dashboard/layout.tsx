import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@pouch/ui/components/sidebar";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
// import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardSidebarHeader } from "@/components/layout/dashboard-sidebar-header";

export const metadata: Metadata = {
  title: "Pouch | Dashboard"
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-svh">
      <DashboardSidebar variant="inset" />
      <SidebarInset className="md:border border-border overflow-hidden">
        <DashboardSidebarHeader />
        <div className="flex flex-col h-full">
          <main className="h-[calc(100svh-50px)] md:h-[calc(100svh-48px-20px)] scroll-bar-hidden overflow-y-hidden overflow-x-hidden">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { Metadata } from "next";
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
    <SidebarProvider>
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <DashboardSidebarHeader />
        <div className="flex w-full flex-col h-full overflow-hidden">
          <main className="h-[calc(100svh-50px)] md:h-[calc(100svh-48px-18px)] scroll-bar-hidden overflow-y-scroll">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

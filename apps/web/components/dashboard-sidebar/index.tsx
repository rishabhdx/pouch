import Link from "next/link";
import { type ComponentProps, Suspense } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@pouch/ui/components/sidebar";
import { UserDropdown } from "@/components/user-dropdown";

import { FolderOpen } from "lucide-react";
import { StaticSidebarGroup } from "./static-group";
import { DynamicSidebarGroup } from "./dynamic-group";
import { SidebarGroupsLoadingState } from "../loading-states/sidebar-groups";
import { HugeiconsIcon } from "@hugeicons/react";
import { Folder01FreeIcons } from "@hugeicons/core-free-icons";

export async function DashboardSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-base font-semibold">Pouch</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Suspense fallback={<SidebarGroupsLoadingState />}>
            <StaticSidebarGroup />
          </Suspense>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="hover:underline gap-2" asChild>
            <Link href="/dashboard/collections">
              {/* <FolderOpen className="size-3 shrink-0 text-muted-foreground" /> */}
              <HugeiconsIcon
                icon={Folder01FreeIcons}
                color="currentColor"
                // size={12}
                // className="size-3"
                aria-hidden="true"
              />
              Collections
            </Link>
          </SidebarGroupLabel>
          <Suspense fallback={<SidebarGroupsLoadingState />}>
            <DynamicSidebarGroup />
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

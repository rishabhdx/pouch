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
import { StaticSidebarGroup } from "@/components/dashboard-sidebar/static-group";
import { DynamicSidebarGroup } from "@/components/dashboard-sidebar/dynamic-group";
import { SidebarGroupsLoadingState } from "@/components/loading-states/sidebar-groups";
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
              <HugeiconsIcon
                icon={Folder01FreeIcons}
                color="currentColor"
                className="size-3"
                aria-hidden="true"
              />
              Collections
            </Link>
          </SidebarGroupLabel>
          <Suspense fallback={<SidebarGroupsLoadingState />}>
            <DynamicSidebarGroup />
          </Suspense>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarGroupLabel className="hover:underline gap-2" asChild>
            <Link href="/dashboard/tags">
              <HugeiconsIcon
                icon={TagsIcon}
                color="currentColor"
                className="size-3"
                aria-hidden="true"
              />
              Tags
            </Link>
          </SidebarGroupLabel>
          <Suspense fallback={<SidebarGroupsLoadingState />}>
            <DynamicSidebarGroup />
          </Suspense>
        </SidebarGroup> */}
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

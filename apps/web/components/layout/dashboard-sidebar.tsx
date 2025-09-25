"use client";

import * as React from "react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@pouch/ui/components/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub
} from "@pouch/ui/components/sidebar";
import {
  Archive,
  BadgeCheck,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Cloud,
  CreditCard,
  File,
  FolderClosed,
  FolderOpen,
  Heart,
  LogOut,
  Sparkles
} from "lucide-react";
import { sidebarData } from "@/constants/sample-data";
import { UserDropdown } from "@/components/user-dropdown";

function Tree({
  item
}: {
  item: {
    name: string;
    slug: string;
    count: number;
    nested?: { name: string; slug: string; count: number }[];
  };
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.nested && item.nested.length > 0) {
    return (
      <SidebarMenuItem>
        <Collapsible
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                {isOpen ? (
                  <FolderOpen className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <FolderClosed className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className="truncate">{item.name}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="transition-transform" />
              ) : (
                <ChevronDown className="transition-transform" />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="pr-0">
              {item.nested.map((nestedItem, index) => (
                <Tree key={index} item={nestedItem} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={`/dashboard/collections/${item.slug}`}>
          {/* {item.icon ? <item.icon /> : <File />} */}
          {item.name}
        </Link>
      </SidebarMenuButton>
      <SidebarMenuBadge className="font-mono text-muted-foreground">
        {item.count}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
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
          {/* <SidebarGroupLabel>Items</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.main.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/${item.slug}`}>
                      {item.icon ? <item.icon /> : <File />}
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="font-mono text-muted-foreground">
                    {item.count}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="hover:underline gap-2" asChild>
            <Link href="/dashboard/collections">
              <FolderOpen className="size-3 shrink-0 text-muted-foreground" />
              Collections
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.collections.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
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

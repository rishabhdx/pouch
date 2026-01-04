"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from "@pouch/ui/components/sidebar";
import { Archive, Cloud, Heart } from "lucide-react";

type GroupItemProps = {
  label: string;
  icon?: "cloud" | "heart" | "archive";
  href: string;
  count?: number;
};

const iconMap = {
  cloud: Cloud,
  heart: Heart,
  archive: Archive
};

export function GroupItem({ label, icon, href, count = 0 }: GroupItemProps) {
  const pathname = usePathname();
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === href}>
        <Link href={href}>
          {IconComponent && (
            <IconComponent
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          )}
          {label}
        </Link>
      </SidebarMenuButton>
      <SidebarMenuBadge className="font-mono text-muted-foreground">
        {count}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}

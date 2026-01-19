"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from "@pouch/ui/components/sidebar";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

type GroupItemProps = {
  label: string;
  href: string;
  count?: number;
  icon?: IconSvgElement;
};

export function GroupItem({ label, icon, href, count = 0 }: GroupItemProps) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === href} className="py-3">
        <Link href={href}>
          {icon && (
            <HugeiconsIcon
              icon={icon}
              color="currentColor"
              strokeWidth={1.5}
              className="size-4 text-foreground"
              aria-hidden="true"
            />
          )}
          {label}
        </Link>
      </SidebarMenuButton>
      <SidebarMenuBadge className="font-mono text-muted-foreground font-medium bg-input/50">
        {count}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}

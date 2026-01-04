"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";

import { Avatar, AvatarFallback } from "@pouch/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@pouch/ui/components/sidebar";
import { Skeleton } from "@pouch/ui/components/skeleton";
import { authClient } from "@pouch/auth/client";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Palette,
  Settings,
  Sparkles,
  User
} from "lucide-react";
import { useTheme } from "next-themes";

function getInitials(fullName: string): string | null {
  if (!fullName || fullName.trim().length === 0) {
    return null;
  }

  return fullName
    .trim()
    .split(" ")
    .reduce((initials, word) => {
      if (word.length > 0) {
        initials += (word[0] ?? "").toUpperCase();
      }
      return initials;
    }, "");
}

function ThemeToggle() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-2">
        <Palette className="size-4 text-muted-foreground" aria-hidden="true" />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={value => setTheme(value)}
          >
            {themes.map((t, index) => (
              <DropdownMenuRadioItem key={index} value={t}>
                {_.capitalize(t)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

export function UserDropdown() {
  const router = useRouter();

  const { isMobile } = useSidebar();
  const session = authClient.useSession();

  if (session.isPending) {
    return (
      <div className="flex items-center space-x-2 border border-border rounded-md py-1 px-2">
        <Skeleton className="h-9 w-9 rounded-full bg-muted-foreground shrink-0" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-3 w-full bg-muted-foreground" />
          <Skeleton className="h-3 w-full bg-muted-foreground" />
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          }
        }
      });
    });
  };

  const initials = getInitials(session.data?.user.name ?? "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-border"
        >
          {initials ? (
            <Avatar className="h-8 w-8 rounded-lg border border-border">
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-8 w-8 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground">
              <User className="size-4" aria-hidden="true" />
            </div>
          )}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {session.data?.user.name ?? ""}
            </span>
            <span className="truncate text-xs">
              {session.data?.user.email ?? ""}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {initials ? (
              <Avatar className="h-8 w-8 rounded-lg border border-border">
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-8 w-8 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground">
                <User className="size-4" aria-hidden="true" />
              </div>
            )}
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session.data?.user.name ?? ""}
              </span>
              <span className="truncate text-xs">
                {session.data?.user.email ?? ""}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={true}>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" aria-hidden="true" />
                Upgrade to Pro
              </div>
              {/* <Badge variant="secondary">Coming soon!</Badge> */}
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="size-4" aria-hidden="true" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-4" aria-hidden="true" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <ThemeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => handleSignOut()}
          className="font-medium data-[variant=destructive]:bg-destructive/25 data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:text-destructive-foreground! dark:data-[variant=destructive]:focus:bg-destructive/50"
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

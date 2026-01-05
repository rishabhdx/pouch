import { Separator } from "@pouch/ui/components/separator";
import { SidebarTrigger } from "@pouch/ui/components/sidebar";
import { AddNewButton } from "@/components/add-new-button";
import { SearchBox } from "@/components/search";
import { NavigationPath } from "@/components/navigation-path";
import { HugeiconsIcon } from "@hugeicons/react";
import { SidebarLeftIcon } from "@hugeicons/core-free-icons";

export function DashboardSidebarHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-3 lg:gap-2 lg:px-6">
        <SidebarTrigger
          className="-ml-1"
          icon={
            <HugeiconsIcon
              icon={SidebarLeftIcon}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
        />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <NavigationPath />
        <div className="ml-auto flex items-center gap-2">
          <SearchBox />
          {/* <SignOutButton /> */}
          <AddNewButton />
        </div>
      </div>
    </header>
  );
}

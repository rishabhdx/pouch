"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { type Collection } from "@pouch/db/schema";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub
} from "@pouch/ui/components/sidebar";

type ItemTreeProps = {
  item: Pick<Collection, "name" | "slug" | "id" | "bookmarkCount">;
};

export function ItemsTree({ item }: ItemTreeProps) {
  // Dumping code here in I want to add nested collections later

  // if (item.nested && item.nested.length > 0) {
  //   return (
  //     <SidebarMenuItem>
  //       <Collapsible
  //         className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
  //         open={isOpen}
  //         onOpenChange={setIsOpen}
  //       >
  //         <CollapsibleTrigger asChild>
  //           <SidebarMenuButton className="justify-between">
  //             <div className="flex items-center gap-2 overflow-hidden">
  //               {isOpen ? (
  //                 <FolderOpen className="size-4 shrink-0 text-muted-foreground" />
  //               ) : (
  //                 <FolderClosed className="size-4 shrink-0 text-muted-foreground" />
  //               )}
  //               <span className="truncate">{item.name}</span>
  //             </div>
  //             {isOpen ? (
  //               <ChevronUp className="transition-transform" />
  //             ) : (
  //               <ChevronDown className="transition-transform" />
  //             )}
  //           </SidebarMenuButton>
  //         </CollapsibleTrigger>
  //         <CollapsibleContent>
  //           <SidebarMenuSub className="pr-0">
  //             {item.nested.map((nestedItem, index) => (
  //               <ItemsTree key={index} item={nestedItem} />
  //             ))}
  //           </SidebarMenuSub>
  //         </CollapsibleContent>
  //       </Collapsible>
  //     </SidebarMenuItem>
  //   );
  // }

  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={pathname === `/dashboard/collections/${item.slug}`}
      >
        <Link href={`/dashboard/collections/${item.slug}`}>
          {/* {item.icon ? <item.icon /> : <File />} */}
          {item.name}
        </Link>
      </SidebarMenuButton>
      <SidebarMenuBadge className="font-mono text-muted-foreground font-medium bg-input/50">
        {item.bookmarkCount}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}

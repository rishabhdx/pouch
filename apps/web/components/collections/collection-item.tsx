"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistance, subDays } from "date-fns";
import { enIN } from "date-fns/locale";

import { type Collection } from "@pouch/db/schema";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import { ConfirmationDialog } from "@/components/bookmarks/confirmation-dialog";
import { Button, buttonVariants } from "@pouch/ui/components/button";
import { cn } from "@pouch/ui/lib/utils";

import {
  Ellipsis,
  FolderClosed,
  FolderOpen,
  Info,
  MoreHorizontal,
  MoreVertical,
  Trash2
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Folder01FreeIcons } from "@hugeicons/core-free-icons";

interface CollectionItemProps {
  collection: Collection;
}

export const CollectionItem = ({ collection }: CollectionItemProps) => {
  return (
    <Link
      key={collection.id}
      href={`/dashboard/collections/${collection.slug}`}
      className={cn(
        "p-4 rounded-xl border bg-card hover:bg-accent/25 transition-all cursor-pointer group block"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="size-10 rounded-lg flex items-center justify-center bg-secondary/50">
          {/* <FolderClosed className="size-5 text-foreground/75" /> */}
          <HugeiconsIcon
            icon={Folder01FreeIcons}
            color="currentColor"
            className="size-5 text-foreground/75"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={e => e.preventDefault()}
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="font-medium truncate mb-0.5">{collection.name}</p>
      <p className="text-xs text-muted-foreground">
        <span className="font-mono font-medium">10</span> items
      </p>
      {/* <p className="text-xs text-muted-foreground">
        Last added
        {formatDistance(
          subDays(new Date(collection.updatedAt), 3),
          new Date(),
          {
            addSuffix: true,
            locale: enIN
          }
        )}
      </p> */}
    </Link>
  );
};

// export const CollectionItem = ({ item }: CollectionItemProps) => {
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//   return (
//     <div className="relative">
//       <Link
//         href={`/dashboard/collections/${item.slug}`}
//         className={cn(
//           buttonVariants({ variant: "outline" }),
//           "w-full h-40 flex flex-col items-center justify-center gap-2"
//         )}
//       >
//         <FolderOpen className="size-16" aria-hidden="true" strokeWidth={1} />
//         <p className="text-lg font-medium">{item.name}</p>
//         <p className="font-medium text-xs">X items</p>
//       </Link>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="outline"
//             size="icon-sm"
//             className="absolute top-2 right-2"
//             aria-label="More Options"
//           >
//             <MoreHorizontal className="size-4" aria-hidden="true" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuGroup>
//             <DropdownMenuItem>
//               <Info className="size-4" aria-hidden="true" />
//               Info
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               variant="destructive"
//               onClick={() => setShowDeleteDialog(true)}
//             >
//               <Trash2 />
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <ConfirmationDialog
//         open={showDeleteDialog}
//         onOpenChange={setShowDeleteDialog}
//         title={`Delete ${item.name} collection`}
//         description="Are you sure you want to delete this collection? All the bookmarks inside will be moved to Unsorted."
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// };

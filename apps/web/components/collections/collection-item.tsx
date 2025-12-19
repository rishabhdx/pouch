"use client";

import Link from "next/link";

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
  FolderOpen,
  Info,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { useState } from "react";

interface CollectionItemProps {
  item: Collection;
}

export const CollectionItem = ({ item }: CollectionItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="relative">
      <Link
        href={`/dashboard/collections/${item.slug}`}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full h-40 flex flex-col items-center justify-center gap-2"
        )}
      >
        <FolderOpen className="size-16" aria-hidden="true" strokeWidth={1} />
        <p className="text-lg font-medium">{item.name}</p>
        <p className="font-medium text-xs">X items</p>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            className="absolute top-2 right-2"
            aria-label="More Options"
          >
            <MoreHorizontal className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Info className="size-4" aria-hidden="true" />
              Info
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title={`Delete ${item.name} collection`}
        description="Are you sure you want to delete this collection? All the bookmarks inside will be moved to Unsorted."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

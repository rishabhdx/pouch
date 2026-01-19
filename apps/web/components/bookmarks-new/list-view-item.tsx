"use client";

import { useState } from "react";
import { formatDistance, subDays } from "date-fns";
import { enIN } from "date-fns/locale";

import PlaceholderImage from "@/public/placeholder.svg";
import {
  type BookmarkWithCollection,
  type Bookmark,
  type BookmarkWithCollectionAndTags
} from "@pouch/db/schema";
import { Badge } from "@pouch/ui/components/badge";
import { Button } from "@pouch/ui/components/button";
import { ButtonGroup } from "@pouch/ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import { ConfirmationDialog } from "@/components/bookmarks/confirmation-dialog";

import {
  Archive,
  FolderSymlink,
  Heart,
  MailCheck,
  MoreHorizontal,
  Tags,
  Trash2
} from "lucide-react";
import { Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ListViewItemProps = {
  item: Bookmark | BookmarkWithCollection | BookmarkWithCollectionAndTags;
  hideActions?: boolean;
};

export function ListViewItem({ item, hideActions = false }: ListViewItemProps) {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    title,
    url,
    ogImage,
    documentDescription,
    createdAt,
    faviconUrl,
    domain
  } = item;

  return (
    <div className="w-full flex gap-4">
      <div className="aspect-video relative w-48 h-27 shrink-0">
        <img
          src={ogImage || PlaceholderImage.src}
          alt={title}
          role="img"
          loading="lazy"
          className="w-full h-full rounded-md border border-border"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-baseline gap-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline line-clamp-1 cursor-pointer"
            title={title}
          >
            {title}
          </a>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {documentDescription}
        </p>
        {/* {bookmarksToTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {bookmarksToTags.map(({ tag }) => (
              // <TagBadge key={tag.id} className="rounded-full font-semibold">
              //   {tag.name}
              // </TagBadge>
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
                  "bg-cyan-500/10 text-cyan-500"
                )}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )} */}

        {/* {bookmarksToTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {bookmarksToTags.slice(0, 2).map(({ tag }) => (
              // <TagBadge key={tag.id} className="rounded-full font-semibold">
              //   {tag.name}
              // </TagBadge>
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded text-[12px] font-medium",
                  "bg-cyan-500/10 text-cyan-500"
                )}
              >
                {tag.name}
              </span>
            ))}
            {bookmarksToTags.length > 2 && (
              <span
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded text-[12px] font-medium font-mono",
                  "bg-cyan-500/10 text-cyan-500"
                )}
              >
                +{bookmarksToTags.length - 2}
              </span>
            )}
          </div>
        )} */}

        {/* <div className="flex-1"></div> */}

        <div className="mt-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground">
              {faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={domain || "favicon"}
                  className="size-3 mr-1 rounded-sm"
                  aria-hidden="true"
                />
              ) : (
                <HugeiconsIcon
                  icon={Globe02Icon}
                  // className="size-4 mr-1"
                  aria-hidden="true"
                />
              )}
              {domain}
            </Badge>
            {/* {bookmarksToTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {bookmarksToTags.slice(0, 2).map(({ tag }) => (
                  // <TagBadge key={tag.id} className="rounded-full font-semibold">
                  //   {tag.name}
                  // </TagBadge>
                  <span
                    key={tag.id}
                    className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded text-[12px] font-medium",
                      "bg-cyan-500/10 text-cyan-500"
                    )}
                  >
                    {tag.name}
                  </span>
                ))}
                {bookmarksToTags.length > 2 && (
                  <span
                    className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded text-[12px] font-medium font-mono",
                      "bg-cyan-500/10 text-cyan-500"
                    )}
                  >
                    +{bookmarksToTags.length - 2}
                  </span>
                )}
              </div>
            )} */}
            {/* {collection && (
              <>
                <Badge variant="secondary" className="rounded-full">
                  <Folder className="size-4 mr-1" aria-hidden="true" />
                  {collection.name}
                </Badge>
                <Dot
                  className="size-3 text-muted-foreground"
                  aria-hidden="true"
                />
              </>
            )} */}
            <time
              dateTime={new Date(createdAt).toISOString()}
              className="text-xs text-muted-foreground"
            >
              Added{" "}
              {formatDistance(subDays(new Date(createdAt), 3), new Date(), {
                addSuffix: true,
                locale: enIN
              })}
            </time>
          </div>

          {!hideActions && (
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Heart className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowArchiveDialog(true)}
              >
                <Archive className="size-4" aria-hidden="true" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="More Options"
                  >
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <MailCheck />
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FolderSymlink />
                      Move to
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tags />
                      Edit tags
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowArchiveDialog(true)}
                    >
                      <Archive />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
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
            </ButtonGroup>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={showArchiveDialog}
        onOpenChange={setShowArchiveDialog}
        title="Archive Bookmark"
        description="Are you sure you want to archive this bookmark?"
        confirmText="Archive"
        cancelText="Cancel"
      />

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Bookmark"
        description="Are you sure you want to delete this bookmark?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

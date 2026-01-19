"use client";

import { memo, useState, useTransition } from "react";
import { type Row } from "@tanstack/react-table";
import { formatDistance, subDays } from "date-fns";
import { enIN } from "date-fns/locale";

import {
  toggleFavorite,
  toggleArchive,
  deleteBookmark
} from "@/app/actions/bookmarks";
import { Button } from "@pouch/ui/components/button";
import { ButtonGroup } from "@pouch/ui/components/button-group";
import { type BookmarkWithCollection } from "@pouch/db/schema";
import PlaceholderImage from "@/public/placeholder.svg";
import { Badge } from "@pouch/ui/components/badge";
import { ConfirmationDialog } from "@/components/bookmarks/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Archive03Icon,
  CopyLinkIcon,
  Delete02Icon,
  FavouriteIcon,
  FolderExportIcon,
  Globe02Icon,
  LinkSquare02Icon,
  TagsIcon,
  MoreHorizontalIcon
} from "@hugeicons/core-free-icons";
import { cn } from "@pouch/ui/lib/utils";

export const ListViewItem = memo(function ({
  row
}: {
  row: Row<BookmarkWithCollection>;
}) {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    id,
    title,
    url,
    ogImage,
    documentDescription,
    createdAt,
    domain,
    faviconUrl,
    isFavorite,
    bookmarksToTags
  } = row.original;

  const handleToggleFavorite = () => {
    startTransition(async () => {
      const result = await toggleFavorite(id);
      if (!result.success) {
        console.error("Failed to toggle favorite:", result.error);
      }
    });
  };

  const handleToggleArchive = () => {
    startTransition(async () => {
      const result = await toggleArchive(id);
      if (result.success) {
        setShowArchiveDialog(false);
      } else {
        console.error("Failed to toggle archive:", result.error);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBookmark(id);
      if (result.success) {
        setShowDeleteDialog(false);
      } else {
        console.error("Failed to delete bookmark:", result.error);
      }
    });
  };

  return (
    <div className="w-full flex gap-4">
      <div className="aspect-video relative max-w-64 w-full h-36 shrink-0">
        <img
          src={ogImage || PlaceholderImage.src}
          alt={title}
          role="img"
          loading="lazy"
          className="w-full h-full rounded-md border border-border object-cover"
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        {/* {bookmarksToTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {bookmarksToTags.map(({ tag }) => (
              <Badge
                variant="outline"
                key={tag.id}
                className="rounded-full font-medium"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )} */}

        <div className="flex justify-between items-baseline gap-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg hover:underline line-clamp-1 cursor-pointer max-w-3xl"
            title={title}
          >
            {title}
          </a>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1 max-w-2xl">
          {documentDescription}
        </p>
        {bookmarksToTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {bookmarksToTags.map(({ tag }) => (
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center px-2.5 py-px rounded-full text-[12px] font-medium",
                  "bg-cyan-300/10 text-cyan-500 border border-cyan-400/20"
                )}
              >
                {tag.name}
              </span>
            ))}
            {/* {bookmarksToTags.length > 2 && (
              <span
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded text-[12px] font-medium font-mono",
                  "bg-cyan-500/10 text-cyan-500"
                )}
              >
                +{bookmarksToTags.length - 2}
              </span>
            )} */}
          </div>
        )}

        <div className="mt-auto" />

        {/* <div className="flex-1"></div> */}

        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
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
          </div>

          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle Favorite"
              onClick={handleToggleFavorite}
              disabled={isPending}
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                color="currentColor"
                strokeWidth={1.5}
                className={cn("size-4", isFavorite && "fill-current")}
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowArchiveDialog(true)}
              aria-label="Archive Bookmark"
              disabled={isPending}
            >
              <HugeiconsIcon
                icon={Archive03Icon}
                color="currentColor"
                strokeWidth={1.5}
                className="size-4"
                aria-hidden="true"
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="More Options">
                  <HugeiconsIcon
                    icon={MoreHorizontalIcon}
                    color="currentColor"
                    strokeWidth={1.5}
                    className="size-4"
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      icon={LinkSquare02Icon}
                      className="size-4"
                      aria-hidden="true"
                    />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      icon={FolderExportIcon}
                      className="size-4"
                      aria-hidden="true"
                    />
                    Move to
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      icon={TagsIcon}
                      className="size-4"
                      aria-hidden="true"
                    />
                    Edit tags
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      icon={CopyLinkIcon}
                      className="size-4"
                      aria-hidden="true"
                    />
                    Copy URL
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      className="size-4"
                      aria-hidden="true"
                    />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </div>

      <ConfirmationDialog
        open={showArchiveDialog}
        onOpenChange={setShowArchiveDialog}
        title="Archive Bookmark"
        description="Are you sure you want to archive this bookmark?"
        confirmText="Archive"
        cancelText="Cancel"
        onConfirm={handleToggleArchive}
        isPending={isPending}
      />

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Bookmark"
        description="Are you sure you want to delete this bookmark?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </div>
  );
});

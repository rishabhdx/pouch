"use client";

import { useState } from "react";
import { type Row } from "@tanstack/react-table";
import { formatDistance, subDays } from "date-fns";
import { enIN } from "date-fns/locale";

import PlaceholderImage from "@/public/placeholder.svg";

import { type BookmarkWithCollection } from "@pouch/db/schema";
import { Button } from "@pouch/ui/components/button";
import { Badge } from "@pouch/ui/components/badge";
import {
  Archive,
  Dot,
  Folder,
  FolderSymlink,
  Heart,
  MailCheck,
  MoreHorizontal,
  Tags,
  Trash2
} from "lucide-react";
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
import { TagBadge } from "@pouch/ui/components/web/tag-badge";

export const GridViewItem = ({ row }: { row: Row<BookmarkWithCollection> }) => {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    title,
    url,
    ogImage,
    bookmarksToTags,
    domain,
    documentDescription,
    collection,
    collectionId,
    isFavorite,
    isArchived,
    createdAt
  } = row.original;

  return (
    <div className="w-full flex flex-col gap-2 overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={ogImage || PlaceholderImage.src}
          alt={title}
          role="img"
          loading="lazy"
          className="w-full h-full rounded-md border border-border"
        />

        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 rounded-full cursor-pointer dark:bg-input dark:border-input/30 dark:hover:bg-input"
          aria-label={isFavorite ? "Remove from Favorite" : "Add to Favorite"}
        >
          {isFavorite ? (
            <Heart className="size-4" aria-hidden="true" />
          ) : (
            <Heart className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {collection && (
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
          )}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full size-6"
              aria-label="More Options"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
                <MailCheck />
                Mark as Read
              </DropdownMenuItem> */}
              <DropdownMenuItem>
                <FolderSymlink />
                Move to
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tags />
                Edit tags
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowArchiveDialog(true)}>
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
      </div>

      <div className="flex justify-between items-baseline gap-1">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold tracking-tight text-xl hover:underline line-clamp-2 cursor-pointer"
          title={title}
        >
          {title}
        </a>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {documentDescription}
      </p>

      {bookmarksToTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {bookmarksToTags.map(({ tag }) => (
            <TagBadge key={tag.id} className="rounded-full font-mono">
              {tag.name}
            </TagBadge>
          ))}
        </div>
      )}

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
};

export const OldGridViewItem = ({
  row
}: {
  row: Row<BookmarkWithCollection>;
}) => {
  const {
    title,
    url,
    ogImage,
    bookmarksToTags,
    domain,
    documentDescription,
    collection,
    collectionId,
    isFavorite,
    isArchived,
    createdAt
  } = row.original;

  return (
    <div className="w-full border border-border rounded-md shadow-sm bg-card flex flex-col overflow-hidden">
      <div className="bg-accent aspect-video flex items-center justify-center relative">
        <img
          src={ogImage || PlaceholderImage.src}
          alt={title}
          role="img"
          loading="lazy"
          className="object-cover w-full h-full"
        />
        {/* {isFavorite ? (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 rounded-full dark:bg-input/50 cursor-pointer"
            aria-label="Remove from Favorite"
          >
            <HeartOff className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 rounded-full dark:bg-input/50 cursor-pointer"
            aria-label="Add to Favorite"
          >
            <Heart className="size-4" aria-hidden="true" />
          </Button>
        )} */}
      </div>
      <div className="flex-1 p-4 flex flex-col gap-2">
        {/* <div className="flex justify-between items-center text-muted-foreground">
          {domain ? (
            <Badge variant="outline" className="px-2 py-1 gap-1 text-muted-foreground">
              <Globe aria-hidden="true" />
              <span>{domain}</span>
            </Badge>
          ) : (
            <div />
          )}
          <span className="font-mono text-xs tracking-tight">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
        </div> */}
        <div className="flex justify-between items-baseline gap-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg hover:underline line-clamp-2 cursor-pointer"
            title={title}
          >
            {title}
          </a>
          {/* {collection && <Badge variant="secondary">{collection.name}</Badge>} */}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {documentDescription}
        </p>
        {bookmarksToTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {bookmarksToTags.map(({ tag }) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="rounded-full font-mono"
              >
                {tag.name}
              </Badge>
              // <span
              //   key={tag.id}
              //   className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
              // >
              //   {tag.name}
              // </span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <ButtonGroup className="w-full justify-between">
            <ButtonGroup>
              <Button size="sm" variant="outline">
                <Heart />
                Favorite
              </Button>
              {/* <Button size="sm" variant="outline">
                <Archive />
                Archive
              </Button> */}
            </ButtonGroup>

            <ButtonGroup>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full"
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
                    {/* <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

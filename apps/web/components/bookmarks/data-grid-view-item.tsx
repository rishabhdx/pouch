import { type Row } from "@tanstack/react-table";
import { type BookmarkWithCollection } from "@pouch/db/schema";

import PlaceholderImage from "@/public/placeholder.svg";

import { Button } from "@pouch/ui/components/button";
import { Badge } from "@pouch/ui/components/badge";
import {
  Archive,
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

export const GridViewItem = ({ row }: { row: Row<BookmarkWithCollection> }) => {
  const {
    title,
    url,
    ogImage,
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
          {collection && <Badge variant="secondary">{collection.name}</Badge>}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {documentDescription}
        </p>
        {/* <div className="flex flex-wrap gap-1 mt-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div> */}

        <div className="mt-auto">
          <ButtonGroup className="w-full justify-between">
            <ButtonGroup>
              <Button size="sm" variant="outline">
                <Heart />
                Favorite
              </Button>
              <Button size="sm" variant="outline">
                <Archive />
                Archive
              </Button>
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

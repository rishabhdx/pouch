"use client";

import { type Table as TanstackTable, type Row } from "@tanstack/react-table";
import { Button } from "@pouch/ui/components/button";
import { Bookmark, BookmarkWithCollection } from "@pouch/db/schema";

import PlaceholderImage from "@/public/placeholder.svg";
import { Badge } from "@pouch/ui/components/badge";
import { Globe } from "lucide-react";

const GridItem = ({ row }: { row: Row<BookmarkWithCollection> }) => {
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
      <div className="bg-accent h-48 flex items-center justify-center">
        <img
          src={ogImage || PlaceholderImage.src}
          alt={title}
          role="img"
          loading="lazy"
          className="object-cover h-full w-full"
        />
        {/* <span className="text-4xl">{isFavorite ? "⭐" : "🔗"}</span> */}
      </div>
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex-1 flex justify-between items-baseline gap-1">
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
        <div className="flex justify-between items-center text-muted-foreground">
          {domain ? (
            <div className="flex items-center gap-1 text-sm">
              <Globe className="size-4" aria-hidden="true" />
              <span>{domain}</span>
            </div>
          ) : (
            <div />
          )}
          <span className="font-mono text-xs tracking-tight">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export function BookmarksDataGridView({
  table
}: {
  table: TanstackTable<BookmarkWithCollection>;
}) {
  return (
    <div className="">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => {
            return <GridItem key={row.id} row={row} />;
          })
        ) : (
          <div>No results</div>
        )}
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

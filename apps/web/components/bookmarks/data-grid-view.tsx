"use client";

import { type Table as TanstackTable, type Row } from "@tanstack/react-table";
import { Button } from "@pouch/ui/components/button";
import { Bookmark } from "@pouch/db/schema";

const GridItem = ({ row }: { row: Row<Bookmark> }) => {
  const { name, url, domain, isFavorite, isArchived, createdAt } = row.original;

  return (
    <div className="w-full border border-border rounded-md shadow-sm bg-card flex flex-col overflow-hidden">
      <div className="bg-accent h-32 flex items-center justify-center">
        <span className="text-4xl">{isFavorite ? "⭐" : "🔗"}</span>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-lg text-blue-600 hover:underline line-clamp-2"
          title={name}
        >
          {name}
        </a>
        <div className="text-sm text-muted-foreground truncate">{domain}</div>
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
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>{isArchived ? "Archived" : "Active"}</span>
          <span>{new Date(createdAt).toDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export function BookmarksDataGridView({
  table
}: {
  table: TanstackTable<Bookmark>;
}) {
  return (
    <div className="">
      <div className="w-full grid grid-cols-4 gap-4">
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

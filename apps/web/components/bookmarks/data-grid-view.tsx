"use client";

import { type Table as TanstackTable, type Row } from "@tanstack/react-table";
import { Button } from "@pouch/ui/components/button";
import { type BookmarkWithCollection } from "@pouch/db/schema";

import { GridViewItem } from "@/components/bookmarks/data-grid-view-item";

// https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/686f72

export function BookmarksDataGridView({
  table
}: {
  table: TanstackTable<BookmarkWithCollection>;
}) {
  return (
    <div className="">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => {
            return <GridViewItem key={row.id} row={row} />;
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

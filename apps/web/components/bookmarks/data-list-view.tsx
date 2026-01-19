"use client";

import { type Table as TanstackTable } from "@tanstack/react-table";

import { type BookmarkWithCollectionAndTags } from "@pouch/db/schema";
import { ListViewItem } from "@/components/bookmarks/data-list-view-item";
import { DataTablePagination } from "@/components/bookmarks/pagination";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

export function BookmarksDataListView({
  table
}: {
  table: TanstackTable<BookmarkWithCollectionAndTags>;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map(row => {
          return <ListViewItem key={row.id} row={row} />;
        })
      ) : (
        <div>No results</div>
      )}
      <DataTablePagination table={table} />
    </div>
  );

  // return (
  //   <div>
  //     <div className="rounded-md border border-border">
  //       <Table>
  //         <TableHeader>
  //           {table.getHeaderGroups().map(headerGroup => (
  //             <TableRow key={headerGroup.id}>
  //               {headerGroup.headers.map(header => {
  //                 return (
  //                   <TableHead key={header.id}>
  //                     {header.isPlaceholder
  //                       ? null
  //                       : flexRender(
  //                           header.column.columnDef.header,
  //                           header.getContext()
  //                         )}
  //                   </TableHead>
  //                 );
  //               })}
  //             </TableRow>
  //           ))}
  //         </TableHeader>
  //         <TableBody>
  //           {table.getRowModel().rows?.length ? (
  //             table.getRowModel().rows.map(row => (
  //               <TableRow
  //                 key={row.id}
  //                 data-state={row.getIsSelected() && "selected"}
  //               >
  //                 {row.getVisibleCells().map(cell => (
  //                   <TableCell
  //                     key={cell.id}
  //                     className={
  //                       cell.column.id === "title" || cell.column.id === "url"
  //                         ? "truncate block max-w-sm"
  //                         : ""
  //                     }
  //                   >
  //                     {flexRender(
  //                       cell.column.columnDef.cell,
  //                       cell.getContext()
  //                     )}
  //                   </TableCell>
  //                 ))}
  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell
  //                 colSpan={table.getAllColumns().length}
  //                 className="h-24 text-center"
  //               >
  //                 No results.
  //               </TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </div>
  //     <div className="flex items-center justify-end space-x-2 py-4">
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         onClick={() => table.previousPage()}
  //         disabled={!table.getCanPreviousPage()}
  //       >
  //         Previous
  //       </Button>
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         onClick={() => table.nextPage()}
  //         disabled={!table.getCanNextPage()}
  //       >
  //         Next
  //       </Button>
  //     </div>
  //   </div>
  // );
}

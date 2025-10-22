import { type Table } from "@tanstack/react-table";
import { Columns3Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@pouch/ui/components/dropdown-menu";
import { Button } from "@pouch/ui/components/button";
import { type BookmarkWithCollection } from "@pouch/db/schema";

export function ListViewOptions({
  table
}: {
  table: Table<BookmarkWithCollection>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Columns3Icon className="size-4" aria-hidden="true" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

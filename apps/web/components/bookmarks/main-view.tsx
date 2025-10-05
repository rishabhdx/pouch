"use client";

import { useEffect, useState, useMemo } from "react";
import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsBoolean
} from "nuqs";
import {
  ColumnDef,
  VisibilityState,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
  Row
} from "@tanstack/react-table";

import { BookmarksDataListView } from "@/components/bookmarks/data-list-view";
import { BookmarksDataGridView } from "@/components/bookmarks/data-grid-view";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@pouch/ui/components/tabs";
import { ArrowUpDown, Columns3, LayoutGrid } from "lucide-react";
import { SearchInput } from "@/components/bookmarks/search-input";
import { Button } from "@pouch/ui/components/button";
import { ListViewOptions } from "@/components/bookmarks/list-view-options";
import { FiltersSheet } from "@/components/bookmarks/filters-sheet";
import { BookmarksEmptyState } from "@/components/empty-states/bookmarks";
import { type Bookmark } from "@pouch/db/schema";
import { useSearchParams } from "next/navigation";

const collectionsFilterFunction: FilterFn<Bookmark> = (
  row: Row<Bookmark>,
  columnId: string,
  filterValue: string[],
  addMeta: (meta: any) => void
) => {
  const collectionId = row.original.collectionId;

  if (!filterValue || filterValue.length === 0 || !collectionId) {
    return false;
  }

  return filterValue.includes(collectionId);
};

export const columns: ColumnDef<Bookmark>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <a
        href={row.original.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {row.original.title}
      </a>
    )
  },
  {
    accessorKey: "collectionId",
    header: "Collection",
    cell: ({ row }) => row.original.collectionId || "No Collection",
    filterFn: collectionsFilterFunction
  },
  // {
  //   accessorKey: "tags",
  //   header: "Tags",
  //   cell: ({ row }) => row.original.tags.join(", ")
  // },
  {
    accessorKey: "domain",
    header: "Domain"
  },
  {
    accessorKey: "isFavorite",
    header: "Favorite",
    // accessorFn: row => (row.isFavorite ? "⭐" : ""),
    cell: ({ row }) => (row.original.isFavorite ? "Yes" : "No")
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (row.original.isArchived ? "Yes" : "No")
  },
  {
    accessorKey: "createdAt",
    // header: "Created At",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  }
];

interface BookmarksViewProps {
  data: Bookmark[];
  preappliedFilters?: {
    favorite?: boolean;
    archived?: boolean;
    collections?: string[];
    tags?: string[];
  };
}

export function BookmarksView({ data, preappliedFilters }: BookmarksViewProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 12 //default page size
  });
  const [layoutView, setLayoutView] = useState<string>("grid");

  const searchParams = useSearchParams();

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination
    }
  });

  const [title, setTitle] = useQueryState(
    "title",
    parseAsString.withDefault("")
  );
  const [favorite, setFavorite] = useQueryState(
    "favorite",
    parseAsBoolean.withDefault(preappliedFilters?.favorite ?? false)
  );
  const [archived, setArchived] = useQueryState(
    "archived",
    parseAsBoolean.withDefault(preappliedFilters?.archived ?? false)
  );
  const [collections, setCollections] = useQueryState(
    "collections",
    parseAsArrayOf(parseAsString, ";").withDefault(
      preappliedFilters?.collections ?? []
    )
  );
  const [tags, setTags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString, ";").withDefault(
      preappliedFilters?.tags ?? []
    )
  );

  const filterMappings = useMemo(
    () => [
      {
        queryParam: "title",
        columnId: "title",
        transform: (value: string | null) => value || ""
      },
      {
        queryParam: "favorite",
        columnId: "isFavorite",
        transform: (value: string | null) => (value === "true" ? true : false)
      },
      {
        queryParam: "archived",
        columnId: "isArchived",
        transform: (value: string | null) => (value === "true" ? true : false)
      },
      {
        queryParam: "collections",
        columnId: "collectionId",
        transform: (value: string | null) => value?.split(";") || []
      }
    ],
    []
  );

  useEffect(() => {
    // Reset all filters once
    table.resetColumnFilters();

    filterMappings.forEach(({ queryParam, columnId, transform }) => {
      const paramValue = searchParams.get(queryParam);
      if (paramValue) {
        const filterValue = transform(paramValue);
        table.getColumn(columnId)?.setFilterValue(filterValue);
      }
    });
  }, [searchParams, table, filterMappings]);

  if (data.length === 0) {
    return <BookmarksEmptyState />;
  }

  return (
    <div className="w-full">
      <Tabs defaultValue={layoutView} onValueChange={setLayoutView}>
        <div className="w-full flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="grid" aria-label="Grid layout">
                <LayoutGrid className="size-4" aria-hidden="true" />
              </TabsTrigger>
              <TabsTrigger value="list" aria-label="List layout">
                <Columns3 className="size-4" aria-hidden="true" />
              </TabsTrigger>
            </TabsList>
            <SearchInput value={title} setValue={setTitle} />
          </div>
          <div className="flex items-center gap-2">
            {layoutView === "list" && <ListViewOptions table={table} />}
            <FiltersSheet
              table={table}
              favorite={favorite}
              setFavorite={setFavorite}
              archived={archived}
              setArchived={setArchived}
              collections={collections}
              setCollections={setCollections}
              isCollectionsDisabled={
                preappliedFilters?.collections?.length ? true : false
              }
              tags={tags}
              setTags={setTags}
            />
          </div>
        </div>
        <TabsContent value="grid">
          <BookmarksDataGridView table={table} />
        </TabsContent>
        <TabsContent value="list">
          <BookmarksDataListView table={table} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

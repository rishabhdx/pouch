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
import {
  ArrowUpDown,
  Columns3,
  FolderOpen,
  Globe,
  Heart,
  LayoutGrid
} from "lucide-react";
import { SearchInput } from "@/components/bookmarks/search-input";
import { Button } from "@pouch/ui/components/button";
import { ListViewOptions } from "@/components/bookmarks/list-view-options";
import { FiltersSheet } from "@/components/bookmarks/filters-sheet";
import { BookmarksEmptyState } from "@/components/empty-states/bookmarks";
import { type BookmarkWithCollection } from "@pouch/db/schema";
import { useSearchParams } from "next/navigation";
import { Badge } from "@pouch/ui/components/badge";

const collectionsFilterFunction: FilterFn<BookmarkWithCollection> = (
  row: Row<BookmarkWithCollection>,
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

export const columns: ColumnDef<BookmarkWithCollection>[] = [
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
    header: () => (
      <div className="flex items-center gap-2">
        <FolderOpen className="size-4" aria-hidden="true" />
        Collection
      </div>
    ),
    cell: ({ row }) => {
      if (!row.original.collection) return null;

      return <Badge variant="secondary">{row.original.collection.name}</Badge>;
    },
    filterFn: collectionsFilterFunction
  },
  // {
  //   accessorKey: "tags",
  //   header: "Tags",
  //   cell: ({ row }) => row.original.tags.join(", ")
  // },
  {
    accessorKey: "domain",
    header: () => (
      <div className="flex items-center gap-2">
        <Globe className="size-4" aria-hidden="true" />
        Domain
      </div>
    )
  },
  {
    accessorKey: "isFavorite",
    header: () => (
      <div className="flex items-center gap-2">
        <Heart className="size-4" aria-hidden="true" />
        Favorite
      </div>
    ),
    // accessorFn: row => (row.isFavorite ? "⭐" : ""),
    cell: ({ row }) => {
      return row.original.isFavorite ? (
        <Heart className="size-4 fill-foreground" aria-hidden="true" />
      ) : null;
    }
  },
  {
    accessorKey: "url",
    header: () => (
      <div className="flex items-center gap-2">
        <Globe className="size-4" aria-hidden="true" />
        URL
      </div>
    ),
    cell: ({ row }) => (
      <a
        href={row.original.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline max-w-[18rem] block truncate"
      >
        {row.original.url}
      </a>
    )
  },
  // {
  //   accessorKey: "isArchived",
  //   header: "Archived",
  //   cell: ({ row }) => (row.original.isArchived ? "Yes" : "No")
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="pl-4 font-mono text-sm tracking-tight">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </p>
    )
  }
];

interface BookmarksViewProps {
  data: BookmarkWithCollection[];
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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    isFavorite: false,
    domain: false,
    url: false
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 12 // default page size
  });
  const [layoutView, setLayoutView] = useState<string>("grid");

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );

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
      globalFilter: searchQuery,
      columnVisibility,
      pagination
    }
  });

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
      },
      {
        queryParam: "q",
        columnId: "",
        transform: (value: string | null) => value || ""
      }
    ],
    []
  );

  useEffect(() => {
    // Reset all filters once
    table.resetColumnFilters();
    table.resetGlobalFilter();

    filterMappings.forEach(({ queryParam, columnId, transform }) => {
      const paramValue = searchParams.get(queryParam);

      if (!paramValue) return;

      if (queryParam !== "q") {
        const filterValue = transform(paramValue);
        table.getColumn(columnId)?.setFilterValue(filterValue);
      }

      if (queryParam === "q") {
        const filterValue = transform(paramValue);
        table.setGlobalFilter(filterValue);
      }
    });
  }, [searchParams, table, filterMappings]);

  if (data.length === 0) {
    return <BookmarksEmptyState />;
  }

  return (
    <div className="max-w-full overflow-x-hidden">
      <Tabs defaultValue={layoutView} onValueChange={setLayoutView}>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 w-full">
            <TabsList>
              <TabsTrigger value="grid" aria-label="Grid layout">
                <LayoutGrid className="size-4" aria-hidden="true" />
              </TabsTrigger>
              <TabsTrigger value="list" aria-label="List layout">
                <Columns3 className="size-4" aria-hidden="true" />
              </TabsTrigger>
            </TabsList>
            <SearchInput value={searchQuery} setValue={setSearchQuery} />
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
          {/* <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            <div className="relative">
              <img
                className="w-full h-48 object-cover object-center"
                src="https://images.unsplash.com/photo-1499750310159-5254f3615481?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Article Cover"
              />

              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-indigo-800 shadow-sm backdrop-blur-sm">
                  <svg
                    className="mr-1.5 h-2 w-2 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Tech Trends
                </span>
              </div>
            </div>

            <div className="p-5">
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
              >
                The Future of AI in Modern Design
              </a>

              <p className="mt-2 text-slate-500 text-sm line-clamp-3">
                Explore how artificial intelligence is reshaping the way we
                approach user interface patterns and the ethical implications of
                automated content generation.
              </p>

              <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors group/fav">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover/fav:fill-current group-hover/fav:stroke-none transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium">Favorite</span>
                </button>

                <div className="relative">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open options</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>

                  <div className="hidden absolute right-0 bottom-full mb-2 w-36 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Archive
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <BookmarksDataGridView table={table} />
        </TabsContent>
        <TabsContent value="list">
          <BookmarksDataListView table={table} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

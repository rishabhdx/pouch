"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type FilterFn,
  type Row
} from "@tanstack/react-table";

import { BookmarksDataListView } from "@/components/bookmarks/data-list-view";
import { BookmarksEmptyState } from "@/components/empty-states/bookmarks";
import { type BookmarkWithCollectionAndTags } from "@pouch/db/schema";

const collectionsFilterFunction: FilterFn<BookmarkWithCollectionAndTags> = (
  row: Row<BookmarkWithCollectionAndTags>,
  columnId: string,
  filterValue: string[],
  addMeta: (meta: any) => void
) => {
  const collectionSlug = row.original.collection?.slug;

  if (!filterValue || filterValue.length === 0 || !collectionSlug) {
    return false;
  }

  return filterValue.includes(collectionSlug);
};

const tagsFilterFunction: FilterFn<BookmarkWithCollectionAndTags> = (
  row: Row<BookmarkWithCollectionAndTags>,
  columnId: string,
  filterValue: string[],
  addMeta: (meta: any) => void
) => {
  const tagSlugs = row.original.bookmarksToTags?.map(btt => btt.tag.slug);

  if (
    !filterValue ||
    filterValue.length === 0 ||
    !tagSlugs ||
    tagSlugs.length === 0
  ) {
    return false;
  }

  // Check if any value in filterValue array exists in tagSlugs array
  return filterValue.some(value => tagSlugs.includes(value));
};

export const columns: ColumnDef<BookmarkWithCollectionAndTags>[] = [
  {
    accessorKey: "tags",
    accessorFn: row => row.bookmarksToTags.map(btt => btt.tag.slug),
    filterFn: tagsFilterFunction
  },
  {
    accessorKey: "title",
    header: "Title"
    // cell: ({ row }) => (
    //   <a
    //     href={row.original.url}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="text-blue-600 hover:underline"
    //   >
    //     {row.original.title}
    //   </a>
    // )
  },
  {
    accessorKey: "collectionId",
    filterFn: collectionsFilterFunction
    // header: () => (
    //   <div className="flex items-center gap-2">
    //     <FolderOpen className="size-4" aria-hidden="true" />
    //     Collection
    //   </div>
    // ),
    // cell: ({ row }) => {
    //   if (!row.original.collection) return null;

    //   return <Badge variant="secondary">{row.original.collection.name}</Badge>;
    // },
  },
  // {
  //   accessorKey: "tags",
  //   header: "Tags",
  //   cell: ({ row }) => row.original.tags.join(", ")
  // },
  {
    accessorKey: "domain"
    // header: () => (
    //   <div className="flex items-center gap-2">
    //     <Globe className="size-4" aria-hidden="true" />
    //     Domain
    //   </div>
    // )
  },
  {
    accessorKey: "isFavorite"
    // header: () => (
    //   <div className="flex items-center gap-2">
    //     <Heart className="size-4" aria-hidden="true" />
    //     Favorite
    //   </div>
    // ),
    // // accessorFn: row => (row.isFavorite ? "⭐" : ""),
    // cell: ({ row }) => {
    //   return row.original.isFavorite ? (
    //     <Heart className="size-4 fill-foreground" aria-hidden="true" />
    //   ) : null;
    // }
  },
  {
    accessorKey: "url"
    // header: () => (
    //   <div className="flex items-center gap-2">
    //     <Globe className="size-4" aria-hidden="true" />
    //     URL
    //   </div>
    // ),
    // cell: ({ row }) => (
    //   <a
    //     href={row.original.url}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="text-blue-600 hover:underline max-w-[18rem] block truncate"
    //   >
    //     {row.original.url}
    //   </a>
    // )
  },
  {
    accessorKey: "isArchived",
    header: "Archived"
    // cell: ({ row }) => (row.original.isArchived ? "Yes" : "No")
  },
  {
    accessorKey: "createdAt"
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       className=""
    //     >
    //       Created At
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    // cell: ({ row }) => (
    //   <p className="pl-4 font-mono text-sm tracking-tight">
    //     {new Date(row.original.createdAt).toLocaleDateString()}
    //   </p>
    // )
  }
];

interface BookmarksViewProps {
  data: BookmarkWithCollectionAndTags[];
  preappliedFilters?: {
    favorite?: boolean;
    archived?: boolean;
    collections?: string[];
    tags?: string[];
  };
}

export function BookmarksView({ data }: BookmarksViewProps) {
  // const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
  //   isFavorite: false,
  //   domain: false,
  //   url: false,
  // });
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0, // initial page index
  //   pageSize: 12 // default page size
  // });
  // const [layoutView, setLayoutView] = useState<string>("list");

  const searchParams = useSearchParams();

  const sorting = useMemo<SortingState>(() => {
    const sortParam = searchParams.get("sort");

    if (!sortParam) return [];

    try {
      return JSON.parse(sortParam);
    } catch {
      return [];
    }
  }, [searchParams]);

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];

    const favorite = searchParams.get("favorite");
    if (favorite === "true") {
      filters.push({ id: "isFavorite", value: true });
    }

    const archived = searchParams.get("archived");
    if (archived === "true") {
      filters.push({ id: "isArchived", value: true });
    }

    const collections = searchParams.get("collections");
    if (collections) {
      filters.push({ id: "collectionId", value: collections.split(";") });
    }

    const tags = searchParams.get("tags");
    if (tags) {
      filters.push({ id: "tags", value: tags.split(";") });
    }

    return filters;
  }, [searchParams]);

  const globalFilter = useMemo(() => {
    return searchParams.get("q") || "";
  }, [searchParams]);

  const pagination = useMemo(
    () => ({
      pageIndex: 0,
      pageSize: 12
    }),
    []
  );

  // const tableState = useMemo(() => {
  //   const filters: ColumnFiltersState = [];

  //   // Build filters from URL
  //   const favorite = searchParams.get("favorite");
  //   if (favorite === "true") {
  //     filters.push({ id: "isFavorite", value: true });
  //   }

  //   const archived = searchParams.get("archived");
  //   if (archived === "true") {
  //     filters.push({ id: "isArchived", value: true });
  //   }

  //   const collections = searchParams.get("collections");
  //   if (collections) {
  //     filters.push({ id: "collectionId", value: collections.split(";") });
  //   }

  //   return {
  //     sorting: searchParams.get("sort")
  //       ? JSON.parse(searchParams.get("sort")!)
  //       : [],
  //     columnFilters: filters,
  //     globalFilter: searchParams.get("q") || "",
  //     // columnVisibility,
  //     pagination,
  //   };
  // }, [searchParams, pagination]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onPaginationChange: setPagination,
    // state: tableState,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    },
    state: {
      sorting,
      columnFilters,
      globalFilter
      // columnVisibility
    }
  });

  // const filterMappings = useMemo(
  //   () => [
  //     {
  //       queryParam: "title",
  //       columnId: "title",
  //       transform: (value: string | null) => value || ""
  //     },
  //     {
  //       queryParam: "favorite",
  //       columnId: "isFavorite",
  //       transform: (value: string | null) => (value === "true" ? true : false)
  //     },
  //     {
  //       queryParam: "archived",
  //       columnId: "isArchived",
  //       transform: (value: string | null) => (value === "true" ? true : false)
  //     },
  //     {
  //       queryParam: "collections",
  //       columnId: "collectionId",
  //       transform: (value: string | null) => value?.split(";") || []
  //     },
  //     {
  //       queryParam: "q",
  //       columnId: "",
  //       transform: (value: string | null) => value || ""
  //     },
  //     {
  //       queryParam: "tags",
  //       columnId: "tags",
  //       transform: (value: string | null) => value?.split(";") || []
  //     },
  //     {
  //       queryParam: "sort",
  //       columnId: "",
  //       transform: (value: string | null) => (value ? JSON.parse(value) : [])
  //     }
  //   ],
  //   []
  // );

  // useEffect(() => {
  //   // Reset all filters once
  //   table.resetColumnFilters();
  //   table.resetGlobalFilter();

  //   filterMappings.forEach(({ queryParam, columnId, transform }) => {
  //     const paramValue = searchParams.get(queryParam);

  //     if (!paramValue) return;

  //     if (queryParam !== "q" && queryParam !== "sort") {
  //       const filterValue = transform(paramValue);
  //       table.getColumn(columnId)?.setFilterValue(filterValue);
  //     }

  //     if (queryParam === "sort") {
  //       const filterValue = transform(paramValue);
  //       setSorting(filterValue);
  //     }

  //     if (queryParam === "q") {
  //       const filterValue = transform(paramValue);
  //       table.setGlobalFilter(filterValue);
  //     }
  //   });
  // }, [searchParams, filterMappings]);

  if (data.length === 0) {
    return <BookmarksEmptyState />;
  }

  // console.log(table.getState().sorting); // access the sorting state from the table instance

  return (
    <div className="w-full h-full overflow-hidden pt-2 pb-4">
      <section className="h-full overflow-y-auto pr-4">
        <BookmarksDataListView table={table} />
      </section>
    </div>
  );

  // return (
  //   <div className="max-w-full max-h-full overflow-hidden">
  //     <Tabs
  //       defaultValue={layoutView}
  //       onValueChange={setLayoutView}
  //       className="h-full"
  //     >
  //       <div className="flex items-center justify-between py-4">
  //         <div className="flex items-center gap-2 w-full">
  //           <TabsList className="bg-background border border-input p-px">
  //             <TabsTrigger
  //               value="grid"
  //               aria-label="Grid layout"
  //               className="data-[state=active]:bg-muted dark:data-[state=active]:bg-input dark:data-[state=active]:border-transparent h-full"
  //             >
  //               <LayoutGrid className="size-4" aria-hidden="true" />
  //             </TabsTrigger>
  //             <TabsTrigger
  //               value="list"
  //               aria-label="List layout"
  //               className="data-[state=active]:bg-muted dark:data-[state=active]:bg-input dark:data-[state=active]:border-transparent h-full"
  //             >
  //               <Columns3 className="size-4" aria-hidden="true" />
  //             </TabsTrigger>
  //           </TabsList>
  //           {/* <SearchInput value={searchQuery} setValue={setSearchQuery} /> */}
  //         </div>
  //         {/* <div className="flex items-center gap-2">
  //           {layoutView === "list" && <ListViewOptions table={table} />}
  //           <FiltersSheet
  //             table={table}
  //             favorite={favorite}
  //             setFavorite={setFavorite}
  //             archived={archived}
  //             setArchived={setArchived}
  //             collections={collections}
  //             setCollections={setCollections}
  //             isCollectionsDisabled={
  //               preappliedFilters?.collections?.length ? true : false
  //             }
  //             tags={tags}
  //             setTags={setTags}
  //           />
  //         </div> */}
  //       </div>
  //       <TabsContent value="grid" className="h-full overflow-y-auto pr-4">
  //         <BookmarksDataGridView table={table} />
  //       </TabsContent>
  //       <TabsContent value="list" className="h-full overflow-y-auto pr-4">
  //         <BookmarksDataListView table={table} />
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  // );
}

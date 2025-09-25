"use client";

import { useEffect, useState } from "react";
import { type Table } from "@tanstack/react-table";
import { Button } from "@pouch/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@pouch/ui/components/sheet";
import { Settings2 } from "lucide-react";
import { CollectionsSheetFilter } from "@/components/bookmarks/collections-sheet-filter";
import { TagsSheetFilter } from "@/components/bookmarks/tags-sheet-filter";
import { Separator } from "@pouch/ui/components/separator";
import { ArchivedSheetFilter } from "@/components/bookmarks/archived-sheet-filter";
import { FavouritesSheetFilter } from "@/components/bookmarks/favourites-sheet-filter";
import { useSearchParams } from "next/navigation";
import { type Bookmark } from "@pouch/db/schema";

interface FilterSheetProps {
  table: Table<Bookmark>;
  favorite: boolean | null;
  setFavorite: (value: boolean | null) => void;
  archived: boolean | null;
  setArchived: (value: boolean | null) => void;
  collections: string[];
  setCollections: (value: string[]) => void;
  isCollectionsDisabled?: boolean;
  tags: string[];
  setTags: (value: string[]) => void;
}

export function FiltersSheet({
  table,
  favorite,
  setFavorite,
  archived,
  setArchived,
  collections,
  setCollections,
  isCollectionsDisabled,
  tags,
  setTags
}: FilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  // console.log("searchParams", searchParams.toString());

  // const [favorite, setFavorite] = useQueryState(
  //   "favorite",
  //   parseAsBoolean.withDefault(false)
  // );
  // const [archived, setArchived] = useQueryState(
  //   "archived",
  //   parseAsBoolean.withDefault(false)
  // );
  // const [collections, setCollections] = useQueryState(
  //   "collections",
  //   parseAsArrayOf(parseAsString).withDefault([])
  // );
  // const [tags, setTags] = useQueryState(
  //   "tags",
  //   parseAsArrayOf(parseAsString).withDefault([])
  // );

  // useEffect(() => {
  //   const keys = Array.from(searchParams.keys());

  //   table.resetColumnFilters();
  //   // console.log(table.getColumn("isFavorite")?.getFilterValue());
  //   // console.log(table.getColumn("isArchived")?.getFilterValue());

  //   // console.log("keys", keys);

  //   keys.forEach(key => {
  //     console.log(`${key}: ${searchParams.get(key)}`);

  //     switch (key) {
  //       case "favorite": {
  //         const fav = searchParams.get("favorite") === "true" ? true : null;
  //         table.getColumn("isFavorite")?.setFilterValue(fav);
  //         break;
  //       }
  //       case "archived": {
  //         const arch = searchParams.get("archived") === "true" ? true : null;
  //         table.getColumn("isArchived")?.setFilterValue(arch);
  //         break;
  //       }
  //     }
  //   });
  // }, [searchParams]);

  // const handleFavouritesChange = (value: boolean | null) => {
  //   if (!value) {
  //     setFavorite(null);
  //     // table.getColumn("isFavorite")?.setFilterValue(null);
  //     return;
  //   }

  //   setFavorite(value);
  //   // table.getColumn("isFavorite")?.setFilterValue(value);
  // };

  // const handleArchiveChange = (value: boolean | null) => {
  //   if (!value) {
  //     setArchived(null);
  //     // table.getColumn("isArchived")?.setFilterValue(null);
  //     return;
  //   }

  //   setArchived(value);
  //   // table.getColumn("isArchived")?.setFilterValue(value);
  // };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Settings2 className="size-4" aria-hidden="true" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Adjust the filters for your bookmarks here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min px-4">
          <FavouritesSheetFilter value={favorite} setValue={setFavorite} />
          <Separator />
          <ArchivedSheetFilter value={archived} setValue={setArchived} />
          <Separator />
          <CollectionsSheetFilter
            value={collections}
            setValue={setCollections}
            isCollectionsDisabled={isCollectionsDisabled}
          />
          <Separator />
          <TagsSheetFilter value={tags} setValue={setTags} />
        </div>
        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

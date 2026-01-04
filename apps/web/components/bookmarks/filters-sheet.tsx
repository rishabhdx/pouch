"use client";

import { memo, useState } from "react";

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
import { CollectionsSheetFilter } from "@/components/bookmarks/collections-sheet-filter";
import { TagsSheetFilter } from "@/components/bookmarks/tags-sheet-filter";
import { Separator } from "@pouch/ui/components/separator";
import { ArchivedSheetFilter } from "@/components/bookmarks/archived-sheet-filter";
import { FavoritesSheetFilter } from "@/components/bookmarks/favorites-sheet-filter";

import { Settings2 } from "lucide-react";

interface FilterSheetProps {
  favorite: boolean | null;
  setFavorite: (value: boolean | null) => void;
  archived: boolean | null;
  setArchived: (value: boolean | null) => void;
  collections: string[];
  setCollections: (value: string[]) => void;
  isCollectionsDisabled?: boolean;
  tags: string[];
  setTags: (value: string[]) => void;
  allCollections: { id: string; name: string; slug: string }[];
  allTags: { id: string; name: string; slug: string }[];
}

export const FiltersSheet = memo(function FiltersSheet({
  favorite,
  setFavorite,
  archived,
  setArchived,
  collections,
  setCollections,
  isCollectionsDisabled,
  tags,
  setTags,
  allCollections,
  allTags
}: FilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          <FavoritesSheetFilter value={favorite} setValue={setFavorite} />
          <Separator />
          <ArchivedSheetFilter value={archived} setValue={setArchived} />
          <Separator />
          <CollectionsSheetFilter
            value={collections}
            setValue={setCollections}
            isCollectionsDisabled={isCollectionsDisabled}
            allCollections={allCollections}
          />
          <Separator />
          <TagsSheetFilter value={tags} setValue={setTags} allTags={allTags} />
        </div>
        <SheetFooter>
          <Button variant="destructive" type="submit">
            Clear all filters
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

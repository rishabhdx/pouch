"use client";

import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsBoolean
} from "nuqs";

import { SearchInput } from "@/components/bookmarks/search-input";
import { FiltersSheet } from "@/components/bookmarks/filters-sheet";

type BookmarkOptionsProps = {
  initialQuery: string;
  initialFavorite: boolean;
  initialArchived: boolean;
  initialCollections: string[];
  initialTags: string[];
};

export function BookmarkOptions({
  initialQuery,
  initialFavorite,
  initialArchived,
  initialCollections,
  initialTags
}: BookmarkOptionsProps) {
  console.log({
    initialQuery,
    initialFavorite,
    initialArchived,
    initialCollections,
    initialTags
  });

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault(initialQuery)
  );
  const [favorite, setFavorite] = useQueryState(
    "favorite",
    parseAsBoolean.withDefault(initialFavorite)
  );
  const [archived, setArchived] = useQueryState(
    "archived",
    parseAsBoolean.withDefault(initialArchived)
  );
  const [collections, setCollections] = useQueryState(
    "collections",
    parseAsArrayOf(parseAsString, ";").withDefault(initialCollections)
  );
  const [tags, setTags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString, ";").withDefault(initialTags)
  );

  console.log({ favorite, archived, collections, tags });

  return (
    <div className="flex-1 inline-flex items-center justify-end gap-4">
      <SearchInput value={searchQuery} setValue={setSearchQuery} />
      <FiltersSheet
        favorite={favorite}
        setFavorite={setFavorite}
        archived={archived}
        setArchived={setArchived}
        collections={collections}
        setCollections={setCollections}
        isCollectionsDisabled={false}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
}

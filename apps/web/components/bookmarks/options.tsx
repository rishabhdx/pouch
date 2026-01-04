"use client";

import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsBoolean,
  parseAsJson
} from "nuqs";

import { SearchInput } from "@/components/bookmarks/search-input";
import { FiltersSheet } from "@/components/bookmarks/filters-sheet";
import { SortBy } from "@/components/bookmarks/sort-by";
import z from "zod";

type BookmarkOptionsProps = {
  initialQuery: string;
  initialFavorite: boolean;
  initialArchived: boolean;
  initialCollections: string[];
  initialTags: string[];
  initialSort: { id: string; desc: boolean }[];
  allCollections: { id: string; name: string; slug: string }[];
  allTags: { id: string; name: string; slug: string }[];
};

const sortSchema = z.array(
  z.object({
    id: z.string(),
    desc: z.boolean()
  })
);

export function BookmarkOptions({
  initialQuery,
  initialFavorite,
  initialArchived,
  initialCollections,
  initialTags,
  initialSort,
  allCollections,
  allTags
}: BookmarkOptionsProps) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault(initialQuery)
  );
  const [favorite, setFavorite] = useQueryState(
    "favorite",
    parseAsBoolean.withDefault(initialFavorite ?? false)
  );
  const [archived, setArchived] = useQueryState(
    "archived",
    parseAsBoolean.withDefault(initialArchived ?? false)
  );
  const [collections, setCollections] = useQueryState(
    "collections",
    parseAsArrayOf(parseAsString, ";").withDefault(initialCollections ?? [])
  );
  const [tags, setTags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString, ";").withDefault(initialTags ?? [])
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsJson(sortSchema).withDefault(initialSort ?? [])
  );

  return (
    <div className="flex-1 inline-flex items-center justify-end gap-4">
      <SearchInput value={searchQuery} setValue={setSearchQuery} />
      <SortBy value={sort} setValue={setSort} />
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
        allCollections={allCollections}
        allTags={allTags}
      />
    </div>
  );
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type BookmarkWithCollection } from "@pouch/db/schema";
import { ListViewItem } from "@/components/bookmarks-new/list-view-item";

type MainViewProps = {
  data: BookmarkWithCollection[];
};

export function MainView({ data }: MainViewProps) {
  return (
    <div className="max-w-full max-h-full overflow-hidden">
      <section className="h-full overflow-y-auto pr-4">
        <div className="w-full h-full flex flex-col space-y-6">
          {data.map(item => (
            <ListViewItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

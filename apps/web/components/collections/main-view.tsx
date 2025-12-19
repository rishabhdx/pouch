import { type Collection } from "@pouch/db/schema";

import { CollectionItem } from "@/components/collections/collection-item";

interface CollectionsViewProps {
  data: Collection[];
}

export function CollectionsView({ data }: CollectionsViewProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map(collection => (
        <CollectionItem key={collection.id} item={collection} />
      ))}
    </div>
  );
}

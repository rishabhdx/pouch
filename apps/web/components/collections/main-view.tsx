import { type Collection } from "@pouch/db/schema";

import { CollectionItem } from "@/components/collections/collection-item";

interface CollectionsViewProps {
  data: Collection[];
}

export function CollectionsView({ data }: CollectionsViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {data.map(collection => (
        <CollectionItem key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Collection } from "@prisma/client";
type CollectionProps = {
  largestCollections: Collection[];
};
const TopCollection = ({ largestCollections }: CollectionProps) => {
  return (
    <div className="w-full max-w-[260px]  mt-3 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox aria-label="Listbox menu with descriptions" variant="flat">
        {largestCollections.map((collection: any) => (
          <ListboxItem
            key={collection.id}
            description={collection.user.name}
            href={`/mycollection/${collection.id}`}
          >
            {collection.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default TopCollection;

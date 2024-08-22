"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Item, Tag } from "@prisma/client";

type TagWithItems = Tag & {
  items: Item[];
};
type TagProps = {
  tags: TagWithItems;
};
const TagCard = ({ tags }: TagProps) => {
  return (
    <div className="w-full max-w-[260px]  mt-3 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox
        aria-label="Listbox menu with descriptions"
        emptyContent="There are no items linked with this tag"
        variant="flat"
      >
        {tags?.items.map((item: Tag) => (
          <ListboxItem key={item.id} href={`/item/${item.id}`}>
            {item.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default TagCard;

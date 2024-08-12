"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox, DatePicker } from "@nextui-org/react";
import { Collection } from "@prisma/client";

import { createItem } from "@/action/item";

// interface CollectionProps {
//   collection: Collection | null;
// }
export default function NewItemForm({ collection }: any) {
  console.log("item form rendered");
  if (!collection) {
    return <div>Empty collection</div>;
  }

  const customFields = [
    {
      type: "String",
      fields: [
        collection.customString1Name,
        collection.customString2Name,
        collection.customString3Name,
      ],
    },
    {
      type: "Int",
      fields: [
        collection.customInteger1Name,
        collection.customInteger2Name,
        collection.customInteger3Name,
      ],
    },
    {
      type: "Text",
      fields: [
        collection.customText1Name,
        collection.customText2Name,
        collection.customText3Name,
      ],
    },
    {
      type: "Boolean",
      fields: [
        collection.customBoolean1Name,
        collection.customBoolean2Name,
        collection.customBoolean3Name,
      ],
    },
    {
      type: "Date",
      fields: [
        collection.customDate1Name,
        collection.customDate2Name,
        collection.customDate3Name,
      ],
    },
  ];

  return (
    <div>
      <form
        action={createItem}
        className="w-full grid grid-cols-2 gap-2 mb-2"
        id="myForm"
      >
        <Input name="collectionId" type="hidden" value={collection.id} />

        <Input
          required
          id="name"
          label="Name"
          name="name"
          size="sm"
          type="text"
        />

        <Input
          required
          id="tags"
          label="Tags1, Tags2"
          name="tags"
          size="sm"
          type="text"
        />

        {customFields.map(({ type, fields }) =>
          fields.map((field, index) => {
            if (field) {
              return (
                <div key={`${type}_${index}`}>
                  {type === "String" && (
                    <Input
                      id={`custom_${type}_${index + 1}`}
                      label="String"
                      name={`custom_${type}_${index + 1}`}
                      type="text"
                    />
                  )}
                  {type === "Text" && (
                    <Textarea
                      className="mb-6 md:mb-0"
                      id={`custom_${type}_${index + 1}`}
                      label="Description"
                      name={`custom_${type}_${index + 1}`}
                      variant="bordered"
                    />
                  )}
                  {type === "Boolean" && (
                    <Checkbox
                      defaultSelected
                      id={`custom_${type}_${index + 1}`}
                      name={`custom_${type}_${index + 1}`}
                      type="checkbox"
                    >
                      {collection[`custom${type}${index + 1}Name`]}
                    </Checkbox>
                  )}
                  {type === "Date" && (
                    <DatePicker
                      id={`custom_${type}_${index + 1}`}
                      label="Date"
                      name={`custom_${type}_${index + 1}`}
                    />
                  )}
                  {type === "Int" && (
                    <Input
                      id={`custom_${type}_${index + 1}`}
                      label="Number"
                      name={`custom_${type}_${index + 1}`}
                      type="number"
                    />
                  )}
                </div>
              );
            }

            return null;
          })
        )}
      </form>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        form="myForm"
        type="submit"
      >
        Create Item
      </button>
    </div>
  );
}

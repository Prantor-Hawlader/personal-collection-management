"use client";
import { Input, Textarea, DatePicker } from "@nextui-org/react";
import CreatableSelect from "react-select/creatable";

import { createItem } from "@/action/item";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

export default function NewItemForm({ collection, tags }: any) {
  console.log("item form rendered");

  function mapCollectionToCustomFields(collection: any) {
    return customFieldDefinitions.map((def: CustomFieldDefinition) => ({
      type: def.type,
      fields: def.fieldNames.map((fieldName) => collection[fieldName]),
    }));
  }

  const customFields = mapCollectionToCustomFields(collection);
  const tagOptions = tags.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <div>
      <form
        action={createItem}
        className="w-full grid grid-cols-2 gap-2 mb-2"
        id="myForm"
      >
        <Input name="collectionId" type="hidden" value={collection.id} />

        <Input required label="Name" name="name" size="sm" type="text" />

        <CreatableSelect isMulti name="tags" options={tagOptions} />

        {customFields.map(({ type, fields }) =>
          fields.map((field, index) => {
            if (field) {
              return (
                <div key={`${type}_${index}`}>
                  {type === "String" && (
                    <Input
                      label={collection[`custom${type}${index + 1}Name`]}
                      name={`custom_${type}_${index + 1}`}
                      type="text"
                    />
                  )}
                  {type === "Text" && (
                    <Textarea
                      className="mb-6 md:mb-0"
                      label={collection[`custom${type}${index + 1}Name`]}
                      name={`custom_${type}_${index + 1}`}
                      variant="bordered"
                    />
                  )}
                  {type === "Boolean" && (
                    <div className="flex gap-2">
                      <input
                        name={`custom_${type}_${index + 1}`}
                        type="checkbox"
                      />
                      <p>{collection[`custom${type}${index + 1}Name`]}</p>
                    </div>
                  )}
                  {type === "Date" && (
                    <DatePicker
                      label={collection[`custom${type}${index + 1}Name`]}
                      name={`custom_${type}_${index + 1}`}
                    />
                  )}
                  {type === "Integer" && (
                    <Input
                      label={collection[`custom${type}${index + 1}Name`]}
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

// const customFields = [
//   {
//     type: "String",
//     fields: [
//       collection.customString1Name,
//       collection.customString2Name,
//       collection.customString3Name,
//     ],
//   },
//   {
//     type: "Int",
//     fields: [
//       collection.customInteger1Name,
//       collection.customInteger2Name,
//       collection.customInteger3Name,
//     ],
//   },
//   {
//     type: "Text",
//     fields: [
//       collection.customText1Name,
//       collection.customText2Name,
//       collection.customText3Name,
//     ],
//   },
//   {
//     type: "Boolean",
//     fields: [
//       collection.customBoolean1Name,
//       collection.customBoolean2Name,
//       collection.customBoolean3Name,
//     ],
//   },
//   {
//     type: "Date",
//     fields: [
//       collection.customDate1Name,
//       collection.customDate2Name,
//       collection.customDate3Name,
//     ],
//   },
// ];

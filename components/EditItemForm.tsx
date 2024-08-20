"use client";
import { Input, Textarea, DatePicker } from "@nextui-org/react";
import CreatableSelect from "react-select/creatable";

import { editItem } from "@/action/item";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

export default function EditItemForm({ item, tags }: any) {
  console.log("item form rendered");
  const collection = item.collection;

  function mapCollectionToCustomFields(collection: any) {
    return customFieldDefinitions.map((def: CustomFieldDefinition) => ({
      type: def.type,
      fields: def.fieldNames.map((fieldName) => collection[fieldName]),
    }));
  }

  const customFields = mapCollectionToCustomFields(collection);
  const itemTag = item.tags.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));
  console.log("itemTAg", itemTag);
  const tagOptions = tags.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <div>
      <form
        action={editItem}
        className="w-full grid grid-cols-2 gap-2 mb-2"
        id="myForm"
      >
        <Input name="collectionId" type="hidden" value={collection.id} />
        <Input name="itemId" type="hidden" value={item.id} />

        <Input
          required
          defaultValue={item.name}
          label="Name"
          name="name"
          size="sm"
          type="text"
        />

        <CreatableSelect
          isMulti
          defaultValue={itemTag}
          name="tags"
          options={tagOptions}
        />

        {customFields.map(({ type, fields }) =>
          fields.map((field, index) => {
            if (field) {
              return (
                <div key={`${type}_${index}`}>
                  {type === "String" && (
                    <Input
                      defaultValue={item[`custom${type}${index + 1}`]}
                      label={collection[`custom${type}${index + 1}Name`]}
                      name={`custom_${type}_${index + 1}`}
                      type="text"
                    />
                  )}
                  {type === "Text" && (
                    <Textarea
                      className="mb-6 md:mb-0"
                      defaultValue={item[`custom${type}${index + 1}`]}
                      label={collection[`custom${type}${index + 1}Name`]}
                      name={`custom_${type}_${index + 1}`}
                      variant="bordered"
                    />
                  )}
                  {type === "Boolean" && (
                    <div className="flex gap-2">
                      <input
                        defaultValue={item[`custom${type}${index + 1}`]}
                        name={`custom_${type}_${index + 1}`}
                        type="checkbox"
                      />
                      <p>{collection[`custom${type}${index + 1}Name`]}</p>
                    </div>
                  )}
                  {type === "Date" && (
                    <DatePicker
                      defaultValue={item[`custom${type}${index + 1}`]}
                      label={collection[`custom${type}${index + 1}Name`]}
                      name={`custom_${type}_${index + 1}`}
                    />
                  )}
                  {type === "Integer" && (
                    <Input
                      defaultValue={item[`custom${type}${index + 1}`]}
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
        Save Item
      </button>
    </div>
  );
}

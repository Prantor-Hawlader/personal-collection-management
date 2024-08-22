"use client";
import { Input, Textarea, DatePicker, Button } from "@nextui-org/react";
import CreatableSelect from "react-select/creatable";

import { createItem } from "@/action/item";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

export default function NewItemForm({ collection, tags, onClose }: any) {
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
      <form action={createItem} className="w-full grid grid-cols-1 gap-2 mb-2">
        <Input name="collectionId" type="hidden" value={collection.id} />

        <Input required label="Name" name="name" size="sm" type="text" />

        <CreatableSelect
          isMulti
          classNames={{
            control: () =>
              "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500",
            input: () => "text-gray-800 dark:text-gray-200",
            option: ({ isFocused, isSelected }) =>
              `${isFocused ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"} ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-200"
              }`,
            menu: () =>
              "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700",
            multiValue: () => "bg-blue-100 dark:bg-blue-800",
            multiValueLabel: () => "text-blue-800 dark:text-blue-200",
            multiValueRemove: () =>
              "text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700",
          }}
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
        <Button
          className="px-4 py-2 bg-green-500 text-white rounded"
          type="submit"
          onPress={onClose}
        >
          Create Item
        </Button>
      </form>
    </div>
  );
}

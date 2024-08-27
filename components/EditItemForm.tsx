"use client";
import { Input, Textarea, DatePicker, Card } from "@nextui-org/react";
import CreatableSelect from "react-select/creatable";

import { editItem } from "@/action/item";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

import SubmitButton from "./SubmitButton";

export default function EditItemForm({ item, tags, onClose }: any) {
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
  const tagOptions = tags.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <Card className="p-6">
      <form
        action={editItem}
        className="w-[350px] grid grid-cols-1 gap-2 mb-2"
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
          required
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
                        defaultChecked={item[`custom${type}${index + 1}`]}
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
        <SubmitButton title={"Editing"} onClose={onClose}>
          Edit Item
        </SubmitButton>
      </form>
    </Card>
  );
}

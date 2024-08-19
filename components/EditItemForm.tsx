"use client";
import {
  Input,
  Textarea,
  DatePicker,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { updateItem } from "@/action/item";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

export default function EditItemForm({ item, collection, tags }: any) {
  console.log("edit item form rendered");

  function mapCollectionToCustomFields(collection: any) {
    return customFieldDefinitions.map((def: CustomFieldDefinition) => ({
      type: def.type,
      fields: def.fieldNames.map((fieldName) => collection[fieldName]),
    }));
  }

  const customFields = mapCollectionToCustomFields(collection);

  return (
    <div>
      <form
        action={updateItem}
        className="w-full grid grid-cols-2 gap-2 mb-2"
        id="editForm"
      >
        <Input name="id" type="hidden" value={item.id} />
        <Input name="collectionId" type="hidden" value={collection.id} />

        <Input
          required
          label="Name"
          name="name"
          size="sm"
          type="text"
          defaultValue={item.name}
        />

        <Autocomplete
          allowsCustomValue
          multiple
          defaultSelectedKeys={item.tags.map((tag: any) => tag.name)}
          label="Tags"
          name="tags"
          placeholder="Enter tags"
        >
          {tags.map((tag: any) => (
            <AutocompleteItem key={tag.id} value={tag.name}>
              {tag.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        {customFields.map(({ type, fields }) =>
          fields.map((field, index) => {
            if (field) {
              const fieldName = `custom${type}${index + 1}`;
              return (
                <div key={`${type}_${index}`}>
                  {type === "String" && (
                    <Input
                      label={collection[`${fieldName}Name`]}
                      name={fieldName}
                      type="text"
                      defaultValue={item[fieldName] || ""}
                    />
                  )}
                  {type === "Text" && (
                    <Textarea
                      className="mb-6 md:mb-0"
                      label={collection[`${fieldName}Name`]}
                      name={fieldName}
                      variant="bordered"
                      defaultValue={item[fieldName] || ""}
                    />
                  )}
                  {type === "Boolean" && (
                    <div className="flex gap-2">
                      <input
                        name={fieldName}
                        type="checkbox"
                        defaultChecked={item[fieldName] || false}
                      />
                      <p>{collection[`${fieldName}Name`]}</p>
                    </div>
                  )}
                  {type === "Date" && (
                    <DatePicker
                      label={collection[`${fieldName}Name`]}
                      name={fieldName}
                      defaultValue={
                        item[fieldName] ? new Date(item[fieldName]) : undefined
                      }
                    />
                  )}
                  {type === "Integer" && (
                    <Input
                      label={collection[`${fieldName}Name`]}
                      name={fieldName}
                      type="number"
                      defaultValue={item[fieldName] || ""}
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
        className="px-4 py-2 bg-blue-500 text-white rounded"
        form="editForm"
        type="submit"
      >
        Update Item
      </button>
    </div>
  );
}

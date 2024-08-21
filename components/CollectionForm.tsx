"use client";

import React, { useState } from "react";
import { Category } from "@prisma/client";
import { Input } from "@nextui-org/input";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/button";

import { createCollection } from "@/action/collection";

const customFieldTypes = [
  { name: "String", max: 3 },
  { name: "Text", max: 3 },
  { name: "Integer", max: 3 },
  { name: "Boolean", max: 3 },
  { name: "Date", max: 3 },
];

type CollectionFormProps = {
  categories: Category[];
  onClose: () => void;
};
export default function CollectionForm({
  categories,
  onClose,
}: CollectionFormProps) {
  const MDEditor = dynamic(async () => await import("@uiw/react-md-editor"), {
    ssr: false,
  });

  console.log("collection form renderd");
  const [customFields, setCustomFields] = useState<Record<string, string[]>>(
    Object.fromEntries(customFieldTypes.map((type) => [type.name, []]))
  );

  const addCustomField = (type: string) => {
    if (customFields[type].length < 3) {
      setCustomFields((prev) => ({
        ...prev,
        [type]: [...prev[type], ""],
      }));
    }
  };

  const removeCustomField = (type: string, index: number) => {
    setCustomFields((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <form action={createCollection} className="w-full mx-auto mt-8">
      <div className="mb-4">
        <label className="block mb-2" htmlFor="name">
          Name
        </label>
        <input
          required
          className="w-full px-3 py-2 border rounded"
          id="name"
          name="name"
          type="text"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          required
          className="w-full px-3 py-2 border rounded"
          id="description"
          name="description"
        />
      </div>

      {/* <MDEditor name="description" /> */}

      <div className="mb-4">
        <label className="block mb-2" htmlFor="category">
          Category
        </label>
        <select
          className="w-full px-3 py-2 border rounded"
          id="category"
          name="category"
        >
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <Input label="Upload image" name="image" type="file" />
      </div>
      <div className="mb-4">
        <h3 className="mb-2">Custom Fields</h3>
        {customFieldTypes.map((type) => (
          <fieldset key={type.name} className="mb-4 border p-4 rounded">
            <legend className="font-bold">{type.name} Fields</legend>
            {customFields[type.name].map((_, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  className="flex-grow px-3 py-2 border rounded mr-2"
                  name={`custom${type.name}${index + 1}Name`}
                  placeholder={`${type.name} field name`}
                  type="text"
                />
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  type="button"
                  onClick={() => removeCustomField(type.name, index)}
                >
                  Remove
                </button>
              </div>
            ))}
            {customFields[type.name].length < type.max && (
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                type="button"
                onClick={() => addCustomField(type.name)}
              >
                Add {type.name} Field
              </button>
            )}
          </fieldset>
        ))}
      </div>
      <Button color="secondary" type="submit" onPress={onClose}>
        Create Collection
      </Button>
    </form>
  );
}

"use client";

import React, { useState } from "react";

import { createCollection } from "@/action/collection";

const categories = ["Books", "Signs", "Silverware", "Other"];

const customFieldTypes = [
  { name: "String", max: 3 },
  { name: "Text", max: 3 },
  { name: "Integer", max: 3 },
  { name: "Boolean", max: 3 },
  { name: "Date", max: 3 },
];

export default function NewCollectionForm() {
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
    <form action={createCollection} className="max-w-lg mx-auto mt-8">
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
      <div className="mb-4">
        <label className="block mb-2" htmlFor="category">
          Category
        </label>
        <select
          className="w-full px-3 py-2 border rounded"
          id="category"
          name="category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        type="submit"
      >
        Create Collection
      </button>
    </form>
  );
}

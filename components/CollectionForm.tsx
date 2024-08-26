"use client";

import React, { useState } from "react";
import { Category } from "@prisma/client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

import { createCollection } from "@/action/collection";
import SubmitButton from "./SubmitButton";

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
  // const clientAction = async (formData: FormData) => {
  //   const newCollection = {
  //     name: formData.get("name"),
  //     description: formData.get("description"),
  //     category: formData.get("category"),
  //   };
  //   const result = CollectionSchema.safeParse(newCollection);

  //   if (!result.success) {
  //     // console.log("Error", result.error.issues);
  //     let errorMessage = "";

  //     result.error.issues.forEach((issue) => {
  //       errorMessage =
  //         errorMessage + issue.path[0] + ": " + issue.message + ". ";
  //     });
  //     toast.error(errorMessage);

  //     return;
  //   }

  //   await createCollection(result.data,formData);
  // };

  const mdParser = new MarkdownIt();

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
    <form
      action={async (formData) => {
        await createCollection(formData);
      }}
      className="w-full mx-auto mt-8"
    >
      <Input isRequired className="mb-4" label="Name" name="name" type="text" />

      <MdEditor
        className="mb-4"
        name="description"
        renderHTML={(text) => mdParser.render(text)}
      />

      <Select
        isRequired
        className="mb-4"
        label="Select an category"
        name="category"
      >
        {categories.map((cat: Category) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.name}
          </SelectItem>
        ))}
      </Select>

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
                <Input
                  name={`custom${type.name}${index + 1}Name`}
                  placeholder={`${type.name} field name`}
                  type="text"
                />
                <Button
                  className="ml-2"
                  type="button"
                  onClick={() => removeCustomField(type.name, index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {customFields[type.name].length < type.max && (
              <Button
                className="mt-2"
                type="button"
                onClick={() => addCustomField(type.name)}
              >
                Add {type.name} Field
              </Button>
            )}
          </fieldset>
        ))}
      </div>
      <SubmitButton onClose={onClose}>Create Collection</SubmitButton>
    </form>
  );
}

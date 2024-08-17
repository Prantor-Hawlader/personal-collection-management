// customFields.ts

export type FieldType = "String" | "Integer" | "Text" | "Boolean" | "Date";

export interface CustomFieldDefinition {
  type: FieldType;
  fieldNames: [string, string, string];
}

export const customFieldDefinitions: CustomFieldDefinition[] = [
  {
    type: "String",
    fieldNames: ["customString1Name", "customString2Name", "customString3Name"],
  },
  {
    type: "Integer",
    fieldNames: [
      "customInteger1Name",
      "customInteger2Name",
      "customInteger3Name",
    ],
  },
  {
    type: "Text",
    fieldNames: ["customText1Name", "customText2Name", "customText3Name"],
  },
  {
    type: "Boolean",
    fieldNames: [
      "customBoolean1Name",
      "customBoolean2Name",
      "customBoolean3Name",
    ],
  },
  {
    type: "Date",
    fieldNames: ["customDate1Name", "customDate2Name", "customDate3Name"],
  },
];

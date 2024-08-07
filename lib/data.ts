// data.ts

export type CustomField = {
  type: "string" | "text" | "date" | "boolean" | "integer";
  name: string;
};

export type Item = {
  id: number;
  name: string;
  tags: string[];
  collectionId: number;
  customFields: { [key: string]: string | boolean | number | Date };
};

export type Collection = {
  id: number;
  name: string;
  description: string;
  topic: string;
  image?: string;

  customFields: CustomField[];
  items: Item[];
};

export type User = {
  userId: number;
  username: string;
  collections: Collection[];
};

export const demoData: User[] = [
  {
    userId: 1,
    username: "john_doe",
    collections: [
      {
        id: 1,
        name: "Book Collection",
        description: "A collection of my favorite books.",
        topic: "Books",
        image: "",
        customFields: [
          { type: "string", name: "Author" },
          { type: "text", name: "Synopsis" },
          { type: "date", name: "Publication Year" },
        ],
        items: [
          {
            id: 1,
            name: "Book 1",
            tags: ["fiction", "classic"],
            collectionId: 1,
            customFields: {
              Author: "Author 1",
              Synopsis: "Synopsis 1",
              "Publication Year": "2001-01-01",
            },
          },
        ],
      },
    ],
  },
];

"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { Category, Collection } from "@prisma/client";
import Link from "next/link";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "CATEGORY", uid: "category" },
];

type CollectionWithCategory = Collection & {
  category: Category;
};

type CollectionTableProps = {
  collections: CollectionWithCategory[];
};

export default function PublicCollectionTable({
  collections,
}: CollectionTableProps) {
  console.log("PublicCollectionTable rendered", collections);

  const renderCell = (
    collection: CollectionWithCategory,
    columnKey: React.Key
  ) => {
    const cellValue = collection[columnKey as keyof Collection];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: collection.image || undefined }}
            name={
              <Link href={`/collections/${collection.id}`}>
                {collection.name}
              </Link>
            }
          >
            {collection.name}
          </User>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "category":
        return (
          <p className="text-bold text-sm capitalize">
            {collection.category.name}
          </p>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No collections found"} items={collections}>
          {(item: CollectionWithCategory) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

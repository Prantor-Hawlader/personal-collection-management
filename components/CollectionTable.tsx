"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";

const headerColumns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "categoryId",
    label: "CATEGORY",
  },
];

export default function CollectionTable({ collections }: any) {
  console.log("collectionTable rendered");

  return (
    <div className="w-full">
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={collections}>
          {(collection: any) => (
            <TableRow key={collection.id}>
              {(columnKey) => (
                <TableCell>
                  <Link href={`/mycollection/${collection.id}`}>
                    {getKeyValue(collection, columnKey)}
                  </Link>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

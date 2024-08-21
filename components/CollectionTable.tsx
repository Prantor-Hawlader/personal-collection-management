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
  Chip,
  Tooltip,
  ChipProps,
  Button,
} from "@nextui-org/react";
import { Collection } from "@prisma/client";

import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { deleteCollection } from "@/action/collection";
import Link from "next/link";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  // { name: "CATEGORY", uid: "category" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  books: "success",
  coins: "danger",
  cloths: "warning",
  gadgets: "warning",
  others: "warning",
};

type CollectionTableProps = {
  collections: Collection[];
};

export default function CollectionTable({ collections }: CollectionTableProps) {
  console.log("collectionTable rendered", collections);

  const renderCell = React.useCallback(
    (collection: Collection, columnKey: React.Key) => {
      const cellValue = collection[columnKey as keyof Collection];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: collection.image || undefined }}
              name={cellValue}
            >
              <Link href={`/mycollection/${collection.id}`}>
                {collection.categoryId}
              </Link>
            </User>
          );
        case "description":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {" "}
                <Link href={`/mycollection/${collection.id}`}>{cellValue}</Link>
              </p>
            </div>
          );
        // case "category":
        //   return (
        //     <Chip
        //       className="capitalize"
        //       color={statusColorMap[collection.categoryId]}
        //       size="sm"
        //       variant="flat"
        //     >
        //       {cellValue}
        //     </Chip>
        //   );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit colleciton">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete collection">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Button
                    isIconOnly
                    color="danger"
                    onClick={() => deleteCollection(collection.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
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
        {(item: Collection) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

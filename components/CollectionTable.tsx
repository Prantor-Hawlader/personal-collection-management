"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  ChipProps,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { Category, Collection } from "@prisma/client";
import Link from "next/link";

import { deleteCollection } from "@/action/collection";

import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import EditCollectionForm from "./EditCollectionForm";
import ReactMarkdown from "react-markdown";

import { EyeIcon } from "./icons/EyeIcon";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
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
  categories: Category[];
};

export default function CollectionTable({
  collections,
  categories,
}: CollectionTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );

  console.log("collectionTable rendered", collections);

  const renderCell = (collection: Collection, columnKey: React.Key) => {
    const cellValue = collection[columnKey as keyof Collection];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src:
                collection.image ||
                "https://images.pexels.com/photos/248993/pexels-photo-248993.jpeg",
            }}
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
            <ReactMarkdown>{cellValue}</ReactMarkdown>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link href={`/mycollection/${collection.id}`}>
                  <EyeIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip content="Edit collection">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Button
                  isIconOnly
                  color="warning"
                  onPress={() => {
                    setEditingCollection(collection);
                    onOpen();
                  }}
                >
                  <EditIcon />
                </Button>
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
          {(item: Collection) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        scrollBehavior="inside"
        onOpenChange={() => {
          if (isOpen) setEditingCollection(null);
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Item
              </ModalHeader>
              <ModalBody>
                {editingCollection && (
                  <EditCollectionForm
                    categories={categories}
                    collection={editingCollection}
                    onClose={() => {
                      onClose();
                      setEditingCollection(null);
                      onOpenChange();
                    }}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

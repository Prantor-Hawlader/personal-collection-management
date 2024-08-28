"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User as Avatar,
  Tooltip,
  ChipProps,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Chip,
} from "@nextui-org/react";
import { Category, Collection } from "@prisma/client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import { deleteCollection } from "@/action/collection";

import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import EditCollectionForm from "./EditCollectionForm";
import { EyeIcon } from "./icons/EyeIcon";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "CATEGORY", uid: "category" },

  { name: "ACTIONS", uid: "actions" },
];

const categoryColorMap: Record<string, ChipProps["color"]> = {
  Books: "success",
  Coins: "primary",
  Cloths: "secondary",
  Gadgets: "default",
  Others: "warning",
};

type CollectionProps = Collection & {
  category: Category;
};
type CollectionTableProps = {
  collections: CollectionProps[];
  categories: Category[];
};

export default function CollectionTable({
  collections,
  categories,
}: CollectionTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingCollection, setEditingCollection] =
    useState<CollectionProps | null>(null);

  const renderCell = (collection: CollectionProps, columnKey: React.Key) => {
    const cellValue = collection[columnKey as keyof Collection];

    switch (columnKey) {
      case "name":
        return (
          <Avatar
            avatarProps={{
              radius: "lg",
              src:
                collection.image ||
                "https://images.pexels.com/photos/248993/pexels-photo-248993.jpeg",
            }}
            name={cellValue}
          >
            <Link href={`/mycollection/${collection.id}`}>{cellValue}</Link>
          </Avatar>
        );
      case "description":
        return <ReactMarkdown>{cellValue}</ReactMarkdown>;
      case "category":
        return (
          <Chip
            className="text-bold"
            color={categoryColorMap[collection.category.name]}
          >
            {collection.category.name}
          </Chip>
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
                <EditIcon
                  onClick={() => {
                    setEditingCollection(collection);

                    onOpen();
                  }}
                />
              </span>
            </Tooltip>

            <Tooltip color="danger" content="Delete collection">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  onClick={async () => {
                    const res = await deleteCollection(collection.id);

                    if (res?.status === "success")
                      toast.success("Collection deletd successfully");

                    if (res?.error) toast.error(res.error);
                  }}
                />
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
          {(item: CollectionProps) => (
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
                Edit Collection
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

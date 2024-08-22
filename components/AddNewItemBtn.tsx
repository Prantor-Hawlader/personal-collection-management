"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Collection, Tag } from "@prisma/client";

import { PlusIcon } from "./icons/PlusIcon";
import NewItemForm from "./ItemForm";

type AddNewItemProps = {
  collection: Collection;
  tags: Tag[];
};
const AddNewItemBtn = ({ collection, tags }: AddNewItemProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {" "}
      <Button
        className="bg-foreground text-background my-4"
        endContent={<PlusIcon />}
        size="sm"
        onPress={onOpen}
      >
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Item
              </ModalHeader>
              <ModalBody>
                <NewItemForm
                  collection={collection}
                  tags={tags}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewItemBtn;

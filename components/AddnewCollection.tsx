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
import { Category } from "@prisma/client";

import { PlusIcon } from "./icons/PlusIcon";
import CollectionForm from "./CollectionForm";

type CategoryProps = {
  categories: Category[];
};
const AddNewCollection = ({ categories }: CategoryProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="my-4">
      <Button
        className="bg-foreground text-background"
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
                Create collection
              </ModalHeader>
              <ModalBody>
                <CollectionForm categories={categories} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewCollection;

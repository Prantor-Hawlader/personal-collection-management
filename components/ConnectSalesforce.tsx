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

import { PlusIcon } from "./icons/PlusIcon";
import SalesforceForm from "./SalesforceForm";

const ConnectSalesforce = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="my-4">
      <Button
        className="bg-foreground text-background"
        endContent={<PlusIcon />}
        size="sm"
        onPress={onOpen}
      >
        Connect with Salesforce
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
                Fill the form to linked with Salesforce
              </ModalHeader>
              <ModalBody>
                <SalesforceForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConnectSalesforce;

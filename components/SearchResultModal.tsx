"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

const SearchResultModal = ({ items, searchTerm }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Search Results for {searchTerm}</ModalHeader>
          <ModalBody>
            {items ? (
              items.map((item: any) => (
                <div key={item.id}>
                  <Link href={`/item/${item.id}`}>{item.name}</Link>
                  <p>Collection: {item.collection.name}</p>
                  {item.comments.some((comment: any) =>
                    comment.text
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) && <p>Found in comments</p>}
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchResultModal;

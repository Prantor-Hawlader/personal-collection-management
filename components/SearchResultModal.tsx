// SearchResultModal.tsx
"use client";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import Link from "next/link";

const SearchResultModal = ({
  isOpen,
  onClose,
  items,
  searchTerm,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  searchTerm: string;
}) => {
  return (
    <Modal
      closeButton
      isOpen={isOpen}
      placement="bottom-center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Item</ModalHeader>
        <ModalBody>
          <h1>Search Results for {searchTerm}</h1>
          {items.map((item: any) => (
            <div key={item.id}>
              <Link href={`/item/${item.id}`}>
                <h2>{item.name}</h2>
              </Link>
              <p>Collection: {item.collection.name}</p>
              {item.comments.some((comment: any) =>
                comment.text.toLowerCase().includes(searchTerm.toLowerCase())
              ) && <p>Found in comments</p>}
            </div>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchResultModal;

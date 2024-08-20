"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

import SearchResultModal from "@/components/SearchResultModal";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleSearchChange = (e: any) => {
    const value = e.target.value;

    setSearchTerm(value);
    if (value) {
      onOpen();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
    }
  }, [searchTerm, router]);

  return (
    <>
      <Input
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {isOpen && <SearchResultModal searchTerm={searchTerm} />}
    </>
  );
};

export default SearchInput;

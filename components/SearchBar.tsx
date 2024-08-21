"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSearchSubmit}>
      <Input
        className="w-full"
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;

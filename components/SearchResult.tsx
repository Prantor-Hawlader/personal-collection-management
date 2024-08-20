// "use client";
// import { useState, useCallback } from "react";
// import { getSession } from "@/lib/session";
// import prisma from "@/db/prisma";
// import { Item } from "@prisma/client";
// import SearchBar from "@/components/SearchBar";
// import SearchResultModal from "@/components/SearchResultModal";

// export default function SearchPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [items, setItems] = useState<Item[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSearch = useCallback(async (term: string) => {
//     const session = await getSession();
//     if (!session) {
//       return <div>Please log in to search.</div>;
//     }

//     const searchResults = await prisma.item.findMany({
//       where: {
//         OR: [
//           { name: { contains: term, mode: "insensitive" } },
//           {
//             comments: {
//               some: { text: { contains: term, mode: "insensitive" } },
//             },
//           },
//           { collection: { name: { contains: term, mode: "insensitive" } } },
//         ],
//         userId: session.user.id,
//       },
//       include: {
//         collection: true,
//         comments: true,
//       },
//     });

//     setItems(searchResults);
//     setSearchTerm(term);
//     setIsModalOpen(true);
//   }, []);

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       <SearchResultModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         items={items}
//         searchTerm={searchTerm}
//       />
//     </div>
//   );
// }

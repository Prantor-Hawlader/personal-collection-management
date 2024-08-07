import React from "react";

import NewItemForm from "@/components/ItemForm";
import prisma from "@/db/prisma";

const collection = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: {
      items: {
        select: {
          customString1: true,
          customString2: true,
          customString3: true,
          customInt1: true,
          customInt2: true,
          customInt3: true,
          customText1: true,
          customText2: true,
          customText3: true,
          customBoolean1: true,
          customBoolean2: true,
          customBoolean3: true,
          customDate1: true,
          customDate2: true,
          customDate3: true,
        },
      },
    },
  });

  return (
    <div>
      <NewItemForm collection={collection} />
    </div>
  );
};

export default collection;

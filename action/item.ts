"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/db/prisma";

export async function createItem(formData: FormData) {
  const collectionId = formData.get("collectionId") as string;
  const name = formData.get("name") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim());

  const itemData: any = {
    name,
    tags,
    collectionId,
  };

  formData.forEach((value, key) => {
    if (key.startsWith("custom_")) {
      const [_, fieldType, fieldNumber] = key.split("_");
      const dbField = `custom${fieldType}${fieldNumber}`;

      if (fieldType === "Boolean") {
        itemData[dbField] = value === "on";
      } else if (fieldType === "Int") {
        itemData[dbField] = parseInt(value as string);
      } else if (fieldType === "Date") {
        itemData[dbField] = new Date(value as string);
      } else {
        itemData[dbField] = value;
      }
    }
  });
  for (let i = 1; i <= 3; i++) {
    const booleanField = `customBoolean${i}`;

    if (!(booleanField in itemData)) {
      itemData[booleanField] = false;
    }
  }
  try {
    await prisma.item.create({ data: itemData });
  } catch (error) {
    throw new Error("Failed to create item");
  } finally {
    revalidatePath(`/mycollection/${collectionId}`);
  }
}

export async function deleteItem(itemId: any, collectionId: string) {
  try {
    await prisma.item.delete({ where: { id: itemId } });
  } catch (error) {
    throw new Error("Failed to delete item");
  } finally {
    console.log("itemId and cid", itemId, collectionId);
    revalidatePath(`/mycollection/${collectionId}`);
  }
}

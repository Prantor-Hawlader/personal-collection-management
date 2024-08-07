"use server";
import { redirect } from "next/navigation";
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

  // Process custom fields
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

  try {
    await prisma.item.create({ data: itemData });
  } catch (error) {
    // console.error("Error creating item:", error);
    // In a real application, you'd want to handle this error more gracefully
    throw new Error("Failed to create item");
  } finally {
    revalidatePath(`/mycollection/${collectionId}`);
    redirect("/mycollection");
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";

import { uploadImage } from "./uploadImage";

const customFieldTypes = ["String", "Text", "Boolean", "Date", "Integer"];

export async function createCollection(formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;

  let url: string | undefined;

  if (imageFile && imageFile.size > 0) {
    const preset = "collectionerImage" as string;

    url = await uploadImage(imageFile, preset);
  }
  const collectionData: Prisma.CollectionCreateInput = {
    name,
    description,
    user: { connect: { id: userId } },
    category: { connect: { id: category } },
    ...(url && { image: url }),
  };

  customFieldTypes.forEach((type) => {
    for (let i = 1; i <= 3; i++) {
      const fieldName = formData.get(`custom${type}${i}Name`);

      if (fieldName) {
        const nameKey =
          `custom${type}${i}Name` as keyof Prisma.CollectionCreateInput;

        collectionData[nameKey] = fieldName as string;
      }
    }
  });

  try {
    await prisma.collection.create({
      data: collectionData,
    });
    console.log("collection created");
  } catch (error) {
    console.log(error);
    throw new Error("Collection creatation failed");
  } finally {
    revalidatePath("/mycollection");
  }
}

export async function deleteCollection(collectionId: string) {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!session) return;
    if (session?.user.role === "admin") {
      await prisma.collection.delete({
        where: { id: collectionId },
      });
    } else {
      await prisma.collection.delete({
        where: { id: collectionId, userId },
      });
    }
  } catch (error) {
    throw new Error("Failed to delete collection");
  } finally {
    revalidatePath("/mycollection");
  }
}

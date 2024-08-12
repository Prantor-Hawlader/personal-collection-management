"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";

const customFieldTypes = ["String", "Text", "Boolean", "Date", "Integer"];

export async function createCollection(formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!session) return;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  const collectionData: any = {
    name,
    description,
    userId,
    categoryId: category,
  };

  customFieldTypes.forEach((type) => {
    for (let i = 1; i <= 3; i++) {
      const fieldName = formData.get(`custom${type}${i}Name`);

      if (fieldName) {
        const stateKey = `custom${type}${i}State`;
        const nameKey = `custom${type}${i}Name`;

        collectionData[stateKey] = true;
        collectionData[nameKey] = fieldName;
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

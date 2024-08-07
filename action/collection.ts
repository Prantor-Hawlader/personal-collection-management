"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/db/prisma";

const customFieldTypes = ["String", "Text", "Boolean", "Date", "Integer"];

export async function createCollection(formData: FormData) {
  // Extract basic form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  // Initialize collection data
  const collectionData: any = {
    name,
    description,
    userId: "user-id", // Replace with actual user ID, perhaps from a session
    categoryId: category,
  };

  // Process custom fields
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
    // Create the collection using Prisma
    const newCollection = await prisma.collection.create({
      data: collectionData,
    });

    // console.log("Created new collection:", newCollection);

    // Revalidate the collections page

    // Redirect to the collections page
  } catch (error) {
    // console.error("Error creating collection:", error);
    // You might want to return an error message that can be displayed to the user

    return { error: "Failed to create collection. Please try again." };
  } finally {
    revalidatePath("/mycollection");
    redirect("/");
  }
}

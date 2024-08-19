"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";

export async function createItem(formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!session) return;
  const collectionId = formData.get("collectionId") as string;
  const name = formData.get("name") as string;
  const tagsValue = formData.getAll("tags");
  console.log("tagsvalue", tagsValue);

  const existingTagIds: string[] = [];
  const newTagNames: string[] = [];

  tagsValue.forEach((tag) => {
    if (typeof tag === "string") {
      if (tag.startsWith("cl") && tag.length > 20) {
        existingTagIds.push(tag);
      } else {
        newTagNames.push(tag);
      }
    }
  });

  const itemData: any = {
    name,
    tags: {
      connect: existingTagIds.map((id) => ({ id })),
      connectOrCreate: newTagNames.map((name) => ({
        where: { name },
        create: { name },
      })),
    },
    userId,
    collectionId,
  };

  formData.forEach((value, key) => {
    if (key.startsWith("custom_")) {
      const [_, fieldType, fieldNumber] = key.split("_");
      const dbField = `custom${fieldType}${fieldNumber}`;

      if (fieldType === "Boolean") {
        itemData[dbField] = value === "on";
      } else if (fieldType === "Integer") {
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
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  } finally {
    revalidatePath(`/mycollection/${collectionId}`);
  }
}

export async function deleteItem(itemId: string, collectionId: string) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: { tags: true },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    await prisma.item.delete({
      where: { id: itemId },
    });

    for (const tag of item.tags) {
      const associatedItemsCount = await prisma.item.count({
        where: { tags: { some: { id: tag.id } } },
      });

      if (
        associatedItemsCount === 0 &&
        tag.name !== "Mysterious" &&
        tag.name !== "Adventure"
      ) {
        await prisma.tag.delete({
          where: { id: tag.id },
        });
      }
    }

    console.log(
      `Item with id ${itemId} and associated orphaned tags deleted successfully.`
    );
  } catch (error) {
    throw new Error("Failed to delete item");
  } finally {
    console.log("itemId and cid", itemId, collectionId);
    revalidatePath(`/mycollection/${collectionId}`);
  }
}

export async function likeItem(itemId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;

  const post = await prisma.item.findUnique({
    where: { id: itemId },
    select: {
      likes: true,
      likesList: { where: { userId } },
    },
  });

  if (!post) throw new Error("Post not found");

  let newLikes: number;

  if (post.likesList.length > 0) {
    newLikes = post.likes - 1;
    await prisma.like.deleteMany({ where: { itemId, userId } });
  } else {
    newLikes = post.likes + 1;
    await prisma.like.create({ data: { itemId, userId } });
  }
  await prisma.item.update({
    where: { id: itemId },
    data: { likes: newLikes },
  });

  revalidatePath(`/item/${itemId}`);

  return { success: true };
}

export async function itemComment(formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  const text = formData.get("comment") as string;
  const itemId = formData.get("itemId") as string;

  try {
    await prisma.comment.create({
      data: { text, userId, itemId },
    });
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath(`/item/${itemId}`);
  }
}

"use server";

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { revalidatePath } from "next/cache";

import { signIn } from "@/auth";
import prisma from "@/db/prisma";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Handle case where user is not found
    return "User not found";
  }
  if (user.status === "blocked") {
    console.log("Sorry you are blocked");

    return "User is blocked";
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;

    return someError.cause;
  }
  redirect("/");
};

const register = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Please fill all fields");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({ data: { name, email, password: hashedPassword } });

  redirect("/");
};

const fetchAllUsers = async () => {
  const users = await prisma.user.findMany({});

  return users;
};

async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    // return { success: true };
  } catch (error) {
    console.log("Error deleting user", error);
  } finally {
    revalidatePath("/admin");
  }
}
async function blockUser(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "blocked" },
    });

    // return { success: true };
  } catch (error) {
    console.log("Error blocking user", error);
  } finally {
    revalidatePath("/admin");
  }
}
async function unblockUser(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "active" },
    });

    // return { success: true };
  } catch (error) {
    console.log("Error Unblocking user", error);
  } finally {
    revalidatePath("/admin");
  }
}

export { register, login, fetchAllUsers, deleteUser, blockUser, unblockUser };

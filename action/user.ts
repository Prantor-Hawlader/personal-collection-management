"use server";

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

import { signIn } from "@/auth";
import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "User not found" };
  }
  if (user.status === "blocked") {
    return { error: "You are blocked" };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    return { error: "Failed to login" };
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

  if (existingUser) return { error: "User already exists" };

  const hashedPassword = await hash(password, 12);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: "User registered successfully" };
  } catch (error) {
    return { error: "Failed to create user" };
  } finally {
    redirect("/login");
  }
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

    return { message: "User deleted successfully" };
  } catch (error) {
    return { message: "Failed to delete user" };
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
  } catch (error) {
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
  } catch (error) {
  } finally {
    revalidatePath("/admin");
  }
}
async function makeAdmin(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: "admin" },
    });
  } catch (error) {
  } finally {
    revalidatePath("/admin");
  }
}
async function makeNonAdmin(userId: string) {
  const session = await getSession();
  const adminId = session?.user.id;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: "user" },
    });
  } catch (error) {
  } finally {
    revalidatePath("/admin");
    if (adminId === userId) {
      return redirect("/login");
    }
  }
}

export {
  register,
  login,
  fetchAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
  makeAdmin,
  makeNonAdmin,
};

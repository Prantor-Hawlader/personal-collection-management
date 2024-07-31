"use server";

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";

import { signIn } from "@/auth";
import prisma from "@/db/prisma";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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

export { register, login, fetchAllUsers };

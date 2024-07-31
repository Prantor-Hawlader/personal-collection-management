import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";

import prisma from "./db/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {
          name: user.name,
          email: user.email,
          id: user.id,
          role: user.role,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;

          const alreadyUser = await prisma.user.findUnique({
            where: { id },
          });

          if (!alreadyUser) {
            if (email && name) {
              await prisma.user.create({
                data: {
                  email: email,
                  name: name,
                  authProviderId: id,
                },
              });
            } else {
              throw new Error("Email or name is missing from the user object");
            }
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});

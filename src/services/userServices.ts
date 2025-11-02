import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type CreateUserData = {
  id: string;
  email: string;
  name: string;
  image?: string;
  //   emailVerified?: boolean;
};

export type UpdateUserData = {
  name?: string;
  image?: string;
  emailVerified?: boolean;
};

export const createUser = async (data: CreateUserData) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code == "P2002"
    ) {
      console.error("User with email already exists");
    } else {
      console.error("Error Creating user", error);
    }
    return null;
  }
};

export const getUserId = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching userId:", error);
    return null;
  }
};

export const updateUser = async (id: string, data: UpdateUserData) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code == "P2025"
    ) {
      console.error("User not found");
    } else {
      console.error("Error updating user:", error);
    }
    return null;
  }
};
export const deleteUser = async (id: string) => {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error("User not found to delete.");
    } else {
      console.error("Error deleting user:", error);
    }
    return null;
  }
};
export const checkUserSession = async () => {
  const session = auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
};

"use server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";

export async function signUp({
  name,
  userName,
  password,
}: {
  name: string;
  userName: string;
  password: string;
}) {
  if (!name.trim()) throw new Error("name can't be empty");
  if (!userName.trim()) throw new Error("user name can't be empty");
  if (!password.trim()) throw new Error("password can't be empty");

  const user = await prisma.user.findUnique({
    where: { userName: userName.toLowerCase() },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        userName: userName.toLowerCase(),
        password: hashedPassword,
      },
    });

    await createSession(newUser.id);
  } else
    throw new Error(
      "user name is taken \n please try again with another user name"
    );
}

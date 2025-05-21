"use server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";

export async function logIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user?.id) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) await createSession(user.id);
    else throw new Error("password is wrong");
  } else throw new Error("email does not exist");
}

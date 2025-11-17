"use server";
import { prisma } from "../lib/prisma";
import { verifySession } from "../lib/session";
import { redirect } from "next/navigation";

export async function findUserAndTasksBySession() {
  const userId = await verifySession();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const tasks = await prisma.task.findMany({ where: { userId } });
  if (user && tasks) return { user, tasks };
  else redirect("/login");
}

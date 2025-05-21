"use server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function findUserAndTasksBySession() {
  const userId = await verifySession();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const tasks = await prisma.task.findMany({ where: { userId } });
  return { user, tasks };
}

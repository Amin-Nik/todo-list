"use server";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
const prisma = new PrismaClient();

export async function deleteTask(taskId: string) {
  const deletedTask = await prisma.task.delete({
    where: { id: taskId },
  });

  revalidateTag("");
  return deletedTask;
}

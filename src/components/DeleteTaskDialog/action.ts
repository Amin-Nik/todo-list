"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function deleteTask(taskId: string) {
  const deletedTask = await prisma.task.delete({
    where: { id: taskId },
  });

  revalidateTag("");
  return deletedTask;
}

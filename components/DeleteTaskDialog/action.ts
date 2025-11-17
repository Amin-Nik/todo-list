"use server";
import { prisma } from "../../lib/prisma";
import { verifySession } from "../../lib/session";
import { revalidateTag } from "next/cache";

export async function deleteTask(taskId: string) {
  await verifySession();

  const deletedTask = await prisma.task.delete({
    where: { id: taskId },
  });

  revalidateTag("");
  return deletedTask;
}

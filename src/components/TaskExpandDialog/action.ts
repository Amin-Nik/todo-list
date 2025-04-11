"use server";
import { PrismaClient, Task } from "@prisma/client";
import { revalidateTag } from "next/cache";
const prisma = new PrismaClient();

export async function editTask(data: Task, oldData: Task) {
  if (!data.title.trim()) throw new Error("task's title can't be empty");
  if (JSON.stringify(data) !== JSON.stringify(oldData)) {
    const { id, ...theData } = data;
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: theData,
    });

    revalidateTag("task");
    return task;
  }
}

"use server";
import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";
import { revalidateTag } from "next/cache";

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

    revalidateTag("");
    return task;
  }
}

export async function addTask(data: Task) {
  if (!data.title.trim()) throw new Error("task's title can't be empty");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...theData } = data;
  const newTask = await prisma.task.create({
    data: { ...theData, userId: "67c9dcc075cddd2f8bc99e69" },
  });

  revalidateTag("");
  return newTask;
}

"use server";
import { prisma } from "../../lib/prisma";
import { verifySession } from "../../lib/session";
import { Task } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function editTask(data: Task, oldData: Task) {
  await verifySession();
  try {
    if (!data.title.trim())
      throw new Error("task's title can't be empty!", {
        cause: "server error",
      });
    if (JSON.stringify(data) == JSON.stringify(oldData))
      throw new Error("you didn't change anything!");
    const { id, ...theData } = data;
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: theData,
    });
    revalidateTag("");
    return task;
  } catch (error) {
    if (error instanceof Error) {
      if (error.cause == "server error") throw new Error(error.message);
      else throw new Error("something went wrong!");
    }
  }
}

export async function addTask(data: Task) {
  const userId = await verifySession();
  try {
    if (!data.title.trim())
      throw new Error("task's title can't be empty!", {
        cause: "server error",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...theData } = data;
    const newTask = await prisma.task.create({
      data: { ...theData, userId },
    });
    revalidateTag("");
    return newTask;
  } catch (error) {
    if (error instanceof Error) {
      if (error.cause == "server error") throw new Error(error.message);
      else throw new Error("something went wrong!");
    }
  }
}

"use server";
import { prisma } from "../../lib/prisma";
import { verifySession } from "../../lib/session";
import { Task } from "@prisma/client";

export async function editTask(data: Task, oldData: Task) {
  await verifySession();
  try {
    if (!data.title.trim())
      throw new Error("task's title can't be empty!", {
        cause: "server error",
      });
    if (JSON.stringify(data) == JSON.stringify(oldData))
      throw new Error("you didn't change anything!", {
        cause: "server error",
      });
    const { id, ...theData } = data;
    await prisma.task.update({
      where: {
        id: id,
      },
      data: theData,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.cause == "server error")
      return { error: error.message };
    else {
      console.log(error);
      return { error: "something went wrong!" };
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
    await prisma.task.create({
      data: { ...theData, userId },
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.cause == "server error")
      return { error: error.message };
    else {
      console.log(error);
      return { error: "something went wrong!" };
    }
  }
}

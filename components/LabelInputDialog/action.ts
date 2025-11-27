"use server";
import { prisma } from "../../lib/prisma";
import { verifySession } from "../../lib/session";
import { revalidateTag } from "next/cache";

export async function newLabel(labelData: string[], newLabel: string) {
  const userId = await verifySession();

  try {
    if (labelData.includes(newLabel))
      throw new Error("this label is already exist!", {
        cause: "server error",
      });
    if (!newLabel.trim())
      throw new Error("label can't be empty", { cause: "server error" });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        labels: [...labelData, newLabel.trim()],
      },
    });

    revalidateTag("");
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

export async function editLabel(
  labelData: string[],
  newLabel: string,
  currentLabel: string
) {
  const userId = await verifySession();

  try {
    if (newLabel == currentLabel)
      throw new Error("it's the same label!", { cause: "server error" });
    if (labelData.includes(newLabel))
      throw new Error("this label is already exist!", {
        cause: "server error",
      });
    if (!newLabel.trim())
      throw new Error("label can't be empty", { cause: "server error" });

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    tasks.map((task) => {
      if (task.labels.includes(currentLabel)) {
        const index = task.labels.indexOf(currentLabel);
        task.labels.splice(index, 1, newLabel.trim());
      }
      return task;
    });

    await prisma.task.deleteMany({
      where: { userId },
    });

    await prisma.task.createMany({
      data: tasks,
    });

    const index = labelData.indexOf(currentLabel);
    labelData.splice(index, 1, newLabel.trim());

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        labels: labelData,
      },
      select: {
        labels: true,
      },
    });

    revalidateTag("");
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

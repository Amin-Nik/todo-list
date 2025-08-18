"use server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function editLabel(
  labelData: string[],
  newLabel: string,
  currentLabel: string
) {
  const userId = await verifySession();

  if (newLabel == currentLabel) throw new Error("it's the same label!");
  if (labelData.includes(newLabel))
    throw new Error("this label is already exist!");
  if (!newLabel.trim()) throw new Error("label can't be empty");

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

  const label = await prisma.user.update({
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
  return label.labels[index];
}

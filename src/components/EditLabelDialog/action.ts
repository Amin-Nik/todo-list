"use server";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
const prisma = new PrismaClient();

export async function editLabel(
  labelData: string[],
  newLabel: string,
  currentLabel: string
) {
  if (newLabel !== currentLabel) {
    if (labelData.includes(newLabel))
      throw new Error("this label is already exist!");
    if (!newLabel.trim()) throw new Error("label can't be empty");

    const tasks = await prisma.task.findMany({
      where: { userId: "67c9dcc075cddd2f8bc99e69" },
    });

    tasks.map((task) => {
      if (task.labels.includes(currentLabel)) {
        const index = task.labels.indexOf(currentLabel);
        task.labels.splice(index, 1, newLabel.trim());
      }
      return task;
    });

    await prisma.task.deleteMany({
      where: { userId: "67c9dcc075cddd2f8bc99e69" },
    });

    await prisma.task.createMany({
      data: tasks,
    });

    const index = labelData.indexOf(currentLabel);
    labelData.splice(index, 1, newLabel.trim());

    const label = await prisma.user.update({
      where: {
        id: "67c9dcc075cddd2f8bc99e69",
      },
      data: {
        labels: labelData,
      },
      select: {
        labels: true,
      },
    });

    revalidateTag("label");
    return label.labels[index];
  } else return currentLabel;
}

"use server";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
const prisma = new PrismaClient();

export async function deleteLabel(labelData: string[], currentLabel: string) {
  const tasks = await prisma.task.findMany({
    where: { userId: "67c9dcc075cddd2f8bc99e69" },
  });

  tasks.map((task) => {
    if (task.labels.includes(currentLabel))
      task.labels = task.labels.filter((l) => l !== currentLabel);
    return task;
  });

  await prisma.task.deleteMany({
    where: { userId: "67c9dcc075cddd2f8bc99e69" },
  });

  await prisma.task.createMany({
    data: tasks,
  });

  const labels = labelData.filter((label) => label != currentLabel);

  const deletedLabel = await prisma.user.update({
    where: {
      id: "67c9dcc075cddd2f8bc99e69",
    },
    data: {
      labels: labels,
    },
  });

  revalidateTag("label");
  return deletedLabel;
}

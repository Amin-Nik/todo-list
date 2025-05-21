"use server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function deleteLabel(labelData: string[], currentLabel: string) {
  const userId = await verifySession();

  const tasks = await prisma.task.findMany({
    where: { userId },
  });

  tasks.map((task) => {
    if (task.labels.includes(currentLabel))
      task.labels = task.labels.filter((l) => l !== currentLabel);
    return task;
  });

  await prisma.task.deleteMany({
    where: { userId },
  });

  await prisma.task.createMany({
    data: tasks,
  });

  const labels = labelData.filter((label) => label != currentLabel);

  const deletedLabel = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      labels: labels,
    },
  });

  revalidateTag("");
  return deletedLabel;
}

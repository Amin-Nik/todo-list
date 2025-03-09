"use server";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
const prisma = new PrismaClient();

export async function deleteLabel(labelData: string[], currentLabel: string) {
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

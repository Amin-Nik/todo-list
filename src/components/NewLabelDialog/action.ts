"use server";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
const prisma = new PrismaClient();

export async function addNewLabel(labelData: string[], newLabel: string) {
  if (labelData.includes(newLabel))
    throw new Error("this label is already exist!");
  if (!newLabel.trim()) throw new Error("label can't be empty");

  const label = await prisma.user.update({
    where: {
      id: "67c9dcc075cddd2f8bc99e69",
    },
    data: {
      labels: [...labelData, newLabel.trim()],
    },
  });

  revalidateTag("");
  return label;
}

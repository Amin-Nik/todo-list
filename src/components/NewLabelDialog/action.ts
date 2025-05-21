"use server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function addNewLabel(labelData: string[], newLabel: string) {
  const userId = await verifySession();

  if (labelData.includes(newLabel))
    throw new Error("this label is already exist!");
  if (!newLabel.trim()) throw new Error("label can't be empty");

  const label = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      labels: [...labelData, newLabel.trim()],
    },
  });

  revalidateTag("");
  return label;
}

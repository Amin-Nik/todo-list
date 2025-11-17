"use server";
import { deleteSession } from "../../lib/session";

export async function logOut() {
  await deleteSession();
}

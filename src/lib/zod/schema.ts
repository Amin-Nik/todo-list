import { z } from "zod";

const taskSchema = z.object({
  id: z.string(),
  date: z.coerce.date().nullable(),
  description: z
    .string()
    .max(1000, "Too big, please keep it under 1000 character"),
  isComplete: z.boolean(),
  isImportant: z.boolean(),
  labels: z.array(z.string().trim()),
  title: z
    .string()
    .trim()
    .min(1, "task's title can't be empty")
    .max(100, "Too big, please keep it under 100 character"),
  userId: z.string(),
});

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name can't be empty")
    .max(20, "Too big, please keep it under 20 character"),
  userName: z
    .string()
    .trim()
    .min(1, "user name can't be empty")
    .max(20, "Too big, please keep it under 20 character"),
  password: z.string().trim().min(1, "password can't be empty"),
});

const labelSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "label can't be empty")
    .max(20, "Too big, please keep it under 20 character"),
});

export { taskSchema, userSchema, labelSchema };

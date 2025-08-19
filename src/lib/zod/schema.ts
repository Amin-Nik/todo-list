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
  id: z.string(),
  userName: z.string().trim().min(1),
  labels: z.array(z.string().trim()),
  name: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

const labelSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "label can't be empty")
    .max(20, "Too big, please keep it under 20 character"),
});

export { taskSchema, userSchema, labelSchema };

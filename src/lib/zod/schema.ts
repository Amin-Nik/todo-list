import { z } from "zod";

const taskSchema = z.object({
  id: z.string(),
  date: z.iso.date(),
  description: z.string(),
  isComplete: z.boolean(),
  isImportant: z.boolean(),
  labels: z.array(z.string().trim()),
  title: z.string().trim().min(1),
  userId: z.string().trim(),
});

const userSchema = z.object({
  id: z.string(),
  userName: z.string().trim().min(1),
  labels: z.array(z.string().trim()),
  name: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

const labelSchema = z.object({
  title: z.string().trim().min(1, "label can't be empty"),
});

export { taskSchema, userSchema, labelSchema };

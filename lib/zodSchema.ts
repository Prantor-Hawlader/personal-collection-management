import { z } from "zod";

export const CollectionSchema = z.object({
  name: z.string().min(1, { message: "Name must be not empty" }).max(100),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  category: z.string(),
});

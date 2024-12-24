import { z } from "zod";
import { ProductSchema } from "./product.validator";

export const CategorySchema = z.object({
  name: z.string(),
  tagNames: z.array(z.string()).default([]),
  products: z.array(ProductSchema).default([]),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type CategoryData = z.infer<typeof CategorySchema>;

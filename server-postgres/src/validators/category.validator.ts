import { z } from "zod";
import { ProductSchema } from "./product.validator";

export const CategorySchema = z.object({
  name: z.string(),
  tagNames: z.array(z.string()).optional(),
  products: z.array(ProductSchema).optional(),
  createdAt: z.date().optional(),
  modifiedAt: z.date().optional(),
});

export type CategoryData = z.infer<typeof CategorySchema>;

import { z } from "zod";
import { ProductSchema } from "./product.validator";

export const BrandSchema = z.object({
  id: z.never(),
  name: z.string(),
  email: z.string().email(),
  website: z.string(),
  company: z.string(),
  products: z.array(ProductSchema).default([]),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type BrandData = z.infer<typeof BrandSchema>;

import { z } from "zod";
import { ProductSchema } from "./product.validator";

export const BrandSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  website: z.string(),
  company: z.string(),
  products: z.array(ProductSchema).optional(),
  createdAt: z.date().optional(),
  modifiedAt: z.date().optional(),
});

export type BrandData = z.infer<typeof BrandSchema>;

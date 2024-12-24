import { z } from "zod";

export const ProductSchema = z.object({
  id: z.never(),
  name: z.string(),
  description: z.string(),
  imgName: z.string(),
  imgType: z.string(),
  pricePaisa: z.bigint().positive(),
  stock: z.number().int().nonnegative(),
  brandId: z.string(),
  categoryName: z.string(),
  ownerEmail: z.string(),
  ratingOnFifty: z.number().int().lte(50).nonnegative().optional(),
  ratingCount: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type ProductData = z.infer<typeof ProductSchema>;

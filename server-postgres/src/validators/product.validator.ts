import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
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
  isActive: z.boolean().optional().default(true),
  createdAt: z.date().optional(),
  modifiedAt: z.date().optional(),
});

export type ProductData = z.infer<typeof ProductSchema>;

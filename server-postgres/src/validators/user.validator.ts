import { z } from "zod";
import { UserRole } from "../../db";
import { CartSchema } from "./cart.validator";
import { OrderSchema } from "./order.validator";
import { ProductSchema } from "./product.validator";

export const UserSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(6).max(8),
  phone: z.string().length(10),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  address: z.string(),
  role: z.nativeEnum(UserRole).default(UserRole.CUSTOMER),
  cart: CartSchema.omit({ customerEmail: true }).optional(),
  orders: z.array(OrderSchema).default([]),
  productsOwned: z.array(ProductSchema).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type UserData = z.infer<typeof UserSchema>;

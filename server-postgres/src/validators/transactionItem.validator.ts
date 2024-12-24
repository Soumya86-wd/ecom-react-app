import { z } from "zod";
import { TransactionState } from "../../db";

export const TransactionItemSchema = z.object({
  id: z.never(),
  productId: z.string(),
  deliveryOptionId: z.bigint(),
  quantity: z.number().int().positive().default(1),
  state: z.nativeEnum(TransactionState).default(TransactionState.IN_CART),
  cartId: z.string().optional(),
  orderId: z.string().optional(),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type TransactionItemData = z.infer<typeof TransactionItemSchema>;

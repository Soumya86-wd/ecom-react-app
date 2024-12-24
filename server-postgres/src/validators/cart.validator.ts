import { z } from "zod";
import { TransactionItemSchema } from "./transactionItem.validator";

export const CartSchema = z.object({
  id: z.string().optional(),
  customerEmail: z.string(),
  items: z.array(TransactionItemSchema),
  createdAt: z.date().optional(),
  modifiedAt: z.date().optional(),
});

export type CartData = z.infer<typeof CartSchema>;

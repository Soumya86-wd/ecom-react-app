import { z } from "zod";
import { TransactionItemSchema } from "./transactionItem.validator";

export const CartSchema = z.object({
  id: z.never(),
  customerEmail: z.string(),
  items: z.array(TransactionItemSchema),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type CartData = z.infer<typeof CartSchema>;

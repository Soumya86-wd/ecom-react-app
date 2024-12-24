import { z } from "zod";
import { TransactionItemSchema } from "./transactionItem.validator";

export const DeliveryOptionSchema = z.object({
  id: z.never(),
  deliveryDays: z.number().int().nonnegative(),
  costPaisa: z.number().int().nonnegative(),
  transactions: z.array(TransactionItemSchema).default([]),
  createdAt: z.never(),
  modifiedAt: z.never(),
});

export type DeliveryOptionData = z.infer<typeof DeliveryOptionSchema>;

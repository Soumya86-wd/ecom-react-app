import { z } from "zod";
import { TransactionItemSchema } from "./transactionItem.validator";

export const DeliveryOptionSchema = z.object({
  id: z.bigint().optional(),
  deliveryDays: z.number().int().nonnegative(),
  costPaisa: z.number().int().nonnegative(),
  transactions: z.array(TransactionItemSchema).optional(),
  createdAt: z.date().optional(),
  modifiedAt: z.date().optional(),
});

export type DeliveryOptionData = z.infer<typeof DeliveryOptionSchema>;

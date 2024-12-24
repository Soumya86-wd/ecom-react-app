import { z } from "zod";
import { OrderState } from "../../db";
import { TransactionItemSchema } from "./transactionItem.validator";

export const OrderSchema = z.object({
  id: z.never(),
  customerEmail: z.string().email(),
  items: z.array(TransactionItemSchema),
  paymentId: z.never(),
  status: z.nativeEnum(OrderState).default(OrderState.ORDERED),
  orderDate: z.never(),
  deliveryDate: z.date(),
  modifiedAt: z.never(),
});

export type OrderData = z.infer<typeof OrderSchema>;

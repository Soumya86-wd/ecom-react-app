import { z } from "zod";
import { OrderState } from "../../db";
import { TransactionItemSchema } from "./transactionItem.validator";

export const OrderSchema = z.object({
  id: z.string().optional(),
  customerEmail: z.string().email(),
  items: z.array(TransactionItemSchema),
  paymentId: z.string().optional(),
  status: z.nativeEnum(OrderState).optional().default(OrderState.ORDERED),
  orderDate: z.date().optional(),
  deliveryDate: z.date(),
  modifiedAt: z.date().optional(),
});

export type OrderData = z.infer<typeof OrderSchema>;

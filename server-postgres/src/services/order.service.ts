import { ZodObject } from "zod";
import { OrderQueries, type Order } from "../../db";
import {
  type OrderData,
  OrderSchema,
  TransactionItemSchema,
} from "../validators";
import { BaseService } from "./base.service";

export class OrderService extends BaseService<OrderData, Order, OrderQueries> {
  constructor() {
    super(new OrderQueries());
  }

  protected getSchema(): ZodObject<any> {
    return OrderSchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [{ schema: TransactionItemSchema, fieldName: "items" }];
  }

  async findOrderById(id: string): Promise<OrderData> {
    return this.findById(id, { include: { items: true } });
  }

  async createOrder(inputData: OrderData): Promise<OrderData> {
    return this.create(inputData);
  }

  async updateOrder(id: string, inputData: OrderData): Promise<OrderData> {
    return this.update(id, inputData);
  }

  async deleteOrder(id: string): Promise<OrderData> {
    return this.delete(id);
  }
}

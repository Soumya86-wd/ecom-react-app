import { BaseQueries } from "./base.queries";
import { PrismaClient, type Order } from "@prisma/client";

export class OrderQueries extends BaseQueries<Order> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "order";
  }

  protected getIdName(): string {
    return "id";
  }
}

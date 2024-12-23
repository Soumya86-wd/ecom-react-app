import { BaseQueries } from "./base.queries";
import { PrismaClient, type Cart } from "@prisma/client";

export class CartQueries extends BaseQueries<Cart> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "cart";
  }

  protected getIdName(): string {
    return "id";
  }
}

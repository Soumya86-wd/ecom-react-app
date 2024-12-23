import { BaseQueries } from "./base.queries";
import { PrismaClient, type Product } from "@prisma/client";

export class ProductQueries extends BaseQueries<Product> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "product";
  }

  protected getIdName(): string {
    return "id";
  }
}

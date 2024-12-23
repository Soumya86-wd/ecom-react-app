import { BaseQueries } from "./base.queries";
import { PrismaClient, type Category } from "@prisma/client";

export class CategoryQueries extends BaseQueries<Category> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "category";
  }

  protected getIdName(): string {
    return "name";
  }
}

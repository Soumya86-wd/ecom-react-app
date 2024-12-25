import { BaseQueries } from "./base.queries";
import { PrismaClient, type Brand } from "@prisma/client";

export class BrandQueries extends BaseQueries<Brand> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "brand";
  }

  protected getIdName(): string {
    return "id";
  }
}

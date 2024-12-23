import { BaseQueries } from "./base.queries";
import { PrismaClient, type TransactionItem } from "@prisma/client";

export class TransactionItemQueries extends BaseQueries<TransactionItem> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "transactionItem";
  }

  protected getIdName(): string {
    return "id";
  }
}

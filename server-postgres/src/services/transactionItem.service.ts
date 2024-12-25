import { ZodObject } from "zod";
import { TransactionItemQueries, type TransactionItem } from "../../db";
import { type TransactionItemData, TransactionItemSchema } from "../validators";
import { BaseService } from "./base.service";

export class TransactionItemService extends BaseService<
  TransactionItemData,
  TransactionItem,
  TransactionItemQueries
> {
  constructor() {
    super(new TransactionItemQueries());
  }

  protected getSchema(): ZodObject<any> {
    return TransactionItemSchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [];
  }

  async findTransactionById(id: bigint): Promise<TransactionItemData> {
    return this.findById(id);
  }

  async createTransaction(
    inputData: TransactionItemData
  ): Promise<TransactionItemData> {
    return this.create(inputData);
  }

  async updateTransaction(
    id: bigint,
    inputData: TransactionItemData
  ): Promise<TransactionItemData> {
    return this.update(id, inputData);
  }

  async deleteTransaction(id: bigint): Promise<TransactionItemData> {
    return this.delete(id);
  }
}

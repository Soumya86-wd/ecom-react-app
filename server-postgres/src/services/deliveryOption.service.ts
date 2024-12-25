import { ZodObject } from "zod";
import { DeliveryOptionQueries, type DeliveryOption } from "../../db";
import {
  type DeliveryOptionData,
  DeliveryOptionSchema,
  TransactionItemSchema,
} from "../validators";
import { BaseService } from "./base.service";

export class DeliveryOptionService extends BaseService<
  DeliveryOptionData,
  DeliveryOption,
  DeliveryOptionQueries
> {
  constructor() {
    super(new DeliveryOptionQueries());
  }

  protected getSchema(): ZodObject<any> {
    return DeliveryOptionSchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [{ schema: TransactionItemSchema, fieldName: "transactions" }];
  }

  async findDeliveryOptionById(id: bigint): Promise<DeliveryOptionData> {
    return this.findById(id, { include: { transactions: true } });
  }

  async createDeliveryOption(
    inputData: DeliveryOptionData
  ): Promise<DeliveryOptionData> {
    return this.create(inputData);
  }

  async findAllDeliveryOptions(): Promise<DeliveryOptionData[]> {
    return this.findAll();
  }

  async updateDeliveryOption(
    id: bigint,
    inputData: DeliveryOptionData
  ): Promise<DeliveryOptionData> {
    return this.update(id, inputData);
  }

  async deleteDeliveryOption(id: bigint) {
    return this.delete(id);
  }
}

import { ZodObject } from "zod";
import { CartQueries, type Cart } from "../../db";
import {
  type CartData,
  CartSchema,
  TransactionItemSchema,
} from "../validators";
import { BaseService } from "./base.service";

export class CartService extends BaseService<CartData, Cart, CartQueries> {
  constructor() {
    super(new CartQueries());
  }

  protected getSchema(): ZodObject<any> {
    return CartSchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [{ schema: TransactionItemSchema, fieldName: "items" }];
  }

  async findCartById(id: string): Promise<CartData> {
    return this.findById(id, { include: { items: true } });
  }

  async createNewCart(inputData: CartData): Promise<CartData> {
    return this.create(inputData);
  }

  async updateCart(id: string, inputData: CartData): Promise<CartData> {
    return this.update(id, inputData);
  }

  async deleteCart(id: string): Promise<CartData> {
    return this.delete(id);
  }
}

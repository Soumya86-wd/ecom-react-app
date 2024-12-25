import { ZodObject } from "zod";
import { ProductQueries, type Product } from "../../db";
import {
  type ProductData,
  ProductSchema,
  TransactionItemSchema,
} from "../validators";
import { BaseService } from "./base.service";

export class ProductService extends BaseService<
  ProductData,
  Product,
  ProductQueries
> {
  constructor() {
    super(new ProductQueries());
  }

  protected getSchema(): ZodObject<any> {
    return ProductSchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [{ schema: TransactionItemSchema, fieldName: "transactions" }];
  }

  async findProductById(id: string): Promise<ProductData> {
    return this.findById(id, { include: { transactions: true } });
  }

  async createProduct(inputData: ProductData): Promise<ProductData> {
    return this.create(inputData);
  }

  async findAllProducts(): Promise<ProductData[]> {
    return this.findAll();
  }

  async updateProduct(
    id: string,
    inputData: ProductData
  ): Promise<ProductData> {
    return this.update(id, inputData);
  }

  async deleteProduct(id: string): Promise<ProductData> {
    return this.delete(id);
  }
}

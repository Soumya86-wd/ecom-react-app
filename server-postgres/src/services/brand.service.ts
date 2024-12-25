import { ZodObject } from "zod";
import { BrandQueries, type Brand } from "../../db";
import { type BrandData, BrandSchema, ProductSchema } from "../validators";
import { BaseService } from "./base.service";

export class BrandService extends BaseService<BrandData, Brand, BrandQueries> {
  constructor() {
    super(new BrandQueries());
  }

  protected getSchema(): ZodObject<any> {
    return BrandSchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [{ schema: ProductSchema, fieldName: "products" }];
  }

  async findBrandById(id: string): Promise<BrandData> {
    return this.findById(id, { include: { products: true } });
  }

  async createNewBrand(inputData: BrandData): Promise<BrandData> {
    return this.create(inputData);
  }

  async findAllBrands(): Promise<BrandData[]> {
    return this.findAll();
  }

  async updateBrand(id: string, inputData: BrandData): Promise<BrandData> {
    return this.update(id, inputData);
  }

  async deleteBrand(id: string): Promise<BrandData> {
    return this.delete(id);
  }
}

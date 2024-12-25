import { ZodObject } from "zod";
import { CategoryQueries, type Category } from "../../db";
import {
  type CategoryData,
  CategorySchema,
  ProductSchema,
} from "../validators";
import { BaseService } from "./base.service";

export class CategoryService extends BaseService<
  CategoryData,
  Category,
  CategoryQueries
> {
  constructor() {
    super(new CategoryQueries());
  }

  protected getSchema(): ZodObject<any> {
    return CategorySchema;
  }

  protected getInnerSchemas(): { schema: ZodObject<any>; fieldName: string }[] {
    return [{ schema: ProductSchema, fieldName: "products" }];
  }

  async findCategoryByName(name: string): Promise<CategoryData> {
    return this.findById(name, { include: { products: true } });
  }

  async createNewCategory(inputData: CategoryData): Promise<CategoryData> {
    return this.create(inputData);
  }

  async findAllCategories(): Promise<CategoryData[]> {
    return this.findAll();
  }

  async updateCategory(
    name: string,
    inputData: CategoryData
  ): Promise<CategoryData> {
    return this.update(name, inputData);
  }

  async deleteCategory(name: string): Promise<CategoryData> {
    return this.delete(name);
  }
}

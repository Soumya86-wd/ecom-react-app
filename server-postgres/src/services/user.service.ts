import { ZodObject } from "zod";
import { UserQueries, type User } from "../../db";
import {
  type UserData,
  UserSchema,
  CartSchema,
  OrderSchema,
  ProductSchema,
} from "../validators";
import { BaseService } from "./base.service";

export class UserService extends BaseService<UserData, User, UserQueries> {
  constructor() {
    super(new UserQueries());
  }

  protected getSchema(): ZodObject<any> {
    return UserSchema;
  }

  protected getInnerSchemas(): {
    schema: ZodObject<any>;
    fieldName: string;
    isList?: boolean;
  }[] {
    return [
      { schema: CartSchema, fieldName: "cart", isList: false },
      { schema: OrderSchema, fieldName: "orders", isList: true },
      { schema: ProductSchema, fieldName: "productsOwned", isList: true },
    ];
  }

  async findUserByEmail(email: string): Promise<UserData> {
    return this.findById(email);
  }

  async createUser(inputData: UserData): Promise<UserData> {
    return this.create(inputData);
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.findAll();
  }

  async updateUser(email: string, inputData: UserData): Promise<UserData> {
    return this.update(email, inputData);
  }

  async deleteUser(email: string): Promise<UserData> {
    return this.delete(email);
  }
}

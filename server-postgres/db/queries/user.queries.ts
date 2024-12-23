import { BaseQueries } from "./base.queries";
import { PrismaClient, type User } from "@prisma/client";

export class UserQueries extends BaseQueries<User> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "user";
  }

  protected getIdName(): string {
    return "email";
  }
}

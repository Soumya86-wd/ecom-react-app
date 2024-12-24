import { logError } from "../../utils";
import { BaseQueries } from "./base.queries";
import { PrismaClient, type Cart } from "@prisma/client";

export class CartQueries extends BaseQueries<Cart> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "cart";
  }

  protected getIdName(): string {
    return "id";
  }

  async findById(id: string): Promise<Cart | null> {
    try {
      return await this.getModelClient().findUnique({
        where: { id },
        include: {
          items: true,
        },
      });
    } catch (error) {
      logError(error, `Error in findById(${id}) for cart model`);
      throw error;
    }
  }
}

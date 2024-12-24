import { logError } from "../../utils";
import { BaseQueries } from "./base.queries";
import { PrismaClient, type Brand } from "@prisma/client";

export class BrandQueries extends BaseQueries<Brand> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "brand";
  }

  protected getIdName(): string {
    return "id";
  }

  async findById(id: string | number): Promise<Brand | null> {
    try {
      return await this.getModelClient().findUnique({
        where: { id },
        include: {
          products: true,
        },
      });
    } catch (error) {
      logError(error, `Error in findById(${id}) for brand model`);
      throw error;
    }
  }
}

import { PrismaClient, Prisma } from "@prisma/client";
import { initializePrismaClient } from "./prisma.client";
import { validateEnvVariables, logger } from "../../utils";

export abstract class BaseQueries<TModel> {
  private prismaClient: PrismaClient;

  constructor() {
    try {
      validateEnvVariables(["DATABASE_URL"]);
    } catch (error) {
      logger.error({ error }, "Error in queries during environment validation");
      process.exit(1);
    }
    this.prismaClient = initializePrismaClient();
  }

  protected abstract getModel(): keyof PrismaClient;
  protected abstract getIdName(): string;

  async findAll(): Promise<TModel[]> {
    try {
      return await this.getModelClient().findMany();
    } catch (error) {
      logger.error(
        { error },
        `Error in findAll for ${String(this.getModel())} model`
      );
      throw error;
    }
  }

  async findById(id: string | bigint, options?: any): Promise<TModel | null> {
    try {
      return await this.getModelClient().findUnique({
        where: { [this.getIdName()]: id },
        ...options,
      });
    } catch (error) {
      logger.error(
        { error },
        `Error in findById(${id}) for ${String(this.getModel())} model`
      );
      throw error;
    }
  }

  async addNew(newData: Prisma.InputJsonObject): Promise<TModel> {
    try {
      return await this.getModelClient().create({ data: newData });
    } catch (error) {
      logger.error(
        { error },
        `Error in addNew for ${String(this.getModel())} model`
      );
      throw error;
    }
  }

  async updateData(
    id: string | bigint,
    newData: Prisma.InputJsonObject
  ): Promise<TModel | null> {
    try {
      return await this.getModelClient().update({
        where: { [this.getIdName()]: id },
        data: newData,
      });
    } catch (error) {
      logger.error(
        { error },
        `Error in updateData(${id}) for ${String(this.getModel())} model`
      );
      throw error;
    }
  }

  async deleteData(id: string | bigint): Promise<TModel | null> {
    try {
      return await this.getModelClient().delete({
        where: { [this.getIdName()]: id },
      });
    } catch (error) {
      logger.error(
        { error },
        `Error in deleteData(${id}) for ${String(this.getModel())} model`
      );
      throw error;
    }
  }

  protected getModelClient(): any {
    const model = this.getModel();
    return this.prismaClient[model];
  }

  public async disconnect(): Promise<void> {
    await this.prismaClient.$disconnect();
  }
}

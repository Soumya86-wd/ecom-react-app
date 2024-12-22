import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

let prismaClient: PrismaClient | null = null;

export class BaseQueries<TModel> {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    config({ path: path.resolve(__dirname, "../prisma/.env") });
  }

  protected getClient(): PrismaClient {
    if (!prismaClient) {
      prismaClient = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    }

    // Check for missing variables
    const requiredEnvVars = ["DATABASE_URL"];
    const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
    if (missingVars.length > 0) {
      console.error(
        `Missing required environment variables: ${missingVars.join(", ")}`
      );
      process.exit(1);
    }
    console.log("Prisma environment variables loaded effectively");

    return prismaClient;
  }

  protected getModel(): keyof PrismaClient {
    throw new Error("Subclass MUST implement getModel method of BaseQueries");
  }

  protected getIdName(): string {
    throw new Error("Subclass MUST implement getIdName method of BaseQueries");
  }

  async findAll(): Promise<TModel[]> {
    try {
      const modelClient = this.getModelClient();
      return await (modelClient as any).findMany(); // Bypass type safety here
    } catch (error) {
      console.error(`Error in findAll() for model ${String(this.getModel())}
      Error: ${error}`);
      throw error;
    }
  }

  async findById(id: string | number): Promise<TModel | null> {
    try {
      const modelClient = this.getModelClient();
      return await (modelClient as any).findUnique(this.getIdClause(id)); // Bypass type safety here
    } catch (error) {
      console.error(`Error in findById(${id}) for model ${String(
        this.getModel()
      )}
        Error: ${error}`);
      throw error;
    }
  }

  async addNew(newData: object): Promise<TModel> {
    try {
      const modelClient = this.getModelClient();
      return await (modelClient as any).create(this.setParamsData(newData)); // Bypass type safety here
    } catch (error) {
      console.error(`Error in addNew() for model ${String(this.getModel())}
        Data: ${JSON.stringify(newData)}
        Error: ${error}`);
      throw error;
    }
  }

  async updateData(id: string | number, newData: object): Promise<TModel> {
    try {
      const modelClient = this.getModelClient();
      return await (modelClient as any).update({
        ...this.getIdClause(id),
        ...this.setParamsData(newData),
      }); // Bypass type safety here
    } catch (error) {
      console.error(`Error in updateData(${id}) for model ${String(
        this.getModel()
      )}
        Data: ${JSON.stringify(newData)}
        Error: ${error}`);
      throw error;
    }
  }

  async deleteData(id: string | number): Promise<TModel> {
    try {
      const modelClient = this.getModelClient();
      return await (modelClient as any).delete(this.getIdClause(id));
    } catch (error) {
      console.error(`Error in deleteData(${id}) for model ${String(
        this.getModel()
      )}
        Error: ${error}`);
      throw error;
    }
  }

  private setParamsData(newData: object): object {
    return {
      data: newData,
    };
  }

  private getIdClause(idValue: string | number): object {
    const idName = this.getIdName();
    return {
      where: {
        [idName]: idValue,
      },
    };
  }

  private getModelClient(): any {
    const currentModel = this.getModel();
    return this.getClient()[currentModel];
  }

  public async disconnect(): Promise<void> {
    if (prismaClient) {
      prismaClient.$disconnect();
      prismaClient = null;
    }
  }
}

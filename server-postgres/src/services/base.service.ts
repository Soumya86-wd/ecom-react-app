import { ZodObject } from "zod";
import { BaseQueries } from "../../db/queries/base.queries";
import { logger } from "../../utils";

export abstract class BaseService<
  TData extends Record<string, any>,
  TModel,
  TQuery extends BaseQueries<TModel>
> {
  private queries: TQuery;

  constructor(tQueries: TQuery) {
    this.queries = tQueries;
  }

  private parseInnerLists(
    innerSchemas: {
      schema: ZodObject<any>;
      fieldName: string;
      isList?: boolean;
    }[],
    inputData: Record<string, any>
  ) {
    innerSchemas.forEach(({ schema, fieldName, isList = true }) => {
      if (inputData[fieldName]) {
        if (isList) {
          // Parse list of items
          inputData[fieldName] = inputData[fieldName].map((item: any) =>
            schema.parse(item)
          );
        } else {
          // Parse single item
          inputData[fieldName] = schema.parse(inputData[fieldName]);
        }
      }
    });
  }

  private validateInputData(inputData: Record<string, any>): void {
    this.getSchema().parse(inputData);

    const innerSchemas = this.getInnerSchemas();
    this.parseInnerLists(innerSchemas, inputData);
  }

  protected abstract getSchema(): ZodObject<any>;
  protected abstract getInnerSchemas(): {
    schema: ZodObject<any>;
    fieldName: string;
    isList?: boolean;
  }[];

  protected async findById(id: string | bigint, options?: any): Promise<TData> {
    try {
      const retrievedData = (await this.queries.findById(
        id,
        options
      )) as TData | null;
      if (!retrievedData) {
        throw new Error(`Record with ID ${id} not found.`);
      }
      return retrievedData;
    } catch (error) {
      logger.error({ error }, `Error in findById(${id}) service.`);
      throw error;
    }
  }

  protected async create(inputData: TData): Promise<TData> {
    try {
      this.validateInputData(inputData);

      const serializedData = JSON.parse(JSON.stringify(inputData));
      const insertedData = (await this.queries.addNew(
        serializedData
      )) as TData | null;

      if (!insertedData) {
        throw new Error("Failed to insert data.");
      }

      return insertedData;
    } catch (error) {
      logger.error({ error }, "Error in create() service.");
      throw error;
    }
  }

  protected async findAll(): Promise<TData[]> {
    try {
      const retrievedList =
        (await this.queries.findAll()) as unknown as TData[];
      return retrievedList;
    } catch (error) {
      logger.error({ error }, `Error in findAll() service.`);
      throw error;
    }
  }

  protected async update(
    id: string | bigint,
    inputData: TData
  ): Promise<TData> {
    try {
      this.validateInputData(inputData);
      const serializedData = JSON.parse(JSON.stringify(inputData));
      const updatedData = (await this.queries.updateData(
        id,
        serializedData
      )) as TData | null;

      if (!updatedData) {
        throw new Error("Failed to update data.");
      }

      return updatedData;
    } catch (error) {
      logger.error({ error }, `Error in update(${id}) service.`);
      throw error;
    }
  }

  protected async delete(id: string | bigint): Promise<TData> {
    try {
      const deletedData = (await this.queries.deleteData(id)) as TData | null;

      if (!deletedData) {
        throw new Error(`Record with ID ${id} not found.`);
      }

      return deletedData;
    } catch (error) {
      logger.error({ error }, `Error in delete() service.`);
      throw error;
    }
  }

  async disconnect() {
    await this.queries.disconnect();
  }
}

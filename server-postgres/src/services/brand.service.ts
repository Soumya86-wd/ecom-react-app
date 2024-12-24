import { logError } from "../../utils";
import { BrandQueries } from "../../db";
import { BrandData, BrandSchema, ProductSchema } from "../validators";

export class BrandService {
  private brandQueries: BrandQueries;

  constructor() {
    this.brandQueries = new BrandQueries();
  }

  private parseProducts(products?: BrandData["products"]) {
    return products
      ? products.map((product) => ProductSchema.parse(product))
      : [];
  }

  async findBrandById(id: string): Promise<BrandData> {
    try {
      const retrievedData: BrandData | null = await this.brandQueries.findById(
        id
      );
      if (!retrievedData) {
        throw new Error(`Brand with id ${id} not found.`);
      }
      return retrievedData;
    } catch (error) {
      logError(error, `Error in findBrandById(${id}).`);
      throw error;
    }
  }

  async createNewBrand(inputData: BrandData): Promise<BrandData> {
    try {
      BrandSchema.parse(inputData);
      inputData.products = this.parseProducts(inputData.products);

      const serializedData = JSON.parse(JSON.stringify(inputData));
      const insertedData = await this.brandQueries.addNew(serializedData);

      if (!insertedData) {
        throw new Error("Failed to insert brand data.");
      }

      return insertedData;
    } catch (error) {
      logError(error, `Error in createNewBrand().`);
      throw error;
    }
  }

  async findAllBrands(): Promise<BrandData[]> {
    try {
      const listOfBrands = await this.brandQueries.findAll();
      return listOfBrands;
    } catch (error) {
      logError(error, `Error in findAllBrands() for brand service.`);
      throw error;
    }
  }

  async updateBrand(id: string, inputData: BrandData): Promise<BrandData> {
    try {
      BrandSchema.parse(inputData);

      inputData.products = this.parseProducts(inputData.products);

      const serializedData = JSON.parse(JSON.stringify(inputData));
      const updatedData: BrandData | null = await this.brandQueries.updateData(
        id,
        serializedData
      );

      if (!updatedData) {
        throw new Error(`Unable to update brand with id ${id}.`);
      }

      return updatedData;
    } catch (error) {
      logError(error, `Error in updateBrand() for brand service.`);
      throw error;
    }
  }

  async deleteBrand(id: string): Promise<BrandData> {
    try {
      const deletedData: BrandData | null = await this.brandQueries.deleteData(
        id
      );
      if (!deletedData) {
        throw new Error(`Brand with id ${id} not found for deletion.`);
      }
      return deletedData;
    } catch (error) {
      logError(error, `Error in deleteBrand(${id}) for brand service.`);
      throw error;
    }
  }

  async disconnect() {
    await this.brandQueries.disconnect();
  }
}

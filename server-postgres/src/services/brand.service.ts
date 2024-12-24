import { logError } from "../../utils";
import { BrandQueries } from "../../db";
import { BrandData, BrandSchema, ProductSchema } from "../validators";

const brandQueries = new BrandQueries();

export const findBrandById = async (id: string): Promise<BrandData> => {
  try {
    const brandData: BrandData = BrandSchema.parse(
      await brandQueries.findById(id)
    );
    return brandData;
  } catch (error) {
    logError(error, `Error in findBrandById(${id}) for brand service.`);
    throw error;
  }
};

export const createNewBrand = async (
  brandData: BrandData
): Promise<BrandData> => {
  try {
    BrandSchema.parse(brandData);

    if (brandData.products) {
      brandData.products = brandData.products.map((product) =>
        ProductSchema.parse(product)
      );
    }

    const serializedData = JSON.parse(JSON.stringify(brandData));
    const insertedData: BrandData = await brandQueries.addNew(serializedData);

    if (!insertedData) {
      const newError = new Error("Problem inserting data");
      logError(newError, `Error in createNewBrand() for brand service.`);
      throw newError;
    }

    return insertedData;
  } catch (error) {
    logError(error, `Error in createNewBrand() for brand service.`);
    throw error;
  }
};

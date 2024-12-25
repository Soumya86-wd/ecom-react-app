import { log } from "console";
import { BrandService } from "./src/services/brand.service";
import { logError } from "./utils";

const brandService = new BrandService();

async function testBrandService() {
  try {
    log("Attempting to create a new brand");
    const createdBrand = await brandService.createNewBrand({
      name: "A Latest Brand",
      email: "something@somewhere.com",
      website: "#",
      company: "Branded",
    });
    log("Created Brand: ", createdBrand);

    log("Attempting to search the created brand by id");
    log(`ID of the new brand: ${createdBrand.id}`);
    const brandById = await brandService.findBrandById(
      createdBrand.id as string
    );
    log("Brand found by id: ", brandById);

    log("Attempting to update the name of the created brand");
    const existingBrandData = {
      ...createdBrand,
    };
    const updatedBrand = await brandService.updateBrand(
      existingBrandData.id as string,
      {
        ...existingBrandData,
        name: "Not so latest brand",
      }
    );
    log("Updated Brand: ", updatedBrand);

    log("Attempting to delete the created brand");
    const deletedBrand = await brandService.deleteBrand(
      createdBrand.id as string
    );
    log("Deleted Brand: ", deletedBrand);

    const allBrands = await brandService.findAllBrands();
    log("Remaining brands: ", allBrands);
  } catch (error) {
    logError(error, "Error testing service layer");
  } finally {
    await brandService.disconnect();
  }
}

// testBrandService();

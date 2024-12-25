import { log } from "console";
import { BrandService } from "./src/services/brand.service";
import { logError } from "./utils";

const brandService = new BrandService();

async function testBrandService() {
  try {
    // log("Attempting to retrieve all brands...");
    // const allBrands = await brandService.findAllBrands();
    // log("All brands: ", allBrands);

    // log(
    //   "Attempting to retrieve brand by id: 0ec07c3b-29a8-44d1-a9f6-adc465cba923"
    // );
    // const specificBrand = await brandService.findBrandById(
    //   "0ec07c3b-29a8-44d1-a9f6-adc465cba923"
    // );
    // log("Brand retrieved: ", specificBrand);

    log("Attempting to create a new brand");
    const createdBrand = await brandService.createNewBrand({
      name: "A Latest Brand",
      email: "something@somewhere.com",
      website: "#",
      company: "Branded",
    });
    log("Created Brand: ", createdBrand);

    log("Attempting to update the created brand");
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

testBrandService();

import { log } from "console";
import { CategoryService } from "./src/services";
import { logError } from "./utils";

const service = new CategoryService();

async function testService() {
  try {
    // Create new row
    log("Attempting to create a new Item");
    const createdItem = await service.createNewCategory({
      name: "TestCategory",
    });
    log("Created Item: ", createdItem);

    // Find the created item by its Primary Key
    log("Attempting to search the created Item by id");
    const createdItemPK = createdItem.name;
    log(`ID of the new Item: ${createdItemPK}`);
    const itemById = await service.findCategoryByName(createdItemPK);
    log("Item found by id: ", itemById);

    // Add something other than Primary Key
    log("Attempting to update the name of the created Item");
    const updateData = {
      ...createdItem,
      tagNames: ["A tag", "Another new tag"],
    };
    const updatedItem = await service.updateCategory(createdItemPK, updateData);
    log("Updated Item: ", updatedItem);

    // Delete the record using its Primary Key
    log("Attempting to delete the created Item");
    const deletedItem = await service.deleteCategory(createdItemPK);
    log("Deleted Item: ", deletedItem);

    // Retrieve all remaining items from db
    const remainingItems = await service.findAllCategories();
    log("Remaining Items: ", remainingItems);
  } catch (error) {
    logError(error, "Error testing service layer");
  } finally {
    await service.disconnect();
  }
}

// testService();

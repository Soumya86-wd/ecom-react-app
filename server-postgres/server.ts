import { CategoryService } from "./src/services";
import { logger } from "./utils";

const service = new CategoryService();

async function testService() {
  try {
    // Create new row
    logger.info("Attempting to create a new Item");
    const createdItem = await service.createNewCategory({
      name: "TestCategory",
    });
    logger.info("Created Item: ", createdItem);

    // Find the created item by its Primary Key
    logger.info("Attempting to search the created Item by id");
    const createdItemPK = createdItem.name;
    logger.info(`ID of the new Item: ${createdItemPK}`);
    const itemById = await service.findCategoryByName(createdItemPK);
    logger.info("Item found by id: ", itemById);

    // Add something other than Primary Key
    logger.info("Attempting to update the name of the created Item");
    const updateData = {
      ...createdItem,
      tagNames: ["A tag", "Another new tag"],
    };
    const updatedItem = await service.updateCategory(createdItemPK, updateData);
    logger.info("Updated Item: ", updatedItem);

    // Delete the record using its Primary Key
    logger.info("Attempting to delete the created Item");
    const deletedItem = await service.deleteCategory(createdItemPK);
    logger.info("Deleted Item: ", deletedItem);

    // Retrieve all remaining items from db
    const remainingItems = await service.findAllCategories();
    logger.info("Remaining Items: ", remainingItems);
  } catch (error) {
    logger.error({ error }, "Error testing service layer");
  } finally {
    await service.disconnect();
  }
}

// testService();

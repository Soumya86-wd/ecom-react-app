import { logError } from "../../utils";
import { CartQueries } from "../../db";
import { CartData, CartSchema, TransactionItemSchema } from "../validators";

export class CartService {
  private cartQueries: CartQueries;

  constructor() {
    this.cartQueries = new CartQueries();
  }

  // Parse items only if they exist
  private parseItems(items?: CartData["items"]) {
    return items && items.map((item) => TransactionItemSchema.parse(item));
  }

  //TODO findCartByUserEmail

  async findCartById(id: string): Promise<CartData> {
    try {
      const retrievedData: CartData | null = await this.cartQueries.findById(
        id,
        { include: { items: true } }
      );
      if (!retrievedData) {
        throw new Error(`Cart with id ${id} not found.`);
      }
      return retrievedData;
    } catch (error) {
      logError(error, `Error in findCartById(${id}).`);
      throw error;
    }
  }

  async createCart(inputData: CartData): Promise<CartData> {
    try {
      CartSchema.parse(inputData);
      inputData.items = this.parseItems(inputData.items);

      const serializedData = JSON.parse(JSON.stringify(inputData));
      const insertedData = await this.cartQueries.addNew(serializedData);

      if (!insertedData) {
        throw new Error("Failed to insert cart data.");
      }

      return insertedData;
    } catch (error) {
      logError(error, `Error in createCart().`);
      throw error;
    }
  }

  async updateCart(id: string, inputData: CartData): Promise<CartData> {
    try {
      CartSchema.parse(inputData);

      inputData.items = this.parseItems(inputData.items);

      const serializedData = JSON.parse(JSON.stringify(inputData));
      const updatedData: CartData | null = await this.cartQueries.updateData(
        id,
        serializedData
      );

      if (!updatedData) {
        throw new Error(`Unable to update cart with id ${id}.`);
      }

      return updatedData;
    } catch (error) {
      logError(error, `Error in updateCart(${id})`);
      throw error;
    }
  }

  async deleteCart(id: string): Promise<CartData> {
    try {
      const deletedData: CartData | null = await this.cartQueries.deleteData(
        id
      );
      if (!deletedData) {
        throw new Error(`Cart with id ${id} not found for deletion.`);
      }
      return deletedData;
    } catch (error) {
      logError(error, `Error in cartBrand(${id})`);
      throw error;
    }
  }

  async disconnect() {
    await this.cartQueries.disconnect();
  }
}

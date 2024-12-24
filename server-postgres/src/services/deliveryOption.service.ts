import { DeliveryOptionQueries } from "../../db";

(async () => {
  const deliveryOptionQueries = new DeliveryOptionQueries();

  try {
    const deliveryOptions = await deliveryOptionQueries.findAll();
    console.log("Delivery Options:", deliveryOptions);
  } catch (error) {
    console.error("Error during query execution:", error);
  } finally {
    await deliveryOptionQueries.disconnect();
  }
})();

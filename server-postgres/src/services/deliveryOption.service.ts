import DeliveryOptionQueries from "../../db/queries/deliveryOption.queries";

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

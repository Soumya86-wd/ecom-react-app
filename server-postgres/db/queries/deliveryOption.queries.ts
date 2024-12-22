import { BaseQueries } from "./base.queries";
import { PrismaClient, type DeliveryOption } from "@prisma/client";

class DeliveryOptionQueries extends BaseQueries<DeliveryOption> {
  constructor() {
    super();
  }

  protected getModel(): keyof PrismaClient {
    return "deliveryOption";
  }

  protected getIdName(): string {
    return "id";
  }
}

export default DeliveryOptionQueries;

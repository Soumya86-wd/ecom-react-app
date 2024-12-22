import { Prisma } from "@prisma/client";

const brandData: Prisma.BrandCreateInput = {
  name: "",
  email: "",
  website: "",
  company: "",
};

const categoryData: Prisma.CategoryCreateInput = {
  name: "",
};

const userData: Prisma.UserCreateInput = {
  email: "",
  nickname: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
};

const productData: Prisma.ProductCreateInput = {
  name: "",
  description: "",
  imgName: "",
  imgType: "",
  pricePaisa: 0,
  stock: 0,
  brand: { connect: { id: brandData.id } },
  category: { connect: { name: categoryData.name } },
  owner: { connect: { email: userData.email } },
};

const deliveryOptionData: Prisma.DeliveryOptionCreateInput = {
  deliveryDays: 0,
  costPaisa: 0,
};

const transactionItemData: Prisma.TransactionItemCreateInput = {
  quantity: 0,
  product: { connect: { id: productData.id } },
  deliveryOption: { connect: { id: deliveryOptionData.id } },
};

const cartData: Prisma.CartCreateInput = {
  customer: { connect: { email: userData.email } },
};

const orderData: Prisma.OrderCreateInput = {
  customer: { connect: { email: userData.email } },
  deliveryDate: new Date(),
};

export {
  brandData,
  categoryData,
  userData,
  productData,
  deliveryOptionData,
  transactionItemData,
  cartData,
  orderData,
};

export { UserRole, TransactionState, OrderState } from "@prisma/client";

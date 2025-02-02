import { PrismaClient, UserRole, Prisma } from "@prisma/client";
import { validateEnvVariables, env, logger } from "../../utils";

console.log("Loading environment variables for Prisma configuration.");
const requiredEnvVars = ["DATABASE_URL"];
try {
  validateEnvVariables(requiredEnvVars);
} catch (error) {
  logger.error({ error }, "Error in seed.ts during environment validation");
  process.exit(1);
}

console.log("Prisma environment variables loaded successfully.");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

// Commented to avoid accidental seeding of db
// Uncomment to do the seed operation if needed
// main()
//   .then(() => {
//     logger.info("Seeding process successful");
//   })
//   .catch((error) => {
//     logger.error({ error }, "Error in seed.ts during environment validation");
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });

async function main() {
  logger.info("Starting the seed process...");

  const brandInputRows: Prisma.BrandCreateInput[] = [
    {
      name: "A BuyIt Brand",
      email: "soumya.chakraborty@iiml.org",
      website: "#",
      company: "Buy It",
    },
    {
      name: "New Brand",
      email: "new-brand@branding.com",
      website: "#",
      company: "Brandings",
    },
  ];

  const categoryInputRows: Prisma.CategoryCreateInput[] = [
    { name: "General" },
    { name: "Clothing" },
    { name: "Appliances" },
  ];

  const userInputRows: Prisma.UserCreateInput[] = [
    {
      email: "soumya.chakraborty@iiml.org",
      nickname: "admin",
      phone: "0123456789",
      firstName: "Soumya",
      lastName: "Chakraborty",
      address: "Buy It HQ",
      role: UserRole.ADMIN,
    },
  ];

  const deliveryOptionInputRows: Prisma.DeliveryOptionCreateInput[] = [
    { deliveryDays: 7, costPaisa: 0 },
    { deliveryDays: 3, costPaisa: 4999 },
    { deliveryDays: 1, costPaisa: 9999 },
  ];

  // Seed data into respective tables using the generic seeder function
  const brandSeedingResult = await seedTable(prisma.brand, brandInputRows);
  logger.info(`Seeded Brand Table with ${brandSeedingResult.count} rows.`);

  const categorySeedingResult = await seedTable(
    prisma.category,
    categoryInputRows
  );
  logger.info(
    `Seeded Category Table with ${categorySeedingResult.count} rows.`
  );

  const userSeedingResult = await seedTable(prisma.user, userInputRows);
  logger.info(`Seeded User Table with ${userSeedingResult.count} rows.`);

  const deliveryOptionSeedingResult = await seedTable(
    prisma.deliveryOption,
    deliveryOptionInputRows
  );
  logger.info(
    `Seeded DeliveryOption Table with ${deliveryOptionSeedingResult.count} rows.`
  );
}

interface PrismaModel {
  createMany: (args: { data: any[] }) => Promise<{ count: number }>;
  deleteMany: (args?: any) => Promise<{ count: number }>;
}

async function seedTable<T>(
  model: PrismaModel,
  inputRows: T[]
): Promise<{ count: number }> {
  try {
    // Delete existing rows
    const deleteResult = await model.deleteMany();
    logger.info(`Deleted ${deleteResult.count} existing rows.`);

    // Seed new rows
    const createResult = await model.createMany({ data: inputRows });
    return createResult;
  } catch (error) {
    logger.error({ error }, "Error in seedTable");
    throw error;
  }
}

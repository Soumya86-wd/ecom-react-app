import { config } from "dotenv";
import { PrismaClient, UserRole } from "@prisma/client";
import { error, log } from "console";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables from the .env in the same folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, "./.env") });

console.log("Loading environment variables for Prisma configuration.");

// List of required environment variables
const requiredEnvVars = ["DATABASE_URL"];

// Check for missing variables
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1); // Exit the application with a failure code
}

console.log("Prisma enviroment variables loaded effectively");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  log("starting the seed process...");

  const brandRows = await prisma.brand.createMany({
    data: [
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
    ],
  });

  log("brand seeding complete !!! created rows: ", brandRows);

  const categoryRows = await prisma.category.createMany({
    data: [{ name: "General" }, { name: "Clothing" }, { name: "Appliances" }],
  });

  log("category seeding complete !!! created rows: ", categoryRows);

  const userCreated = await prisma.user.create({
    data: {
      email: "soumya.chakraborty@iiml.org",
      nickname: "admin",
      phone: "0123456789",
      firstName: "Soumya",
      lastName: "Chakraborty",
      address: "Buy It HQ",
      role: UserRole.ADMIN,
    },
  });

  log("admin user created: ", userCreated);

  const deliveryOptionsRows = await prisma.deliveryOption.createMany({
    data: [
      { deliveryDays: 7, costPaisa: 0 },
      { deliveryDays: 3, costPaisa: 4999 },
      { deliveryDays: 1, costPaisa: 9999 },
    ],
  });

  log("delivery seeding complete !!! created rows: ", deliveryOptionsRows);
}

// main()
//   .then(() => {
//     log("seeding process successful");
//   })
//   .catch((err) => {
//     error("seeding process failed ", err);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect;
//   });

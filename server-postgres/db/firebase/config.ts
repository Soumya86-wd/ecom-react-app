import admin from "firebase-admin";
import { validateEnvVariables, env, logError } from "../../utils";

const requiredEnvVars = ["FIREBASE_PROJECT_ID", "FIREBASE_SERVICE_ACCOUNT_KEY"];

try {
  validateEnvVariables(requiredEnvVars);
} catch (error) {
  logError(error, "Error in firebase/config.ts during environment validation");
  process.exit(1);
}

console.log("Firebase enviroment variables loaded effectively");

let serviceAccount: admin.ServiceAccount;
try {
  serviceAccount = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  logError(error, "Invalid JSON in FIREBASE_SERVICE_ACCOUNT_KEY");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: env.FIREBASE_PROJECT_ID,
});

console.log("Firebase Admin SDK initialized successfully");

export default admin.auth();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
import { validateEnvVariables, env, logError } from "../../utils";

const requiredEnvVars = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
];

try {
  validateEnvVariables(requiredEnvVars);
} catch (error) {
  logError(error, "Error in firebase/config.ts during environment validation");
  process.exit(1);
}

console.log("Firebase enviroment variables loaded effectively");

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const googleAuth = new GoogleAuthProvider();

export default auth;
// export { googleAuth };

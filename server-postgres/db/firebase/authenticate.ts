import admin from "./config";
import { logError } from "../../utils";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export const createUser = async (
  email: string,
  password: string
): Promise<UserRecord> => {
  try {
    const userRecord = await admin.createUser({ email, password });
    console.log(`User created succcessfully: ${userRecord.uid}`);
    return userRecord;
  } catch (error) {
    logError(error, "Error creating user");
    throw error;
  }
};

export const verifyToken = async (idToken: string): Promise<DecodedIdToken> => {
  try {
    const decodedToken = admin.verifyIdToken(idToken);
    console.log(`Token verified successfully: ${decodedToken}`);
    return decodedToken;
  } catch (error) {
    logError(error, "Error verifying token");
    throw error;
  }
};

export const revokeTokens = async (uid: string): Promise<void> => {
  try {
    await admin.revokeRefreshTokens(uid);
    console.log(`Tokens revoked for user: ${uid}`);
  } catch (error) {
    logError(error, "Error revoking tokens");
    throw error;
  }
};

export const getUserById = async (uid: string): Promise<UserRecord> => {
  try {
    const userRecord = await admin.getUser(uid);
    console.log(`User details retrieved for user: ${userRecord.uid}`);
    return userRecord;
  } catch (error) {
    logError(error, "Error retrieving user details");
    throw error;
  }
};

export const deleteUderById = async (uid: string): Promise<void> => {
  try {
    await admin.deleteUser(uid);
    console.log(`User with id: ${uid} deleted successfully`);
  } catch (error) {
    logError(error, "Error deleting user");
    throw error;
  }
};

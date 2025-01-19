import admin from "./config";
import { logger } from "../../utils";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export const createUser = async (
  email: string,
  password: string
): Promise<UserRecord> => {
  try {
    const userRecord = await admin.createUser({ email, password });
    logger.info(`User created succcessfully: ${userRecord.uid}`);
    return userRecord;
  } catch (error) {
    logger.error({ error }, "Error creating user");
    throw error;
  }
};

export const verifyToken = async (idToken: string): Promise<DecodedIdToken> => {
  try {
    const decodedToken = admin.verifyIdToken(idToken);
    logger.info(`Token verified successfully: ${decodedToken}`);
    return decodedToken;
  } catch (error) {
    logger.error({ error }, "Error verifying token");
    throw error;
  }
};

export const revokeTokens = async (uid: string): Promise<void> => {
  try {
    await admin.revokeRefreshTokens(uid);
    logger.info(`Tokens revoked for user: ${uid}`);
  } catch (error) {
    logger.error({ error }, "Error revoking tokens");
    throw error;
  }
};

export const getUserById = async (uid: string): Promise<UserRecord> => {
  try {
    const userRecord = await admin.getUser(uid);
    logger.info(`User details retrieved for user: ${userRecord.uid}`);
    return userRecord;
  } catch (error) {
    logger.error({ error }, "Error retrieving user details");
    throw error;
  }
};

export const deleteUderById = async (uid: string): Promise<void> => {
  try {
    await admin.deleteUser(uid);
    logger.info(`User with id: ${uid} deleted successfully`);
  } catch (error) {
    logger.error({ error }, "Error deleting user");
    throw error;
  }
};

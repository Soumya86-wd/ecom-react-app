import {
  createUser,
  verifyToken,
  revokeTokens,
  getUserById,
  deleteUderById,
} from "../../db";

export class AuthService {
  async createUser(email: string, password: string) {
    return createUser(email, password);
  }

  async verifyToken(idToken: string) {
    return verifyToken(idToken);
  }

  async revokeTokens(uid: string) {
    return revokeTokens(uid);
  }

  async getUserById(uid: string) {
    return getUserById(uid);
  }

  async deleteUserById(uid: string) {
    return deleteUderById(uid);
  }
}

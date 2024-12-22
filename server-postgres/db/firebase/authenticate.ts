import {
  createUserWithEmailAndPassword as createFirebaseUser,
  signInWithEmailAndPassword as loginFirebaseUser,
  signOut as logoutFirebaseUser,
} from "firebase/auth";

import auth from "./config";

const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createFirebaseUser(auth, email, password);
    const user = userCredential.user;
    console.log(user); // For now logging, later will be added to session
  } catch (err) {
    err instanceof Error
      ? console.error(err.message)
      : console.error("Error occured ", err);
  }
};

const login = async (email: string, password: string) => {
  try {
    const userCredential = await loginFirebaseUser(auth, email, password);
    const user = userCredential.user;
    console.log(user);
  } catch (err) {
    err instanceof Error
      ? console.error(err.message)
      : console.error("Error occured ", err);
  }
};

const logOut = async () => {
  try {
    await logoutFirebaseUser(auth);
  } catch (err) {
    err instanceof Error
      ? console.error(err.message)
      : console.error("Error occured ", err);
  }
};

export { signup, login, logOut };

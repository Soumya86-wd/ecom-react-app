import auth from "./config";
import { onAuthStateChanged } from "firebase/auth";
//import Redux store and reducers, like setUser(), clearUser()

export const initAuthObserver = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //store.dispatch(setUser({whatever creadentials needed to be added}))
    } else {
      //store.dispatch(clearUser())
    }
  });
};

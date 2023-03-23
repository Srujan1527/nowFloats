import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/Firebase/firebase";
// import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

// export const USER_ACTION_TYPES = {
//   // We write the cases in an object so that we can access easily and also to avoid human errors
//   SET_CURRENT_USER: "SET_CURRENT_USER",
// };

// const userReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     default:
//       throw new Error(`unhandled type ${type} in userReducer`);
//   }
// };

// const INITIAL_STATE = {
//   currentUser: null,
// };

export const UserProvider = ({ children }) => {
  //   const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  // if (typeof Cookies.get("myValue") === undefined) {
  //   Cookies.set("myValue", null);
  // }
  const cookieValue = Cookies.get("myValue");

  if (cookieValue === undefined) {
    Cookies.set("myValue", null);
  }
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("myValue")) || null
  );
 
  // console.log(JSON.parse(Cookies.get("myValue")));
  //   const setCurrentUser = (user) => {
  //     dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  //   };
  //   const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
      Cookies.set("myValue", JSON.stringify(currentUser));
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

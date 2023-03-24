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



export const UserProvider = ({ children }) => {
 
  const cookieValue = Cookies.get("myValue");

  if (cookieValue === undefined) {
    Cookies.set("myValue", null);
  }
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("myValue")) || null
  );
 
  
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

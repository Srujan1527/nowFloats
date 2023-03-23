import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { getDocumentFromCollection } from "../../utils/Firebase/firebase";
import UserInfo from "../UserInfo/UserInfo";

const Profile = () => {
  const [doc, setGetDoc] = useState({});
  // const id = Cookies.get("userObj");

  useEffect(() => {
    const fetchDetails = async () => {
      const userObject = JSON.parse(Cookies.get("myValue"));
      if (userObject === null) return;
      const newId = userObject.uid;
      const newDoc = await getDocumentFromCollection(newId);
      console.log(newDoc);
      setGetDoc(newDoc);
    };
    fetchDetails();
  }, []);
  console.log(doc);

  return (
    <div data-testid="profile">
      <UserInfo user={doc} />;
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import "./UserInfo.css";
import { storage } from "../../utils/Firebase/firebase";

const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);

  const [isUser, setIsUser] = useState(false);
  if (user === null) {
    setIsUser(true);
  }

  useEffect(() => {
    const fetchImages = () => {
      fetchItemsFromStorage(user);
    };
    fetchImages();
  }, [user]);

  const fetchItemsFromStorage = (userAuth) => {
    const email = userAuth.email;

    const listRef = ref(storage, `${email}`);
    listAll(listRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => url)
        );

        Promise.all(promises).then((urls) => {
          setUrls(urls);
        });
      })
      .catch((error) => {
        console.log(" Uh-oh, an error occurred!");
      });
  };
  console.log(urls);

  const goBack = () => {
    navigate("/");
  };

  const userArray = Object.entries(user);
  const filteredArray = userArray.filter(([key, value]) => key !== "createdAt");
  // console.log(userArray);
  // console.log(filteredArray);
  return (
    <div className="user-container">
      <h2 className="heading">User Information</h2>
      <ul className="ul-container">
        {isUser && <p>No Such Document</p>}
        {filteredArray.map(([key, value]) => (
          <li key={key} className="heading1">
            <strong className="heading">{key}: </strong>
            {value}
          </li>
        ))}
      </ul>

      <h1>Your Content</h1>
      <div className="items-container">
        {urls.map((url) => (
          <div key={url}>
            <img src={url} alt="images" className="image" />
          </div>
        ))}
      </div>
      <button type="button" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export default UserInfo;

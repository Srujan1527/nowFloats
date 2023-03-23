import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import './Home.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { signOutUser } from "../../utils/Firebase/firebase";
import GetContent from "../GetContent/GetContent";
const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  
  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const signOut = () => {
    signOutUser(currentUser);
    //Cookies.remove("userObj");
    Cookies.set("myValue", null);
    navigate("/login");
    console.log(currentUser);
  };
  const navigateProfile = () => {
    navigate("/profile");
  };
  const navigatePostContent = () => {
    navigate("/postContent");
  };
  return (
    <div data-testid="home">
      <nav className="nav-container">
        <p className="nav-heading">Home</p>
        <div>
          {currentUser ? (
            <button type="button" className="button" onClick={signOut}>
              SignOut
            </button>
          ) : null}
          <button className="button" onClick={navigateProfile}>
            Profile
          </button>
          <button className="button" onClick={navigatePostContent}>
            Post
          </button>
        </div>
      </nav>
      <GetContent />
    </div>
  );
};

export default Home;

import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/Signin/SignIn";
import "./App.css";
import SignUp from "./components/Signup/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import PostContent from "./components/PostContent/PostContent";
import GetContent from "./components/GetContent/GetContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/postContent" element={<PostContent />} />
      <Route path="/getContent" element={<GetContent />} />
    </Routes>

    // <div>
    //   <SignIn />
    //   <SignUp />
    // </div>
  );
}

export default App;

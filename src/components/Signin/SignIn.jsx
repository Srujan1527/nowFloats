import React, { useState } from "react";

import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import {
 
  signInAuthUserEmailAndPassword,
} from "../../utils/Firebase/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserEmailAndPassword(email, password);
      const { user } = response;

      // Cookies.set(JSON.stringify(user));

      //console.log(user);
      if (user) {
        navigate("/");
      }
      //console.log(user.email);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Incorrect Email or Password ");
      } else if (error.code === "auth/user-not-found") {
        alert("Email does not exits");
      }
      console.log("user creation encountered error", error.message);
    }
  };

  const registerUser = () => {
    navigate("/signup");
  };
  return (
    <div data-testid="sign-in" className="sign-in-container">
      <form onSubmit={signIn} className="form-container">
        <h1 className="heading">Login</h1>
        <div className="input-container">
          <label htmlFor="login-email" className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="login-email"
            required
            value={email}
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="login-password" className="label">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            required
            placeholder="Enter your password"
            value={password}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons-container">
          <button type="submit" className="button">
            Log in{" "}
          </button>
          <button type="button" onClick={registerUser} className="button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

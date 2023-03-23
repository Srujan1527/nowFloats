import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../Signup/SignUp";

describe("SignIn", () => {
  it("renders SignIn", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const component = screen.getByTestId("sign-up");
    expect(component).toBeInTheDocument();
  });
});

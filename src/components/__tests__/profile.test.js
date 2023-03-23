import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "../Profile/Profile";

describe("SignIn", () => {
  it("renders SignIn", () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    const component = screen.getByTestId("profile");
    expect(component).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home/Home";

describe("SignIn", () => {
  it("renders SignIn", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const component = screen.getByTestId("home");
    expect(component).toBeInTheDocument();
  });
});

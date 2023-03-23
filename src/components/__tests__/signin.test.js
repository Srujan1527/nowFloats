import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../Signin/SignIn";

describe("SignIn", () => {
  it("renders SignIn", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const component = screen.getByTestId("sign-in");
    expect(component).toBeInTheDocument();
  });
});

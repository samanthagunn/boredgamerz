import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
jest.mock("react-router");

const user = {
  name: "Christian Glassiognon",
  given_name: "Christian",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GiG4KuyPH8-ToSqzoBLwPTvb-px4DboWJn_Gujs=s96-c",
};
describe("The Homepage componenet...", () => {
  describe("that is user authenticated...", () => {
    beforeAll(() => {
      useAuth0.mockReturnValue({
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        isAuthenticated: true,
        isLoading: false,
        user: user,
      });
    });
    test("will render without crashing", () => {
      const { baseElement } = render(<Home />);
      expect(baseElement).toBeDefined();
    });
    describe("has a Join a game button...", () => {
      test("that displays a users name in the button.", () => {
        const { getByText } = render(<Home />);
        expect(getByText(`Join a Game ${user.given_name}`)).toBeTruthy();
      });
    });
  });
  describe("that is not user authenticated...", () => {
    beforeAll(() => {
      useAuth0.mockReturnValue({
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        isAuthenticated: false,
        isLoading: false,
        user: user,
      });
    });
    test("will render without crashing", () => {
      const { baseElement } = render(<Home />);
      expect(baseElement).toBeDefined();
    });
    describe("has a Login / Sign Up button...", () => {
      test("that is displayed.", () => {
        const { getByText } = render(<Home />);
        expect(getByText("Login / Sign Up")).toBeTruthy();
      });
      test("that when clicked redirects to authentication.", () => {
        const { getByText } = render(<Home />);
        fireEvent.click(getByText("Login / Sign Up"));
        expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
      });
    });
  });
});

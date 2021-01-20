import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/home";
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
    describe("has a Profile button...", () => {
      test("that is displayed.", () => {
        const { getByText } = render(<Home />);
        expect(getByText("Profile")).toBeTruthy();
      });
    });
    describe("has a Join a game button...", () => {
      test("that displays a users name in the button.", () => {
        const { getByText } = render(<Home />);
        expect(getByText(`Join a Game ${user.given_name}`)).toBeTruthy();
      });
    });
    test("will show Profile button", () => {
      const { getByText } = render(<Home />);
      expect(getByText("Profile")).toBeTruthy();
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
    describe("has a Login button...", () => {
      test("that is displayed", () => {
        const { getByText } = render(<Home />);
        expect(getByText("Login")).toBeTruthy();
      });
      test("that when clicked redirects to authentication.", () => {
        const { getByText } = render(<Home />);
        fireEvent.click(getByText("Login"));
        expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
      });
    });
  });
});

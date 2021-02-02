import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import renderer from "react-test-renderer";
import LandingPage from "../components/landing-page";
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
      const { baseElement } = render(<LandingPage />);
      expect(baseElement).toBeDefined();
    });
    test("will display correct snapshot.", () => {
      const tree = renderer.create(<LandingPage />).toJSON();
      expect(tree).toMatchSnapshot();
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
      const { baseElement } = render(<LandingPage />);
      expect(baseElement).toBeDefined();
    });
    test("will match snapshot.", () => {
      const tree = renderer.create(<LandingPage />).toJSON();
      expect(tree).toMatchSnapshot();
  })
    describe("has a Login / Sign Up button...", () => {
      test("that is displayed.", () => {
        const { getByText } = render(<LandingPage />);
        expect(getByText("Login / Sign Up")).toBeTruthy();
      });
      test("that when clicked redirects to authentication.", () => {
        const { getByText } = render(<LandingPage />);
        fireEvent.click(getByText("Login / Sign Up"));
        expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
      });
    });
  });
});

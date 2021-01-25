import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "@auth0/auth0-react";
import renderer from "react-test-renderer";
import Header from "../components/header";
jest.mock("@auth0/auth0-react");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const user = {
  name: "Christian Glassiognon",
  given_name: "Christian",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GiG4KuyPH8-ToSqzoBLwPTvb-px4DboWJn_Gujs=s96-c",
};
const setState = jest.fn();
describe("The header component...", () => {
  describe("that is user authenticated...", () => {
    beforeAll(() => {
      useStateMock.mockImplementation((init) => [init, setState]);
      useAuth0.mockReturnValue({
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        isAuthenticated: true,
        isLoading: false,
        user: user,
      });
    });
    test("will render without crashing.", () => {
      const { baseElement } = render(<Header />);
      expect(baseElement).toBeDefined();
    });
    test("will display correct header.", () => {
      const tree = renderer.create(<Header />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("will call state for popover.", () => {
      const { getByText } = render( <Header />);
      fireEvent.click(getByText("Profile"));
      expect(setState).toHaveBeenCalledTimes(1);
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
    test("will render without crashing.", () => {
      const { baseElement } = render(<Header />);
      expect(baseElement).toBeDefined();
    });
    test("will display correct header.", () => {
      const tree = renderer.create(<Header />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("will call login when pressed", () => {
      const { getByText } = render(<Header />);
      fireEvent.click(getByText("Login"));
      expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
    });
  });
});

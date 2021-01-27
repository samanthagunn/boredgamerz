import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Profile from '../pages/profile';
import { useAuth0 } from "@auth0/auth0-react";
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

describe("Profile page....",()=>{
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

        test("will render", ()=>{
            const {baseElement} = render(<Profile />)
            expect(baseElement).toBeDefined();
        })

        test('correct elements on page', ()=>{
            const tree = renderer.create(<Profile />).toJSON();
            expect(tree).toMatchSnapshot();
        })

        test("that Delete button is displayed.", () => {
            const { getByText } = render(<Profile />);
            expect(getByText("Delete your account")).toBeTruthy();
            });
    });
});

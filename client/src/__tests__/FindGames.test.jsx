import React, { useState as useStateMock, useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "@auth0/auth0-react";
import renderer from "react-test-renderer";
import FindGames from "../pages/FindGames";
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
describe("The Find Games page...", () => {
    describe("that is user authenticated...", () => {
        beforeAll(() => {
            useStateMock.mockImplementation((init) => [init, setState]);
            useAuth0.mockReturnValue({
                logout: jest.fn(),
                loginWithRedirect: jest.fn(),
                getAccessTokenSilently: jest.fn(),
                isAuthenticated: true,
                isLoading: false,
                user: user,
            });
        });
        

        it("will render without crashing", () => {
            const { container } = render(<FindGames />)
            expect(container.textContent)
            .toMatch('Test component');
        });
        it("will display correct...", () => {
            const tree = renderer.create(<FindGames />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    })
    });
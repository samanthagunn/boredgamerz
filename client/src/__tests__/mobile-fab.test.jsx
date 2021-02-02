import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "@auth0/auth0-react";
import FAB from "../components/mobile-fab";
import renderer from "react-test-renderer";
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

    describe("The FAB component...", () => {
        test("renders without crashing", () => {
            const { baseElement } = render(<FAB />);
            expect(baseElement).toBeDefined();
        });
        test("matches the snapshot.", () => {
            const tree = renderer.create(<FAB />).toJSON();
            expect(tree).toMatchSnapshot();
        });

    // describe("the mobile nav...", () => {
    //     test("icon renders", () =>{
    //         const {ge} 
    //     })

    // })



    });

});
});










// describe("The FAB component...", () => {
//     test("renders without crashing", () => {
//         const { baseElement } = render(<FAB />);
//         expect(baseElement).toBeDefined();
//     });
//     test("matches the snapshot.", () => {
//         const tree = renderer.create(<FAB />).toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// });
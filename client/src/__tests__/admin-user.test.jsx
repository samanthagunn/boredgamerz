import React, { useState as useStateMock } from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Users from "../components/admin-users"
import renderer from "react-test-renderer";
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

window.confirm = jest.fn(() => true)
const setState = jest.fn();


    beforeAll(()=>{
        useStateMock.mockImplementation((init) => [init, setState]);
    })

    test("Users will render...",()=>{
        const { baseElement } = render(<Users/>);
        expect(baseElement).toBeDefined();
    })

    test("will match snapshot.", () => {
        const tree = renderer.create(<Users />).toJSON();
        expect(tree).toMatchSnapshot();
    })

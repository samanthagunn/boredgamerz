import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditGame from "../pages/EditGame";
import renderer from "react-test-renderer";


jest.mock('../components/auth-header')
jest.mock('../components/form');
jest.mock('../components/mobile-fab')


test('EditGame page renders...',()=>{
    const {container} = render (<EditGame />);
    expect(container.textContent)
    .toMatch("Test component");

});

test("Matches the snapshot..", ()=>{
    const tree = renderer.create(<EditGame />).toJSON()
    expect(tree).toMatchSnapshot();
})
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/Home";
import renderer from "react-test-renderer";


jest.mock('../components/header');
jest.mock('../components/landing-page');


test('Home page renders...',()=>{
    const {container} = render (<Home />);
    expect(container.textContent)
    .toMatch("Test component");

});

test("Matches the snapshot..", ()=>{
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot();
})
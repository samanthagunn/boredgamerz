import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import GameItem from "../components/game-item";
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const setState = jest.fn()
describe("The game item component...", () => {
  beforeAll(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });
  test("will render without crashing.", () => {
      const { baseElement } = render(<GameItem />)
      expect(baseElement).toBeDefined();
  })
  test("will render display description when clicked.", () => {
    const { getByText } = render(<GameItem />)
    fireEvent.click(getByText("Name:"))
    expect(setState).toHaveBeenCalledTimes(1)
})
test("will match snapshot.", () => {
    const tree = renderer.create(<GameItem />).toJSON();
    expect(tree).toMatchSnapshot();
})
});

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "../components/footer";
import renderer from "react-test-renderer";

describe("The footer component...", () => {
  test("renders without crashing", () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeDefined();
  });
  test("matches the snapshot.", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

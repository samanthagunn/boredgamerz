import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import FindGames from "../pages/FindGames";

describe("The Find Games page...", () => {
    test("will render without crashing", () => {
        const { baseElement } = render(<FindGames />)
        expect(baseElement).toBeDefined();
    });
})
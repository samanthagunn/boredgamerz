import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import GameList from "../components/game-list";

describe("The Game List Component...", () => {
    test("will render without crashing", () => {
        const { baseElement } = render(<GameList />);
        expect(baseElement).toBeDefined();
    })
})
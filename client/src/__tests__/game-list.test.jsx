import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import GameList from "../components/game-list";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

const setState = jest.fn();
describe("The Game List Component...", () => {


    const game =     {
        id: 1,
        title: "Marks DND Game",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu bibendum. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Ipsum a arcu cursus vitae congue mauris. Aenean sed adipiscing diam donec adipiscing tristique. Dui id ornare arcu odio ut sem nulla pharetra diam. Condimentum vitae sapien pellentesque habitant. Commodo nulla facilisi nullam vehicula. Sagittis purus sit amet volutpat consequat mauris nunc. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Viverra nibh cras pulvinar mattis nunc sed blandit. A iaculis at erat pellentesque adipiscing commodo. Sed cras ornare arcu dui vivamus arcu. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Tincidunt eget nullam non nisi.",
        gameName: "Dungeons & Dragon",
        category: "Role-playing games",
        availableSeats: 6,
        address: "1234 ACME Street Omaha, Nebraska, 68100",
        date: "12/20/2021",
        hostId: 1,
        location: {
            lat: 39.7531332,
            lng: -105.0087434
        }
    }



    beforeAll(() => {
        useStateMock.mockImplementation((init) => [init, setState]);
    });
    test("will render without crashing", () => {
        const { baseElement } = render(<GameList seeData={game} />);
        expect(baseElement).toBeDefined();
    })
    test("matches the snapshot.", () => {
        const tree = renderer.create(<GameList seeData={game}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
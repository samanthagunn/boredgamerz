import { IonList } from "@ionic/react";
import React from "react"
import GameItem from "./game-item";

const GameList = () => { // props of api call //optional props or cords to google api
    let gameList = [1,2,3] // replace API here and test
    return (
        <IonList>
            {gameList.map(() => (<GameItem />))}
        </IonList>
    )
}

export default GameList;
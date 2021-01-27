import { IonList } from "@ionic/react";
import React from "react"
import GameItem from "./game-item";

const GameList = ({seeData}) => { // props of api call //optional props or cords to google api
    return (
        <IonList >
            {seeData.map((data) => (<GameItem game={data}/>))}
        </IonList>
    )
}

export default GameList; 
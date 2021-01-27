import { IonRadioGroup } from "@ionic/react";
import React from "react";
import GameItem from "./game-item";

const GameList = ({ seeData, editMode, joinMode }) => {
  return (
    <IonRadioGroup>
      {seeData.map((data) => (
        <GameItem game={data} edit={editMode} join={joinMode} />
      ))}
    </IonRadioGroup>
  );
};

export default GameList;

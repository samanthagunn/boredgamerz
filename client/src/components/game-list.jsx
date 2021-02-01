import { IonItem, IonList } from "@ionic/react";
import React from "react";
import GameItem from "./game-item";

const GameList = ({ seeData, editMode, joinMode }) => {
  return (
    <>
      {typeof seeData[0] === 'undefined' ? (
        <IonItem>No Games Found</IonItem>
      ) : (
        <IonList>
          {seeData.map((data) => (
            <GameItem game={data} edit={editMode} join={joinMode} />
          ))}
        </IonList>
      )}
    </>
  );
};

export default GameList;

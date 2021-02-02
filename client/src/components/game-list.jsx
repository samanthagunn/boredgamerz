import { IonItem, IonList } from "@ionic/react";
import React from "react";
import GameItem from "./game-item";

const GameList = ({ seeData, editMode, joinMode }) => {
  return (
    <>
      {typeof seeData === "undefined" ? (
        <IonItem className="no-games">No Games Found</IonItem>
      ) : (
        <IonList>
          {seeData.map((data) => {
            if (data.availableSeats <= 0) {
              return;
            } else {
              return <GameItem game={data} edit={editMode} join={joinMode} />;
            }
          })}
        </IonList>
      )}
    </>
  );
};

export default GameList;

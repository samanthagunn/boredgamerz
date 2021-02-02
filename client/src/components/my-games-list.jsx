import { IonItem, IonList } from "@ionic/react";
import React from "react";
import MyGameItem from "./my-games-item";

const MyGameList = ({ seeData, editMode, joinMode }) => {
  return (
    <>
      {typeof seeData === 'undefined' ? (
        <IonItem>No Games Found</IonItem>
      ) : (
        <IonList>
          {seeData.map((data) => (
            <MyGameItem game={data} edit={editMode} join={joinMode} />
          ))}
        </IonList>
      )}
    </>
  );
};

export default MyGameList;

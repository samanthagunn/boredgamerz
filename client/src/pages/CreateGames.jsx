import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import Header from "../components/header";

const CreateGame = () => {
  return (
    <IonPage>

      <IonContent>
      <h1>Create A Game</h1>
        <IonList>
          <IonItemDivider>Game Name: </IonItemDivider>
          <IonItem>
            <IonInput type="text" placeholder="Mark's DND Session"></IonInput>
          </IonItem>
          <IonItemDivider>Open Seats: </IonItemDivider>
          <IonItem>
            <IonInput type="number" placeholder="6"></IonInput>
          </IonItem>
          <IonItemDivider>Location Name: </IonItemDivider>
          <IonItem>
            <IonInput type="text" placeholder="1234 ACME Street"></IonInput>
          </IonItem>
          <IonItemDivider>Date: </IonItemDivider>
          <IonItem>
            <IonInput type="datetime-local"></IonInput>
          </IonItem>
          <IonItemDivider>Game Description: </IonItemDivider>
          <IonItem>
            <IonTextarea placeholder="This DND game..."></IonTextarea>
          </IonItem>

          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CreateGame;

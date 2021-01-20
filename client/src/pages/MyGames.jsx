import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import GameList from "../components/game-list";
import Header from "../components/header";

const MyGames = () => {
  const [segmentState, setSegmentState] = useState({
    event: undefined,
    state: "Joined",
  });
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent>
        <IonSegment
          onIonChange={(e) => {
            setSegmentState({ ...segmentState,  state: e.detail.value });
            console.log(e.detail.value)
          }}
          value={segmentState.state}
        >
          <IonSegmentButton value="Joined">
            <h1>Joined Games</h1>
          </IonSegmentButton>
          <IonSegmentButton value="Hosted">
            <h1>Hosted Games</h1>
          </IonSegmentButton>
        </IonSegment>
        <IonList>{segmentState.state === "Joined" ? <GameList /> : <h1>h2</h1>}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyGames;

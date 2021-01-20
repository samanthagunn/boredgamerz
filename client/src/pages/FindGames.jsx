import { IonContent, IonHeader, IonList, IonPage } from "@ionic/react";
import React from "react";
import GameList from "../components/game-list";
import Header from "../components/header";

const FindGames = () => {
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent>
        <IonList>
          <GameList />
        </IonList>
        <div id="map"></div>
      </IonContent>
    </IonPage>
  );
};

export default FindGames;

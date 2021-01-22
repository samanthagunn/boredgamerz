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
import axios from "axios";
import React, { useEffect, useState } from "react";
import GameList from "../components/game-list";
import Header from "../components/header";

const MyGames = () => {
  const [segmentState, setSegmentState] = useState({
    event: undefined,
    state: "Joined",
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/games").then((resp) => resp.data).then(data => setData(data))
  }, [])
  return (
      <IonContent>
      <IonTitle>MyGames</IonTitle>
        <IonSegment
          onIonChange={(e) => {
            setSegmentState({ ...segmentState,  state: e.detail.value });
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
        <IonList>{segmentState.state === "Joined" ? <GameList seeData={data}/> : <GameList seeData={data} editMode={true}/> }</IonList>
      </IonContent>
  );
};

export default MyGames;

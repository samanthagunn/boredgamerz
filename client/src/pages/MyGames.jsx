import {
  IonContent,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthHeader from "../components/auth-header";
import Footer from "../components/footer";
import GameList from "../components/game-list";
import FAB from "../components/mobile-fab";

const MyGames = () => {
  const [segmentState, setSegmentState] = useState({
    event: undefined,
    state: "Joined",
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((resp) => resp.data)
      .then((data) => setData(data));
  }, []);
  return (
    <IonPage>
      <AuthHeader />
      <IonContent>
        <IonSegment
          onIonChange={(e) => {
            setSegmentState({ ...segmentState, state: e.detail.value });
          }}
          value={segmentState.state}
        >
          <IonSegmentButton value="Joined" className="join-button">
            <h1>Joined Games</h1>
          </IonSegmentButton>
          <IonSegmentButton value="Hosted" className="host-button">
            <h1>Hosted Games</h1>
          </IonSegmentButton>
        </IonSegment>
        <IonList >
          {segmentState.state === "Joined" ? (
            <GameList seeData={data} />
          ) : (
            <GameList seeData={data} editMode={true} />
          )}
        </IonList>
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default MyGames;

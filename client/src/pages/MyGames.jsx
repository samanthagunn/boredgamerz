import { useAuth0 } from "@auth0/auth0-react";
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
  const [joined, setJoined] = useState([]);
  const [hosted, setHosted] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  useEffect(() => {
    let joined = [];
    let hosted = [];
    getAccessTokenSilently().then((resp) => {
      console.log(resp);
      axios({
        method: "get",
        url: "http://localhost:8080/bored-gamerz/api/game-meeting/me",
        headers: {
          Authorization: `Bearer ${resp}`,
        },
      })
        .then((resp) => resp.data)
        .then((data) =>
          data.map((game) => {
            if (game.host.auth0id === user.sub) {
              hosted.push(game);
            } else {
              joined.push(game);
            }
          })
        )
        .then(() => {
          setJoined(joined);
          setHosted(hosted);
        });
    });
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
        <IonList>
          {segmentState.state === "Joined" ? (
            <GameList seeData={hosted} />
          ) : (
            <GameList seeData={joined} editMode={true} />
          )}
        </IonList>
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default MyGames;

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
require('dotenv').config();
const MyGames = () => {
  const [segmentState, setSegmentState] = useState({
    event: undefined,
    state: "Joined",
  });
  const [state, setState] = useState([[],[]]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently().then((resp) => {
      console.log(resp);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_HOST}/game-meeting/me`,
        headers: {
          Authorization: `Bearer ${resp}`,
        },
      })
        .then((resp) => resp.data)
        .then((data) => 
        {
          setState(data)
          console.log(data[1])
        }
        )
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
            <GameList seeData={[state[1]]} />
          ) : (
            <GameList seeData={[state[0]]} editMode={true} />
          )}
        </IonList>
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default MyGames;

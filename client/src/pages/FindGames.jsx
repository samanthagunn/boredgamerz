import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "@googlemaps/js-api-loader";
import { IonContent, IonPage, IonTitle } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthHeader from "../components/auth-header";
import Footer from "../components/footer";
import GameList from "../components/game-list";
import FAB from "../components/mobile-fab";
require("dotenv").config();
const FindGames = () => {
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently().then((resp) => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_HOST}/game-meeting`,
        headers: {
          Authorization: `Bearer ${resp}`,
        },
      })
        .then((resp) => resp.data)
        .then((data) => {
          setData(data);
        });
    });
    const loader = new Loader({
      apiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
      version: "weekly",
    });
    loader.load().then(() => {
      new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.0165228, lng: -105.2445022 },
        zoom: 15,
        gestureHandling: "cooperative",
      });
    });
  }, []);
  return (
    <IonPage>
      <AuthHeader />
      <IonContent>
        <br />

        <IonTitle color="light" className="ion-text-center">
          Find Games
        </IonTitle>
        <br />
        <div id="map" style={{ width: "100%", height: "50%" }}></div>
        <GameList seeData={data} joinMode={true} />
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default FindGames;

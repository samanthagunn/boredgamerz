import { IonContent, IonPage, IonTitle } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import GameList from "../components/game-list";
import Header from "../components/header";

const FindGames = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((resp) => resp.data)
      .then((data) => setData(data));
  }, []);
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonTitle>Find Games</IonTitle>
        <GameList seeData={data} joinMode={true} />
        <div id="map" style={{ width: "1000px", height: "1000px" }}></div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default FindGames;

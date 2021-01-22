import { IonContent, IonPage, IonTitle } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GameList from "../components/game-list";

const FindGames = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((resp) => resp.data)
      .then((data) => setData(data));
  }, []);
  return (
    <IonContent>
    <IonTitle>Find Games</IonTitle>
      <GameList seeData={data} />
      <div id="map" style={{ width: "1000px", height: "1000px" }}></div>
    </IonContent>
  );
};

export default FindGames;

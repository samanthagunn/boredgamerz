import { IonContent, IonHeader, IonList, IonPage } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GameList from "../components/game-list";
import Header from "../components/header";

const FindGames = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/games").then((resp) => resp.data).then(data => setData(data))
  }, [])
  return (
    <IonPage>

      <IonContent>
        <IonList>
          <GameList seeData={data}/>
        </IonList>
        <div id="map"></div>
      </IonContent>
    </IonPage>
  );
};

export default FindGames;

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import axios from "axios"
require('dotenv').config()

const Games = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/games`)
      .then((resp) => resp.data)
      .then((data) => setData(data));
  }, []);
  return (
    <>
      {data.map((game) => (
        <IonItem>
          <IonCard>
            <IonCardTitle>{game.title}</IonCardTitle>
            <IonCardSubtitle>Game id : {game.id}</IonCardSubtitle>
            <IonCardContent>
              <IonButton
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this game?")
                  ) {
                    console.log("This game is now deleted");
                  }
                }}
              >
                Delete game
              </IonButton>
              <IonButton
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to end this game?")
                  ) {
                    console.log("This game is now ended");
                  }
                }}
              >
                End Game
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonItem>
      ))}
    </>
  );
};

export default Games;

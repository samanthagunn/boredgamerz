import { Loader } from "@googlemaps/js-api-loader";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";

const GameItem = ({ game }) => {
  console.log(game);
  const [show, setShow] = useState(false);
  let map;
  let marker;
  const loader = new Loader({
    apiKey: "AIzaSyDcIytfVAvhm1Ia51mHHxDMaq-DUuaSlZE",
    version: "weekly",
  });

  const loadMap = () => {
    loader.load().then(
      () => {
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: game.location,
          zoom: 15,
          gestureHandling: "cooperative",
        });
        marker = new window.google.maps.Marker({
          position: game.location,
          map: map,
        })
      }
    );
  };

  return (
    <IonItem>
      <IonCard
        onClick={() => {
          if (!show) {
            loadMap();
          }
          setShow(!show);
        }}
      >
        <IonCardHeader>
          <IonTitle>Name: {game.title}</IonTitle>
          <IonCardSubtitle>Game: {game.category}</IonCardSubtitle>
          <IonCardSubtitle>Host: {game.hostId}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <h2>Open Seats: {game.availableSeats}</h2>
          <h3>Date: {game.date}</h3>
          <h4>Location: {game.address}</h4>
          {show ? <p>{game.description}</p> : undefined}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default GameItem;

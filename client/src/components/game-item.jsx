import { Loader } from "@googlemaps/js-api-loader";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonCardTitle,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

const GameItem = ({ game, edit, join }) => {
  let history = useHistory();
  const [show, setShow] = useState(false);
  let map;
  let marker;
  const loader = new Loader({
    apiKey: "AIzaSyDuZ32gfmKD4XNcQoWGoTkSLGZ--LUo_L4",
    version: "weekly",
  });

  const loadMap = () => {
    loader.load().then(() => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: game.location,
        zoom: 15,
        gestureHandling: "cooperative",
      });
      marker = new window.google.maps.Marker({
        position: game.location,
        map: map,
      });
    });
  };

  return (
    <IonItem lines="none" className="games">
      <IonCard  className="game-card-list" 
        onClick={() => {
          if (!show && join) {
            loadMap();
          }
          if (!edit) {
            setShow(!show);
          }
        }}
      >
        <IonCardHeader >
          <IonCardTitle className="game-title">Name: {game.title}</IonCardTitle>
          <IonCardSubtitle className="game-type"><strong>Type: </strong>{game.category}</IonCardSubtitle>
          <IonCardSubtitle className="game-host">Host: {game.hostId}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <h2><strong>Open Seats:</strong> {game.availableSeats}</h2>
          <h3>
            <strong>Date:</strong> {game.date}
          </h3>
          <h4><strong>Location:</strong> {game.address}</h4>
          {show ? <p>{game.description}</p> : undefined}
          {edit ? (
            <IonButton onClick={() => history.push(`/games/edit/${game.id}`)}>
              Edit
            </IonButton>
          ) : (
            false
          )}
          {join ? (
            <IonButton onClick={() => console.log("cool")}>join</IonButton>
          ) : (
            false
          )}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default GameItem;

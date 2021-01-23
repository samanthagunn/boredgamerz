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
  const [show, setShow] = useState(false);
  return (
    <IonItem>
      <IonCard
        onClick={() => {
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
          <h3>
            Date: {game.date}
          </h3>
          <h4>Location: {game.address}</h4>
          {show ? <p>{game.description}</p> : undefined}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default GameItem;

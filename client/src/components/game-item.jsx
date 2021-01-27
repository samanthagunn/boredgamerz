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
      <IonCard  className="game-card"
        onClick={() => {
          setShow(!show);
        }}
      >
        <IonCardHeader >
          <IonTitle className="game-title">Name: {game.title}</IonTitle>
          <IonCardSubtitle className="game-type"><strong>Game: </strong>{game.category}</IonCardSubtitle>
          <IonCardSubtitle className="game-host">Host: {game.hostId}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <h2><strong>Open Seats:</strong> {game.availableSeats}</h2>
          <h3>
            <strong>Date:</strong> {game.date}
          </h3>
          <h4><strong>Location:</strong> {game.address}</h4>
          {show ? <p>{game.description}</p> : undefined}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default GameItem;

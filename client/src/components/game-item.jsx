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
  let description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui id ornare arcu odio. In tellus integer feugiat scelerisque. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Et odio pellentesque diam volutpat commodo. Varius sit amet mattis vulputate enim nulla. Viverra orci sagittis eu volutpat odio facilisis. Aliquam id diam maecenas ultricies mi. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Sit amet consectetur adipiscing elit duis tristique. Lectus urna duis convallis convallis tellus id interdum. Habitant morbi tristique senectus et netus et malesuada fames ac. Egestas sed sed risus pretium quam vulputate. Praesent semper feugiat nibh sed pulvinar proin. Pharetra sit amet aliquam id diam maecenas ultricies. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Lacus viverra vitae congue eu consequat ac felis donec. Volutpat est velit egestas dui id.";
  return (
    <IonItem>
      <IonCard
        onClick={() => {
          setShow(!show);
        }}
      >
        <IonCardHeader>
          <IonTitle>Name: {game?.name}</IonTitle>
          <IonCardSubtitle>Game: {game?.type}</IonCardSubtitle>
          <IonCardSubtitle>Host: {game?.host}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <h2>Open Seats: {game?.open_seats}</h2>
          <h3>
            Date: {game?.date} {game?.time}
          </h3>
          <h4>Location: {game?.location}</h4>
          {show ? <p>{description}</p> : undefined}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default GameItem;

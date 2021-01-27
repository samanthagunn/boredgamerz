import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
} from "@ionic/react";
import React from "react";
import {arrowUpCircle} from 'ionicons/icons'

const FAB = () => {
  return (
    <IonFab vertical="center" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonIcon icon={arrowUpCircle} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton href="/profile">
          <IonItem>Profile</IonItem>
        </IonFabButton>
        <IonFabButton href="/profile/games">
          <IonItem>My Games</IonItem>
        </IonFabButton>
        <IonFabButton href="/games">
          <IonItem>Find Games</IonItem>
        </IonFabButton>
        <IonFabButton profile="/games/create">
          <IonItem>Create A Gane</IonItem>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default FAB;

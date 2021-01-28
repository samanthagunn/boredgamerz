import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
} from "@ionic/react";
import React from "react";
import {arrowUpCircle, personCircleOutline, location, diceOutline, addCircleOutline} from 'ionicons/icons'

const FAB = () => {
  return (
    <IonFab vertical="center" horizontal="end" slot="fixed">
      <IonFabButton>
      <IonIcon icon={arrowUpCircle} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton href="/profile">
        <IonIcon icon={personCircleOutline} />
        </IonFabButton>
        <IonFabButton href="/profile/games">
        <IonIcon icon={diceOutline} />
        </IonFabButton>
        <IonFabButton href="/games">
        <IonIcon icon={location} />
        </IonFabButton>
        <IonFabButton profile="/games/create">
        <IonIcon icon={addCircleOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default FAB;

import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import React from "react";
import {
  arrowUpCircle,
  personCircleOutline,
  location,
  diceOutline,
  addCircleOutline,
  clipboard,
} from "ionicons/icons";
import { useAuth0 } from "@auth0/auth0-react";

const FAB = () => {
  const { user } = useAuth0();
  let admin = Object.values(user)[0];
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
        {admin === ["Admin"] ? (
          <IonFabButton profile="/admin">
            <IonIcon icon={clipboard} />
          </IonFabButton>
        ) : undefined}
      </IonFabList>
    </IonFab>
  );
};

export default FAB;

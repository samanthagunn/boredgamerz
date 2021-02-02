import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import React, { useEffect, useState } from "react";
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
  const [authUser, setAuthUser] = useState({default: "test"})
  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently().then(() => setAuthUser(user))
  }, [])
  console.log(authUser)
  console.log(Object.values(authUser)[0])
  return (
    <IonFab className="mobilenav" vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonIcon icon={arrowUpCircle} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton href="/profile">
          <IonIcon icon={personCircleOutline} />
        </IonFabButton>
        <IonFabButton href="/mygames">
          <IonIcon icon={diceOutline} />
        </IonFabButton>
        <IonFabButton href="/games">
          <IonIcon icon={location} />
        </IonFabButton>
        <IonFabButton href="/create">
          <IonIcon icon={addCircleOutline} />
        </IonFabButton>
        {Object.values(authUser)[0] === "admin" ? (
          <IonFabButton href="/admin">
            <IonIcon icon={clipboard} />
          </IonFabButton>
        ) : undefined}
      </IonFabList>
    </IonFab>
  );
};

export default FAB;

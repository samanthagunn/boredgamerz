import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonItem,
  IonList,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

const AuthHeader = () => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Bored Gamerz</IonTitle>
        <IonButtons slot="primary">
          <IonButton href="/profile/games">My Games</IonButton>
          <IonButton href="/games">Find Games</IonButton>
          <IonButton href="/games/create">Create A Game</IonButton>
          <IonButton
            onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          >
            Profile
            <img src={user.picture}></img>
          </IonButton>
          <IonPopover
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() =>
              setShowPopover({ showPopover: false, event: undefined })
            }
          >
            <IonList>
              <IonItem>
                <IonButton href="/profile">Profile</IonButton>
              </IonItem>
              <IonItem>
                <IonButton href="/profile/games">My Games</IonButton>
              </IonItem>
              <IonItem>
                <IonButton onClick={logout}>Sign Out</IonButton>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AuthHeader;

import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonItem,
  IonList,
  IonPopover,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
require("dotenv").config();

const AuthHeader = () => {
  const { user, logout } = useAuth0();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  return (
    <IonHeader>

      <IonToolbar className="auth-toolbar">
        <img className="logo-hero" alt="BoredGamerz Logo"  src="https://storage.googleapis.com/boredgamerz_assets/BoredGamerz_Logo.webp" />

        <IonButtons className="navigation" slot="primary">
          <IonButton href="/mygames">My Games</IonButton>
          <IonButton href="/games">Find Games</IonButton>

          <IonButton href="/games/create">Create A Game</IonButton>
          
          <img className="user-image" alt="profile" height="50px" src={user.picture} onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}></img>
          <IonPopover 

            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() =>
              setShowPopover({ showPopover: false, event: undefined })
            }
          >
            <IonList className="popover-list">
              <IonItem>
                <IonButton  href="/profile">Profile</IonButton>
              </IonItem>
              <IonItem>
                <IonButton href="/mygames">My Games</IonButton>
              </IonItem>
              {Object.values(user)[0] === "admin" ? (
                <IonItem>
                  <IonButton href="/admin">Admin</IonButton>
                </IonItem>
              ) : undefined}
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

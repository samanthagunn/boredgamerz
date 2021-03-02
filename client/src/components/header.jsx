import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonButtons,
  IonItem,
  IonList,
  IonPopover,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

require('dotenv').config()


const Header = () => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  return (
    <IonToolbar className="auth-toolbar">
      

        <img className="logo-hero" alt="BoredGamerz Logo"  src="https://storage.googleapis.com/boredgamerz_assets/BoredGamerz_Logo.webp" />

        
      {isAuthenticated ? (
        <IonButtons className="navigation" slot="primary" >
          <IonButton className="navigation__fontweight" href="/mygames">My Games</IonButton>
          <IonButton className="navigation__fontweight" href="/games">Find Games</IonButton>
          <IonButton className="navigation__fontweight" href="/create">Create A Game</IonButton>
          <IonButton
            onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          >
            Profile
            
          </IonButton>
          <img className="user-image" alt="profile" height="50px" src={user.picture} onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}></img>
          <IonPopover
            cssClass="user-popover"
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() =>
              setShowPopover({ showPopover: false, event: undefined })
            }
          >
            <IonList>
              <IonItem>
                <IonButton  href="/profile">Profile</IonButton>
              </IonItem>
              <IonItem>
                <IonButton href="/mygames">My Games</IonButton>
              </IonItem>
              <IonItem>
                <IonButton onClick={logout}>Sign Out</IonButton>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonButtons>
      ) : (
        <IonButtons className="navigation" slot="primary">
          <IonButton onClick={loginWithRedirect}><strong>Login</strong></IonButton>
        </IonButtons>
      )}
    </IonToolbar>
  );
};

export default Header;

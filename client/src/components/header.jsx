import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonButtons,
  IonItem,
  IonList,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  return (
    <IonToolbar color="primary">
      
        <img className="logo-hero" alt="BoredGamerz Logo"  src="https://storage.googleapis.com/boredgamerz_assets/BoredGamerzLogo_72-2.png" />
        
      {isAuthenticated ? (
        <IonButtons className="navigation" slot="primary" >
          <IonButton className="navigation__fontweight" href="/profile/games">My Games</IonButton>
          <IonButton className="navigation__fontweight" href="/games">Find Games</IonButton>
          <IonButton className="navigation__fontweight" href="/games/create">Create A Game</IonButton>
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
                <IonButton href="/profile/games">My Games</IonButton>
              </IonItem>
              <IonItem>
                <IonButton onClick={logout}>Sign Out</IonButton>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonButtons>
      ) : (
        <IonButtons slot="primary">
          <IonButton onClick={loginWithRedirect}>Login</IonButton>
        </IonButtons>
      )}
    </IonToolbar>
  );
};

export default Header;

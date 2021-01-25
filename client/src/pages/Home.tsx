import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import LandingPage from "../components/landing-page";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import ActionSheet from "../components/actionsheet.jsx";

const Home = () => {
  let history = useHistory();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
        <img className="logo-hero" alt="BoredGamerz Logo" src="https://storage.googleapis.com/boredgamerz_assets/BoredGamerzLogo_72-2.png" />
          <IonTitle>Find. Host. Play.</IonTitle>
          <IonButtons slot="primary" >
            {isAuthenticated ? (
              <div>
                <IonButton data-testid="Profile" onClick={() => setShowActionSheet(true)}>
                  Profile
                </IonButton>
                <ActionSheet showState={showActionSheet} setShowState={setShowActionSheet} logout={logout} history={history}/>
              </div>
            ) : (
              <div>
                <IonButton size="small" color="secondary" onClick={() => loginWithRedirect()}>Login</IonButton>
              </div>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bored Gamerz</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LandingPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;

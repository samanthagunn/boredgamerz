import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Header from "../components/header";
import LandingPage from "../components/landing-page";
import "./Home.css";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
<<<<<<< HEAD
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
=======
        <Header />
>>>>>>> d0a4e8af0c86574b85b0110be327c8fdd8606035
      </IonHeader>
      <IonContent fullscreen>
        <LandingPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;

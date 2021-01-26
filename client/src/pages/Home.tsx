import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Header from "../components/header";
import LandingPage from "../components/landing-page";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent fullscreen>
        <LandingPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;

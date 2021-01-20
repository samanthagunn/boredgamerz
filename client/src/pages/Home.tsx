import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import LandingPage from "../components/landing-page";
import "./Home.css";

const Home = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <LandingPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;

import { IonContent, IonHeader, IonPage, IonFooter } from "@ionic/react";
import React from "react";
import Header from "../components/header";
import LandingPage from "../components/landing-page";
import Footer from "../components/footer";

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

import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../components/header";
import LandingPage from "../components/landing-page";
import Footer from "../components/footer";
import FAB from "../components/mobile-fab";

const Home = () => {
  return (
    <IonPage>
      <Header />
      <IonContent className="has-header">
        <LandingPage />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;

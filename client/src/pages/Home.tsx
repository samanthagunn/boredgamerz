import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import LandingPage from "../components/landing-page";
import FAB from "../components/mobile-fab";
import "./Home.css";

const Home = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <LandingPage />
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default Home;

import { IonContent, IonPage, IonTitle } from "@ionic/react";
import React from "react";
import AuthHeader from "../components/auth-header";
import Footer from "../components/footer";
import Form from "../components/form";
import FAB from "../components/mobile-fab";

const CreateGame = () => {
  let edit = false;
  return (
    <IonPage>
      <AuthHeader />
      <IonContent>
        <br />
        <IonTitle color="light ion-text-center">Create New Game</IonTitle>
        <Form editState={edit} />
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default CreateGame;

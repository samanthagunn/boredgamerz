import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Footer from "../components/footer";
import Form from "../components/form";
import Header from "../components/header";

const CreateGame = () => {
  let edit = false;
  return (
    <IonPage>
      <Header />
      <IonContent>
        <Form editState={edit} />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default CreateGame;

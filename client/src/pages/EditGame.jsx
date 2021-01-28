import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Footer from "../components/footer";
import Form from "../components/form";
import Header from "../components/header";

const EditGame = () => {
  let edit = true;
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

export default EditGame;

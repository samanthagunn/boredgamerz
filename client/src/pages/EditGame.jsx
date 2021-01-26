import { Loader } from "@googlemaps/js-api-loader";
import {
  IonHeader,
  IonPage,
} from "@ionic/react";
import React from "react";
import Form from "../components/form";

const EditGame = () => {
  let edit = true;
  return (
    <IonPage>
      <Form editState={edit}/>
    </IonPage>
  );
};

export default EditGame;

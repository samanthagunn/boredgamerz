import {
  IonContent,
} from "@ionic/react";
import React, { useState } from "react";
import Form from "../components/form";

const CreateGame = () => {
  let edit = false;
  return (
    <IonContent>
      <Form editState={edit}/>
    </IonContent>
  );
};

export default CreateGame;

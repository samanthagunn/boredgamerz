import { IonFooter, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Footer = () => {
  return (
    <IonFooter >
      <IonToolbar color="tertiary" >
        <IonTitle>Copyright 2020 Bored Gamerz</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;

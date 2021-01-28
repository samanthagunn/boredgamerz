import { IonFooter, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Footer = () => {
  return (
    <IonFooter >
      <IonToolbar className="ion-text-center" color="tertiary" >
        <div >
        <p>© 2020 Bored Gamerz, BravoBunch</p>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;

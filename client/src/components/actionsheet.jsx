import { IonActionSheet, IonContent } from "@ionic/react";
import React from "react";

const ActionSheet = (props) => {
  return (
      <IonActionSheet
        isOpen={props.showState}
        onDidDismiss={() => props.setShowState(false)}
        cssClass="my-custom-class"
        data-testid="Modal"
        buttons={[
          {
            text: "Sign Out",
            role: "destructive",
            handler: () => {
              props.logout();
            },
          },
          {
            text: "Profile",
            handler: () => {
              props.history.push("/profile");
            },
          },
          {
            text: "My Games",
            handler: () => {
              console.log("Play clicked");
            },
          },
          {
            text: "Find Games",
            handler: () => {
              console.log("Favorite clicked");
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ]}
      ></IonActionSheet>
  );
};

export default ActionSheet;

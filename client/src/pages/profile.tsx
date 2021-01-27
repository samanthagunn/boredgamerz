import React from "react";
import "../components/ExploreContainer.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonTitle,
} from "@ionic/react";
import Header from "../components/header";
import axios from "axios";
import FAB from "../components/mobile-fab";

const Profile: React.FC = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  console.log(user);
  let token = ""
  getAccessTokenSilently().then(resp => {token = resp; console.log(resp)})
  let deleteUser = () => {
    // axios.delete('Backend call')
    console.log("Backend call")
  }
  return (
    <IonPage>
        <IonTitle>Profile</IonTitle>
      <IonContent>
        {isLoading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <IonCard>
            <img src={user?.picture}></img>
            <IonCardHeader>
              <IonCardTitle>{user?.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton onClick={deleteUser}>Delete your account</IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;

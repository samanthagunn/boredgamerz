import React from "react";
import "../components/ExploreContainer.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonTitle,
} from "@ionic/react";
import Header from "../components/header";

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth0();
  console.log(user);
  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonTitle>Profile</IonTitle>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <IonCard>
            <img src={user?.picture}></img>
            <IonCardHeader>
              <IonCardTitle>{user?.name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;

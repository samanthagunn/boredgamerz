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
  IonPage,
  IonProgressBar,
  IonTitle,
} from "@ionic/react";
import Footer from "../components/footer";
import AuthHeader from "../components/auth-header";

const Profile: React.FC = () => {
  const { user, isLoading, getAccessTokenSilently} = useAuth0();
  console.log(user);
  getAccessTokenSilently().then(resp => {console.log(resp)})
  let deleteUser = () => {
    // axios.delete('Backend call')
    console.log("Backend call")
  }
  return (
    <IonPage>
      <AuthHeader />
        <IonTitle>Profile</IonTitle>
      <IonContent>
        {isLoading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <IonCard>
            <img src={user?.picture} alt="User profile."></img>
            <IonCardHeader>
              <IonCardTitle>{user?.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton onClick={deleteUser}>Delete your account</IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Profile;

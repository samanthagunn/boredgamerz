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
import FAB from "../components/mobile-fab";

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
      <IonContent>
      <IonTitle className="profile-heading ion-text-center">Profile</IonTitle>
        {isLoading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <IonCard className="profile-card">
            <img className="user-image-profile" alt="profile"  src={user?.picture}></img>
            <IonCardHeader>
              <IonCardTitle>{user?.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton color="secondary" onClick={deleteUser}>Delete your account</IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default Profile;

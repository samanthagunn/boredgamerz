import React, { useEffect } from "react";
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
import axios from "axios";
import FAB from "../components/mobile-fab";
require('dotenv').config();

const Profile: React.FC = () => {
  const { user, isLoading, getAccessTokenSilently, logout } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently().then((resp) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_HOST}/user`,
        headers: {
          Authorization: `Bearer ${resp}`,
        },
      });
    });
  }, [user]);
  let deleteUser = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      getAccessTokenSilently().then((resp) => {
        axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_HOST}/user/me`,
          headers: {
            Authorization: `Bearer ${resp}`,
          },
        }).then(() => logout());
      });
    }
  };
  return (
    <IonPage>
      <AuthHeader />
      <IonContent>
        <IonTitle className="profile-heading ion-text-center">Profile</IonTitle>
        {isLoading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <IonCard className="profile-main">
            
            <div className="profile-card">
            <IonCardHeader>
            <img
              className="user-image-profile"
              alt="profile"
              src={user?.picture}
            ></img>
              <IonCardTitle>
                <strong>{user?.name}</strong></IonCardTitle>
                <br />
                <IonButton className="delete-button" onClick={deleteUser}>
                Delete your account
              </IonButton>
            </IonCardHeader>
            <img className="player-ready" alt="player ready" src="https://storage.googleapis.com/boredgamerz_assets/player-ready.webp" />
            </div>
            <IonCardContent>
           
              <br />
              <IonButton color="secondary" onClick={() => logout()}>
                Sign Out
              </IonButton>
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

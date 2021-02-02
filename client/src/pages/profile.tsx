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
  console.log(user);
  console.log(process.env.REACT_APP_MAPS_API_KEY)
  useEffect(() => {
    getAccessTokenSilently().then((resp) => {
      console.log(resp);
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
        console.log(resp);
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
          <IonCard className="profile-card">
            <img
              className="user-image-profile"
              alt="profile"
              src={user?.picture}
            ></img>
            <IonCardHeader>
              <IonCardTitle><strong>{user?.name}</strong></IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              
              <IonButton color="secondary" onClick={deleteUser}>
                Delete your account
              </IonButton>
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

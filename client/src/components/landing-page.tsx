import React from "react";
import "./ExploreContainer.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonContent,
  IonSpinner,
} from "@ionic/react";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const signedIn = () => {
    if (isAuthenticated) {
      return (
        <IonButton routerDirection="forward" href="/profile">
          Join a Game {user.given_name}
        </IonButton>
      );
    } else {
      return (
        <IonButton onClick={() => loginWithRedirect()}>
          Login / Sign Up
        </IonButton>
      );
    }
  };
  return (
    <IonContent>
      <div className="container">
        <strong>Bored Gamerz</strong>
        <p>
          Start with Ionic{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
          >
            UI Components
          </a>
        </p>
        {isLoading ? <IonSpinner /> : signedIn()}
      </div>
    </IonContent>
  );
};

export default LandingPage;

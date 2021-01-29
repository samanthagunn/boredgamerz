import React from "react";
import "./ExploreContainer.css";
import { useAuth0 } from "@auth0/auth0-react";

import { IonTitle, IonButton, IonCard, IonSpinner, IonCardHeader, IonCardTitle, IonCardContent, IonContent } from "@ionic/react";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const signedIn = () => {
    if (isAuthenticated) {
      return (
        <IonButton routerDirection="forward" href="/profile">
          Join a Game {user.given_name}!
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

    <div className="container">
     
      <img className="hero-image" alt="gameplayers" src="https://storage.googleapis.com/boredgamerz_assets/gameplayers.png" />
    <div className="landing-hero-container">
      
      <IonCard className="landing-hero" color="secondary">
        
        <IonCardHeader><h1>Easy as Find. Host. Play. </h1> 
       <img alt="BoredGamerz Logo" className="hero-logo" width="40%" src="https://storage.googleapis.com/boredgamerz_assets/BoredGamerzLogo_72-2.png" />
        </IonCardHeader>
        
        <IonCardContent>
       <IonCardTitle><strong> Step 1</strong></IonCardTitle> 
 <p>Find a game by searching in your area</p>
 </IonCardContent>
 <IonCardContent>
 <IonCardTitle><strong>Step 2</strong></IonCardTitle>
        <p>Can't find a game? Host one!</p>
        </IonCardContent>
        <IonCardContent>
        <IonCardTitle><strong>Step 3</strong></IonCardTitle>
        <p>Meet and play the game!</p>
        </IonCardContent>
        {isLoading ? <IonSpinner /> : signedIn()}
        <br />
        <br />
       
      </IonCard>
      </div>
      
      
    </div>

  );
};

export default LandingPage;

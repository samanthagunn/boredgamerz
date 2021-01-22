import React from "react";
import "../components/ExploreContainer.css";
import { useAuth0 } from "@auth0/auth0-react";
import { IonPage, IonProgressBar } from "@ionic/react";

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth0();
  console.log(user)
  return (
    <IonPage>
      <div className="container">
        {isLoading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <div>
            <img src={user.picture}></img>
            <p>Test: {user.name}</p>
          </div>
        )}
      </div>
    </IonPage>
  );
};

export default Profile;

import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonContent,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import Games from "../components/admin-games";
import Users from "../components/admin-users";
import AuthHeader from "../components/auth-header";
import Footer from "../components/footer";
import FAB from "../components/mobile-fab";

const Admin = () => {
  const { user } = useAuth0();
  const [segmentState, setSegmentState] = useState({
    event: undefined,
    state: "Users",
  });
  let admin = Object.values(user)[0];
console.log(admin === ["admin"]);
  return (
    <IonPage>
    <AuthHeader />
      {admin === ["admin"] ? (
        <IonContent>
          <IonSegment
            onIonChange={(e) => {
              setSegmentState({ ...segmentState, state: e.detail.value });
            }}
            value={segmentState.state}
          >
            <IonSegmentButton value="Users">
              <h1>User</h1>
            </IonSegmentButton>
            <IonSegmentButton value="Games">
              <h1>Games</h1>
            </IonSegmentButton>
          </IonSegment>
          <IonList>
            {segmentState.state === "Users" ? <Users data={[]} /> : <Games />}
          </IonList>
        </IonContent>
      ) : (
        <IonContent>
          <IonTitle>Access Denied</IonTitle>
          <IonButton href="/profile">Return to profile</IonButton>
        </IonContent>
      )}
      <FAB />
      <Footer />
    </IonPage>
  );
};

export default Admin;

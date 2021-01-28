import {
  IonContent,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Games from "../components/admin-games";
import Users from "../components/admin-users";

const Admin = () => {
  const [segmentState, setSegmentState] = useState({
    event: undefined,
    state: "Users",
  });
  return (
      <>
      <IonTitle>Test</IonTitle>
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
        {segmentState.state == "Users" ? <Users data={[]}/> : <Games />}
      </IonList>
    </IonContent>
    </>
  );
};

export default Admin;

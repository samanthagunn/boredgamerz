import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import axios from "axios"
require('dotenv').config()

const Users = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get(`{process.env.API_HOST}/users`)
      .then((resp) => resp.data)
      .then((data) => setData(data));
  }, []);
  return (
    <>
      {data.map((user) => (
        <IonItem>
          <IonCard>
            <IonCardTitle>{user.firstName} {user.lastName}</IonCardTitle>
            <IonCardSubtitle>{user.email}</IonCardSubtitle>
            <IonCardContent>
              <IonButton
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to ban this user?")
                  ) {
                    console.log("This user is now banned");
                  }
                }}
              >
                Ban User
              </IonButton>
              <IonButton
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to unban this user?")
                  ) {
                    console.log("This user is now unbanned");
                  }
                }}
              >
                Unban User
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonItem>
      ))}
    </>
  );
};

export default Users;

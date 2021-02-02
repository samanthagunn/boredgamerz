import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonCardTitle,
} from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
require("dotenv").config();

const MyGameItem = ({ game, edit, join }) => {
  let meeting = game.gameMeeting;
  let history = useHistory();
  const [show, setShow] = useState(false);
  let map;
  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    version: "weekly",
  });
  let geocoder;
  let geocode = (location) => {
    geocoder.geocode({ address: location }, (result, status) => {
      if (status === "OK") {
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: {
            lat: result[0].geometry.location.lat(),
            lng: result[0].geometry.location.lng(),
          },
          zoom: 15,
          gestureHandling: "cooperative",
        });
        new window.google.maps.Marker({
          position: {
            lat: result[0].geometry.location.lat(),
            lng: result[0].geometry.location.lng(),
          },
          map: map,
        });
      }
    });
  };
  const { getAccessTokenSilently } = useAuth0();
  const loadMap = () => {
    loader.load().then(() => {
      geocoder = new window.google.maps.Geocoder();
      geocode(meeting.address);
    });
  };
  const joinGame = () => {
    getAccessTokenSilently().then((resp) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_HOST}/user-to-game-meeting/`,
        headers: {
          Authorization: `Bearer ${resp}`,
        },
        data: {
          gameMeetingId: meeting.id,
        },
      });
    });
  };

  let date = new Date(meeting?.date);
  return (
    <IonItem lines="none" className="games">
      <IonCard
        className="game-card-list"
        onClick={() => {
          if (!show && join) {
            loadMap();
          }
          if (!edit) {
            setShow(!show);
          }
        }}
      >
        <IonCardHeader>
          <IonCardTitle className="game-title">
            Name: {meeting.title}
          </IonCardTitle>
          <IonCardSubtitle className="game-type">
            <strong>Type: </strong>
            {meeting.category}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <h2>
            <strong>Open Seats:</strong> {meeting.availableSeats}
          </h2>
          <h3>
            <strong>Date:</strong> {date.toString()}
          </h3>
          <h4>
            <strong>Location:</strong> {meeting.address}
          </h4>
          {show ? <p>{meeting.description}</p> : undefined}
          {edit ? (
            <IonButton
              onClick={() => history.push(`/games/edit/${meeting.id}`)}
            >
              Edit
            </IonButton>
          ) : (
            false
          )}
          {join ? (
            <IonButton onClick={() => joinGame()}>join</IonButton>
          ) : (
            false
          )}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default MyGameItem;

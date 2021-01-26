import { Loader } from "@googlemaps/js-api-loader";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonTextarea,
} from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";

const Form = ({ editState }) => {
  let params = useParams();
  const [formState, setFormState] = useState({});
  const loader = new Loader({
    apiKey: "AIzaSyDcIytfVAvhm1Ia51mHHxDMaq-DUuaSlZE",
    version: "weekly",
  });

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8080/games/${params}`)
  //       .then((resp) => resp.json)
  //       .then((data) => setFormState(data))
  //       .catch((e) => console.error(e));
  //   });

  let connaddress = "";
  let geocoder;
  let connectAddress = (googleAddress) => {
    googleAddress.map((part) => (connaddress += part.long_name + " "));
    geocoder.geocode({ address: connaddress }, (result, status) => {
      if (status == "OK") {
        setFormState({ ...formState, position: result[0].geometry.location });
      }
    });
  };

  let autocomplete;
  let initAutocomplete = () => {
    loader.load().then(() => {
      autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        { types: ["geocode"] }
      );
      autocomplete.setFields(["address_component"]);
      autocomplete.addListener("place_changed", () => {
        connectAddress(autocomplete.getPlace().address_components);
      });
      geocoder = new window.google.maps.Geocoder();
    });
  };

  let submit = () => {
    axios
      .post("http://localhost:8080/games", formState)
      .then((resp) => console.log(resp));
  };

  return (
    <IonContent>
      <h1>Create A Game</h1>
      <IonList>
        <IonItemDivider>Game Name: </IonItemDivider>
        <IonItem>
          <IonInput
            type="text"
            placeholder="Mark's DND Session"
            value={formState.title}
            onInput={(e) => {
              e.persist();
              setFormState({ ...formState, title: e.target.value });
            }}
          ></IonInput>
        </IonItem>
        <IonItemDivider>Location: </IonItemDivider>
        <IonItem>
          <input
            type="text"
            id="autocomplete"
            value={formState.address}
            onFocus={initAutocomplete}
            value={formState.address}
          ></input>
        </IonItem>
        <IonItemDivider>Date: </IonItemDivider>
        <IonItem>
          <IonInput
            type="datetime-local"
            value={formState.date}
            onInput={(e) => {
              e.persist();
              setFormState({ ...formState, date: e.target.value });
            }}
          ></IonInput>
        </IonItem>
        {!editState ? (
          <>
            <IonItemDivider>Open Seats: </IonItemDivider>
            <IonItem>
              <IonInput
                type="number"
                placeholder="6"
                value={formState.avaliableSeats}
                onInput={(e) => {
                  e.persist();
                  setFormState({
                    ...formState,
                    avaliableSeats: e.target.value,
                  });
                }}
              ></IonInput>
            </IonItem>
          </>
        ) : undefined}
        <IonItemDivider>Game Description: </IonItemDivider>
        <IonItem>
          <IonTextarea
            placeholder="This DND game..."
            value={formState.description}
            onInput={(e) => {
              e.persist();
              setFormState({ ...formState, description: e.target.value });
            }}
          ></IonTextarea>
        </IonItem>
        <IonItem>
          <IonButton onClick={submit}>Submit</IonButton>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default Form;

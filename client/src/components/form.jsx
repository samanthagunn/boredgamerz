import { Loader } from "@googlemaps/js-api-loader";
import {
  IonButton,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonTextarea,
} from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";

const Form = ({ editState }) => {
  const [formState, setFormState] = useState({});
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8080/games/${params}`)
  //       .then((resp) => resp.json)
  //       .then((data) => {let date = new Date(data.date); data = {...data, date: date.ISOString() } ;setFormState({data, date: Date})})
  //       .catch((e) => console.error(e));
  //   });

  let connaddress = "";
  let geocoder;
  let connectAddress = (googleAddress) => {
    googleAddress.map((part) => (connaddress += part.long_name + " "));
    geocoder.geocode({ address: connaddress }, (result, status) => {
      if (status === "OK") {
        setFormState({ ...formState, position: result[0].geometry.location });
      }
    });
  };

  let autocomplete;
  let initAutocomplete = () => {
    const loader = new Loader({
      apiKey: "AIzaSyDuZ32gfmKD4XNcQoWGoTkSLGZ--LUo_L4",
      version: "weekly",
    });
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
   
    <div className="game-container">
      <IonList className="create-games ">
        <div className="game-list game-font">
        <IonItemDivider ><strong>Game Name:</strong> </IonItemDivider>
        <IonItem >
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
        <IonItemDivider><strong>Location:</strong> </IonItemDivider>
        <IonItem >
          <input className="mapinput"
            type="text"
            id="autocomplete"
            value={formState.address}
            onFocus={initAutocomplete}
            
          ></input>
        </IonItem>
        <IonItemDivider><strong>Date:</strong> </IonItemDivider>
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
            <IonItemDivider><strong>Open Seats:</strong> </IonItemDivider>
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
        <IonItemDivider><strong>Game Description:</strong> </IonItemDivider>
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
        </div>
      </IonList>
      </div>
  );
};

export default Form;

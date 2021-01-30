import { useAuth0 } from "@auth0/auth0-react";
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
import { useHistory } from "react-router";
require('dotenv').config()

const Form = ({ editState }) => {
  const [formState, setFormState] = useState({});
  let history = useHistory();
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
    setFormState({ ...formState, address: connaddress });
    // geocoder.geocode({ address: connaddress }, (result, status) => {
    //   if (status === "OK") {
    //     console.log(result[0].geometry.location.lat());
    //     setFormState({ ...formState, position: result[0].geometry.location });
    //   }
    // });
  };

  let autocomplete;
  let initAutocomplete = () => {
    const loader = new Loader({
      apiKey: process.env.MAPS_API_KEY,
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
  const { getAccessTokenSilently } = useAuth0();

  let submit = () => {
    if (formState.date < Date.now()) {
      alert("Date must be after today.");
    } else {
      const submitObject = {
        address: formState.address,
        date: formState.date,
        gameName: formState.gameName,
        description: formState.description,
        category: formState.category,
        availableSeats: formState.avaliableSeats,
        title: formState.title,
      };
      getAccessTokenSilently().then((resp) =>
        axios({
          url: `${process.env.API_HOST}/bored-gamerz/api/game-meeting`,
          method: "post",
          data: submitObject,
          headers: {
            Authorization: `Bearer ${resp}`,
          },
        }).then(() => {
          alert(
            "Your game has been created, please monitor your email to accept users for your game."
          );
          history.push("/games");
        })
      );
    }
    // axios
    //   .post("http://localhost:8080/games", formState)
    //   .then((resp) => console.log(resp));
    // console.log(formState)
  };

  return (
    <div className="game-container">
      <IonList className="create-games ">
        <div className="game-list game-font">
          <IonItemDivider>
            <strong>Game Title:</strong>{" "}
          </IonItemDivider>
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
          <IonItemDivider>
            <strong>Game Name:</strong>{" "}
          </IonItemDivider>
          <IonItem>
            <IonInput
              type="text"
              placeholder="UNO"
              value={formState.gameName}
              onInput={(e) => {
                e.persist();
                setFormState({ ...formState, gameName: e.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItemDivider>
            <strong>Category:</strong>{" "}
          </IonItemDivider>
          <IonItem>
            <IonInput
              type="text"
              placeholder="Table Top"
              value={formState.category}
              onInput={(e) => {
                e.persist();
                setFormState({ ...formState, category: e.target.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItemDivider>
            <strong>Location:</strong>{" "}
          </IonItemDivider>
          <IonItem>
            <input
              className="mapinput"
              type="text"
              id="autocomplete"
              value={formState.address}
              onFocus={initAutocomplete}
            ></input>
          </IonItem>
          <IonItemDivider>
            <strong>Date: MM:DD:YY MM:HH:AM/PM</strong>{" "}
          </IonItemDivider>
          <IonItem>
            <IonInput
              type="datetime-local"
              value={formState.dateString}
              onInput={(e) => {
                e.persist();
                setFormState({
                  ...formState,
                  dateString: e.target.value,
                  date: Date.parse(e.target.value),
                });
              }}
            ></IonInput>
          </IonItem>
          {!editState ? (
            <>
              <IonItemDivider>
                <strong>Open Seats:</strong>{" "}
              </IonItemDivider>
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
          <IonItemDivider>
            <strong>Game Description:</strong>{" "}
          </IonItemDivider>
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

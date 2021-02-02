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
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
require("dotenv").config();

const Form = ({ editState }) => {
  const [formState, setFormState] = useState({});
  let history = useHistory();
  let params = useParams();
  const { getAccessTokenSilently } = useAuth0();
  let connaddress = "";
  console.log(formState)

  let connectAddress = (googleAddress) => {
    console.log(googleAddress);
    googleAddress.map((part) => (connaddress += part.long_name + " "));
    setFormState({ ...formState, address: connaddress });
  };
  console.log(params);
  useEffect(() => {
    if (editState) {
      getAccessTokenSilently()
        .then((resp) => {
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_HOST}/game-meeting/${params.id}`,
            headers: {
              Authorization: `Bearer ${resp}`,
            },
          })
            .then((resp) => resp.data)
            .then((data) => {
              console.log(data);
              let date = new Date(data.date);
              data = {
                ...data,
                dateString: date
                  .toISOString()
                  .substring(0, date.toISOString().length - 5),
              };
              console.log(data);
              setFormState(data);
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
  }, []);

  let edit = () => {
    console.log(formState);
    if (formState.date < Date.now()) {
      alert("Date must be after today.");
    } else {
      const submitObject = {
        address: formState.address,
        date: formState.date,
        gameName: formState.gameName,
        description: formState.description,
        category: formState.category,
        availableSeats: formState.availableSeats,
        title: formState.title,
        id: formState.id
      };
      console.log(submitObject);
      getAccessTokenSilently().then((resp) =>
        axios({
          url: `${process.env.REACT_APP_API_HOST}/game-meeting`,
          method: "put",
          data: submitObject,
          headers: {
            Authorization: `Bearer ${resp}`,
          },
        }).then(() => {
          alert(
            `Your game has been ${editState ? "edited" : "created"}, please monitor your email to accept users for your game.`
          );
          history.push("/games");
        })
      );
    }
  };

  let submit = () => {
    console.log(formState);
    if (formState.date < Date.now()) {
      alert("Date must be after today.");
    } else {
      const submitObject = {
        address: formState.address,
        date: formState.date,
        gameName: formState.gameName,
        description: formState.description,
        category: formState.category,
        availableSeats: formState.availableSeats,
        title: formState.title,
      };
      console.log(submitObject);
      getAccessTokenSilently().then((resp) =>
        axios({
          url: `${process.env.REACT_APP_API_HOST}/game-meeting`,
          method: "post",
          data: submitObject,
          headers: {
            Authorization: `Bearer ${resp}`,
          },
        }).then(() => {
          alert(
            `Your game has been ${editState ? "edited" : "created"}, please monitor your email to accept users for your game.`
          );
          history.push("/games");
        })
      );
    }
  };
  const initAutocomplete = () => {
    let geocoder;
    let autocomplete;
    const loader = new Loader({
      apiKey: process.env.REACT_APP_MAPS_API_KEY,
      version: "weekly",
    });
    loader
      .load()
      .then(() => {
        autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById("autocomplete"),
          { types: ["geocode"] }
        );
        autocomplete.setFields(["address_component"]);
        autocomplete.addListener("place_changed", () => {
          connectAddress(autocomplete.getPlace().address_components);
        });
        geocoder = new window.google.maps.Geocoder();
      })
      .catch((e) => console.error(e));
  };
  console.log(formState)
  return (
    <div className="game-container">
      <IonList className="create-games ">
        <div className="game-list game-font">
          <IonItemDivider>
            <strong>Game Title:</strong>
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
            <strong>Game Name:</strong>
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
            <strong>Category:</strong>
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
            <strong>Location:</strong>
          </IonItemDivider>
          <IonItem>
            <input
              className="mapinput"
              type="text"
              id="autocomplete"
              onChange={(e) => setFormState({...formState, address: e.target.value})}
              onFocus={initAutocomplete}
              value={formState.address}
            ></input>
          </IonItem>
          <IonItemDivider>
            <strong>Date: MM:DD:YY MM:HH:AM/PM</strong>
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
                <strong>Open Seats:</strong>
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
            <strong>Game Description:</strong>
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
          {editState ? (<IonButton onClick={edit}>Submit</IonButton>) : <IonButton onClick={submit}>Submit</IonButton>}
          </IonItem>
        </div>
      </IonList>
    </div>
  );
};

export default Form;

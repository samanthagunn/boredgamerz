import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/index.scss";
import Profile from "./pages/profile";
import Home from "./pages/Home.jsx";
import MyGames from "./pages/MyGames.jsx";
import FindGames from "./pages/FindGames";
import CreateGame from "./pages/CreateGame";
import EditGame from "./pages/EditGame";
import Admin from "./pages/Admin";
import { withAuthenticationRequired } from "@auth0/auth0-react";
//mimic "/" path to ensure no unauthed users access profiles
require('dotenv').config()

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
	  <Route path="*" component={Home} />
          <Route
            path="/profile"
            component={withAuthenticationRequired(Profile)}
            exact={true}
          />
          <Route
            path="/mygames"
            component={withAuthenticationRequired(MyGames, {
              returnTo: "/mygames",
              loginOptions: {
                redirectUri: `${process.env.REACT_APP_HOST}/mygames`,
              },
            })}
            exact={true}
          />
          <Route
            path="/games"
            component={withAuthenticationRequired(FindGames, {
              returnTo: "/games",
              loginOptions: {
                redirectUri: `${process.env.REACT_APP_HOST}/games`,
              },
            })}
            exact={true}
          />
          <Route
            path="/create"
            component={withAuthenticationRequired(CreateGame, {
              returnTo: "/create",
              loginOptions: {
                redirectUri: `${process.env.REACT_APP_HOST}/create`,
              },
            })}
            exact={true}
          />
          <Route
            path="/games/edit/:id"
            component={withAuthenticationRequired(EditGame)}
          />
          <Route path="/admin" component={withAuthenticationRequired(Admin)} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

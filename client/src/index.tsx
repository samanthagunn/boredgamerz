import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./errorboundary";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
require("dotenv").config();

ReactDOM.render(
  <Auth0Provider
    domain="dev-z2irz81c.us.auth0.com"
    clientId=""
    redirectUri=""
    response_type="code"
    scope="openid profile email read:allUsers read:allJoins delete:users delete:current_user"
    audience=""
  >
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

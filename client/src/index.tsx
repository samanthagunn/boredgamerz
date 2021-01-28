import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./errorboundary";
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="dev-z2irz81c.us.auth0.com"
    clientId="lbS5AAGz6OmsB863eb48BPPg7sYep1Ys"
    redirectUri= "http://localhost:3000/profile"
    response_type="code"
    scope="openid profile email"
    audience="http://test12351234"
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

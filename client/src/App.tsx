import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonHeader, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';


/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/index.scss';
import Profile from './pages/profile';
import Home from './pages/Home';
import Header from './components/header';
import Footer from './components/footer';
import MyGames from './pages/MyGames.jsx';
import FindGames from './pages/FindGames';
import CreateGame from './pages/CreateGames';
//mimic "/" path to ensure no unauthed users access profiles
const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/profile" component={Profile} exact={true}/>
        <Route path="/profile/games" component={MyGames} exact={true} />
        <Route path="/games" component={FindGames} exact={true} />
        <Route path="/games/create" component={CreateGame} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

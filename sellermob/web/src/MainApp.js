import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import axios from 'axios'
import configureStore, { history } from "./store";
//import './firebase/firebase';
import App from "./containers/App";

//axios.defaults.baseURL = 'http://192.241.248.251:3525'
axios.defaults.baseURL = 'http://localhost:3525'

export const store = configureStore();

const MainApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default MainApp;

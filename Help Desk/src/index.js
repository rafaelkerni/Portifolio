import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/AppContainer';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

import store from './store';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import "firebase/storage";
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: ""});

// Add the Firebase products that you want to use
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

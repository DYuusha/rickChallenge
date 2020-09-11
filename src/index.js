import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAeVL6H3SCF8ULha6dweU26Z6HSZqsV0NQ",
  authDomain: "rickchallenge-369f4.firebaseapp.com",
  databaseURL: "https://rickchallenge-369f4.firebaseio.com",
  projectId: "rickchallenge-369f4",
  storageBucket: "rickchallenge-369f4.appspot.com",
  messagingSenderId: "442917579702",
  appId: "1:442917579702:web:dd071b5963500b9dd2ef17",
  measurementId: "G-XD0MBC2MN8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const RouterApp = (<Router>
  <App />
</Router>)
ReactDOM.render(RouterApp, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDGRS_ZU5f8txQdpWYyp1g_BlHlWTL3-4s",
    authDomain: "to-do-list-with-react.firebaseapp.com",
    databaseURL: "https://to-do-list-with-react.firebaseio.com",
    projectId: "to-do-list-with-react",
    storageBucket: "to-do-list-with-react.appspot.com",
    messagingSenderId: "160539640419",
    appId: "1:160539640419:web:1379e88b4a206a494bae56",
    measurementId: "G-WLFGZXH1YV"
  };

  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.firestore();

 
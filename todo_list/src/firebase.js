import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBX8KzeX_tLbJG1fcAz_4TqpM3r6Gihrd8",
  authDomain: "todo-app-ba22e.firebaseapp.com",
  databaseURL: "https://todo-app-ba22e-default-rtdb.firebaseio.com",
  projectId: "todo-app-ba22e",
  storageBucket: "todo-app-ba22e.appspot.com",
  messagingSenderId: "706990791139",
  appId: "1:706990791139:web:7dc8e692b29f51ec98e8d6",
  measurementId: "G-JJSQR5Y1WP",
});

const db = firebaseApp.firestore();

export default db;

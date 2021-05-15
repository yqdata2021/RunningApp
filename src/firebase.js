import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBL7b55f0hmQdXMBWh7p-ekyiz28m7k3qw",
  authDomain: "auth-dev-3bcab.firebaseapp.com",
  databaseURL: "https://auth-dev-3bcab-default-rtdb.firebaseio.com",
  projectId: "auth-dev-3bcab",
  storageBucket: "auth-dev-3bcab.appspot.com",
  messagingSenderId: "784989224473",
  appId: "1:784989224473:web:e8720ee03df8da927c7488",
});

export const auth = app.auth();
export default app;

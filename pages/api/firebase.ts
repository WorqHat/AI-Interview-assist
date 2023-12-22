import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBiKI-VKLuNm7kzmixc4YGHtJ2vQ8FF9Do",
  authDomain: "worqhat-dev.firebaseapp.com",
  projectId: "worqhat-dev",
  storageBucket: "worqhat-dev.appspot.com",
  messagingSenderId: "184007889916",
  appId: "1:184007889916:web:fc0e1eb03efddfd4cf5879",
  //   measurementId: "G-X883RWYM1L",
};

firebase.initializeApp(firebaseConfig);

export const auth: firebase.auth.Auth = firebase.auth();

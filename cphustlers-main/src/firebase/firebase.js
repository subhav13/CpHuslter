import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCGx2PmosNa6lMXLCGefwBsVg1KqDzjQ4",
  authDomain: "cphustler-6fc02.firebaseapp.com",
  projectId: "cphustler-6fc02",
  storageBucket: "cphustler-6fc02.appspot.com",
  messagingSenderId: "231578963722",
  appId: "1:231578963722:web:255179cabeea108b73f4f3",
  measurementId: "G-FX79LEF41K"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

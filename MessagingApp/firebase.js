// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSjHLGQU2ccZ_87XMgUU3zaiosXbb9ItY",
  authDomain: "messenger-eb0e0.firebaseapp.com",
  projectId: "messenger-eb0e0",
  storageBucket: "messenger-eb0e0.appspot.com",
  messagingSenderId: "365757327985",
  appId: "1:365757327985:web:d636972eefc86c4a3ec9d0",
  measurementId: "G-SQYQ4FWGNE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
export const database = getFirestore();
// Initialize Firebase Authentication and get a reference to the service

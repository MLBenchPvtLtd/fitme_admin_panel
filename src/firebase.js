import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa3ryLQwuTY44XNGMFcUfb_oPqdLEfMnM",
  authDomain: "fir-crud-3f056.firebaseapp.com",
  databaseURL: "https://fir-crud-3f056-default-rtdb.firebaseio.com",
  projectId: "fir-crud-3f056",
  storageBucket: "fir-crud-3f056.appspot.com",
  messagingSenderId: "838570275958",
  appId: "1:838570275958:web:05b463e37cc0ec47781b57",
  measurementId: "G-97H3L9D03H"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCstixzSXYzwX3O7cIKrO-ITybzoq5eqQc",
//   authDomain: "fit-me-b67a8.firebaseapp.com",
//   databaseURL: "https://fit-me-b67a8-default-rtdb.firebaseio.com",
//   projectId: "fit-me-b67a8",
//   storageBucket: "fit-me-b67a8.appspot.com",
//   messagingSenderId: "1030481645632",
//   appId: "1:1030481645632:web:e979b13fbb09f8b688cfa5",
//   measurementId: "G-LQ1E6SQKJ6"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
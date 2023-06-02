import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCstixzSXYzwX3O7cIKrO-ITybzoq5eqQc",
  authDomain: "fit-me-b67a8.firebaseapp.com",
  databaseURL: "https://fit-me-b67a8-default-rtdb.firebaseio.com",
  projectId: "fit-me-b67a8",
  storageBucket: "fit-me-b67a8.appspot.com",
  messagingSenderId: "1030481645632",
  appId: "1:1030481645632:web:e979b13fbb09f8b688cfa5",
  measurementId: "G-LQ1E6SQKJ6"
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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dbase = getDatabase(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
// export const db = getDatabase(app);
export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7iuCF4gW3ZSKWhW1V-_O9BQd-b12J7Sg",
  authDomain: "hybridprogramming-330e7.firebaseapp.com",
  projectId: "hybridprogramming-330e7",
  storageBucket: "hybridprogramming-330e7.appspot.com",
  messagingSenderId: "151067575299",
  appId: "1:151067575299:web:2dc2fa37274196dff87a36",
  measurementId: "G-8V5CL68T7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

setPersistence(auth, browserLocalPersistence);

export {auth, db};
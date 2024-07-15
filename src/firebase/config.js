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
  apiKey: "AIzaSyA1Vn9XZn9LFnhKMGPiWlIHq-p3mt_eay4",
  authDomain: "hybrid-programming-finals.firebaseapp.com",
  projectId: "hybrid-programming-finals",
  storageBucket: "hybrid-programming-finals.appspot.com",
  messagingSenderId: "137851635308",
  appId: "1:137851635308:web:10e1356c8bd54443477a49",
  measurementId: "G-3HFW4VRTDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

setPersistence(auth, browserLocalPersistence);

export {auth, db};
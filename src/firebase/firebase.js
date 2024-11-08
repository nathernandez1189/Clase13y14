// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmCalknN6FlJ_wpS7eLDGqDFx60T7NTf0",
  authDomain: "proyecto-web-salome.firebaseapp.com",
  projectId: "proyecto-web-salome",
  storageBucket: "proyecto-web-salome.appspot.com",
  messagingSenderId: "879835619870",
  appId: "1:879835619870:web:705f6ae7782d106f7e840f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

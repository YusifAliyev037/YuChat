// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from  "firebase/auth"
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyD_TWGL_SjT0o7WbdK9XW9Rgd4mpHl4cm4",
  authDomain: "yuchat-600d9.firebaseapp.com",
  projectId: "yuchat-600d9",
  storageBucket: "yuchat-600d9.appspot.com",
  messagingSenderId: "505545064986",
  appId: "1:505545064986:web:ea2d73307c4bf4d5df07a3",
  measurementId: "G-KMWZ9QLRJS"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
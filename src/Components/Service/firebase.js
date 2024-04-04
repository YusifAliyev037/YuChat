import { initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth"
import { getFirestore} from "firebase/firestore"
import {getStorage  } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "yuchat-65fcd",
  storageBucket: "yuchat-65fcd.appspot.com",
  messagingSenderId: "714127113056",
  appId: "1:714127113056:web:43ae971f8ebbf308077c05"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

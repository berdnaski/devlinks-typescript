import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8o12nd3Jj5fFIJqTVQYSrYSi4aMkExf0",
  authDomain: "react-linktrees.firebaseapp.com",
  projectId: "react-linktrees",
  storageBucket: "react-linktrees.appspot.com",
  messagingSenderId: "198441366989",
  appId: "1:198441366989:web:0bda3ec3c4f232f7640084",
  measurementId: "G-FBYHB8YWGP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db};
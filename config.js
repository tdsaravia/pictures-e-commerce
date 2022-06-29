import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDHNWTXw2ip30jULRPMNI5ojmZSrw3g5n4",
  authDomain: "bejamas-task-f77db.firebaseapp.com",
  databaseURL: "https://bejamas-task-f77db-default-rtdb.firebaseio.com",
  projectId: "bejamas-task-f77db",
  storageBucket: "bejamas-task-f77db.appspot.com",
  messagingSenderId: "714582039544",
  appId: "1:714582039544:web:966174af432e9a138a940d",
  measurementId: "G-GQPTK68S47"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
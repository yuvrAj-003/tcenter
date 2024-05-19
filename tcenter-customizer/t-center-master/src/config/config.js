import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "t-center-da3c8.firebaseapp.com",
  projectId: "t-center-da3c8",
  storageBucket: "t-center-da3c8.appspot.com",
  messagingSenderId: "675198752057",
  appId: "1:675198752057:web:b27642c1b01cda58b984e8",
  measurementId: "G-FC10YS8LBK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

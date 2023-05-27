import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const APIKEY = import.meta.env.VITE_APIKEY;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "pengweb-fb304.firebaseapp.com",
  projectId: "pengweb-fb304",
  storageBucket: "pengweb-fb304.appspot.com",
  messagingSenderId: "447949337208",
  appId: "1:447949337208:web:980a1586d8f2874e2fb38d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

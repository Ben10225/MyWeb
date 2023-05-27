import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const APIKEY = import.meta.env.VITE_APIKEY;
const AUTHDOMAIN = import.meta.env.VITE_AUTHDOMAIN;
const PROJECTID = import.meta.env.VITE_PROJECTID;
const STORAGEBUCKET = import.meta.env.VITE_STORAGEBUCKET;
const MESSAGINGSENDERID = import.meta.env.VITE_MESSAGINGSENDERID;
const APPID = import.meta.env.VITE_APPID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

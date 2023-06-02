import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const APIKEY = "AIzaSyDpw8LIRDcal9MiHN_Th0JhxShyU5Ng3YI";
const AUTHDOMAIN = "pengweb-fb304.firebaseapp.com";
const PROJECTID = "pengweb-fb304";
const STORAGEBUCKET = "pengweb-fb304.appspot.com";
const MESSAGINGSENDERID = "447949337208";
const APPID = "1:447949337208:web:980a1586d8f2874e2fb38d";

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

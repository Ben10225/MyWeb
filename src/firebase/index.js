import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpw8LIRDcal9MiHN_Th0JhxShyU5Ng3YI",
  authDomain: "pengweb-fb304.firebaseapp.com",
  projectId: "pengweb-fb304",
  storageBucket: "pengweb-fb304.appspot.com",
  messagingSenderId: "447949337208",
  appId: "1:447949337208:web:980a1586d8f2874e2fb38d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

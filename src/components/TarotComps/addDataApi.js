import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { onMounted } from "vue";

// Add a new document with a generated id.

const addTarot = async (id, data) => {
  const docRef = doc(db, "tarots", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("data exist, upload data fail");
  } else {
    setDoc(doc(db, "tarots", id), data);
    console.log("success");
  }
};

export default { addTarot };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA30OFPY8VsAQLBP5Kx8pA2PrIBiz1bVXs",
  authDomain: "service-system-e393f.firebaseapp.com",
  projectId: "service-system-e393f",
  storageBucket: "service-system-e393f.appspot.com",
  messagingSenderId: "34849187878",
  appId: "1:34849187878:web:217c7630a5188b37eb1ee7",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };

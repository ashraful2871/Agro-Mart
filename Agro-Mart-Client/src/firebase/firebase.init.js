import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Firestore offline persistence
enableIndexedDbPersistence(db)
  .then(() => {
    console.log("Firestore persistence enabled");
  })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      console.error(
        "Multiple tabs open. Firestore persistence can only be enabled in one tab."
      );
    } else if (err.code === "unimplemented") {
      console.error(
        "The current browser does not support Firestore persistence."
      );
    } else {
      console.error("Error enabling Firestore persistence:", err);
    }
  });

export { app, auth, db };

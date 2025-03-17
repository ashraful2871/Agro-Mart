// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF_fq1DpAQDKh7SlYORmKvlkljHU30QRs",
  authDomain: "agro-mart-e2cb4.firebaseapp.com",
  projectId: "agro-mart-e2cb4",
  storageBucket: "agro-mart-e2cb4.firebasestorage.app",
  messagingSenderId: "425758544009",
  appId: "1:425758544009:web:d724e80f9ef85585f3b658",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

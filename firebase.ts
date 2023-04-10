import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLUOPuurQwWEkmZJBslAmPU-1fQA7zW0k",
  authDomain: "chatgpt-clone-3b62e.firebaseapp.com",
  projectId: "chatgpt-clone-3b62e",
  storageBucket: "chatgpt-clone-3b62e.appspot.com",
  messagingSenderId: "219451785358",
  appId: "1:219451785358:web:23ac169639c37be5dd89df",
  measurementId: "G-ELY3ESW9RG",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

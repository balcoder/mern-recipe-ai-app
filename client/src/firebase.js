// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-recipe-ai-app.firebaseapp.com",
  projectId: "mern-recipe-ai-app",
  storageBucket: "mern-recipe-ai-app.firebasestorage.app",
  messagingSenderId: "831448335019",
  appId: "1:831448335019:web:9899cd3279813128036dee",
  measurementId: "G-BHM5PY4F9V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

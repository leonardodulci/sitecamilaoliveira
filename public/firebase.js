// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoxGcEOlyWZxuMpP4pv1JzyHoWOfsJrO8",
  authDomain: "site-camilaoliveira.firebaseapp.com",
  projectId: "site-camilaoliveira",
  storageBucket: "site-camilaoliveira.firebasestorage.app",
  messagingSenderId: "1050196958342",
  appId: "1:1050196958342:web:8f00851b94d791a6cd0507",
  measurementId: "G-5N1FPQFXQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
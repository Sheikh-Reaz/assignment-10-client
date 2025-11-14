// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHziCfyiKi1i83-pDoFP8XsfaOcjHO4wk",
  authDomain: "ssignment-10.firebaseapp.com",
  projectId: "ssignment-10",
  storageBucket: "ssignment-10.firebasestorage.app",
  messagingSenderId: "119999654045",
  appId: "1:119999654045:web:6495d14c280566ec4bcc74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-84dcd.firebaseapp.com",
  projectId: "mern-blog-84dcd",
  storageBucket: "mern-blog-84dcd.appspot.com",
  messagingSenderId: "200304261913",
  appId: "1:200304261913:web:3ec0ae3232793c7ba9a388"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app instance
export { app };

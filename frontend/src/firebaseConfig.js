// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore SDK
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTd9H4zlR7mP1UGQtJX65wnbTyKlJeAl0",
  authDomain: "owujupe-api-demo.firebaseapp.com",
  projectId: "owujupe-api-demo",
  storageBucket: "owujupe-api-demo.appspot.com",
  messagingSenderId: "676798539325",
  appId: "1:676798539325:web:2f4a52b66a63ac12972c54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // This initializes Firestore

export { db };

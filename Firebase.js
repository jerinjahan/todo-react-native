import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAer3rbOqymENJdxLz0WjdotoQdwlHSX7M",
    authDomain: "todo-3ac6e.firebaseapp.com",
    projectId: "todo-3ac6e",
    storageBucket: "todo-3ac6e.appspot.com",
    messagingSenderId: "600960263493",
    appId: "1:600960263493:web:70f2d96c90a1c8c09e8a2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

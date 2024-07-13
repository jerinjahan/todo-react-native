import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase with your config
const firebaseConfig = {
	apiKey: "AIzaSyAer3rbOqymENJdxLz0WjdotoQdwlHSX7M",
    authDomain: "todo-3ac6e.firebaseapp.com",
    projectId: "todo-3ac6e",
    storageBucket: "todo-3ac6e.appspot.com",
    messagingSenderId: "600960263493",
    appId: "1:600960263493:web:70f2d96c90a1c8c09e8a2c"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase with your config
const firebaseConfig = {
	apiKey: "AIzaSyAer3rbOqymENJdxLz0WjdotoQdwlHSX7M",
    authDomain: "todo-3ac6e.firebaseapp.com",
    projectId: "todo-3ac6e",
    storageBucket: "todo-3ac6e.appspot.com",
    messagingSenderId: "600960263493",
    appId: "1:600960263493:web:70f2d96c90a1c8c09e8a2c"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// const auth = initializeAuth(FIREBASE_APP, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });


export { 
    FIRESTORE_DB,
    FIREBASE_AUTH, 
    // auth
}
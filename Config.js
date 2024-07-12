import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAer3rbOqymENJdxLz0WjdotoQdwlHSX7M",
    authDomain: "todo-3ac6e.firebaseapp.com",
    projectId: "todo-3ac6e",
    storageBucket: "todo-3ac6e.appspot.com",
    messagingSenderId: "600960263493",
    appId: "1:600960263493:web:70f2d96c90a1c8c09e8a2c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
    collection,
    getDocs,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where,
};
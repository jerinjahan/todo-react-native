// import firebase from "firebase/app";
// import { Firestore,getFirestore } from "firebase/firestore";


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAer3rbOqymENJdxLz0WjdotoQdwlHSX7M",
    authDomain: "todo-3ac6e.firebaseapp.com",
    projectId: "todo-3ac6e",
    storageBucket: "todo-3ac6e.appspot.com",
    messagingSenderId: "600960263493",
    appId: "1:600960263493:web:70f2d96c90a1c8c09e8a2c"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Export firestore database
// // It will be imported into your react app whenever it is needed
// export const db = getFirestore(app);

class Fire {
    constructor(callback){
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length){
            firebase(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user){

            }else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {});
            }
        })
    }

    getLists(callback){
        let ref = firebase
                    .firestore()
                    .collection("users")
                    .doc(this.userId)
                    .collection("lists");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(lists);
        })
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe()
    }
}

export default Fire;
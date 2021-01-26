import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDA-AeBHOr1Q0IlziFujEC6-p5Nuv9anQA",
    authDomain: "studyrooms-78889.firebaseapp.com",
    databaseURL: "https://studyrooms-78889.firebaseio.com",
    projectId: "studyrooms-78889",
    storageBucket: "studyrooms-78889.appspot.com",
    messagingSenderId: "221007362232",
    appId: "1:221007362232:web:c2dce13a06fbeb5d06dc4d",
    measurementId: "G-M4992V6J2N"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
export const database = Firebase.database();
export const storage = Firebase.storage();
export const firestore = Firebase.firestore();
Firebase.analytics();

export default firebase;
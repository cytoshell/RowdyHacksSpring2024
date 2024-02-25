// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUg8V5kUhpPJgwfIgTYpUtmhfQPSZ4DKI",
  authDomain: "rabid-tasker.firebaseapp.com",
  projectId: "rabid-tasker",
  storageBucket: "rabid-tasker.appspot.com",
  messagingSenderId: "1040520656967",
  appId: "1:1040520656967:web:2d4b777867865a57b29962",
  measurementId: "G-DFRPSMWE63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
        // save user id to local storage and catch any errors
        localStorage.setItem('uuid', user.uid)
        localStorage.setItem('name', user.displayName)

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};

export const logout = () => {
    signOut(auth);
    localStorage.clear()
};
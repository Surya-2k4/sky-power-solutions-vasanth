import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8lyZjmjGmkcE1iY77qIpjyqg5j9aQghM",
    authDomain: "sky-power-solutions.firebaseapp.com",
    projectId: "sky-power-solutions",
    storageBucket: "sky-power-solutions.firebasestorage.app",
    messagingSenderId: "993035811670",
    appId: "1:993035811670:web:ce4e025bfed0bfb7c3f4f7",
    measurementId: "G-9FVZRN0MNM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export default app;

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);

const ADMIN_EMAIL = 'admin.sky@gmail.com';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setIsAdmin(firebaseUser.email === ADMIN_EMAIL);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signup = async (email, password, displayName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        // Store user data in Firestore
        await setDoc(doc(db, 'customers', userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: email,
            displayName: displayName,
            photoURL: userCredential.user.photoURL || '',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            provider: 'email'
        });
        return userCredential;
    };

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Update last login
        if (userCredential.user.email !== ADMIN_EMAIL) {
            await setDoc(doc(db, 'customers', userCredential.user.uid), {
                lastLogin: serverTimestamp()
            }, { merge: true });
        }
        return userCredential;
    };

    const loginWithGoogle = async () => {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const userDoc = await getDoc(doc(db, 'customers', userCredential.user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, 'customers', userCredential.user.uid), {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName || '',
                photoURL: userCredential.user.photoURL || '',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                provider: 'google'
            });
        } else {
            await setDoc(doc(db, 'customers', userCredential.user.uid), {
                lastLogin: serverTimestamp()
            }, { merge: true });
        }
        return userCredential;
    };

    const logout = async () => {
        await signOut(auth);
    };

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
    };

    const getCustomers = async () => {
        const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const value = {
        user,
        loading,
        isAdmin,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        getCustomers
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

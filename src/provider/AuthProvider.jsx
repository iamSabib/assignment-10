import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { app } from '../firebase/firebase.init';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const userRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const setProfile = (name, photoURL) => {
        // setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL });};

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    };

    const displayName = () => console.log(auth.currentUser.displayName, auth.currentUser.photoURL)

    const authInfo = {
        userRegister,
        userLogin,
        setProfile,
        displayName,
        user,
        loading,
        setUser,
        logOut,
        signInWithGoogle,
        resetPassword
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubcribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
// export {AuthContext}
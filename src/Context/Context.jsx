import React, { createContext, useContext } from 'react'
import { initializeApp } from "firebase/app";
import {FacebookAuthProvider, createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import Signup from '../Pages/Signup';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDQJ6qknNFaM-8xi2U3ajzVy0crxiZKGE",
  authDomain: "instagram-clone-7ecf8.firebaseapp.com",
  projectId: "instagram-clone-7ecf8",
  storageBucket: "instagram-clone-7ecf8.appspot.com",
  messagingSenderId: "52985859212",
  appId: "1:52985859212:web:4077beb40ccefd9a9fffa9"
};

export const InstagramContext = createContext(null)
const app = initializeApp(firebaseConfig);
const facebook = new FacebookAuthProvider()

const FirebaseContext = (props) => {
  const auth = getAuth();

  const signupWithEmailandPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful signup here
        console.log('User signed up successfully:', userCredential.user);
      })
      .catch((error) => {
        // Handle signup error here
        console.error('Error during signup:', error.code, error.message);
      });
  };

  return (
    <InstagramContext.Provider value={signupWithEmailandPassword}>
      {props.children}
    </InstagramContext.Provider>
  );
};
export default FirebaseContext
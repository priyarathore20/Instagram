import React, { createContext, useContext } from 'react'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDQJ6qknNFaM-8xi2U3ajzVy0crxiZKGE",
  authDomain: "instagram-clone-7ecf8.firebaseapp.com",
  projectId: "instagram-clone-7ecf8",
  storageBucket: "instagram-clone-7ecf8.appspot.com",
  messagingSenderId: "52985859212",
  appId: "1:52985859212:web:4077beb40ccefd9a9fffa9"
};

const Context = createContext(null)
const app = initializeApp(firebaseConfig);

const FirebaseContext = () => {
 const useFirebaseContext = useContext(Context)

  return (
    <div>FirebaseContext</div>
  )
}

export default FirebaseContext
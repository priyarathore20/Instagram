import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { routes } from './Router/routes';
import { getAuth } from 'firebase/auth';
import { AuthContext } from './Context/AuthContext';
import app from './firebaseConfig';
import { getFirestore } from 'firebase/firestore';

const App = () => {
  const auth = getAuth();
  const { updateUser, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const documentRef = db.collection('Profiles').doc(user.uid);
        const documentSnapshot = await documentRef.get();

        if (documentSnapshot.exists) {
          updateUser(documentSnapshot.data());
        } else {
          updateUser(null);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    } else {
      updateUser(null);
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item) => {
          const { name, component: Component, isProtected, path } = item;
          const isAuthenticated = currentUser != null;

          return (
            <Route
              key={name}
              path={path}
              element={
                !isProtected || isAuthenticated ? (
                  <Component />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

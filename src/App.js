import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import app from './firebaseConfig';
import { routes } from './Router/routes';

const App = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const currentUser = auth.currentUser
  setUser(currentUser)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((item) => {
            const { name, component: Component, isProtected, path } = item;
            const isAuthenticated = user != null;

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
    </>
  );
};

export default App;

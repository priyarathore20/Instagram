import React from 'react';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Home';
import ProfilePage from './Pages/Profile';
import EditPage from './Pages/EditProfile';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

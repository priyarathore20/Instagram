import React from 'react';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Home';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

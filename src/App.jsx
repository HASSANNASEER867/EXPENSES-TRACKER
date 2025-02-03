
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

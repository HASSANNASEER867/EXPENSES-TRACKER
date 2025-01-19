// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from './Components/Home';
import Signup from './Components/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Home/>} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

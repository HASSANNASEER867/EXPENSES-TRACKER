// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from './Components/Home';
import Signup from './Components/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

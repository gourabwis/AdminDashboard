import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;

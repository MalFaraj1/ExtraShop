import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPages from "./components/ProtectedPages";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductInfo from "./pages/ProductInfo";

function App() {
  const {loading} = useSelector(state => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedPages><Home /></ProtectedPages>} />
        <Route path="/product/:id" element={<ProtectedPages><ProductInfo /></ProtectedPages>} />
        <Route path="/profile" element={<ProtectedPages><Profile /></ProtectedPages>}/>
        <Route path="/admin" element={<ProtectedPages><Admin /></ProtectedPages>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      </BrowserRouter>
        
      
      
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { useAuth } from './context/authcontext'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Region from './pages/region';
import CreatePlayer from './pages/createplayer';
import PrivateRoute from './components/PrivateRoute';



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/region/:region" element={<Region />} />
         <Route path="/create" element={ <PrivateRoute> <CreatePlayer /> </PrivateRoute> }/>
      </Routes>
    </>
  );
}

export default App;
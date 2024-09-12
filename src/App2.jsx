import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Loyout';
import Body from './Components/Body';
import LoginModal from './Components/LoginModal';
import RegisterModal from './Components/RegisterModal';
import PagInicio from './Pages/PagInicio';
import PagServicios from './Pages/PagServicios';
import PagContacto
 from './Pages/PagContacto';
function App2() {
  return (
    <Routes>
      {/* Layout envuelve todas las rutas */}
      <Route path="/" element={<Layout />} >
        {/* Rutas principales */}
        <Route path="inicio" element={<PagInicio />} />
        <Route path="servicios" element={<PagServicios/>} />
        <Route path="contacto" element={<PagContacto/>} />

        {/* Rutas para mostrar los modales */}
        <Route path="login" element={<LoginModal />} />
        <Route path="register" element={<RegisterModal />} />
      </Route>
    </Routes>
  );
}

export default App2;
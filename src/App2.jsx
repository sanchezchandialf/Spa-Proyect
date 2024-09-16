import React, { useState } from 'react';
import { Routes, Route , useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import Body from './Components/Body';
import PagInicio from './Pages/PagInicio';
import PagServicios from './Pages/PagServicios';
import PagContacto
 from './Pages/PagContacto';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login';
import Register from './Components/Register';
import RegisterProfecional from './Components/RegisterProfecional';
import Header2 from './Components/Header2';
import { useLogin } from './context/LoginContext'; // Importar el contexto
import { useAuth } from './context/AuthContext';
import PagProfesional from './Pages/PagProfesional';
import PagTurnos from './Pages/PagTurnos';
function App2() {
  
  const { isLoginModalOpen, isRegisterModalOpen, isRegisterProfesionalOpen, handleModalClose } = useLogin(); // Acceder al contexto
  const {esPorfesional} = useAuth();
  return (
    <>
      <Header2 />
      
      <div className="mt-20">
        <Routes>
          <Route path="/" element={<PagInicio />} /> 
          <Route path="/servicios" element={<PagServicios/>} />
          <Route path="/contacto" element={<PagContacto/>} />
          <Route path='/profesional' element={<PagProfesional/>}/>
          <Route path='/MisTurnos' element={<PagTurnos/>}/>

        </Routes>
      </div>
    

    {isLoginModalOpen && <Login onClose={handleModalClose} />}
    {isRegisterModalOpen && <Register onClose={handleModalClose} />}
    {isRegisterProfesionalOpen && <RegisterProfecional onClose={handleModalClose} />}



    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        containerClassName=""
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

    </>
  );
}

export default App2;
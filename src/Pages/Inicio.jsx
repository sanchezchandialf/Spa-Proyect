import React, { useState } from 'react';
import Header from '/src/Components/Header.jsx';
import Body from '/src/Components/Body.jsx';
import Contact from '/src/Components/Contact.jsx';
import GaleriaP from '/src/Components/GaleriaP.jsx';
import '/src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portada from '/src/Components/Portada';

import Login from '/src/Components/Login.jsx';
import Register from '/src/Components/Register.jsx';


function Inicio() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <Header onRegisterClick={() => setIsRegisterOpen(true)} onLoginClick={() => setIsLoginOpen(true)} />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <div className="w-full m-0 p-0">
        <Portada />
      </div>

      <div className="w-full m-0 p-0">
        <Body />
      </div>

      <div >
        <Contact />
      </div>
    </>
  );
}

export default Inicio;

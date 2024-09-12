import React from 'react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const navigate = useNavigate();

  // Función para cerrar el modal y redirigir a inicio
  const handleClose = () => {
    navigate("/inicio");
  };

  return (
    <Login isOpen={true} onClose={handleClose} />
  );
};

export default LoginModal;

import React from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const RegisterModal = () => {
  const navigate = useNavigate();

  // Función para cerrar el modal y redirigir a inicio
  const handleClose = () => {
    navigate("/inicio");
  };

  return (
    <Register isOpen={true} onClose={handleClose} />
  );
};

export default RegisterModal;

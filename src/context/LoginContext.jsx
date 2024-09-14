import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const LoginContext = createContext();

// Proveedor del contexto
export const LoginProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegisterProfesionalOpen, setIsRegisterProfesionalOpen] = useState(false);


  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleRegisterClick = () => setIsRegisterModalOpen(true);
  const handleRegisterProfesionalClick = () => setIsRegisterProfesionalOpen(true);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsRegisterProfesionalOpen(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isLoginModalOpen,
        isRegisterModalOpen,
        isRegisterProfesionalOpen,
        handleLoginClick,
        handleRegisterClick,
        handleRegisterProfesionalClick,
        handleModalClose,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useLogin = () => useContext(LoginContext);

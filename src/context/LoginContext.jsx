import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const LoginContext = createContext();

// Proveedor del contexto
export const LoginProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleRegisterClick = () => setIsRegisterModalOpen(true);
  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isLoginModalOpen,
        isRegisterModalOpen,
        handleLoginClick,
        handleRegisterClick,
        handleModalClose,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useLogin = () => useContext(LoginContext);

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [rol, setRol] = useState(localStorage.getItem('rol') ? parseInt(localStorage.getItem('rol'), 10) : 0);

  // Función para mantener el inicio de secion (guardar token)
  const login = (userToken, userRol) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('rol', userRol);
    
    setToken(userToken);
    setRol(userRol);
  };

  // Función para cerrar sesión (eliminar token)
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    localStorage.removeItem('rol');
    setRol(0);
  };

  //funcion para verificar que hay un usuario logueado
  const hayUsuario = ()=>{
    return !!token;
  }

  //funcion para saber si es cliente
  const esCliente = ()=>{
    return rol===1;
  }

  //funcion para saber si es admin
  const esAdmin = () => {
    return rol===2;
  };

  //funcion para saber si es profecional
  const esProfesional = () => {
    return rol===3;
  };

  // Valores que serán compartidos con todos los componentes que consuman el contexto
  const value = {
    token,
    rol,
    login,
    logout,
    hayUsuario,
    esCliente,
    esAdmin,
    esProfesional
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
